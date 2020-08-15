import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery, queryCache } from "react-query";

import { getJob, getJobs } from "../service";
import { ReactComponent as LeftArrow } from "../assets/leftArrow.svg";
import { JobDetailSkeletonView } from "../components/SkeletonView";
import Footer from "../components/Footer";
import { Filter } from "../state";

const JobsDetail: React.FC = () => {
  const { id } = useParams();
  let { filter } = Filter.useContainer();
  const [openApply, setOpenApply] = useState(false);
  const { error, data, isLoading } = useQuery(["job", id], () => getJob(id), {
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const actionPrefetchJobs = () => {
    queryCache.prefetchQuery("jobs", () => getJobs(filter), {
      staleTime: 1000 * 60 * 5,
    });
  };

  return (
    <Container>
      <Link to="/" className="allJobs" onMouseOver={() => actionPrefetchJobs()}>
        <LeftArrow className="arrow" />
        All Jobs
      </Link>
      {!isLoading && error && <p>{error.message}</p>}
      {isLoading && <JobDetailSkeletonView />}
      {data && (
        <>
          <h1 className="title">{data.title}</h1>
          <span className="type">{data.type}</span>
          <p className="company">
            <a className="companyURL" href={data.company_url || undefined}>
              {data.company}
            </a>
            {" - "}
            {data.location}
          </p>
          <p
            className="description"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
          <ApplyButton onClick={() => setOpenApply(!openApply)}>
            APPLY
          </ApplyButton>
          <div className="apply">
            {openApply && (
              <p dangerouslySetInnerHTML={{ __html: data.how_to_apply }} />
            )}
          </div>
        </>
      )}
      <Footer />
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

  .apply {
    padding-bottom: 5rem;
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
  letter-spacing: 0.125rem;
  font-size: 1rem;

  box-sizing: border-box;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
`;

export default JobsDetail;
