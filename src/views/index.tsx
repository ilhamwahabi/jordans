import React, { useState } from "react";
import styled from "styled-components";
import { useQuery, queryCache } from "react-query";

import { getJobs, getJob } from "../service";
import { Filter } from "../state";

import {
  AllJobSkeletonViewMobile,
  AllJobSkeletonViewDesktop,
} from "../components/SkeletonView";
import JobItem from "../components/JobItem";
import Footer from "../components/Footer";

const renderSkeleton = () => {
  const Skeleton =
    window.innerWidth < 720
      ? AllJobSkeletonViewMobile
      : AllJobSkeletonViewDesktop;

  return Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />);
};

const Jobs: React.FC = () => {
  let { filter, updateFilter } = Filter.useContainer();
  const [isLoadNewFilteredData, setIsLoadNewFilteredData] = useState(false);
  const { error, isLoading, data, refetch } = useQuery(
    "jobs",
    () => getJobs(filter),
    {
      staleTime: 1000 * 60 * 5,
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
    queryCache.prefetchQuery(["job", id], () => getJob(id), {
      staleTime: 1000 * 60 * 5,
    });
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
            <label>
              <input
                type="checkbox"
                id="full_time"
                checked={filter.full_time}
                onChange={(event) =>
                  updateFilter(event.target.id, event.target.checked)
                }
              />
              Full Time
            </label>
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

  h2 {
    padding-bottom: 0.25rem;
    border-bottom: 2px solid black;
    display: inline-block;
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;

  .inputContainer {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;

    @media (min-width: 720px) {
      flex-direction: row;
    }
  }

  input[type="text"] {
    border: none;
    border-bottom: 1px solid #0b3954;
    outline: none;
    font-size: 1rem;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    flex: 2;

    @media (min-width: 720px) {
      flex-direction: row;
      margin-bottom: 0;
      margin-right: 2rem;
    }
  }

  label {
    display: flex;
    align-items: center;
    line-height: 100%;
    flex: 1;

    input[type="checkbox"] {
      width: 1.25rem;
      height: 1.25rem;
      margin-left: 0;
      margin-right: 1rem;
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

export default Jobs;
