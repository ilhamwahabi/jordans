import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      Copyright 2020{" "}
      <a href="https://twitter.com/ilhamwahabigx">Ilham Wahabi.</a>
    </Container>
  );
};

const Container = styled.footer`
  text-align: center;
  font-style: italic;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;

  a {
    color: inherit;
    padding-bottom: 0.125rem;
    text-decoration: none;
    border-bottom: 1px solid black;
  }
`;

export default Footer;
