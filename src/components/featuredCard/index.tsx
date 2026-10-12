import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

import type { FeaturedProject } from '../../data/featuredProjects';
import ProjectGallery from '../projectGallery';

const action =
  'inline-flex items-center gap-2 rounded-lg border px-[1.2rem] py-[0.6rem] text-[0.9rem] font-semibold no-underline transition [&_svg]:m-2.5';
const github = `${action} border-white/20 bg-white/10 text-white hover:border-white hover:bg-white/20`;
const demo = `${action} border-accent-strong bg-accent-strong text-white hover:border-accent-strong-hover hover:bg-accent-strong-hover`;

interface FeaturedCardProps {
  project: FeaturedProject;
  onOpenImage: (index: number) => void;
}

export default function FeaturedCard({ project, onOpenImage }: FeaturedCardProps) {
  return (
    <article className="grid grid-cols-[1.1fr_1fr] content-start items-start gap-10 [grid-template-areas:'gallery_header'_'gallery_body'] max-lg:grid-cols-1 max-lg:gap-6 max-lg:[grid-template-areas:'header'_'gallery'_'body']">
      <header className="text-left [grid-area:header]">
        <h3 className="mb-[0.2rem] text-left text-[1.8rem] leading-[1.3] font-bold text-white">
          {project.title}
        </h3>
        <div className="text-left text-[1.05rem] font-medium text-accent">{project.subtitle}</div>
      </header>

      <ProjectGallery images={project.images} title={project.title} onOpenImage={onOpenImage} />

      <div className="flex flex-col text-left [grid-area:body]">
        <p className="mb-[1.2rem] text-left text-[0.95rem] leading-[1.6] text-[#ccc]">
          {project.description}
        </p>

        <ul className="mb-[1.2rem] p-0 text-left leading-[180%]">
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              className="mb-[0.4rem] flex items-start gap-2 text-left text-[0.9rem] text-[#bbb] before:text-base before:leading-none before:text-accent before:content-['▹']"
            >
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-[20px] border border-[rgba(0,133,178,0.3)] bg-[rgba(0,133,178,0.15)] px-[0.65rem] py-1 text-[0.8rem] font-medium text-badge"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
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
