import { combineReducers } from "@reduxjs/toolkit";
import jobsReducer from "./jobs/reducer";
import jobsLeadsReducer from "./jobsLeads/reducer";

const rootReducer = combineReducers({
  jobs: jobsReducer,
  jobsLeads:jobsLeadsReducer
});
export default rootReducer;
