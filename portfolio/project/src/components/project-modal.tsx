import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ExternalLink } from 'lucide-react';
import { ProjectPreview } from '@/components/project-preview';
import type { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">
          Détails du projet : {project.title}
        </DialogTitle>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <ProjectPreview project={project} className="rounded-lg" />
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              {project.title}
            </h3>
            <p className="text-lg text-muted-foreground">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Button
              className="mt-8 w-full text-lg py-6"
              onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
            >
              Voir le projet <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}