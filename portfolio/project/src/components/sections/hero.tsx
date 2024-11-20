import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, ArrowDown, Sparkles } from 'lucide-react';
import { content } from '@/lib/content';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from '@/components/theme-provider';

const AnimatedButton = motion(Button);

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const ref = useRef(null);
  const mainButtonControls = useAnimation();
  const githubButtonControls = useAnimation();
  const linkedinButtonControls = useAnimation();
  const { theme } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0]);
  const nameArray = "Joanne Techer".split("");

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((current) => (current + 1) % content.hero.roles.length);
    }, 3000); // Change role every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animateButtons = async () => {
      await mainButtonControls.start({
        scale: [1, 1.1, 1],
        rotate: [0, -2, 2, 0],
        y: [0, -5, 0],
        transition: {
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }
      });
    };

    const animateIconButtons = async () => {
      await Promise.all([
        githubButtonControls.start({
          rotate: [0, 10, -10, 0],
          transition: { 
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity
          }
        }),
        linkedinButtonControls.start({
          scale: [1, 1.1, 1],
          transition: { 
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity
          }
        })
      ]);
    };

    animateButtons();
    animateIconButtons();
  }, [mainButtonControls, githubButtonControls, linkedinButtonControls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  const mainButtonVariants = {
    hover: {
      scale: 1.15,
      rotate: [-3, 3],
      transition: {
        scale: {
          duration: 0.2,
          ease: "easeInOut"
        },
        rotate: {
          duration: 0.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }
      }
    },
    tap: {
      scale: 0.95,
      rotate: 0
    }
  };

  const iconButtonVariants = {
    hover: {
      scale: 1.2,
      rotate: 15,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.9,
      rotate: -15
    }
  };

  return (
    <section ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden py-20">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ opacity }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-small-white/[0.02]" />
          <div className="absolute h-full w-full bg-[radial-gradient(circle_500px_at_50%_200px,rgba(59,130,246,0.1),transparent)]" />
        </div>
      </motion.div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="relative inline-block">
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-7xl"
            >
              {nameArray.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  whileHover={{
                    scale: 1.2,
                    color: "rgb(147, 197, 253)",
                    transition: { duration: 0.2 }
                  }}
                  className="inline-block cursor-default transition-all duration-200"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
              className="absolute -right-8 -top-2"
            >
              <Sparkles className="h-8 w-8 text-blue-400" />
            </motion.div>
          </div>

          <motion.div className="relative h-[40px] mt-6">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute left-0 right-0 text-xl leading-8 text-muted-foreground"
            >
              <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                {content.hero.roles[roleIndex]}
              </span>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <AnimatedButton
              animate={mainButtonControls}
              whileHover="hover"
              whileTap="tap"
              variants={mainButtonVariants}
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 hover:from-blue-500 hover:to-blue-400"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-transparent"
                animate={{
                  x: ["0%", "200%"],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              />
              <a href="#contact" className="relative block px-4 py-2">
                <motion.span className="relative z-10">
                  {content.hero.cta}
                </motion.span>
              </a>
            </AnimatedButton>
            
            <AnimatedButton
              variant="ghost"
              size="icon"
              asChild
              animate={githubButtonControls}
              whileHover="hover"
              whileTap="tap"
              variants={iconButtonVariants}
            >
              <a
                href="https://github.com/techer-joanne"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-blue-400"
              >
                <Github className="h-5 w-5" />
              </a>
            </AnimatedButton>
            
            <AnimatedButton
              variant="ghost"
              size="icon"
              asChild
              animate={linkedinButtonControls}
              whileHover="hover"
              whileTap="tap"
              variants={iconButtonVariants}
            >
              <a
                href="https://www.linkedin.com/in/joanne-techer-91b5a4239/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-blue-400"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="fixed bottom-16 left-1/2 z-50 -translate-x-1/2"
      >
        <AnimatedButton
          variant="ghost"
          size="icon"
          asChild
          whileHover="hover"
          whileTap="tap"
          variants={iconButtonVariants}
          className="bg-background/20 backdrop-blur-sm"
        >
          <a href="#about">
            <ArrowDown className="h-5 w-5 animate-bounce text-blue-400" />
          </a>
        </AnimatedButton>
      </motion.div>
    </section>
  );
}