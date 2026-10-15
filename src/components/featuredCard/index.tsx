import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

import type { FeaturedProject } from '../../data/featuredProjects';
import ProjectGallery from '../projectGallery';
import { revelar } from '../reveal';

const action =
  'inline-flex items-center gap-2 rounded-lg border px-[1em] py-[0.45em] text-[0.85em] font-semibold no-underline transition [&_svg]:m-1.5';
const github = `${action} border-white/20 bg-white/10 text-white hover:border-white hover:bg-white/20`;
const demo = `${action} border-accent-strong bg-accent-strong text-white hover:border-accent-strong-hover hover:bg-accent-strong-hover`;

interface FeaturedCardProps {
  project: FeaturedProject;
  onOpenImage: (index: number) => void;
}

export default function FeaturedCard({ project, onOpenImage }: FeaturedCardProps) {
  return (
    <article className="grid grid-cols-[0.9fr_1.1fr] content-start items-start gap-x-[2.2em] gap-y-[0.8em] [grid-template-areas:'gallery_header'_'gallery_body'] max-lg:grid-cols-1 max-lg:gap-[1em] max-lg:[grid-template-areas:'header'_'gallery'_'body']">
      <header {...revelar('right', 0, 'text-left [grid-area:header]')}>
        <h3 className="mb-[0.1em] text-left text-[1.7em] leading-[1.25] font-bold text-white">
          {project.title}
        </h3>
        <div className="text-left text-[1.05em] leading-[1.3] font-medium text-accent">
          {project.subtitle}
        </div>
      </header>

      <ProjectGallery images={project.images} title={project.title} onOpenImage={onOpenImage} />

      <div className="flex flex-col text-left [grid-area:body]">
        <p {...revelar('up', 0, 'mb-[0.9em] text-left text-[0.9em] leading-[1.5] text-[#ccc]')}>
          {project.description}
        </p>

        <ul className="mb-[0.9em] p-0 text-left">
          {project.highlights.map((highlight, i) => (
            <li
              key={highlight}
              {...revelar(
                'up',
                i,
                "mb-[0.3em] flex items-baseline gap-2 text-left text-[0.85em] leading-[1.4] text-[#bbb] before:text-base before:leading-none before:text-accent before:content-['▹']",
                { atraso: '45ms' },
              )}
            >
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mb-[1em] flex flex-wrap gap-[0.4em]">
          {project.stack.map((tech, i) => (
            <span
              key={tech}
              {...revelar(
                'pop',
                i,
                'rounded-[20px] border border-[rgba(0,133,178,0.3)] bg-[rgba(0,133,178,0.15)] px-[0.65em] py-[0.15em] text-[0.8em] font-medium text-badge',
                { atraso: '25ms' },
              )}
            >
              {tech}
            </span>
          ))}
        </div>

        <div {...revelar('up', 0, 'flex flex-wrap gap-[0.8em]')}>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={github}>
            <FaGithub size={18} /> GitHub
          </a>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={demo}>
              <FaExternalLinkAlt size={14} /> {project.demoUrlLabel || 'Demo'}
            </a>
          )}
          {project.demoMobileUrl && (
            <a
              href={project.demoMobileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={demo}
            >
              <FaExternalLinkAlt size={14} /> {project.demoMobileUrlLabel || 'Demo Mobile'}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
