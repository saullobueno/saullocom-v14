import type { IconType } from 'react-icons';
import { FaGithubSquare, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import Stack04 from '../../assets/imageStack04.avif';
import { useMessages } from '../../i18n';
import { revelar } from '../reveal';
import Section, { Cena, DecorativeImage, SectionLead, SectionTitle } from '../section';

// Para um contato novo, basta incluir aqui
const CONTATOS: { href: string; texto: string; Icone: IconType }[] = [
  { href: 'mailto:saullo@saullo.com', texto: 'saullo@saullo.com', Icone: MdEmail },
  {
    href: 'https://linkedin.com/in/saullobueno',
    texto: 'linkedin.com/in/saullobueno',
    Icone: FaLinkedin,
  },
  {
    href: 'https://github.com/saullobueno',
    texto: 'github.com/saullobueno',
    Icone: FaGithubSquare,
  },
];

const link =
  'flex items-center gap-3 leading-[1.6] text-inherit no-underline transition-opacity hover:underline hover:opacity-80';

export default function Contact() {
  const { nav, contact } = useMessages();
  return (
    <Section id="contact" tone="text-contato">
      <Cena rotulo={nav.contact}>
        <SectionTitle id="contact-title">{contact.title}</SectionTitle>
        <SectionLead>{contact.lead}</SectionLead>

        <div className="flex items-center justify-center gap-[3em] max-sm:flex-col max-sm:gap-0">
          <div className="shrink-0">
            <DecorativeImage
              src={Stack04}
              width={720}
              height={720}
              alt={contact.imageAlt}
              frameClassName="mx-auto aspect-square h-[34svh] max-md:my-4 max-md:h-[20svh]"
            />
          </div>
          <ul className="flex flex-col items-start justify-start !text-left">
            {CONTATOS.map(({ href, texto, Icone }, i) => {
              const externo = href.startsWith('http');
              return (
                <li key={href} {...revelar('right', i, 'mb-6 w-full last:mb-0')}>
                  <a
                    href={href}
                    className={link}
                    {...(externo && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    <Icone size={40} aria-hidden="true" className="shrink-0" />
                    <span>{texto}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Cena>
    </Section>
  );
}
