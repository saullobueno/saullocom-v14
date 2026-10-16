import HomePage from '../components/homePage';
import { featuredProjectsEn } from '../data/featuredProjects.en';
import { en } from '../i18n/en';
import { buildLinks, buildMeta } from '../i18n/seo';
import type { Route } from './+types/home.en';

export const meta: Route.MetaFunction = () => buildMeta('en', en);
export const links: Route.LinksFunction = () => buildLinks('en');

export default function HomeEn() {
  return <HomePage locale="en" t={en} projects={featuredProjectsEn} />;
}
