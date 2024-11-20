import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Projects } from '@/components/sections/projects';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.5, 0.2]);

  const sectionVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 1.2,
        bounce: 0.3
      }
    }
  };

  const alternateVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 1.2,
        bounce: 0.3
      }
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div ref={containerRef} className="relative min-h-screen bg-background font-sans antialiased">
        <motion.div 
          className="fixed inset-0 z-0"
          style={{ 
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)",
            y: backgroundY,
            opacity: backgroundOpacity
          }}
        />
        
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-grid-small-white/[0.02]" />
        </div>

        <div className="relative z-10">
          <Header />
          <main className="relative">
            <Hero />
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
              <About />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={alternateVariants}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent" />
              <Skills />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
              <Projects />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={alternateVariants}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent" />
              <Contact />
            </motion.div>
          </main>
          <Footer />
        </div>

        <motion.div
          className="fixed bottom-0 left-0 h-1 bg-primary/20"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />
      </div>
    </ThemeProvider>
  );
}