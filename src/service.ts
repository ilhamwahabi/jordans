import axios from "axios";
import { IJobFilter, IJob } from "./interfaces";

const BASE_URL = "https://github-jobs-middleman.now.sh";

const JobsAPI = axios.create({
  baseURL: BASE_URL,
});

export const getJobs = async (filter: IJobFilter) => {
  return JobsAPI.get<IJob[]>("/jobs", { params: filter }).then(
    (res) => res.data
  );
};

export const getJob = (id: string) => {
  return JobsAPI.get<IJob>(`/jobs/${id}`).then((res) => res.data);
};
