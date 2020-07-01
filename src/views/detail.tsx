import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

import { IJob } from "../interfaces";
import { getJob } from "../service";
import { ReactComponent as LeftArrow } from "../assets/leftArrow.svg";
import { JobDetailSkeletonView } from "../components/SkeletonView";

interface IProps {
  jobs: IJob[];
}

const JobsDetail: React.FC<IProps> = ({ jobs }) => {
  const { id } = useParams();
  const [job, setJob] = useState<IJob>();
  const [openApply, setOpenApply] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    setLoading(true);
    const { data } = await getJob(id);
    setLoading(false);

    setJob(data);
  }, [setJob, id]);

  useEffect(() => {
    if (jobs.length === 0) getData();
    else setJob(jobs.find((item) => item.id === id));
  }, [id, jobs, getData]);

  return (
    <Container>
      <Link to="/" className="allJobs">
        <LeftArrow className="arrow" />
        All Jobs
      </Link>
      {loading && <JobDetailSkeletonView />}
      {job && (
        <>
          <h1 className="title">{job.title}</h1>
          <span className="type">{job.type}</span>
          <p className="company">
            <a className="companyURL" href={job.company_url || ""}>
              {job.company}
            </a>
            {" - "}
            {job.location}
          </p>
          <p
            className="description"
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
          <ApplyButton onClick={() => setOpenApply(!openApply)}>
            APPLY
          </ApplyButton>
          {openApply && (
            <p
              className="apply"
              dangerouslySetInnerHTML={{ __html: job.how_to_apply }}
            />
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem 2rem 5rem;
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
    margin-bottom: 3rem;
    border-radius: 0.25rem;

    .arrow {
      width: 14px;
      fill: white;
      margin-right: 0.5rem;
    }
  }

  .title {
    margin-top: 0;
  }

  .type {
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
