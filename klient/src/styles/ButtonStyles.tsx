import styled from "styled-components";
// Define the keyframes animation

interface Props {
  fontsize: string;
  padding: string;
  background_color: string;
}

// Define the styled button
export const CategoryButton = styled.button<Props>`
  font-family: "Button font";
  font-size: ${(props) => props.fontsize};
  padding: ${(props) => props.padding};
  border: none;
  border-radius: 1vh;
  color: #6d2c1a;
  background-color: #f66233;
  box-shadow: #6d2c1a 4px 4px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.25s ease;

  &:hover {
    background-color: #cdde7e;
    transform: scale(1.2);
  }
`;

export const CartButton = styled.button``;

export const CuteTransitionButtonIdea = styled.div<{ $padding?: string }>`
  padding: ${(props) => props.$padding || "1vh"};
  &:hover {
  }
`;
