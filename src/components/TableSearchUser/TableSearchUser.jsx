import React, { Component } from "react";

export default class TablerSearchUser extends Component {
  render() {
    let { arraySinhVienSearch, handleEditSinhVien, handleDelSinhVien } =
      this.props;
    return (
      <table className="table">
        <thead className="bg-dark text-white">
          <tr>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {arraySinhVienSearch.map((sinhvien, index) => {
            return (
              <tr key={index}>
                <td>{sinhvien.maSV}</td>
                <td>{sinhvien.hoTen}</td>
                <td>{sinhvien.soDienThoai}</td>
                <td>{sinhvien.email}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelSinhVien(sinhvien.maSV)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => handleEditSinhVien(sinhvien)}
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
