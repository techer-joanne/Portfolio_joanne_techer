import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import type { Project } from './types';

interface ProjectCardProps {
  project: Project;
  onHover: (project: Project) => void;
  onLeave: () => void;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, onHover, onLeave, onClick }: ProjectCardProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <Card 
      className="group relative flex h-full w-full flex-col overflow-hidden border-primary/10 bg-background/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
      onClick={() => onClick(project)}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={onLeave}
    >
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="relative flex flex-1 flex-col space-y-4 p-6">
        <h3 className={`font-heading font-bold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors ${
          isMobile ? "text-lg" : "text-xl"
        }`}>
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground flex-grow">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        <ExternalLink className="absolute right-4 top-4 h-5 w-5 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100" />
      </div>
    </Card>
  );
}