import styled from 'styled-components';

export const Container = styled.div`
  width: 1280px;
  min-height: 100%;
  margin: 0 auto;
  padding: 8rem 0;
  text-align: center;

  @media (max-width: 1280px) {
    width: calc(100% - 2rem);
    margin: 2rem auto;
  }

  div.columns {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2rem;
    justify-items: center;
  }
  div.columns > div {
    text-align: center;
  }
  .gallery {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;
    @media (max-width: 1280px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 900px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .portfolio-mini {
    width: 100%;
  }
  @media (max-width: 880px) {
    div.columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 2rem;
    }
    div.columns > div {
      text-align: center;
    }
  }

  @media (max-width: 500px) {
    div.columns {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 0rem;
    }
  }

  img {
    display: block;
    margin: 0 auto;
  }
  svg {
    margin: 10px;
  }
`;
