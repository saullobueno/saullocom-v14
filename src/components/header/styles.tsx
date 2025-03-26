import styled from 'styled-components';
import imageHome from '../../assets/image-home.jpg';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  background: url(${imageHome}), linear-gradient(45deg, #e2a342, #0059b2),
    linear-gradient(135deg, #e34040, #00b259);
  background-size: cover;
  background-blend-mode: hard-light;
  animation: hue-rotate 7s linear infinite;
  @media (max-width: 880px) {
    align-items: initial;
    justify-content: initial;
  }

  @keyframes hue-rotate {
    from {
      -webkit-filter: hue-rotate(0);
      -moz-filter: hue-rotate(0);
      -ms-filter: hue-rotate(0);
      filter: hue-rotate(0);
    }
    to {
      -webkit-filter: hue-rotate(360deg);
      -moz-filter: hue-rotate(360deg);
      -ms-filter: hue-rotate(360deg);
      filter: hue-rotate(360deg);
    }
  }
`;

export const Content = styled.div`
  width: 1280px;
  height: 100%;
  display: flex;
  padding: 0 2rem;
  flex-shrink: 1;
  align-items: center;
  justify-content: space-around;
  color: #fff;
  @media (max-width: 880px) {
    width: 100%;
    padding: 0;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  div.logo {
    img {
      filter: brightness(500%);
      @media (max-width: 667px) {
        width: auto;
        max-height: 200px;
        margin-top: 100px;
      }
    }
  }

  div.title {
    text-align: center;
    h1 {
      padding: 1rem 0;
      line-height: 80%;
      font-size: 10rem;
      color: #fff;
      text-align: left;
      margin: 0;
    }
    h1.title-vertical {
      display: block;
    }
    h1.title-horizontal {
      display: none;
    }
    p {
      font-size: 1.2rem;
      margin: 0;
    }

    @media (max-width: 880px) {
      h1 {
        line-height: 80%;
        font-size: 2rem;
        color: #fff;
        text-align: center !important;
      }
      h1.title-vertical {
        display: none;
      }
      h1.title-horizontal {
        display: block;
      }
      p {
        font-size: 0.8rem;
        line-height: 120%;
        text-align: center;
      }
    }
  }
`;
