import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { content } from '@/lib/content';

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" ref={ref} className="bg-muted/50 py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {content.contact.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {content.contact.subtitle}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mt-16 max-w-xl"
        >
          <form className="space-y-6">
            <div>
              <Label htmlFor="name">{content.contact.form.name}</Label>
              <Input
                id="name"
                type="text"
                placeholder={content.contact.form.name}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email">{content.contact.form.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={content.contact.form.email}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="message">{content.contact.form.message}</Label>
              <Textarea
                id="message"
                placeholder={content.contact.form.message}
                className="mt-2"
                rows={6}
              />
            </div>
            <Button type="submit" className="w-full">
              {content.contact.form.submit}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}