import React, { useState } from "react";
import "./VodForm.scss";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Checkbox,
  Select,
  Spin,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addVodsRequest } from "../../modules/Vods/reducer";

function VodForm() {
  const { Title } = Typography;
  const { Option } = Select;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.vods);
  const [series, setSeries] = useState(true);
  const [cImgWide, setCImgWide] = useState({});
  const [cvrImg, setCvrImg] = useState({});
  const [video, setVideo] = useState({});
  const [coverImageWideName, setCoverImageWideName] = useState();
  const [coverImageName, setCoverImageName] = useState();
  const [videoName, setVideoName] = useState();
  const [videoFileSize, setVideoFileSize] = useState();
  const [saveBtnStatus, setSaveBtnStatus] = useState(false);
  const formData = new FormData();

  const onFinish = (values) => {
    values["ciWideScreen"] = cImgWide;
    values["coverImage"] = cvrImg;
    values["video"] = video;

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    dispatch(addVodsRequest(formData));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleSeriesCheck = ({ target: { checked } }) => {
    setSeries(!checked);
  };

  const onUpload1 = ({ target }) => {
    setCoverImageWideName(target.files[0].name);
    setCImgWide(target.files[0]);
  };

  const onUpload2 = ({ target }) => {
    setCoverImageName(target.files[0].name);
    setCvrImg(target.files[0]);
  };
  // convert bytes to different sizes
  function bytesToSize(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]})`;
    return `${(bytes / 1024 ** i).toFixed(1)}`;
  }
  const onUploadVideo = ({ target }) => {
    setVideoName(target.files[0].name);
    const fileinmb = bytesToSize(target.files[0].size);
    if (fileinmb >= 250) {
      setVideoFileSize("Max file size exceeded. Allowed: 250MB");
      setSaveBtnStatus(true);
    } else {
      setVideoFileSize();
      setSaveBtnStatus(false);
    }
    setVideo(target.files[0]);
  };

  return (
    <div className="vod-form-wrapper">
      <div className="vod-form-container">
        <Form
          name="VOD"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: "75vw",
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={24}>
            <Col span={10}>
              {" "}
              <Form.Item
                name="title"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Title" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="subtitle"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Subtitle" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={10}>
              <Form.Item
                name="activeStatus"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="Active Status" allowClear>
                  <Option value="No">No</Option>
                  <Option value="Yes">Yes</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="rating"
                rules={[
                  {
                    min: 1,
                  },
                ]}
              >
                <Input placeholder="Maturity Rating:" type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={10}>
              {" "}
              <Form.Item
                name="category"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="Category" allowClear>
                  <Option value="6th PTV Awards">6th PTV Awards</Option>
                  <Option value="Aahat">Aahat</Option>
                  <Option value="Al Quran">Al Quran</Option>
                  <Option value="Alif Noon">Alif Noon</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              {" "}
              <Form.Item
                name="description"
                rules={[
                  {
                    max: 155,
                  },
                ]}
              >
                <Input placeholder="Description" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item
                name="actors"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Actors"
                  allowClear
                  mode="multiple"
                  maxTagCount={2}
                >
                  <Option value="Mahira Khan">Mahira Khan</Option>
                  <Option value="Fawad Khan">Fawad Khan</Option>
                  <Option value="Danish Taimoor">Danish Taimoor</Option>
                  <Option value="Feroz Khan">Feroz Khan</Option>
                  <Option value="Zara Noor">Zara Noor</Option>
                  <Option value="Atif Aslam">Atif Aslam</Option>
                  <Option value="Asim Azhar">Asim Azhar</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="directors"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Directors"
                  allowClear
                  mode="multiple"
                  maxTagCount={2}
                >
                  <Option value="Alia Imam">Alia Imam</Option>
                  <Option value="Faheem Azam">Faheem Azam</Option>
                  <Option value="Farukh Bashir">Farukh Bashir</Option>
                  <Option value="Ijaz Balouch">Ijaz Balouch</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item
                name="genre"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="Genre" allowClear>
                  <Option value="action">Action</Option>
                  <Option value="adventure">Adventure</Option>
                  <Option value="comedy">Comedy</Option>
                  <Option value="documentary">Documentary</Option>
                  <Option value="Drama Serials">Drama Serials</Option>
                  <Option value="sciFi">Sci-Fi</Option>
                  <Option value="Shows">Shows</Option>
                  <Option value="Religious">Religious</Option>
                  <Option value="Most Watched">Most Watched</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="country">
                <Select placeholder="Origin Country" allowClear>
                  <Option value="pakistan">Pakistan</Option>
                  <Option value="india">India</Option>
                  <Option value="germany">Germany</Option>
                  <Option value="australia">Australia</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} style={{ marginBottom: "2%" }}>
            <Col span={10}>
              <Title level={4} className="upload-btn-labels">
                Cover image widescreen:
              </Title>
              <Form.Item>
                <label className="uploader-area">
                  <span className="file-name">{coverImageWideName}</span>
                  <span className="uploader-btn"> Browse </span>
                  <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    name="imageWide"
                    onChange={onUpload1}
                    style={{ color: "white", display: "none" }}
                  />
                </label>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Title level={4} className="upload-btn-labels">
                Cover image:
              </Title>
              <Form.Item>
                <label className="uploader-area">
                  <span className="file-name">{coverImageName}</span>
                  <span className="uploader-btn"> Browse </span>
                  <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    name="cvrimage"
                    onChange={onUpload2}
                    style={{ color: "white", display: "none" }}
                  />
                </label>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item
                name="releaseDate"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Release Date" type="date" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="nextEpisode">
                <Select placeholder="Next Episode" allowClear>
                  <Option value="ep1">ep-1</Option>
                  <Option value="ep-2">ep-2</Option>
                  <Option value="ep-3">ep-3</Option>
                  <Option value="ep-4">ep-4</Option>
                  <Option value="ep-5">ep-5</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} style={{ marginBottom: "2%" }}>
            <Col span={10}>
              <Title level={4} className="upload-btn-labels">
                Upload Video
              </Title>
              <Form.Item>
                <label className="uploader-area">
                  <span className="file-name">{videoName}</span>
                  <span className="uploader-btn"> Browse </span>
                  <input
                    type="file"
                    accept="video/*,.mkv"
                    id="image-upload"
                    name="video"
                    onChange={onUploadVideo}
                    style={{ color: "white", display: "none" }}
                  />
                </label>
                <span className="video-error">{videoFileSize}</span>
              </Form.Item>
            </Col>
          </Row>
          <Checkbox
            className="checkbox-area"
            onChange={handleSeriesCheck}
            defaultChecked={false}
          >
            Series
          </Checkbox>
          {!series ? (
            <Row gutter={24}>
              <Col span={10}>
                <Form.Item name="season">
                  <Input placeholder="Number of Seasons:" disabled={series} />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item name="totalEpisodes">
                  <Input placeholder="Number of Episodes:" disabled={series} />
                </Form.Item>
              </Col>
            </Row>
          ) : (
            ""
          )}
          <Form.Item
            wrapperCol={{
              offset: 12,
              span: 16,
            }}
            className="loader-form-item"
          >
            <Button
              type="primary"
              htmlType="submit"
              className="save-btn"
              disabled={saveBtnStatus}
            >
              Save
            </Button>
            {loading ? (
              <span className="vod-loader">
                <Spin />;
              </span>
            ) : (
              ""
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default VodForm;
