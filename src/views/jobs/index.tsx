import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Job } from "../../interfaces";
import { SAMPLE_JOBS } from "../../dummy";

function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    setJobs(SAMPLE_JOBS);
  }, []);

  const actionSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Container>
      <header>
        <h1>Github Jobs</h1>
        <SearchForm onSubmit={actionSubmitSearch}>
          <input type="text" id="description" placeholder="Description" />
          <input type="text" id="location" placeholder="Location" />
          <label htmlFor="isFulltime">
            <input type="checkbox" id="isFulltime" />
            Fulltime
          </label>
          <button>SEARCH</button>
        </SearchForm>
      </header>
      <main>
        <h2>All Jobs</h2>
        {jobs.map((job) => (
          <JobItem key={job.id}>
            <h3>
              {job.title} <span>{job.type}</span>
            </h3>
            <p>
              {job.company}, {job.location}
            </p>
            <div className="buttonGroup">
              <Link className="detail" key={job.id} to={`/jobs/${job.id}`}>
                DETAIL
              </Link>
              <a className="apply" href={job.how_to_apply}>
                APPLY
              </a>
            </div>
          </JobItem>
        ))}
      </main>
      <footer></footer>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;

  h1 {
    margin-top: 0;
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 1rem;
  }

  input[type="text"] {
    border: none;
    border-bottom: 1px solid #0b3954;
    outline: none;
    font-size: 1rem;
    padding-bottom: 0.5rem;
  }

  button {
    border: none;
    background-color: #0b3954;
    color: #f7f9f9;
    padding: 0.75rem 1.25rem;
    border-radius: 0.25rem;
    width: 100%;
  }
`;

const JobItem = styled.div`
  h3 {
    line-height: 1.5;

    span {
      margin-left: 0.125rem;
      font-size: 0.875rem;
      color: #f7f9f9;
      padding: 0.25rem 0.375rem;
      border-radius: 0.25rem;
      background-color: #129490;
    }
  }

  .buttonGroup {
    display: flex;
    justify-content: space-between;
  }

  .detail {
    display: block;
    border: 2.5px solid #0b3954;
    color: #0b3954;
    font-weight: bolder;
    padding: 0.75rem 1.25rem;
    border-radius: 0.25rem;
    width: 40%;
    box-sizing: border-box;
    text-decoration: none;
    text-align: center;
  }

  .apply {
    display: block;
    border: none;
    background-color: #0b3954;
    color: #f7f9f9;
    padding: 0.75rem 1.25rem;
    border-radius: 0.25rem;
    width: 40%;
    box-sizing: border-box;
    text-decoration: none;
    text-align: center;
  }
`;

export default Jobs;
