import { createSlice } from "@reduxjs/toolkit";
import asyncAction from "./asyncActions";

const initialState = {
  jobs: [],
  loading: false,
  error: false,
};

export const counterSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    ...asyncAction,
  },
});

export const { getJobsRequest, getJobsSuccess, getJobsFailure, deleteDashboardJobRequest } =
  counterSlice.actions;

export default counterSlice.reducer;
