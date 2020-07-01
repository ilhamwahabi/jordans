import axios from "axios";
import { IJobFilter } from "./interfaces";

const BASE_URL = "https://github-jobs-middleman.now.sh";

const JobsAPI = axios.create({
  baseURL: BASE_URL,
});

export const getJobs = (filter: IJobFilter) => {
  return JobsAPI.get("/jobs", { params: filter });
};

export const getJob = (id: string) => {
  return JobsAPI.get(`/jobs/${id}`);
};
