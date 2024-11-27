import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, ArrowDown } from 'lucide-react';
import { content } from '@/lib/content';

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-7xl">
            Joanne Techer
          </h1>
          <p className="mt-6 text-xl leading-8 text-muted-foreground">
            {content.hero.role}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild>
              <a href="#contact">{content.hero.cta}</a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/techer-joanne"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/joanne-techer-91b5a4239/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <Button variant="ghost" size="icon" asChild>
            <a href="#about">
              <ArrowDown className="h-5 w-5 animate-bounce" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}