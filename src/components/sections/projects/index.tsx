import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles } from 'lucide-react';
import { content } from '@/lib/content';
import { useState, useRef, useEffect } from 'react';
import { ProjectCard } from './project-card';
import { ProjectModal } from './project-modal';
import { useMediaQuery } from '@/hooks/use-media-query';
import type { Project } from './types';

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const modalTimeout = useRef<NodeJS.Timeout>();

  const handleMouseEnter = (project: Project) => {
    if (!isMobile) {
      modalTimeout.current = setTimeout(() => {
        setSelectedProject(project);
        setModalOpen(true);
      }, 1000);
    }
  };

  const handleMouseLeave = () => {
    if (modalTimeout.current) {
      clearTimeout(modalTimeout.current);
    }
  };

  useEffect(() => {
    return () => {
      if (modalTimeout.current) clearTimeout(modalTimeout.current);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Adjust grid layout based on screen size
  const gridClassName = isMobile
    ? "grid grid-cols-1 gap-6"
    : isTablet
    ? "grid grid-cols-2 gap-6"
    : "grid grid-cols-3 gap-8";

  return (
    <section id="projects" ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-small-white/[0.02]" />
        <div className="absolute h-full w-full bg-[radial-gradient(circle_800px_at_50%_-100px,rgba(59,130,246,0.1),transparent)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="relative inline-block">
            <h2 className={`font-heading bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent ${
              isMobile ? "sm:text-4xl" : "sm:text-5xl md:text-6xl"
            }`}>
              {content.projects.title}
            </h2>
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute -right-6 -top-1"
            >
              <Sparkles className="h-6 w-6 text-primary" />
            </motion.div>
          </div>
          <p className="mt-6 text-lg font-medium leading-8">
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {content.projects.subtitle}
            </span>
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`mx-auto mt-16 max-w-7xl ${gridClassName}`}
        >
          {content.projects.list.map((project, index) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="flex h-full"
            >
              <ProjectCard
                project={project}
                onHover={handleMouseEnter}
                onLeave={handleMouseLeave}
                onClick={(p) => {
                  setSelectedProject(p);
                  setModalOpen(true);
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}