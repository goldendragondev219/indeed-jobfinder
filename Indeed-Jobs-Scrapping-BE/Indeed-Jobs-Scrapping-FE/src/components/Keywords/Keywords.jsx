import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Table, Input } from "antd";
import { getKeywords, saveKeywords } from "../../services/jobs";
import { message } from 'antd';
import { Select, Space } from 'antd';


const Keywords = () => {
  const [visible, setVisible] = useState(false);
  const [editedData, setEditedData] = useState([]);
  const [messageApi,contextHolder] = message.useMessage();
  const options = [];
  options.length = 3;
  const [keywords, setKeywords] = useState([]);


  const handleChange = (value) => {
    if(value.length < 16){
      setKeywords(value);
    }else{
      messageApi.error("Keywords limit(15) exceeds");
    }
  }

  const handleSave = () => {
    try{
      var data = JSON.parse(JSON.stringify({keywords}));
      saveKeywords(data).then((res) => {
        messageApi.success("Keywords saved successfully");
        setVisible(false);
      }).catch((err) => {
        messageApi.error("Keywords could not be saved");
      });  
    }catch(err){
      messageApi.error("Invalid JSON");
    }
  };

  useEffect(() => {
    getKeywords().then((res) => {
      setKeywords(res.data.keywords);
    });
  },[visible]);

  return (
    <>
      <a onClick={() => setVisible(true)}>Update Keywords</a>
      {contextHolder}
      <Modal
        title="Keywords Editor"
        open={visible}
        onOk={handleSave}
        onCancel={() => setVisible(false)}
      >
        <Select
          mode="tags"
          placeholder="Please select"
          dropdownStyle={{ display: 'none' }}
          onChange={handleChange}
          style={{
            width: '100%',
          }}
          value={keywords}
        />

        {/* <TextArea rows={10} defaultValue={editedData} onChange={(e)=>setEditedData(e.target.value)}/> */}
      </Modal>
    </>
  );
};

export default Keywords;
