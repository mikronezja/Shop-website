import styled, { keyframes } from "styled-components";

interface CuteTextProps {
  fontsize: string;
  background_color: string;
}

export const CuteText = styled.div<CuteTextProps>`
  font-family: "Bigger font";
  font-size: ${(props) => props.fontsize};
  background-color: ${(props) => props.background_color};
  color: #f3acc8;
`;
