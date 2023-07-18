import React, { useState, useEffect } from "react";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Table, Spin, Popconfirm } from "antd";
import { getJobsRequest,deleteJobRequest} from "../../modules/jobsLeads/reducer";
import { deleteJob } from '../../services/jobs';
import JobsPagination from "../../common/JobsPagination/JobsPagination";
import { message } from 'antd';

import "./jobsLeads.scss";

function JobsLeads() {
  const [messageApi, contextHolder] = message.useMessage();
  const [jobsState,setJobsState] = useState([]);

  const dispatch = useDispatch();
  const {
    jobsLeads: {
      jobsLeads: { jobs, totalCount, currentPage, totalPages },
      loading,
    },
  } = useSelector((state) => state);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(getJobsRequest({ page: pageNumber, pageSize: 10 }));
  }, [pageNumber]);

  const deleteHandle = (id) => {
    deleteJob(id)
    .then(res => {
      messageApi.open({
        type: 'success',
        content: 'Deleted Successfully',
      });
      dispatch(deleteJobRequest({id}));
    })
    .catch(err => messageApi.open({
        type: 'error',
        content: err,
    }));
  };

  useEffect(() => {
    setJobsState(jobs && jobs.map((job) => ({ ...job, key: job.id })));
  }, [jobs]);


  const columns = [
    Table.EXPAND_COLUMN,
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Title",
      dataIndex: "job_title",
      key: "job_title",
    },
    {
      title: "Skill",
      dataIndex: "skill",
      key: "skill",
    },
    {
      title: "Industries",
      dataIndex: "industries",
      key: "industries",
    },
    {
      title: "Vacancy",
      dataIndex: "vacancy",
      key: "vacancy",
    },
    {
      title: "Lead Type",
      dataIndex: "lead_type",
      key: "lead_type",
    },
    {
      title: "Lead Source",
      dataIndex: "lead_source",
      key: "lead_source",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm title="Sure to delete?" onConfirm={() => deleteHandle(record.id)}>
          <span>
            <DeleteOutlined/>
          </span>
        </Popconfirm>
      ),
    }
  ];

  const antIcon = (
    <LoadingOutlined
      style={{
        color: "#fcba2d",
        fontSize: 60,
      }}
      spin
    />
  );

  const getRowClassName = (record) => {    
    return record.status === "hot" ? "hot" : "active";
  };

  return (
    <div className="jobs-wrapper">
      {contextHolder}
      {loading ? (
        <Spin
          indicator={antIcon}
          style={{ margin: "100px", padding: "100px" }}
        />
      ) : (
        <>
          <Table columns={columns} dataSource={jobsState} pagination={false} rowClassName={getRowClassName} expandable={{
            expandedRowRender: (record) => (
              <p
                className={getRowClassName(record)}
                style={{
                  margin: 0,
                }}
              >
                {record.description}
              </p>
            ),
          }}/>
          <JobsPagination
            hidePerPageLimit={true}
            defaultPage={currentPage}
            totalData={totalCount}
            setPageNoState={setPageNumber}
          />
        </>
      )}
    </div>
  );
}

export default JobsLeads;
