import Stack02 from '../../assets/imageStack02.avif';
import { useMessages } from '../../i18n';
import { revelar } from '../reveal';
import Section, {
  Cena,
  Columns,
  DecorativeImage,
  SectionLead,
  SectionTitle,
  SubTitle,
  Text,
} from '../section';

export default function Expertise() {
  const { nav, expertise } = useMessages();
  return (
    <Section id="expertise" tone="text-expertise">
      <Cena rotulo={nav.expertise}>
        <SectionTitle id="expertise-title">{expertise.title}</SectionTitle>
        <SectionLead>{expertise.lead}</SectionLead>

        <Columns>
          {/* desktop: a coluna da esquerda alinha a direita, encostada na imagem */}
          <div className="w-full">
            {expertise.left.map((item, i) => (
              <div key={item.title} {...revelar('left', i, 'mb-6 last:mb-0')}>
                <SubTitle className="md:text-right">{item.title}</SubTitle>
                <Text className="md:text-right">{item.text}</Text>
              </div>
            ))}
          </div>
          <div className="w-full">
            <DecorativeImage
              src={Stack02}
              width={540}
              height={1079}
              alt={expertise.imageAlt}
              frameClassName="mx-auto aspect-[540/1079] h-[min(46svh,420px)] max-md:hidden"
            />
          </div>
          <div>
            {expertise.right.map((item, i) => (
              <div key={item.title} {...revelar('right', i, 'mb-6 last:mb-0')}>
                <SubTitle>{item.title}</SubTitle>
                <Text>{item.text}</Text>
              </div>
            ))}
          </div>
        </Columns>
      </Cena>
    </Section>
  );
}
