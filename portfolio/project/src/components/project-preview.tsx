import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import type { Project } from '@/types/project';

interface ProjectPreviewProps {
  project: Project;
  className?: string;
}

export function ProjectPreview({ project, className = '' }: ProjectPreviewProps) {
  const [iframeError, setIframeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative aspect-video overflow-hidden rounded-lg ${className}`}>
      {isLoading && (
        <Skeleton className="absolute inset-0 bg-primary/10" />
      )}
      
      {!iframeError ? (
        <iframe
          src={project.link}
          title={project.title}
          className={`h-full w-full border-0 transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIframeError(true);
            setIsLoading(false);
          }}
          sandbox="allow-scripts allow-same-origin"
        />
      ) : (
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
          onLoad={() => setIsLoading(false)}
        />
      )}
    </div>
  );
}