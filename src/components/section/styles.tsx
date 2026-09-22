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
    align-items: center;
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
      align-items: center;
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

  div.columns > div.contact-column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    text-align: left;
    width: 100%;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    text-align: left;
    width: 100%;

    svg {
      margin: 0;
      flex-shrink: 0;
    }
  }

  .contact-icon-link {
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    text-decoration: none;
    flex-shrink: 0;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  .contact-link-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: inherit;
    text-decoration: none;
    transition: opacity 0.2s;

    &:hover {
      text-decoration: underline;
      opacity: 0.8;
    }
  }

  .contact-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;

    a {
      color: inherit;
      text-decoration: none;
      line-height: 1.6;
      transition: opacity 0.2s;

      &:hover {
        text-decoration: underline;
        opacity: 0.8;
      }
    }
  }

  /* Featured Projects Styles */
  .featured-projects-grid {
    display: flex;
    flex-direction: column;
    gap: 7.5rem;
    margin-top: 5.5rem;
    margin-bottom: 7rem;
    text-align: left;
  }

  .featured-card {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    grid-template-areas: 'gallery header' 'gallery body';
    align-content: start;
    gap: 2.5rem;
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
    align-items: flex-start;

    @media (max-width: 960px) {
      grid-template-columns: 1fr;
      grid-template-areas: 'header' 'gallery' 'body';
      gap: 1.5rem;
      padding: 0;
    }
  }

  .project-gallery {
    grid-area: gallery;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .project-gallery-hero {
    display: block;
    width: 100%;
    padding: 0;
    border: none;
    border-radius: 12px;
    overflow: hidden;
    background: #111;
    cursor: zoom-in;
    line-height: 0;

    img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.03);
    }
  }

  .project-thumbnails {
    display: flex;
    align-items: stretch;
    gap: 0.5rem;
  }

  .project-thumbnails-track {
    display: flex;
    gap: 0.6rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .project-thumb {
    flex: 0 0 calc((100% - 1.2rem) / 3);
    scroll-snap-align: start;
    padding: 0;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    overflow: hidden;
    background: #111;
    cursor: zoom-in;
    line-height: 0;
    transition: border-color 0.2s ease, transform 0.2s ease;

    img {
      width: 100%;
      aspect-ratio: 16 / 10;
      object-fit: cover;
      display: block;
    }

    &:hover {
      border-color: #0085b2;
      transform: translateY(-2px);
    }

    @media (max-width: 520px) {
      flex-basis: calc((100% - 0.6rem) / 2);
    }
  }

  .thumb-nav {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: auto;
    padding: 0;
    box-sizing: border-box;
    border-radius: 8px;
    border: none;
    background: rgba(255, 255, 255, 0.06);
    color: #fff;
    cursor: pointer;
    transition: all 0.2s ease;

    svg {
      margin: 0;
      flex-shrink: 0;
      pointer-events: none;
    }

    &:hover {
      background: rgba(0, 133, 178, 0.25);
    }
  }

  .featured-header {
    grid-area: header;
    text-align: left;

    h3.featured-title {
      font-size: 1.8rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 0.2rem;
      text-align: left;
      line-height: 1.3;
    }

    .featured-subtitle {
      font-size: 1.05rem;
      color: #0085B2;
      font-weight: 500;
      text-align: left;
    }
  }

  .featured-body {
    grid-area: body;
    display: flex;
    flex-direction: column;
    text-align: left;

    p.featured-description {
      font-size: 0.95rem;
      color: #ccc;
      line-height: 1.6;
      margin-bottom: 1.2rem;
      text-align: left;
    }

    .featured-highlights {
      list-style: none;
      margin-bottom: 1.2rem;
      padding-left: 0;
      text-align: left;

      li {
        font-size: 0.9rem;
        color: #bbb;
        margin-bottom: 0.4rem;
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        text-align: left;

        &::before {
          content: '▹';
          color: #0085B2;
          font-size: 1rem;
          line-height: 1;
        }
      }
    }

    .featured-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;

      .stack-badge {
        background: rgba(0, 133, 178, 0.15);
        color: #64d2ff;
        border: 1px solid rgba(0, 133, 178, 0.3);
        padding: 0.25rem 0.65rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
      }
    }

    .featured-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;

      .btn-action {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.6rem 1.2rem;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.2s ease;

        &.btn-github {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.2);

          &:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: #fff;
          }
        }

        &.btn-demo {
          background: #0085B2;
          color: #fff;
          border: 1px solid #0085B2;

          &:hover {
            background: #00a4dc;
            border-color: #00a4dc;
          }
        }
      }
    }
  }

  /* Legacy Section Styles */
  .legacy-portfolio-section {
    margin-top: 4rem;
    padding-top: 3rem;
    text-align: center;

    h3.legacy-heading {
      font-size: 1.6rem;
      color: #0085B2;
      margin-bottom: 0.5rem;
      text-align: center;
    }

    p.legacy-subheading {
      font-size: 1rem;
      color: #0085B2;
      margin-bottom: 2rem;
      text-align: center;
    }

    .legacy-toggle-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 2rem;
      padding: 0.8rem 2rem;
      background: rgba(0, 133, 178, 0.1);
      color: #0085B2;
      border: 1px solid rgba(0, 133, 178, 0.3);
      border-radius: 30px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s ease;

      &:hover {
        background: rgba(0, 133, 178, 0.25);
        color: #fff;
        border-color: #0085B2;
        transform: translateY(-2px);
      }
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
