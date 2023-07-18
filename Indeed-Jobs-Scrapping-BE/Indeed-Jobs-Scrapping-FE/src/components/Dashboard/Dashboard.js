import React, { useState, useEffect, useRef } from "react";
import "./Dashboard.scss";
import { DeleteOutlined, FilterOutlined, LoadingOutlined,SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Table, Spin, Popconfirm,Space,Button,Input } from "antd";
import { getJobsRequest, deleteDashboardJobRequest } from "../../modules/jobs/reducer";
import JobsPagination from "../../common/JobsPagination/JobsPagination";
import { deleteDashboardJob } from '../../services/jobs';
import { message } from 'antd';


function Dashboard() {
  const dispatch = useDispatch();
  const [jobsState,setJobsState] = useState([]);
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (confirm, dataIndex) => {
    confirm();
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters,confirm) => {
    clearFilters();
    confirm();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters,confirm)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: () => (
      <FilterOutlined/>
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span>
          {text}
        </span>
      ) : (
        text
      ),
  });
  const {
    jobs: {
      jobs: { jobs, totalCount, currentPage, totalPages },
      loading,
    },
  } = useSelector((state) => state);
  const [pageNumber, setPageNumber] = useState(1);

  const [messageApi, contextHolder] = message.useMessage();

  const deleteJobHandle = (id) => {
    deleteDashboardJob(id)
    .then(res => {
      messageApi.open({
        type: 'success',
        content: 'Deleted Successfully',
      });
      dispatch(deleteDashboardJobRequest({id}));
    })
    .catch(err => messageApi.open({
        type: 'error',
        content: err,
    }));
  };

  useEffect(() => {
    dispatch(getJobsRequest({ page: pageNumber, pageSize: 10 }));
  }, [pageNumber]);

  useEffect(() => {
    setJobsState(jobs && jobs.map((job) => ({ ...job, key: job.job_id })));
  }, [jobs]);

  const columns = [
    Table.EXPAND_COLUMN,
    {
      title: "Job Id",
      dataIndex: "job_id",
      key: "job_id",
      render: (text,record) => <a href={"//"+record.url} target="_blank" >{text}</a>,
    },
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      ...getColumnSearchProps('keyword'),
    },
    {
      title: "Titles",
      dataIndex: "titles",
      key: "titles",
    },
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Job Type",
      dataIndex: "job_type",
      key: "job_type",
    },
    {
      title: "Post Date",
      dataIndex: "post_date",
      key: "post_date",
    },
    {
      title: "Extract Date",
      dataIndex: "extract_date",
      key: "extract_date",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm title="Sure to delete?" onConfirm={() => deleteJobHandle(record.job_id)}>
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

  return (
    <div className="dasboard-wrapper">
      {contextHolder}
      {loading ? (
        <Spin
          indicator={antIcon}
          style={{ margin: "100px", padding: "100px" }}
        />
      ) : (
        <>
          <Table columns={columns} dataSource={jobsState} pagination={false} expandable={{
            expandedRowRender: (record) => (
              <p
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

export default Dashboard;
