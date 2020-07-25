import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import { getJobs } from "../service";
import { AllJobSkeletonView } from "../components/SkeletonView";

const defaultFilter = {
  description: "",
  location: "",
  full_time: false,
};

const renderSkeleton = () => {
  return Array.from({ length: 3 }).map((_, i) => (
    <AllJobSkeletonView key={i} />
  ));
};

const Jobs: React.FC = () => {
  const [filter, setFilter] = useState(defaultFilter);
  const { error, isLoading, data, refetch } = useQuery("allJobs", () =>
    getJobs(filter)
  );

  const actionUpdateFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [event.target.id]: event.target.value });
  };

  const actionSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    refetch();
  };

  return (
    <Container>
      <header>
        <h1>Jordans</h1>
        <SearchForm onSubmit={actionSubmitSearch}>
          <div className="inputContainer">
            <input
              type="text"
              id="description"
              placeholder="Description"
              value={filter.description}
              onChange={actionUpdateFilter}
            />
            <input
              type="text"
              id="location"
              placeholder="Location"
              value={filter.location}
              onChange={actionUpdateFilter}
            />
            <ToggleButton
              selected={filter.full_time}
              type="button"
              onClick={() =>
                setFilter({ ...filter, full_time: !filter.full_time })
              }
            >
              {filter.full_time ? "Full Time" : "Not Full Time"}
            </ToggleButton>
          </div>
          <button className="search">SEARCH</button>
        </SearchForm>
      </header>
      <main>
        <h2>All Jobs</h2>
        {!isLoading && error && error.message}
        {isLoading && renderSkeleton()}
        {data &&
          data.data.map((job) => (
            <JobItem key={job.id}>
              <div className="text-container">
                <h3 className="title">
                  {job.title} <span>{job.type}</span>
                </h3>
                <p className="company">
                  <a href={job.company_url || undefined} className="companyURL">
                    {job.company}
                  </a>{" "}
                  - {job.location}
                </p>
              </div>
              <Link className="detail" key={job.id} to={`/${job.id}`}>
                DETAIL
              </Link>
            </JobItem>
          ))}
      </main>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  max-width: 720px;
  margin: 0 auto;

  h1 {
    margin-top: 0;
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;

  .inputContainer {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    @media (min-width: 720px) {
      flex-direction: row;
    }
  }

  input {
    border: none;
    border-bottom: 1px solid #0b3954;
    outline: none;
    font-size: 1rem;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;

    @media (min-width: 720px) {
      flex-direction: row;
      margin-right: 2rem;
    }
  }

  .search {
    border: none;
    background-color: #0b3954;
    color: #f7f9f9;
    padding: 0.75rem 1.25rem;
    border-radius: 0.25rem;
    width: 100%;
    cursor: pointer;
    font-size: 1rem;
    margin-bottom: 1rem;
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
  margin-bottom: 1rem;

  background-color: ${(props) => (props.selected ? "#0b3954" : "transparent")};
  color: ${(props) => (props.selected ? "#f7f9f9" : "#0b3954")};
`;

const JobItem = styled.div`
  margin-bottom: 2rem;

  @media (min-width: 720px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title {
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

  .company {
    margin: 1rem 0;

    .companyURL {
      text-decoration: none;
      color: inherit;
      padding-bottom: 0.125rem;
      border-bottom: 1px solid black;
    }
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
    transition: background-color 0.3s, color 0.3s;

    :hover {
      background-color: #0b3954;
      color: #f7f9f9;
    }

    @media (min-width: 720px) {
      width: unset;
      height: fit-content;
    }
  }
`;

export default Jobs;
