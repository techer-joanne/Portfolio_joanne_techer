import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface SidebarToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function SidebarToggle({ isOpen, onToggle }: SidebarToggleProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed left-4 top-4 z-50"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className={`rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background ${
          isOpen ? 'rotate-90' : ''
        }`}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </motion.div>
  );
}