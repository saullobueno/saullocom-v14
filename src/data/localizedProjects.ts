import type { Locale } from '../i18n';
import { featuredProjects, type FeaturedProject } from './featuredProjects';
import { featuredProjectsEn } from './featuredProjects.en';

// Projeto com os textos no idioma pedido (pt e o padrao; en sobrescreve apenas os textos).
export function getFeaturedProjects(locale: Locale): FeaturedProject[] {
  if (locale === 'pt') return featuredProjects;
  return featuredProjects.map((projeto) => ({ ...projeto, ...featuredProjectsEn[projeto.slug] }));
}
