import { createSlice } from "@reduxjs/toolkit";
import asyncAction from "./asyncActions";

const initialState = {
  jobsLeads: [],
  loading: false,
  error: false,
};

export const jobsLeadsSlice = createSlice({
  name: "jobsLeads",
  initialState,
  reducers: {
    ...asyncAction,
  },
});

export const { getJobsRequest, getJobsSuccess, getJobsFailure,deleteJobRequest } =
jobsLeadsSlice.actions;

export default jobsLeadsSlice.reducer;
