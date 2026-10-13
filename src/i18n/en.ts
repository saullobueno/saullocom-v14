import type { Messages } from './pt';

export const en: Messages = {
  lang: 'en',
  ogLocale: 'en_US',
  path: '/en',
  switchTo: { label: 'Português', short: 'PT', href: '/', ariaLabel: 'Ler este site em português' },

  meta: {
    title: 'Saullo Bueno | Full Stack Developer & UI/UX Designer',
    description:
      'Portfolio of Saullo Bueno, Full Stack Developer and UI/UX Designer. Node.js, React, React Native and AI-powered solutions.',
    ogDescription: 'Full Stack software engineering, UI/UX design and AI-powered applications.',
    ogImageAlt:
      'Saullo Bueno, Full Stack Developer. UI/UX Design, Node.js, React and React Native.',
    jobTitle: 'Full Stack Developer and UI/UX Designer',
  },

  nav: {
    label: 'Main navigation',
    skip: 'Skip to content',
    home: 'Home',
    about: 'My story',
    expertise: 'Expertise',
    services: 'What I do',
    portfolio: 'Portfolio',
    contact: 'Contact',
    cta: "Let's talk",
    menu: 'Menu',
    progress: 'Page reading progress',
  },

  hero: {
    greeting: 'Saullo Bueno, from interface to code, works as...',
    h1: 'Full Stack Developer',
    verticalWords: ['FULL', 'STACK', 'DEVEL', 'OPER'],
    horizontalLines: ['FULL STACK', 'DEVELOPER'],
    tagline: 'React • Node.js • UI/UX Design • React Native',
  },

  about: {
    title: 'MY STORY',
    lead: 'I found my passion for technology after moving to the capital and getting my first computer, which started a journey of constant growth.',
    paragraphs: [
      "Born in Pingo D'Água (MG, Brazil) and raised in Belo Horizonte, I grew passionate about technology and design as a teenager, building my first digital interfaces.",
      'I graduated in Multimedia Production in 2012 and worked at several companies in the field, evolving from graphic design and front-end into Full Stack software engineering.',
      'A results-driven professional who combines a collaborative attitude, continuous learning and a strong sense of organization.',
      'I stay persistent on complex problems, pay close attention to detail and commit to quality in every delivery.',
    ],
    imageAlt: 'Child sitting on the floor stacking wooden blocks, in sepia tones',
  },

  expertise: {
    title: 'TECHNICAL EXPERTISE',
    lead: 'A career built on design and UI/UX, consolidated in front-end development and specialized in Full Stack software engineering.',
    left: [
      {
        title: 'Design & UI/UX',
        text: 'Intuitive interfaces and visual identities focused on usability and user experience.',
      },
      {
        title: 'Back-end',
        text: 'Scalable APIs and services built around Clean Architecture and SOLID principles.',
      },
      {
        title: 'Front-End',
        text: 'High-performance SPAs and web applications with reusable components and responsive screens.',
      },
    ],
    right: [
      {
        title: 'Mobile',
        text: 'Cross-platform mobile apps with high visual fidelity and performance.',
      },
      {
        title: 'Quality & CI/CD',
        text: 'Automated tests and continuous integration pipelines for fast, safe deliveries.',
      },
      {
        title: 'Architecture & Performance',
        text: 'Software best practices that ensure security, SEO and long-term maintainability.',
      },
    ],
    imageAlt: 'Tall tower of wooden blocks balanced on a light table',
  },

  services: {
    title: 'WHAT I DO',
    lead: 'Full command of the digital product lifecycle: from UI/UX design and visual identity to Full Stack and mobile development.',
    left: [
      {
        title: 'Design & UI/UX',
        text: 'Brands, visual identities and intuitive interfaces for web platforms and mobile apps.',
      },
      {
        title: 'Web Applications',
        text: 'Web ecosystems, dashboards and landing pages with clean, fast and scalable code.',
      },
    ],
    middle: [
      {
        title: 'APIs & Back-end',
        text: 'Efficient back-end services, data modeling, messaging and application containerization.',
      },
      {
        title: 'Mobile Applications',
        text: 'Development and publishing of mobile apps for iOS and Android.',
      },
    ],
    imageAlt: 'A hand carefully pulling a block out of a wooden tower, in green tones',
  },

  portfolio: {
    title: 'PORTFOLIO',
    lead: 'Full Stack software engineering, modern web systems, AI-integrated solutions and high-performance applications.',
  },

  gallery: {
    enlargeMain: (title: string) => `Enlarge main image of ${title}`,
    enlargeCapture: (n: number, title: string) => `Enlarge screenshot ${n} of ${title}`,
    screenshotAlt: (title: string) => `${title} - screenshot`,
    prev: 'Show previous thumbnails',
    next: 'Show next thumbnails',
  },

  legacy: {
    title: 'Legacy Projects',
    lead: 'A history of visual identities, institutional platforms and projects built throughout my professional career.',
    enlarge: (title: string) => `Enlarge project ${title}`,
    showAll: (n: number) => `See all legacy projects (+${n} projects)`,
    collapse: 'Collapse legacy projects',
  },

  contact: {
    title: 'CONTACT',
    lead: 'Have a project to build, want to hire my services or talk about opportunities? Let’s talk:',
    imageAlt:
      'Hand of a person in a suit placing a wooden block on top of a tower, in purple tones',
    emailAria: 'Send an email',
    whatsappAria: 'Chat on WhatsApp',
  },

  footer: { copyright: '© saullo.com • All rights reserved' },

  notFound: {
    heading: '404',
    text: 'Page not found.',
    back: 'Back to home',
    errorHeading: 'Oops!',
    errorText: 'An unexpected error occurred.',
  },
};
