import styled, { keyframes } from "styled-components";

export const CuteLinkText = styled.div<{ $fontsize?: string }>`
  font-family: "Main text font";
  font-size: ${(props) => props.$fontsize || "2.3vw"};
  cursor: pointer;
  color: #248d65;
  text-shadow: #f5855d 2.5px 2.5px;

  transition: all 250ms ease-in-out;
  &:hover {
    transform: scale(1.3);
    color: #6d2c1a;
  }
`;
