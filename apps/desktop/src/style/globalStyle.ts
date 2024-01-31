import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --vh: 100%;
   }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    border: 0;
    padding: 0;
    vertical-align: baseline;
    font: inherit;
    font-size: 100%;
  }
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  *[hidden] {
      display: none;
  }
  body {
    touch-action: manipulation;
    line-height: 1;
    background-color: ${({ theme }) => theme.colors.sub3};

  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* 위에가 styled-reset 내용 */

  * {
    box-sizing: border-box;
  }
  html {
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color:rgba(0, 0, 0, 0);

    scroll-behavior: smooth;

    font-family: sans-serif;
    /* font-size: 62.5%; */
    user-select: none;
    @media (min-width:2800px){
      font-size: 94%;
    }
    @media (min-width:2160px)and (max-width:2799px){
      font-size: 70%;
    }
    @media (min-width:2001px)and (max-width:2159px){
      font-size: 68%;
    }
    @media (min-width:1800px) and (max-width:2000px){
      font-size: 62.5%;
    }
    @media (min-width:1501px) and (max-width:1799px){
      font-size: 49.2%
    }
    @media (min-width:1420px) and (max-width:1500px){
      font-size: 46.8%;
    }
    @media (min-width:1000px) and (max-width:1419px){
      font-size: 42%;
    }
    /* @media (min-width: 768px) and (max-width:899px){
      font-size: 35%;
    }
    @media (max-width:767px){
      font-size: 32%;
    }

    @media (min-width: 1000px){
      font-size: 70%
    } */
    /* 모바일 */
    @media (min-width: 931px) and (max-width:999px){
      font-size: 42%;
    }
    //Surface Pro 7
    @media (min-width: 901px) and (max-width:930px){
      font-size:62.5%;
    }
    //
    @media (min-width: 831px) and (max-width:900px){
      font-size: 160%;
    }
    //iPad Air
    @media (min-width: 790px) and (max-width:830px){
      font-size: 127%;
    }
    //iPad Mini
    @media (min-width: 750px) and (max-width:789px){
      font-size: 122%;
    }
    @media (min-width: 600px) and (max-width:749px){
      font-size: 113%;
    }
    @media (min-width: 471px) and (max-width:580px){
      font-size: 93%;
    }
    //
    @media (min-width: 451px) and (max-width:470px){
      font-size: 16px;
    }
    //iPhone XR & Galaxy S20 Ultra & A51/71
    @media (min-width: 410px) and (max-width:450px){
     font-size: 66%;
    }
    //iPhone 12 Pro
    @media (min-width: 386px) and (max-width:409px){
      font-size: 61%;
    }
    //
    @media (min-width: 384px) and (max-width:385px){
      font-size: 60%!important;
    }
    //iPhone SE
    @media (min-width: 371px) and (max-width:383px){
      font-size: 60%;
    }
    @media (min-width:361px) and (max-width: 370px){
      font-size: 68%;
    }
    @media (min-width:331px) and (max-width: 361px){
      font-size: 57%;

    }
     //Galaxy S9+
    @media (min-width:301px) and (max-width:330px){
       font-size: 50%;

    }
    //Galaxy Fold
    @media (min-width:251px) and (max-width: 300px){
      font-size: 44%;
    }

    @media (max-width:250px){
      font-size: 46%;
    }

  }
  ul, li {
    padding-left: 0rem;
    list-style: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  input, button, textarea {
    outline: none;
    border: none;
    background-color: transparent;
  }
  button {
    cursor: pointer;
    padding: 0;
  }
  input {
    appearance: none;

    &:focus {
      outline: none;
    }
  }
  input:-webkit-autofill {
	-webkit-box-shadow: 0 0 0 1000px #16161C inset;
	box-shadow: 0 0 0 1000px #16161C inset;
  color:white!important;
  -webkit-color:white;
  -webkit-text-fill-color: white !important;

  font-family: "Pretendard";
  font-weight : 400;
  font-size : 1.8;
  line-height : 3.5;
  }
  input:-internal-autofill-selected {
    appearance: menulist-button;
    background-image: none !important;
    background-color: transparent !important;
    color: white !important;

    font-family: "Pretendard";
    font-weight : 400;
    font-size : 1.8;
    line-height : 3.5;

  }
`;
