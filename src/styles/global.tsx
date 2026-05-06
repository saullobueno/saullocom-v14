import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`


  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    width: 100%;
    min-height: 100%;
    background:#1a1a1a;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px 'Roboto', sans-serif;
    @media (max-width: 880px) {
    font: 14px 'Roboto', sans-serif;

    }
  }

  main{
    padding: 0;
  }

  h1 {
    font-size: 8rem;
    line-height: 80%;
    margin-bottom:2rem;
    text-align: center;
  }
  h2{
    font-size: 2rem;
    line-height:140%;
    margin-bottom:2rem;
    text-align: center;
  }
  h3{
    font-size: 1.4rem;
    line-height:180%;
    margin-bottom:.2rem;
    text-align: center;
  }
  p{
    line-height:180%;
    margin-bottom:1rem;
    text-align: center;
  }
  a {
    text-decoration: none;
  }

  @media (max-width: 880px) {
    h1 {
      font-size: 4rem;
    }
    h2{
      font-size: 1.4rem;
      line-height:100%;
    }
    h3{
      font-size: 1.2rem;
    }
  }

  ul {
    list-style-position: inside;
    line-height:180%;
    margin-bottom:1rem;
    text-align: center;
    list-style-type: none;
    li{}
  }
.center-horizontal{
  display: flex;
  align-items: center;
  justify-content: center;
}
  button {
    cursor: pointer;
  }
`;
