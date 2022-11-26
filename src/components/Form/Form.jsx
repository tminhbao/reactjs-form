import React, { Component } from "react";
import TableUser from "../TableUser/TableUser";
import axios from "axios";

export default class Form extends Component {
  state = {
    formValue: {
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    },
    formError: {
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    },
    valid: false,
    arraySinhVien: [
      {
        maSV: "1",
        hoTen: "Ngô Bá Khá",
        soDienThoai: "0123456789",
        email: "khabanh@gmail.com",
      },
    ],
  };

  checkFormValid = () => {
    // return true : khi form hợp lệ và ngược lại
    // form hợp lệ khi các trường formError = null và các formValue khác rỗng
    let { formValue, formError } = this.state;
    for (let key in formError) {
      if (formError[key] || !formValue[key]) return false;
    }
    return true;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.checkFormValid()) {
      alert("Form is invalid");
      return;
    }
    // Thêm sinh viên mới vào arraySinhVien
    let arraySinhVien = this.state.arraySinhVien;
    arraySinhVien.push({ ...this.state.formValue });
    this.setState({ arraySinhVien: arraySinhVien });
  };

  handleChangeInput = (e) => {
    // let object formValue ra xử lí riêng
    let newFormValue = this.state.formValue;
    newFormValue[e.target.name] = e.target.value;
    // Xử lí lỗi
    let newFormError = this.state.formError;
    let message = "";

    let dataType = e.target.getAttribute("data-type");
    let dataMaxLength = e.target.getAttribute("data-max-length");
    let dataMinLength = e.target.getAttribute("data-min-length");

    if (e.target.value.trim() === "")
      message = e.target.name + " can not be empty";
    else {
      if (dataType === "number") {
        let regexNumber = /^d{0,8}(.d{1,4})?$/;
        if (!regexNumber.test(e.target.value)) {
          message = e.target.name + " must be a number";
        }
      }
      if (dataType === "text") {
        let regexNumber = /^d{0,8}(.d{1,4})?$/;
        if (regexNumber.test(e.target.value)) {
          message = e.target.name + " must be a string";
        }
      }
      if (e.target.value.length > dataMaxLength)
        message = e.target.name + ` from ${dataMinLength} to ${dataMaxLength} `;
    }

    newFormError[e.target.name] = message;
    console.log(newFormValue);
    this.setState(
      {
        formValue: newFormValue,
        //formError: newFormError,
      }, // Gọi hàm check lỗi mỗi lần cập nhật value và error từ người dùng
      () =>
        this.setState({
          valid: this.checkFormValid(),
        })
    );
    // Trên 1 thẻ HTML sẽ có type dạng thuộc tính
    // properties: có sẵn của thẻ: id, className, value, style
    // attributes: thuộc tính mở rộng, do mình thêm vào --> không thể dùng dom get thuộc tính được
    // phải dùng getAttribute;
  };
  handleUpdateProduct = () => {
    let { arrayProduct, formValue } = this.state;
    let proUpdate = arrayProduct.find((pro) => pro.id === formValue.id);
    if (proUpdate) {
      for (let key in proUpdate) {
        if (key !== "id") proUpdate[key] = formValue[key];
      }
    }
    // Cập nhật lại
    this.setState({ arrayProduct: arrayProduct });
  };

  // Chỉnh sửa và xóa
  handleEditSinhVien = (productClick) => {
    // CLick vào product nào thì state của formValue sẽ thay đổi
    this.setState({ formValue: productClick }, () => {
      this.setState({ valid: this.checkFormValid() });
    });
  };
  handleDelSinhVien = (idClick) => {
    // Lấy ra các sản phẩm có mã khác spClick
    let arraySinhVien = this.state.arraySinhVien.filter(
      (item) => item.maSV !== idClick
    );
    // cập nhật lại state
    this.setState({ arraySinhVien: arraySinhVien });
  };

  render() {
    let { formValue } = this.state;
    return (
      <React.Fragment>
        <form className="container" onSubmit={this.handleSubmit}>
          <div className="card">
            <h3 className="card-header bg-dark text-white">
              Thông tin sinh viên
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="form-group mt-2">
                    <p>Mã SV</p>
                    <input
                      value={formValue.maSV}
                      data-type="text"
                      data-max-length={10}
                      data-min-length={1}
                      type="text"
                      className="form-control"
                      name="maSV"
                      onInput={this.handleChangeInput}
                    />
                    {this.state.formError.maSV && (
                      <div className="alert alert-danger mt-2">
                        {this.state.formError.maSV}
                      </div>
                    )}
                  </div>
                  <div className="form-group mt-2">
                    <p>Số điện thoại</p>
                    <input
                      value={formValue.soDienThoai}
                      data-max-length={10}
                      data-min-length={10}
                      data-type="text"
                      type="text"
                      className="form-control"
                      name="soDienThoai"
                      onInput={this.handleChangeInput}
                    />
                    {this.state.formError.soDienThoai && (
                      <div className="alert alert-danger mt-2">
                        {this.state.formError.soDienThoai}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group mt-2">
                    <p>Họ Tên</p>
                    <input
                      value={formValue.hoTen}
                      data-type="text"
                      data-max-length={30}
                      data-min-length={1}
                      type="text"
                      className="form-control"
                      name="hoTen"
                      onInput={this.handleChangeInput}
                    />
                    {this.state.formError.hoTen && (
                      <div className="alert alert-danger mt-2">
                        {this.state.formError.hoTen}
                      </div>
                    )}
                  </div>

                  <div className="form-group mt-2">
                    <p>Email</p>
                    <input
                      value={formValue.email}
                      data-type="email"
                      data-max-length={50}
                      data-min-length={10}
                      type="email"
                      className="form-control"
                      name="email"
                      onInput={this.handleChangeInput}
                    />
                    {this.state.formError.email && (
                      <div className="alert alert-danger mt-2">
                        {this.state.formError.email}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button
                type="submit"
                className="btn btn-success m-2"
                disabled={!this.state.valid}
              >
                Thêm sinh viên
              </button>
              <button
                type="button"
                className="btn btn-primary m-2"
                disabled={!this.state.valid}
              >
                Lưu
              </button>
            </div>
          </div>
        </form>
        <div className="container mt-2">
          <TableUser
            arraySinhVien={this.state.arraySinhVien}
            handleEditSinhVien={this.handleEditSinhVien}
            handleDelSinhVien={this.handleDelSinhVien}
          />
        </div>
      </React.Fragment>
    );
  }

  // componentDidMount() {
  //   // Gọi API sau khi render thực thi xong (tại sao lại gọi didmount vì didmount chỉ chạy 1 lần duy nhất sau khi render)
  //   let promise = axios({
  //     url: "https://svcy.myclass.vn/api/Product/GetAll",
  //     method: "GET",
  //   });
  //   promise
  //     .then((res) =>
  //       this.setState(
  //         {
  //           arrayProduct: res.data,
  //         },
  //         () => console.log("API", res.data)
  //       )
  //     )
  //     .catch((err) => console.log(err));
  // }
}
