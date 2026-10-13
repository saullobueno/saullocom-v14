import HomePage from '../components/homePage';
import { buildLinks, buildMeta } from '../i18n/seo';
import type { Route } from './+types/home.en';

export const meta: Route.MetaFunction = () => buildMeta('en');
export const links: Route.LinksFunction = () => buildLinks('en');

export default function HomeEn() {
  return <HomePage locale="en" />;
}
