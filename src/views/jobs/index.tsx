import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

import { Job } from "../../interfaces";

function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const getAllJobs = async () => {
      const { data } = await axios.get("https://jobbery-api.iwgx.now.sh/jobs");
      setJobs(data);
    };

    getAllJobs();
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
              <a href={job.company_url || ""} className="companyURL">
                {job.company}
              </a>{" "}
              - {job.location}
            </p>
            <Link className="detail" key={job.id} to={`/jobs/${job.id}`}>
              DETAIL
            </Link>
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
    cursor: pointer;
  }
`;

const JobItem = styled.div`
  margin-bottom: 2rem;

  h3 {
    line-height: 1.5;
    margin: 0.5rem 0;

    span {
      margin-left: 0.125rem;
      font-size: 0.875rem;
      color: #f7f9f9;
      padding: 0.25rem 0.375rem;
      border-radius: 0.25rem;
      background-color: #129490;
      white-space: nowrap;
    }
  }

  p {
    margin: 1rem 0;
  }

  .companyURL {
    text-decoration: none;
    color: inherit;
    padding-bottom: 0.125rem;
    border-bottom: 1px solid black;
  }

  .detail {
    display: block;
    border: 2.5px solid #0b3954;
    color: #0b3954;
    font-weight: bolder;
    padding: 0.75rem 1.25rem;
    border-radius: 0.25rem;
    width: 100%;
    box-sizing: border-box;
    text-decoration: none;
    text-align: center;
  }
`;

export default Jobs;
