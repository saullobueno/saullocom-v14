import styled from 'styled-components';

export const Container = styled.div`
  width: 1280px;
  height: 100%;
  margin: 8rem auto;

  @media (max-width: 1280px) {
    width: calc(100% - 2rem);
    margin: 2rem auto;
  }

  div.columns {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2rem;
  }
  div.columns > div:first-child {
    text-align: right;
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
    div.columns > div:first-child {
      text-align: left;
    }
  }

  @media (max-width: 500px) {
    div.columns {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 0rem;
    }
  }

  svg {
    margin: 10px;
  }
`;
