import React from "react";
import styled from "styled-components";

function Jobs() {
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
      <main></main>
      <footer></footer>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
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

export default Jobs;
