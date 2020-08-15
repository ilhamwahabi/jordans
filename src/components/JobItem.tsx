import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { IJob } from "../interfaces";

interface IProps {
  job: IJob;
  prefetchJob: (id: string) => void;
}

const JobItem: React.FC<IProps> = ({ job, prefetchJob }) => {
  const { id, title, type, company, location, company_url } = job;

  return (
    <Container>
      <div className="text-container">
        <Title>
          <span>{title}</span> <span>{type}</span>
        </Title>
        <CompanyInfo>
          <a href={company_url || undefined} className="companyURL">
            {company}
          </a>
          {" - "}
          {location}
        </CompanyInfo>
      </div>
      <DetailButton
        className="detail"
        key={id}
        to={`/${id}`}
        onMouseOver={() => prefetchJob(id)}
      >
        DETAIL
      </DetailButton>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 2rem;

  .text-container {
    margin-right: 2.5rem;
  }

  @media (min-width: 720px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Title = styled.h3`
  line-height: 1.5;
  margin: 0.5rem 0;

  span:first-of-type {
    margin-right: 0.125rem;
  }

  span:last-of-type {
    font-size: 0.875rem;
    color: #f7f9f9;
    padding: 0.25rem 0.375rem;
    border-radius: 0.25rem;
    background-color: #129490;
    white-space: nowrap;
  }
`;

const CompanyInfo = styled.p`
  margin: 0.5rem 0 1rem;
  line-height: 1.75;

  .companyURL {
    text-decoration: none;
    color: inherit;
    padding-bottom: 0.125rem;
    border-bottom: 1px solid black;
  }

  @media (min-width: 720px) {
    margin: 0.5rem 0;
  }
`;

const DetailButton = styled(Link)`
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
`;

export default JobItem;
