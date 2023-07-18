import { all, fork } from "redux-saga/effects";
import jobsWatcher from "./jobs/saga";
import jobsLeadsWatcher from "./jobsLeads/saga";

export default function* sagawatcher() {
  yield all([fork(jobsWatcher),fork(jobsLeadsWatcher)]);
}
