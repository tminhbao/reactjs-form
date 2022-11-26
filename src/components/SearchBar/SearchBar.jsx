import React, { Component } from "react";

export default class SearchBar extends Component {
  render() {
    let { handleSearchSinhVien, handleGetInput } = this.props;
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập tên sinh viên"
          aria-label="Nhập tên sinh viên"
          aria-describedby="basic-addon2"
          id="txtInput"
          onChange={(e) => handleSearchSinhVien(e)}
        />
        {/* <div className="input-group-append">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => handleSearchSinhVien()}
          >
            Button
          </button>
        </div> */}
      </div>
    );
  }
}
