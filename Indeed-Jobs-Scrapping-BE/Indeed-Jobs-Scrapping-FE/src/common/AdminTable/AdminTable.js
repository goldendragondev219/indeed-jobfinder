import React from "react";
import "./AdminTable.scss";
import { Table } from "antd";

function AdminTable({ tableColumn, tableData }) {
  return (
    <div className="admin-table-container">
      <Table
        columns={tableColumn}
        dataSource={tableData}
        pagination={{
          pageSize: 5,
        }}
      />
    </div>
  );
}

export default AdminTable;
