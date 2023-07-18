import React from "react";
import { Main, Minimal } from "../layouts";
import RouteWithLayout from "./RouteWithLayout";
import {
  Login,
  SignUp,
  Settings,
  Dashboard,
  AccessDenied,
  ForgotPassword,
} from "../components";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddJobForm from "../components/AddJobForm/AddJobForm";
import JobsLeads from "../components/JobsLeads/JobsLeads";

const MainRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <RouteWithLayout path="/login" layout={Minimal} component={Login} />
          }
        />
        <Route
          path="/signUp"
          element={
            <RouteWithLayout
              path="/signUp"
              layout={Minimal}
              component={SignUp}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <RouteWithLayout
              path={"/settings"}
              layout={Main}
              component={Settings}
              protectedRoute={true}
            />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RouteWithLayout
              path={"/forgot-password"}
              layout={Main}
              component={ForgotPassword}
              protectedRoute={true}
            />
          }
        />
        <Route
          path="/access-denied"
          element={
            <RouteWithLayout
              path={"/access-denied"}
              layout={Main}
              component={AccessDenied}
              protectedRoute={true}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <RouteWithLayout
              path={"/dashboard"}
              layout={Main}
              component={Dashboard}
              protectedRoute={true}
            />
          }
        />
        <Route
          path="/jobsLeads"
          element={
            <RouteWithLayout
              path={"/jobsLeads"}
              layout={Main}
              component={JobsLeads}
              protectedRoute={true}
            />
          }
        />
        <Route
          path="/addJob"
          element={
            <RouteWithLayout
              path={"/addJob"}
              layout={Main}
              component={AddJobForm}
              protectedRoute={true}
            />
          }
        />
        {/* <Route
          path="/vod"
          element={
            <RouteWithLayout
              path={"/vod"}
              layout={Main}
              component={Vod}
              protectedRoute={true}
            />
          }
        /> */}
        <Route path="/not-found" element={<h1>Not Found</h1>} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouting;
