import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import { Job } from "../../interfaces";

interface IProps {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  authenticated: boolean;
}

const defaultFilter = {
  description: "",
  location: "",
  full_time: false,
};

const Jobs: React.FC<IProps> = ({ jobs, setJobs, authenticated }) => {
  const history = useHistory();
  const [filter, setFilter] = useState(defaultFilter);

  const getAllJobs = useCallback(
    async (filter) => {
      const { data } = await axios.get("https://jobbery-api.iwgx.now.sh/jobs", {
        params: filter,
      });
      setJobs(data);
    },
    [setJobs]
  );

  useEffect(() => {
    if (!authenticated) return;
    getAllJobs(defaultFilter);
  }, [getAllJobs, authenticated]);

  const actionSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getAllJobs(filter);
  };

  if (!authenticated) history.push("/");
  return (
    <Container>
      <header>
        <h1>Github Jobs</h1>
        <SearchForm onSubmit={actionSubmitSearch}>
          <input
            type="text"
            placeholder="Description"
            value={filter.description}
            onChange={(event) =>
              setFilter({ ...filter, description: event.target.value })
            }
          />
          <input
            type="text"
            id="location"
            placeholder="Location"
            onChange={(event) =>
              setFilter({ ...filter, location: event.target.value })
            }
          />
          <ToggleButton
            selected={filter.full_time}
            type="button"
            onClick={() =>
              setFilter({ ...filter, full_time: !filter.full_time })
            }
          >
            Full Time
          </ToggleButton>
          <button className="submit">SEARCH</button>
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
};

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

  .submit {
    border: none;
    background-color: #0b3954;
    color: #f7f9f9;
    padding: 0.75rem 1.25rem;
    border-radius: 0.25rem;
    width: 100%;
    cursor: pointer;
  }
`;

const ToggleButton = styled.button<{ selected: boolean }>`
  border: none;
  border: 2.5px solid #0b3954;
  color: #0b3954;
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
  width: 100%;
  cursor: pointer;
  font-size: 1rem;

  background-color: ${(props) => (props.selected ? "#0b3954" : "transparent")};
  color: ${(props) => (props.selected ? "#f7f9f9" : "#0b3954")};
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
