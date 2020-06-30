import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

import { Job } from "../../interfaces";
import { SAMPLE_JOBS } from "../../dummy";

function JobsDetail() {
  const { id } = useParams();
  const [job, setJob] = useState<Job>();

  useEffect(() => {
    console.log(id);
    setJob(SAMPLE_JOBS.find((job) => job.id === id));
  }, [id]);

  if (!job) return null;
  return (
    <Container>
      <Link to="/jobs" className="allJobs">
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
      <ApplyButton>APPLY</ApplyButton>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;

  .allJobs {
    display: inline-block;
    text-decoration: none;
    border: none;
    background: #0b3954;
    color: #f7f9f9;
    padding: 0.5rem 0.75rem;
    margin-bottom: 1rem;
    border-radius: 0.25rem;
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

const ApplyButton = styled.a`
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
`;

export default JobsDetail;
