import React from "react";
import { CuteLinkText } from "../../styles/CuteLinkTextStyle";
import { BeginTransition } from "../../styles/BeginTransitionStyles";
import styled from "styled-components";

const Horizontal = styled.div`
  display: flex;
  gap: 0.2vw;
  flex-direction: row;
`;

const HomePageText = () => {
  const text = "Home page";
  text.split("");
  return (
    <Horizontal>
      <BeginTransition>H</BeginTransition>
      <BeginTransition $delay="0.1s">O</BeginTransition>
      <BeginTransition $delay="0.2s">M</BeginTransition>
      <BeginTransition $delay="0.3s">E</BeginTransition>
      <BeginTransition $delay="0.4s">P</BeginTransition>
      <BeginTransition $delay="0.5s">A</BeginTransition>
      <BeginTransition $delay="0.6s">G</BeginTransition>
      <BeginTransition $delay="0.7s">E</BeginTransition>
    </Horizontal>
  );
};

export default HomePageText;
