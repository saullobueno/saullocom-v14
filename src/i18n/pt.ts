// Fonte da verdade dos textos do site. O tipo Messages e derivado daqui,
// entao en.ts so compila se tiver exatamente as mesmas chaves.
export const pt = {
  lang: 'pt-BR',
  ogLocale: 'pt_BR',
  path: '/',
  switchTo: { label: 'English', short: 'EN', href: '/en', ariaLabel: 'Read this site in English' },

  meta: {
    title: 'Saullo Bueno | Desenvolvedor Full Stack & UI/UX Designer',
    description:
      'Portfólio de Saullo Bueno, desenvolvedor Full Stack e UI/UX Designer. Node.js, React, React Native e soluções com Inteligência Artificial.',
    ogDescription:
      'Engenharia de software Full Stack, UI/UX Design e aplicações com Inteligência Artificial.',
    ogImageAlt:
      'Saullo Bueno, Desenvolvedor Full Stack. UI/UX Design, Node.js, React e React Native.',
    jobTitle: 'Desenvolvedor Full Stack e UI/UX Designer',
  },

  nav: {
    label: 'Navegação principal',
    skip: 'Pular para o conteúdo',
    home: 'Início',
    about: 'Sobre',
    expertise: 'Habilidades',
    services: 'Serviços',
    portfolio: 'Projetos',
    contact: 'Contatos',
    cta: 'Vamos conversar',
    menu: 'Menu',
    progress: 'Progresso de leitura da página',
  },

  hero: {
    greeting: 'Saullo Bueno, da interface ao código, atua como...',
    h1: 'Desenvolvedor Full Stack',
    verticalWords: ['DESEN', 'VOLVE', 'DOR', 'FULL', 'STACK'],
    horizontalLines: ['DESENVOLVEDOR', 'FULL STACK'],
    tagline: 'React • Node.js • UI/UX Design • React Native',
  },

  about: {
    title: 'SOBRE',
    lead: 'Descobri a paixão pela tecnologia ao me mudar para a capital e ter acesso ao meu primeiro computador, iniciando uma jornada de constante evolução.',
    paragraphs: [
      "Nascido em Belo Horizonte, Minas Gerais, desenvolvi minha paixão pela tecnologia e pelo design desde a adolescência, criando minhas primeiras interfaces digitais.",
      'Graduei-me em Produção Multimídia em 2012 e atuei em diversas empresas do setor, evoluindo do design gráfico e front-end para a engenharia de software Full Stack.',
      'Profissional focado em resultados, unindo postura colaborativa, aprendizado contínuo e forte senso de organização.',
      'Atuação com persistência na resolução de problemas complexos, atenção aos detalhes e compromisso com a qualidade em cada entrega.',
    ],
    imageAlt: 'Criança sentada no chão empilhando blocos de madeira, em tons sépia',
  },

  expertise: {
    title: 'HABILIDADES',
    lead: 'Trajetória construída no design e UI/UX, consolidada no desenvolvimento front-end e especializada em engenharia de software Full Stack.',
    left: [
      {
        title: 'Design & UI/UX',
        text: 'Concepção de interfaces intuitivas e identidades visuais focadas em usabilidade e experiência do usuário.',
      },
      {
        title: 'Back-end',
        text: 'Desenvolvimento de APIs e serviços escaláveis com foco em Clean Architecture e princípios SOLID.',
      },
      {
        title: 'Front-End',
        text: 'Criação de SPAs e aplicações web de alta performance com componentes reutilizáveis e telas responsivas.',
      },
    ],
    right: [
      {
        title: 'Mobile',
        text: 'Desenvolvimento de aplicativos móveis multiplataforma com alta fidelidade visual e performance.',
      },
      {
        title: 'Qualidade & CI/CD',
        text: 'Testes automatizados e pipelines de integração contínua para entregas rápidas e seguras.',
      },
      {
        title: 'Arquitetura & Performance',
        text: 'Aplicação de boas práticas de software para garantir segurança, SEO e alta manutenibilidade.',
      },
    ],
    imageAlt: 'Torre alta de blocos de madeira equilibrada sobre uma mesa clara',
  },

  services: {
    title: 'SERVIÇOS',
    lead: 'Domínio completo do ciclo de vida de produtos digitais: da concepção de UI/UX e identidade visual ao desenvolvimento Full Stack e mobile.',
    left: [
      {
        title: 'Design & UI/UX',
        text: 'Criação de marcas, identidades visuais e interfaces intuitivas para plataformas web e aplicativos móveis.',
      },
      {
        title: 'Aplicações Web',
        text: 'Desenvolvimento de ecossistemas web, dashboards e landing pages com código limpo, rápido e escalável.',
      },
    ],
    middle: [
      {
        title: 'APIs & Back-end',
        text: 'Construção de serviços back-end eficientes, modelagem de dados, mensageria e containerização de aplicações.',
      },
      {
        title: 'Aplicações Mobile',
        text: 'Desenvolvimento e publicação de aplicativos móveis para ecossistemas iOS e Android.',
      },
    ],
    imageAlt: 'Mão afastando com cuidado um bloco de uma torre de madeira, em tons esverdeados',
  },

  portfolio: {
    title: 'PROJETOS',
    lead: 'Engenharia de software Full Stack, sistemas web modernos, soluções integradas a Inteligência Artificial e aplicações de alta performance.',
  },

  gallery: {
    enlargeMain: (title: string) => `Ampliar imagem principal de ${title}`,
    enlargeCapture: (n: number, title: string) => `Ampliar captura ${n} de ${title}`,
    screenshotAlt: (title: string) => `${title} - captura de tela`,
    prev: 'Ver miniaturas anteriores',
    next: 'Ver próximas miniaturas',
  },

  legacy: {
    title: 'Projetos Legados',
    lead: 'Histórico de identidades visuais, plataformas institucionais e projetos desenvolvidos ao longo da trajetória profissional.',
    enlarge: (title: string) => `Ampliar projeto ${title}`,
    showAll: (n: number) => `Ver todos os legados (+${n} projetos)`,
    collapse: 'Recolher legados',
  },

  contact: {
    title: 'CONTATOS',
    lead: 'Tem um projeto para desenvolver, deseja contratar meus serviços ou quer conversar sobre oportunidades? Vamos conversar:',
    imageAlt:
      'Mão de pessoa de terno colocando um bloco de madeira no topo de uma torre, em tons arroxeados',
    emailAria: 'Enviar e-mail',
    whatsappAria: 'Conversar no WhatsApp',
  },

  footer: { copyright: '© saullo.com • Todos os direitos reservados' },

  notFound: {
    heading: '404',
    text: 'Página não encontrada.',
    back: 'Voltar para o início',
    errorHeading: 'Ops!',
    errorText: 'Ocorreu um erro inesperado.',
  },
};

export type Messages = typeof pt;
