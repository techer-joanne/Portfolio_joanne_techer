import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Home,
  User,
  Briefcase,
  Mail,
  Github,
  Linkedin,
  Plus,
  X,
} from 'lucide-react';
import { ProjectDialog } from './project-dialog';
import { CVPreview } from './cv-preview';
import { useState } from 'react';

interface SidebarContentProps {
  onClose: () => void;
}

const navigation = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'À propos', href: '#about', icon: User },
  { name: 'Projets', href: '#projects', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail },
];

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/techer-joanne',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/joanne-techer-91b5a4239/',
    icon: Linkedin,
  },
];

export function SidebarContent({ onClose }: SidebarContentProps) {
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const handleNavigation = (href: string) => {
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    onClose();
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex h-full w-full flex-col pt-16"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute right-2 top-4"
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="flex flex-col items-center space-y-4 p-6">
        <motion.div variants={itemVariants}>
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://github.com/techer-joanne.png" alt="Joanne Techer" />
            <AvatarFallback>JT</AvatarFallback>
          </Avatar>
        </motion.div>
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-xl font-semibold">Joanne Techer</h2>
          <p className="text-sm text-muted-foreground">Data Analyst & IA Engineer</p>
        </motion.div>
      </div>

     

      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-4">
          {navigation.map((item) => (
            <motion.div key={item.name} variants={itemVariants}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                onClick={() => handleNavigation(item.href)}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            </motion.div>
          ))}
          
          <motion.div variants={itemVariants}className="mb-4">
            <Button
              className="w-full justify-start gap-2"
              onClick={() => setIsProjectDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Ajouter un projet
            </Button>
          </motion.div>
        </nav>



        <div className="space-y-4">
          <motion.div variants={itemVariants}className="mt-4">
            <CVPreview />
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex justify-center space-x-2">
              {socials.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  asChild
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </ScrollArea>

      <ProjectDialog
        open={isProjectDialogOpen}
        onOpenChange={setIsProjectDialogOpen}
      />
    </motion.div>
  );
}