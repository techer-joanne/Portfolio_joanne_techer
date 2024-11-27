import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { content } from '@/lib/content';
import { Sparkles } from 'lucide-react';

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const words = content.about.description.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-background to-background/50 py-24 sm:py-32"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="relative inline-block">
            <h2 className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              {content.about.title}
            </h2>
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute -right-6 -top-1"
            >
              <Sparkles className="h-6 w-6 text-blue-400" />
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-8 text-lg leading-relaxed tracking-wide"
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                whileHover={{ 
                  scale: 1.1,
                  color: "rgb(147, 197, 253)", // text-blue-300
                  transition: { duration: 0.2 }
                }}
                className="mx-1 inline-block cursor-default text-blue-200/80 transition-all duration-200"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}