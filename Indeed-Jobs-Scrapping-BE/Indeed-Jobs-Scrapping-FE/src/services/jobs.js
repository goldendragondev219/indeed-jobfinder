import axios from "axios";
import { USERS_BASE_URL } from "../constants/config";

const request = axios.create({ baseURL: USERS_BASE_URL });
export const getJobs = ({ page, pageSize }) => {
  return new Promise((resolve, reject) => {
    request
      .get(`/api/jobs/getAll?page=${page}&pageSize=${pageSize}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getJobsLeads = ({ page, pageSize }) => {  
  return new Promise((resolve, reject) => {
    request
      .get(`/api/jobs/getAllJobsLeads?page=${page}&pageSize=${pageSize}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addJob = (job) => {
  return new Promise((resolve, reject) => {
    request
      .post("/api/jobs/addJob",job)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteJob = (id) => {
  return new Promise((resolve, reject) => {
    request
      .delete(`/api/jobs/deleteJob/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteDashboardJob = (id) => {
  return new Promise((resolve, reject) => {
    request
      .delete(`/api/jobs/deleteDashboardJob/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const saveKeywords = (keywords) => {
  return new Promise((resolve, reject) => {
    request
      .post("/api/jobs/saveJSONData",keywords)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const getKeywords = () => {
  return new Promise((resolve, reject) => {
    request
      .get("/api/jobs/getJSONData")
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}