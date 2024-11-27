import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Brain,
  Database,
  Code,
  LineChart,
  GitBranch,
  Cloud,
  BarChart,
  Table,
  FileSpreadsheet,
  Bot,
  Globe,
  Workflow,
  Binary,
  BarChart3,
  FileCode,
  Network,
  Sparkles,
} from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ElementType;
  proficiency: number;
  row: number;
}

const hardSkills: Skill[] = [
  { name: 'SQL', icon: Database, proficiency: 90, row: 1 },
  { name: 'MySQL', icon: Database, proficiency: 85, row: 1 },
  { name: 'Python', icon: Code, proficiency: 95, row: 1 },
  { name: 'Pandas', icon: Table, proficiency: 92, row: 1 },
  { name: 'NumPy', icon: Binary, proficiency: 88, row: 1 },
  { name: 'Scikit-learn', icon: Brain, proficiency: 85, row: 1 },
  { name: 'Power BI', icon: BarChart, proficiency: 90, row: 1 },
  { name: 'Machine Learning', icon: Brain, proficiency: 85, row: 1 },
  { name: 'Langchain', icon: Network, proficiency: 80, row: 1 },
  { name: 'Matplotlib', icon: LineChart, proficiency: 88, row: 2 },
  { name: 'Seaborn', icon: BarChart3, proficiency: 85, row: 2 },
  { name: 'Plotly', icon: LineChart, proficiency: 82, row: 2 },
  { name: 'Web Scraping', icon: Globe, proficiency: 88, row: 2 },
  { name: 'API RESTful', icon: Cloud, proficiency: 85, row: 2 },
  { name: 'Data Cleaning', icon: FileSpreadsheet, proficiency: 92, row: 2 },
  { name: 'HTML/CSS', icon: FileCode, proficiency: 85, row: 2 },
  { name: 'Git', icon: GitBranch, proficiency: 88, row: 2 },
  { name: 'GitHub', icon: GitBranch, proficiency: 90, row: 2 },
  { name: 'Excel', icon: FileSpreadsheet, proficiency: 95, row: 1 },
  { name: 'VBA', icon: Code, proficiency: 82, row: 1 },
  { name: 'Dataiku', icon: Workflow, proficiency: 85, row: 2 },
  { name: 'SQLAlchemy', icon: Database, proficiency: 85, row: 2 },
  { name: 'Streamlit', icon: BarChart, proficiency: 90, row: 2 },
  { name: 'LLM', icon: Bot, proficiency: 85, row: 1 },
];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
      const timer = setTimeout(() => {
        setProgress(skill.proficiency);
      }, index * 100);
      return () => clearTimeout(timer);
    }
  }, [inView, controls, skill.proficiency, index]);

  const Icon = skill.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex w-72 flex-col gap-2 rounded-xl border bg-background/50 p-6 backdrop-blur-sm transition-shadow duration-300 ${
        isHovered ? 'shadow-xl shadow-blue-500/10' : 'shadow-lg'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300 ${
          isHovered ? 'bg-blue-500/30' : 'bg-blue-500/20'
        }`}>
          <Icon className={`h-6 w-6 transition-colors duration-300 ${
            isHovered ? 'text-blue-400' : 'text-blue-500'
          }`} />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{skill.name}</h3>
      </div>
      <div className="mt-2">
        <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-blue-950">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, 
                ${isHovered ? 'rgb(59, 130, 246)' : 'rgb(37, 99, 235)'} ${progress * 0.6}%, 
                ${isHovered ? 'rgb(96, 165, 250)' : 'rgb(59, 130, 246)'} ${progress}%)`
            }}
          />
        </div>
        <div className="mt-2 text-right">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
            className={`text-sm font-medium transition-colors duration-300 ${
              isHovered ? 'text-blue-400' : 'text-blue-500'
            }`}
          >
            {progress}%
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const row1Skills = hardSkills.filter(skill => skill.row === 1);
  const row2Skills = hardSkills.filter(skill => skill.row === 2);

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="skills" ref={ref} className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={titleVariants}
            className="relative inline-block"
          >
            <h2 className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              Hard Skills
            </h2>
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute -right-6 -top-1"
            >
              <Sparkles className="h-6 w-6 text-blue-400" />
            </motion.div>
          </motion.div>
          <motion.p
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={subtitleVariants}
            className="mt-6 text-lg font-medium leading-8"
          >
            <span className="inline-block bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              Expertise technique
            </span>{" "}
            <span className="text-blue-200/80">et</span>{" "}
            <span className="inline-block bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              compétences professionnelles
            </span>
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mt-16 flex max-w-7xl flex-col gap-8"
        >
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex animate-scroll gap-6">
              {row1Skills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex animate-scroll-reverse gap-6">
              {row2Skills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}