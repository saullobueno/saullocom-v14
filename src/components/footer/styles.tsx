import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #292929;

  div.content {
    width: 1280px;
    padding: 3rem 2rem 5rem;
    text-align: center;

    img.logo {
      width: 30px;
      filter: brightness(100);
    }

    p {
      font-size: 10px;
      color: #666;
      margin: 0.5rem;
    }
  }
`;
