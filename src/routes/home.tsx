import HomePage from '../components/homePage';
import { buildLinks, buildMeta } from '../i18n/seo';
import type { Route } from './+types/home';

export const meta: Route.MetaFunction = () => buildMeta('pt');
export const links: Route.LinksFunction = () => buildLinks('pt');

export default function Home() {
  return <HomePage locale="pt" />;
}
