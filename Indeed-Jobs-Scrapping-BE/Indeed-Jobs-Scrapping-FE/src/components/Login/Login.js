import React from "react";
import "./Login.scss";
import { message as antMessage } from "antd";
import { useNavigate } from "react-router-dom";
import { loginCredentials } from "../../common";
import { Form, Button, Checkbox, Typography } from "antd";
import { EyeFilled, EyeInvisibleFilled, KeyOutlined, MailFilled } from "@ant-design/icons";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const matchCredentials = ({ email, password }) => {
    return loginCredentials.filter(
      (cred) => cred.email === email && cred.password === password
    );
  };

  const onFinish = (values) => {
    if (matchCredentials(values).length > 0) {
      sessionStorage.setItem("login", true);
      sessionStorage.setItem("role", "admin");
      navigate("/dashboard");
    } else {
      antMessage.error("Incorrect Email or Password", 2);
    }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  const showLoginPass = () => {
    // console.log("In it");
    setShowPassword(true);
  };
  const hideLoginPass = () => {
    // console.log("false krdo");
    setShowPassword(false);
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login-page-container">
          <div className="hivesys-logo">
            {/* <img src="/images/login-Logo.png" alt="Login Logo" /> */}
            <Title level={1} className="logo-title">
              Job Finder
            </Title>
          </div>
          <div className="login-form-container">
            <div className="container-padding">
              <Title level={2} className="login-form-title">
                Find Your Dream<span>Job</span>
              </Title>
              <div className="hivesys-login-form">
                <div className="main_div">
                  <div className="box">
                    <Form
                      name="login-form"
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                    >
                      <Form.Item name="email" className="input-field-item">
                        <div className="inputBox">
                          <span className="prefix-icon">
                            <MailFilled/>
                          </span>
                          <input
                            type="text"
                            name="email"
                            autoComplete="off"
                            required
                          />
                          <label>Email</label>
                        </div>
                      </Form.Item>
                      <Form.Item name="password" className="input-field-item">
                        <div className="inputBox">
                          <span className="prefix-icon">
                            <KeyOutlined/>
                          </span>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            autoComplete="off"
                            required
                          />
                          <label>Password</label>
                          <span className="suffix-icon">
                            {showPassword ? (
                              <EyeFilled
                                className="password-icon-style"
                                onClick={hideLoginPass}
                              />
                            ) : (
                              <EyeInvisibleFilled
                                className="password-icon-style"
                                onClick={showLoginPass}
                              />
                            )}
                          </span>
                        </div>
                      </Form.Item>
                      <Form.Item name="remember" valuePropName="checked">
                        <Checkbox className="remember-me">Remember me</Checkbox>
                      </Form.Item>
                      <Form.Item className="login-btn-item">
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                        >
                          Login
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className="version-container">
          {/* <h6>Version 1.0.1</h6> */}
        </span>
      </div>
    </>
  );
};

export default Login;
