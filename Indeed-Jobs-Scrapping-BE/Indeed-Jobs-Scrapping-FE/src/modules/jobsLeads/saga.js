import { takeLatest, call, put } from "redux-saga/effects";
import { getJobsLeads } from "../../services/jobs";
import { getJobsRequest, getJobsSuccess, getJobsFailure ,} from "./reducer";

export function* handleFetchJobs({ payload }) {
  try {
    const { data } = yield call(getJobsLeads, payload);
    yield put(getJobsSuccess(data));
  } catch (error) {
    yield put(getJobsFailure(error));
  }
}

export default function* jobsLeadsWatcher() {
  yield takeLatest(getJobsRequest.type, handleFetchJobs);
}
