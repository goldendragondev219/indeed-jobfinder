const asyncAction = {
  getJobsRequest: (state, action) => {
    return {
      ...state,
      loading: true,
      error: false,
    };
  },
  getJobsSuccess: (state, action) => {
    return {
      ...state,
      jobs: action.payload,
      loading: false,
      error: false,
    };
  },
  getJobsFailure: (state, action) => {
    return {
      ...state,
      loading: false,
      error: true,
    };
  },
};
export default asyncAction;
