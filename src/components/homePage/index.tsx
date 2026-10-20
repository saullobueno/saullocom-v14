import type { FeaturedProject } from '../../data/featuredProjects';
import { LocaleProvider, useMessages, type Locale, type Messages } from '../../i18n';
import Footer from '../footer';
import Header from '../header';
import Nav from '../nav';
import Palco from '../palco';
import About from '../sections/about';
import Contact from '../sections/contact';
import Expertise from '../sections/expertise';
import Portfolio from '../sections/portfolio';
import Services from '../sections/services';

function Pagina({ projects }: { projects: FeaturedProject[] }) {
  const { footer } = useMessages();
  return (
    <>
      <Nav />
      <Header />

      <Palco>
        <About />
        <Expertise />
        <Services />
        <Portfolio projects={projects} />
        <Contact />
      </Palco>

      <Footer>
        <p>{footer.authorship}</p>
        <p>{footer.copyright}</p>
      </Footer>
    </>
  );
}

interface HomePageProps {
  locale: Locale;
  /** textos do idioma (cada rota importa so o seu) */
  t: Messages;
  projects: FeaturedProject[];
}

export default function HomePage({ locale, t, projects }: HomePageProps) {
  return (
    <LocaleProvider locale={locale} t={t}>
      <Pagina projects={projects} />
    </LocaleProvider>
  );
}
