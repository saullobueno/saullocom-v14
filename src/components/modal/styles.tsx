import styled from 'styled-components';

export const ModalView = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s;
  overflow: auto;

  &:target {
    visibility: visible;
    opacity: 1;
  }

  & > a {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  img {
    width: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);

    @media (max-width: 1280px) {
      width: 100%;
      padding: 2rem;
      left: 0;
      transform: none;
    }
  }
`;
