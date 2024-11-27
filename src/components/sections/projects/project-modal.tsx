import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import type { Project } from './types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({ project, isOpen, onOpenChange }: ProjectModalProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? "w-[95vw] max-w-none" : "sm:max-w-[600px]"}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <DialogTitle className={`${isMobile ? "text-xl" : "text-2xl"} font-bold text-foreground`}>
            {project.title}
          </DialogTitle>
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="mt-4 text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Button
              className="mt-6 w-full"
              onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
            >
              Voir le projet <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}