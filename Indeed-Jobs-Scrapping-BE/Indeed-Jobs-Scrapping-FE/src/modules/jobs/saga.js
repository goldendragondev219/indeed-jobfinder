import { takeLatest, call, put } from "redux-saga/effects";
import { message as antMessage } from "antd";
import { getJobs } from "../../services/jobs";
import { getJobsRequest, getJobsSuccess, getJobsFailure } from "./reducer";

export function* handleFetchJobs({ payload }) {
  try {
    const { data } = yield call(getJobs, payload);
    yield put(getJobsSuccess(data));
  } catch (error) {
    console.log("Failed to Fetch JOBS in");
    yield put(getJobsFailure(error));
  }
}

export default function* jobsWatcher() {
  yield takeLatest(getJobsRequest.type, handleFetchJobs);
}
