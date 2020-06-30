import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { Job } from "../../interfaces";
import { ReactComponent as LeftArrow } from "../../leftArrow.svg";

interface IProps {
  jobs: Job[];
  authenticated: boolean;
}

const JobsDetail: React.FC<IProps> = ({ jobs, authenticated }) => {
  const { id } = useParams();
  const history = useHistory();
  const [job, setJob] = useState<Job>();
  const [openApply, setOpenApply] = useState(false);

  const getJob = useCallback(async () => {
    const { data } = await axios.get(
      `https://jobbery-api.iwgx.now.sh/jobs/${id}`
    );
    setJob(data);
  }, [setJob, id]);

  useEffect(() => {
    if (!authenticated) return;

    if (jobs.length === 0) getJob();
    else setJob(jobs.find((item) => item.id === id));
  }, [id, jobs, authenticated, getJob]);

  if (!authenticated) history.push("/");
  if (!job) return null;
  return (
    <Container>
      <Link to="/jobs" className="allJobs">
        <LeftArrow className="arrow" />
        All Jobs
      </Link>
      <h1>{job.title}</h1>
      <span>{job.type}</span>
      <p>
        <a className="companyURL" href={job.company_url || ""}>
          {job.company}
        </a>{" "}
        - {job.location}
      </p>
      <p dangerouslySetInnerHTML={{ __html: job.description }} />
      <ApplyButton onClick={() => setOpenApply(!openApply)}>APPLY</ApplyButton>
      {openApply && (
        <p dangerouslySetInnerHTML={{ __html: job.how_to_apply }} />
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  max-width: 720px;
  margin: 0 auto;

  .allJobs {
    display: flex;
    width: fit-content;
    align-items: center;
    text-decoration: none;
    border: none;
    background: #0b3954;
    color: #f7f9f9;
    padding: 0.5rem 0.75rem;
    margin-bottom: 1rem;
    border-radius: 0.25rem;

    .arrow {
      width: 14px;
      fill: white;
      margin-right: 0.5rem;
    }
  }

  h1 {
    margin-top: 0;
  }

  span {
    font-size: 1rem;
    color: #f7f9f9;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    background-color: #129490;
  }

  .companyURL {
    text-decoration: none;
    color: inherit;
    padding-bottom: 0.125rem;
    border-bottom: 1px solid black;
  }
`;

const ApplyButton = styled.button`
  display: block;
  margin-top: 1.5rem;
  border: none;
  background-color: #0b3954;
  color: #f7f9f9;
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
  width: 100%;
  box-sizing: border-box;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
`;

export default JobsDetail;
