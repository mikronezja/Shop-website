import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* @font-face {
    font-family: 'Bigger font';
    src:url('fonts/chatkids-webfont.woff')
  }
  @font-face {
    font-family: 'Curvy font';
    src:url('fonts/Christmas Okinawa.otf')
  } */
  body {
    width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
    margin: 0;
    color: #EEE5E9;
    background-color: #2B303A;
  }
`;

export default GlobalStyle;
