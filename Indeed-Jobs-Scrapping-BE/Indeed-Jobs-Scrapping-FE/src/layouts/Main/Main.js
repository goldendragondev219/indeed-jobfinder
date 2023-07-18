import React, { useEffect, useState } from "react";
import "./Main.scss";
import { Button, Divider, Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { MenuOutlined, PlusOutlined } from "@ant-design/icons";
import Keywords from "../../components/Keywords/Keywords";

const { Header, Content } = Layout;

const Main = (props) => {
  const navigate = useNavigate();
  const { children } = props;
  const role = sessionStorage.getItem("role");
  const [isSmallScreen,setIsSmallScreen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <Layout className="main-layout-wrapper">
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            height: 60,
          }}
        >
          <nav className="navbar">
          <div className="menu-container">
            <span className="logo-container">
              {/* <img src="/images/main-logo-hs.png" alt="app-logo" /> */}
            </span>
            <div className="navbar-container">
              <div className="menu-icon" onClick={handleShowNavbar}>
                <MenuOutlined style={{color:"white"}}/>
              </div>
              <div className={`nav-elements  ${showNavbar && 'active'}`}>
                <ul>
                  <li>
                    <Link to="/dashboard">Jobs Dashboard</Link>
                  </li>
                  <Divider/>
                  <li>
                    <Link to="/jobsLeads">Jobs Leads</Link>
                  </li>
                  <Divider/>
                  <li>
                    <Link to="/addJob"><PlusOutlined/> Add Job</Link>
                  </li>
                  <li>
                    <Keywords/>
                  </li>

                </ul>
              </div>
            </div>
            <div className="logout-menu">
                <Button type="primary"
                  className=" logout-btn"
                  onClick={() => {
                    sessionStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </Button>
            </div>
          </div>
          </nav>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            background: "#1e1e1e",
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Main;
