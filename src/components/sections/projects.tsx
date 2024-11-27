import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ExternalLink, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { content } from '@/lib/content';
import { useState, useRef, useEffect } from 'react';

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof content.projects.list[0] | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollSpeed = 1;
  const controls = useAnimation();

  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp: number;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      
      if (!isPaused && !isDragging && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        setScrollPosition((prevPosition) => {
          const newPosition = prevPosition + scrollSpeed * (delta /5);
          if (newPosition >= maxScroll) {
            return newPosition - maxScroll;
          }
          return newPosition;
        });
        
        container.scrollLeft = scrollPosition;
      }
      
      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPaused, scrollPosition, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current!.offsetLeft);
    setScrollLeft(scrollContainerRef.current!.scrollLeft);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current!.offsetLeft);
    setScrollLeft(scrollContainerRef.current!.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const newPosition = direction === 'left' 
      ? scrollPosition - scrollAmount 
      : scrollPosition + scrollAmount;

    setScrollPosition(newPosition);
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };

  const handleProjectClick = (project: typeof content.projects.list[0]) => {
    if (!isDragging) {
      setSelectedProject(project);
      setModalOpen(true);
    }
  };

  let modalCloseTimeout: NodeJS.Timeout;

  const handleProjectHover = (project: typeof content.projects.list[0]) => {
    if (!isDragging) {
      modalCloseTimeout = setTimeout(() => {
        setSelectedProject(project);
        setModalOpen(true);
      }, 2000);
    }
  };

  const handleProjectLeave = () => {
    clearTimeout(modalCloseTimeout);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
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
              <h2 className="font-heading bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
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

          <div 
            className="relative mt-16"
            onMouseEnter={() => {
              setShowArrows(true);
              setIsPaused(true);
            }}
            onMouseLeave={() => {
              setShowArrows(false);
              setIsPaused(false);
            }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              ref={scrollContainerRef}
              className="flex touch-pan-x gap-8 overflow-x-auto scroll-smooth pb-8 scrollbar-hide"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleDragEnd}
            >
              {[...content.projects.list, ...content.projects.list].map((project, index) => (
                <motion.div 
                  key={`${project.title}-${index}`}
                  variants={cardVariants}
                  className="min-w-[320px] sm:min-w-[384px] touch-pan-x"
                  style={{ scrollSnapAlign: 'start' }}
                  onClick={() => handleProjectClick(project)}
                  onMouseEnter={() => handleProjectHover(project)}
                  onMouseLeave={handleProjectLeave}
                >
                  <Card className="group relative h-full overflow-hidden border-primary/10 bg-background/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                    <div className="relative aspect-video overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        draggable="false"
                      />
                    </div>
                    <div className="relative space-y-4 p-6">
                      <h3 className="font-heading text-xl font-bold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
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
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showArrows ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-y-0 left-0 flex items-center"
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-background/80 text-primary backdrop-blur-sm transition-all hover:bg-background hover:text-primary/80"
                onClick={() => handleScroll('left')}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showArrows ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-y-0 right-0 flex items-center"
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-background/80 text-primary backdrop-blur-sm transition-all hover:bg-background hover:text-primary/80"
                onClick={() => handleScroll('right')}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <DialogTitle className="text-2xl font-bold text-foreground">
                {selectedProject.title}
              </DialogTitle>
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="mt-4 text-muted-foreground">
                  {selectedProject.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
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
                  onClick={() => window.open(selectedProject.link, '_blank', 'noopener,noreferrer')}
                >
                  Voir le projet <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}