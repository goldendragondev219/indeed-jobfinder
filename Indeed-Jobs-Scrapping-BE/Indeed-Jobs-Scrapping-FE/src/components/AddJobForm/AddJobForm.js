import { Button, Checkbox, Form, Input,Select, Spin } from 'antd';
import { message } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { addJob } from '../../services/jobs';

import "./addJobForm.scss";
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const AddJobForm = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading,setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        await addJob(values)
            .then(res => {
                messageApi.open({
                    type: 'success',
                    content: 'Added Successfully',
                });
            })
            .catch(err => messageApi.open({
                type: 'error',
                content: err,
            }));
        setLoading(false);
    };
    const onFinishFailed = (errorInfo) => {
        messageApi.open({
            type: 'error',
            content: 'Something went wrong',
        });    
    };
    
    return(
    <div className='form-wrapper'>
        {contextHolder}
        <h1>Add Job</h1>
        <Form
            loa
            className='form-container'
            name="addJob"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Spin spinning={loading} size='large' indicator={<LoadingOutlined/>}>
                <Form.Item
                    label="Company"
                    name="company"
                    rules={[
                        {
                        required: true,
                        message: 'Please enter Company name!',
                        },
                    ]}
                >
                    <Input size='large' placeholder='Company' />
                </Form.Item>
                <Form.Item
                    label="Job Title"
                    name="job_title"
                    rules={[
                        {
                        required: true,
                        message: 'Please enter job title!',
                        },
                    ]}
                >
                    <Input  size='large' placeholder='Job Title'/>
                </Form.Item>
                <Form.Item
                    label="Skill"
                    name="skill"
                    rules={[
                        {
                        required: true,
                        message: 'Please enter skill!',
                        },
                    ]}
                >
                    <Input  size='large' placeholder='Skill'/>
                </Form.Item>
                <Form.Item
                    label="Industries"
                    name="industries"
                >
                    <Input  size='large' placeholder='Industries' />
                </Form.Item>
                <Form.Item label="Vacancy" name="vacancy"
                    rules={[
                        {
                        required: true,
                        message: 'Select Vacancy!',
                        },
                    ]}
                >
                    <Select  size='large' placeholder="Select Vacancy type">
                        <Select.Option  value="permanent">Permanent</Select.Option>
                        <Select.Option value="contract">Contract</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Lead Type" name="lead_type"
                    rules={[
                        {
                        required: true,
                        message: 'Please Select Lead Type!',
                        },
                    ]}
                >
                    <Select  size='large'placeholder="Select Lead type">
                        <Select.Option value="lead">Lead</Select.Option>
                        <Select.Option value="project">Project</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Lead Source"
                    name="lead_source"
                >
                    <Input size='large' />
                </Form.Item>
                <Form.Item label="Status" name="status">
                    <Select size='large' defaultValue={"active"}>
                        <Select.Option value="hot">Hot</Select.Option>
                        <Select.Option value="active">Active</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <TextArea  size='large' />
                </Form.Item>

                <Form.Item
                >
                    <Button type="primary" size='large' disabled={loading}  htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Spin>
        </Form>
    </div>
);}
export default AddJobForm;