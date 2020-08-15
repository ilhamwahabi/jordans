import React, { useState } from "react";
import styled from "styled-components";
import { useQuery, queryCache } from "react-query";

import { getJobs, getJob } from "../service";
import { Filter } from "../state";

import { AllJobSkeletonView } from "../components/SkeletonView";
import JobItem from "../components/JobItem";
import Footer from "../components/Footer";

const renderSkeleton = () => {
  return Array.from({ length: 3 }).map((_, i) => (
    <AllJobSkeletonView key={i} />
  ));
};

const Jobs: React.FC = () => {
  let { filter, updateFilter } = Filter.useContainer();
  const [isLoadNewFilteredData, setIsLoadNewFilteredData] = useState(false);
  const { error, isLoading, data, refetch } = useQuery(
    "jobs",
    () => getJobs(filter),
    {
      refetchOnWindowFocus: false,
      onSettled() {
        if (isLoadNewFilteredData) setIsLoadNewFilteredData(false);
      },
    }
  );

  const actionUpdateFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter(event.target.id, event.target.value);
  };

  const actionSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    refetch();
    setIsLoadNewFilteredData(true);
  };

  const actionPrefetchJob = (id: string) => {
    queryCache.prefetchQuery(["job", id], () => getJob(id));
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
              onClick={() => updateFilter("full_time", !filter.full_time)}
            >
              {filter.full_time ? "Full Time" : "Not Full Time"}
            </ToggleButton>
          </div>
          <button className="search">SEARCH</button>
        </SearchForm>
      </header>
      <main>
        <h2>All Jobs</h2>
        {!isLoading && error && <p>{error.message}</p>}
        {(isLoading || isLoadNewFilteredData) && renderSkeleton()}
        {!isLoadNewFilteredData && data && data.length === 0 && (
          <p>No result found</p>
        )}
        {!isLoadNewFilteredData &&
          data &&
          data.map((job) => (
            <JobItem key={job.id} job={job} prefetchJob={actionPrefetchJob} />
          ))}
      </main>
      <Footer />
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
    letter-spacing: 0.125rem;
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

export default Jobs;
