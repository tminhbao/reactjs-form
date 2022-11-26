import React, { Component } from "react";
import TableUser from "../TableUser/TableUser";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import TablerSearchUser from "../TableSearchUser/TableSearchUser";

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
        hoTen: "Tăng Duy Tân",
        soDienThoai: "0123456789",
        email: "duytan@gmail.com",
      },
      {
        maSV: "2",
        hoTen: "Bùi Lan Hương",
        soDienThoai: "0123478922",
        email: "blhuong@gmail.com",
      },
      {
        maSV: "3",
        hoTen: "Doãn Hiếu",
        soDienThoai: "0123427922",
        email: "doanhieu@gmail.com",
      },
      {
        maSV: "4",
        hoTen: "Trung Quân Idol",
        soDienThoai: "0123478922",
        email: "trungqun@gmail.com",
      },
    ],
    arraySinhVienSearch: [],
  };
  checkFormValid = () => {
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

    // Kiểm tra rỗng
    if (e.target.value.trim() === "")
      message = e.target.name + " can not be empty";
    // Kiểu tra kiểu dữ liệu
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
    }
    // Kiểm tra độ dài cho phép
    if (e.target.value.length > dataMaxLength)
      message = e.target.name + ` from ${dataMinLength} to ${dataMaxLength} `;

    newFormError[e.target.name] = message;
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
  handleUpdateSinhVien = () => {
    let { arraySinhVien, formValue } = this.state;
    let sinhVienUpdate = arraySinhVien.find(
      (pro) => pro.maSV === formValue.maSV
    );
    if (sinhVienUpdate) {
      for (let key in sinhVienUpdate) {
        if (key !== "maSV") sinhVienUpdate[key] = formValue[key];
      }
    }
    // Cập nhật lại
    this.setState({ arraySinhVien: arraySinhVien });
  };
  // Chỉnh sửa và xóa
  handleEditSinhVien = (sinhVienClick) => {
    // CLick vào product nào thì state của formValue sẽ thay đổi
    this.setState({ formValue: sinhVienClick }, () => {
      this.setState({ valid: this.checkFormValid() });
    });
  };
  handleDelSinhVien = (idClick) => {
    // Lấy ra các sản phẩm có mã khác spClick
    let arraySinhVien = this.state.arraySinhVien.filter(
      (item) => item.maSV !== idClick
    );
    // cập nhật lại state
    this.setState({
      arraySinhVien: arraySinhVien,
      arraySinhVienSearch: arraySinhVien,
    });
  };
  handleSave = () => {
    this.setState({
      formValue: { maSV: "", hoTen: "", soDienThoai: "", email: "" },
    });
  };
  removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    str = str.toLowerCase();
    return str;
  };
  handleSearchSinhVien = (e) => {
    let txtInput = e.target.value;
    txtInput = txtInput.trim().toLowerCase();
    txtInput = this.removeVietnameseTones(txtInput);
    let arrayKetQua = [];
    // Duyệt
    for (let i = 0; i < this.state.arraySinhVien.length; i++) {
      let tenSinhVien = this.state.arraySinhVien[i].hoTen;
      tenSinhVien = this.removeVietnameseTones(tenSinhVien);
      if (tenSinhVien.includes(txtInput)) {
        arrayKetQua.push(this.state.arraySinhVien[i]);
      }
    }
    this.setState({ arraySinhVienSearch: arrayKetQua });
  };
  // static getDerivedStateFromProps(newProps, currentState) {
  //   // Xủ lí state trước khi render ra giao diện
  //   // Load từ local storage ra state, binding ra giao diện
  //   let localArraySinhVien = JSON.parse(localStorage.getItem("arraySinhVien"));
  //   let localArraySinhVienSearch = JSON.parse(
  //     localStorage.getItem("arraySinhVienSearch")
  //   );
  //   console.log("newProps", newProps);
  //   console.log("currentState", currentState);
  //   return {
  //     formValue: {
  //       maSV: "",
  //       hoTen: "",
  //       soDienThoai: "",
  //       email: "",
  //     },
  //     formError: {
  //       maSV: "",
  //       hoTen: "",
  //       soDienThoai: "",
  //       email: "",
  //     },
  //     valid: false,
  //     arraySinhVien: localArraySinhVien,
  //     arraySinhVienSearch: localArraySinhVienSearch,
  //   };
  //   if (newProps !== currentState) {
  //     //   //Change in props
  //     //   return{
  //     //       name: props.name
  //     //   };
  //   }
  // }

  componentDidMount() {
    let localArraySinhVien = JSON.parse(localStorage.getItem("arraySinhVien"));
    let localArraySinhVienSearch = JSON.parse(
      localStorage.getItem("arraySinhVienSearch")
    );
    console.log(localArraySinhVien);
    console.log(localArraySinhVienSearch);
    this.setState({
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
      arraySinhVien: localArraySinhVien,
      arraySinhVienSearch: localArraySinhVienSearch,
    });
  }

  render() {
    let { formValue, arraySinhVienSearch, arraySinhVien } = this.state;
    console.log("arraySinhVien", arraySinhVien);
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
                onClick={this.handleUpdateSinhVien}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </form>
        <div className="container mt-3">
          <h3
            className="bg-dark text-white p-3"
            style={{
              borderRadius: "5px",
            }}
          >
            Tìm kiếm
          </h3>
          <SearchBar
            handleSearchSinhVien={this.handleSearchSinhVien}
            handleGetInput={this.handleGetInput}
          />
        </div>

        {arraySinhVienSearch.length > 0 ? (
          <div className="container mt-2">
            <TablerSearchUser
              arraySinhVienSearch={this.state.arraySinhVienSearch}
              handleEditSinhVien={this.handleEditSinhVien}
              handleDelSinhVien={this.handleDelSinhVien}
            />
          </div>
        ) : (
          <div className="container mt-2">
            <TableUser
              arraySinhVien={this.state.arraySinhVien}
              handleEditSinhVien={this.handleEditSinhVien}
              handleDelSinhVien={this.handleDelSinhVien}
            />
          </div>
        )}
      </React.Fragment>
    );
  }

  componentWillUnmount() {
    localStorage.setItem(
      "arraySinhVien",
      JSON.stringify(this.state.arraySinhVien)
    );
    localStorage.setItem(
      "arraySinhVienSearch",
      JSON.stringify(this.state.arraySinhVienSearch)
    );
  }
}
