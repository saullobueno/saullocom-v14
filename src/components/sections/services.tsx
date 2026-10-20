import Stack03 from '../../assets/imageStack03.avif';
import { useMessages } from '../../i18n';
import { revelar } from '../reveal';
import Section, {
  Cena,
  DecorativeImage,
  SectionLead,
  SectionTitle,
  SubTitle,
  Text,
} from '../section';

export default function Services() {
  const { nav, services } = useMessages();
  return (
    <Section id="services" tone="text-oque-faco">
      <Cena rotulo={nav.services}>
        <SectionTitle id="services-title">{services.title}</SectionTitle>
        <SectionLead>{services.lead}</SectionLead>

        {/* mobile: so o 1o servico (Design & UI/UX) fica ao lado da imagem; os demais usam a largura toda */}
        <div className="grid grid-cols-3 items-start justify-items-center gap-[1.5em] max-md:grid-cols-[1fr_40%] max-md:gap-x-4 max-md:gap-y-6 [&>div]:text-left">
          <div className="max-md:contents">
            {services.left.map((item, i) => (
              <div
                key={item.title}
                {...revelar(
                  'left',
                  i,
                  `mb-6 last:mb-0 max-md:mb-0 ${i > 0 ? 'max-md:col-span-2' : ''}`,
                )}
              >
                <SubTitle>{item.title}</SubTitle>
                <Text>{item.text}</Text>
              </div>
            ))}
          </div>
          <div className="max-md:contents">
            {services.middle.map((item, i) => (
              <div
                key={item.title}
                {...revelar('up', i, `mb-6 last:mb-0 max-md:mb-0 max-md:col-span-2`)}
              >
                <SubTitle>{item.title}</SubTitle>
                <Text>{item.text}</Text>
              </div>
            ))}
          </div>
          <div className="w-full max-md:col-start-2 max-md:row-start-1 max-md:self-center">
            <DecorativeImage
              src={Stack03}
              width={540}
              height={720}
              alt={services.imageAlt}
              frameClassName="mx-auto aspect-[3/4] h-[min(40svh,380px)] max-md:h-auto max-md:w-full"
            />
          </div>
        </div>
      </Cena>
    </Section>
  );
}
