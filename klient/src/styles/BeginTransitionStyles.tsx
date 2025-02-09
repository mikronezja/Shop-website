import styled, { keyframes } from "styled-components";

const startingAnimationHomePage = keyframes`
  0% { opacity: 0.0; transform: translateX(-10vw); }
  100% { opacity :1.0; transform: translateX(0vw); }
`;

const startingAnimationImage = keyframes`
    0% { opacity: 0.0; transform: scale(0); }
    70% { opacity: 1.0; transform: scale(1.2); }
    100% { opacity: 1.0; transform: scale(1); }
`;

export const BeginTransition = styled.div<{ $delay?: string }>`
  animation-name: ${startingAnimationHomePage};
  animation-delay: ${(props) => props.$delay || "0s"};
  animation-duration: 1s;
  animation-fill-mode: backwards;
`;

export const LoadingImages = styled.div<{ $delay?: string }>`
  animation-name: ${startingAnimationImage};
  animation-delay: ${(props) => props.$delay || "0s"};
  animation-duration: 1s;
  animation-fill-mode: backwards;
`;
