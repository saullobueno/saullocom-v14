import Stack01 from '../../assets/imageStack01.avif';
import { useMessages } from '../../i18n';
import { revelar } from '../reveal';
import Section, {
  Cena,
  Columns,
  DecorativeImage,
  SectionLead,
  SectionTitle,
  Text,
} from '../section';

export default function About() {
  const { nav, about } = useMessages();
  return (
    <Section id="about" tone="text-trajetoria">
      <Cena rotulo={nav.about}>
        <SectionTitle id="about-title">{about.title}</SectionTitle>
        <SectionLead>{about.lead}</SectionLead>
        <Columns>
          <div className="w-full">
            <DecorativeImage
              src={Stack01}
              width={720}
              height={720}
              alt={about.imageAlt}
              frameClassName="mx-auto aspect-square max-h-[34svh] max-md:my-4 max-md:max-h-[20svh]"
            />
          </div>
          <div {...revelar('up', 1)}>
            <Text>{about.paragraphs[0]}</Text>
            <Text>{about.paragraphs[1]}</Text>
          </div>
          <div {...revelar('up', 2)}>
            <Text>{about.paragraphs[2]}</Text>
            <Text>{about.paragraphs[3]}</Text>
          </div>
        </Columns>
      </Cena>
    </Section>
  );
}
