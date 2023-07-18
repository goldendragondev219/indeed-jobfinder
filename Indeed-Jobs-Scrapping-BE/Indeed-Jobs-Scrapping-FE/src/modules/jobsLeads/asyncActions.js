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
      jobsLeads: action.payload,
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
  deleteJobRequest: (state, action) => {
    const { id } = action.payload;
    state.jobsLeads.jobs = state.jobsLeads.jobs.filter((job) => job.id !== id);
  }
};
export default asyncAction;
