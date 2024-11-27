import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, Download, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function CVPreview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const sparkleVariants = {
    initial: { rotate: 0, scale: 1 },
    animate: {
      rotate: [0, 15, -15, 0],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const imageContainerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <motion.div
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        className="relative"
      >
        <Button
          variant="outline"
          className="relative w-full justify-start gap-2 overflow-hidden hover:bg-primary/10"
          onClick={() => setIsModalOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '100%' : '-100%' }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <FileText className="h-4 w-4 text-primary" />
          <span className="relative z-10">Voir mon CV</span>
          <motion.div
            className="absolute right-2 top-1/2 -translate-y-1/2"
            variants={sparkleVariants}
            initial="initial"
            animate="animate"
          >
            <Sparkles className="h-4 w-4 text-primary" />
          </motion.div>
        </Button>
      </motion.div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              <FileText className="h-5 w-5 text-primary" />
              Mon CV
              <motion.div
                variants={sparkleVariants}
                initial="initial"
                animate="animate"
                className="ml-2"
              >
                <Sparkles className="h-4 w-4 text-primary" />
              </motion.div>
            </DialogTitle>
          </DialogHeader>
          
          <motion.div
            variants={imageContainerVariants}
            initial="initial"
            animate="animate"
            className="relative aspect-[1/1.4] w-full overflow-hidden rounded-lg border bg-background shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
            <object
              data="/cv.pdf"
              type="application/pdf"
              className="h-full w-full"
            >
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-full bg-primary/10 p-4"
                >
                  <FileText className="h-12 w-12 text-primary" />
                </motion.div>
                <p className="text-center text-muted-foreground">
                  Le PDF ne peut pas être affiché. Vous pouvez le télécharger en cliquant sur le bouton ci-dessous.
                </p>
                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <Button asChild className="relative overflow-hidden">
                    <a 
                      href="/cv.pdf" 
                      download 
                      className="flex items-center gap-2"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: isHovered ? '100%' : '-100%' }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      />
                      <Download className="h-4 w-4" />
                      <span className="relative z-10">Télécharger le CV</span>
                    </a>
                  </Button>
                </motion.div>
              </div>
            </object>
          </motion.div>

          <div className="mt-4 flex justify-end">
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
            >
              <Button 
                onClick={() => setIsModalOpen(false)}
                className="relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: isHovered ? '100%' : '-100%' }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
                <span className="relative z-10">Fermer</span>
              </Button>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}