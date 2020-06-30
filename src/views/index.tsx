import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const DUMMY_USERNAME = "admin";
const DUMMY_PASSWORD = "password";

interface IProps {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

const Home: React.FC<IProps> = ({ authenticated, setAuthenticated }) => {
  const history = useHistory();

  const actionLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { username, password } = event.currentTarget;
    if (username.value !== DUMMY_USERNAME) return;
    if (password.value !== DUMMY_PASSWORD) return;

    setAuthenticated(true);
    localStorage.setItem("gh-jobs-auth", JSON.stringify(true));
    history.push("/jobs");
  };

  if (authenticated) history.push("/jobs");
  return (
    <Container>
      <LoginForm onSubmit={actionLogin}>
        <h1>Login</h1>
        <LoginInput id="username" type="text" placeholder="Username" />
        <LoginInput id="password" type="password" placeholder="Password" />
        <LoginButton>Submit</LoginButton>
      </LoginForm>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0b3954;

  h1 {
    margin: 0 0 2rem;
    color: #0b3954;
    padding-bottom: 0.5rem;
    width: 100%;
    text-align: center;
    border-bottom: 5px solid #0b3954;
  }
`;

const LoginForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f7f9f9;
  padding: 1.5rem;
  border-radius: 0.25rem;
`;

const LoginInput = styled.input`
  margin: 1rem 0;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #0b3954;
  padding-bottom: 0.25rem;
  outline: none;
`;

const LoginButton = styled.button`
  margin-top: 1rem;
  border: none;
  background-color: #0b3954;
  color: #f7f9f9;
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
  width: 100%;
`;

export default Home;
