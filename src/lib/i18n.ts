export type Language = 'fr' | 'en';

export const translations = {
  fr: {
    nav: {
      about: 'À propos',
      skills: 'Compétences',
      projects: 'Projets',
      contact: 'Contact',
    },
    hero: {
      role: 'Data Analyst & Ingénieure IA',
      cta: 'Me contacter',
    },
    about: {
      title: 'À propos',
      description: "Je suis une Data Analyst et Ingénieure IA passionnée, spécialisée dans l'analyse de données, le machine learning et l'intelligence artificielle. Avec une solide expertise théorique et pratique en IA, j'aide les organisations à exploiter leurs données pour innover et prendre des décisions éclairées.",
    },
    skills: {
      title: 'Compétences',
      subtitle: "Un ensemble complet de compétences techniques et d'expertise que j'apporte à chaque projet.",
      list: [
        {
          name: 'Machine Learning',
          description: "Expertise approfondie en algorithmes d'apprentissage supervisé et non supervisé.",
        },
        {
          name: 'Analyse de Données',
          description: 'Compétences avancées en traitement de données et analyse statistique.',
        },
        {
          name: 'Programmation',
          description: 'Maîtrise de Python, R et JavaScript pour la data science.',
        },
        {
          name: 'Gestion de Bases de Données',
          description: 'Expérience avec les bases de données SQL et NoSQL.',
        },
        {
          name: 'Contrôle de Version',
          description: 'Git et workflows de développement collaboratif.',
        },
        {
          name: 'Cloud Computing',
          description: 'Services AWS et Google Cloud Platform.',
        },
      ],
    },
    projects: {
      title: 'Projets',
      subtitle: 'Une sélection de mes projets les plus impactants en data science et IA.',
      list: [
        {
          title: "Plateforme d'Analyse IA",
          description: "Une plateforme de machine learning pour l'analyse prédictive et la visualisation de données.",
          tags: ['Python', 'TensorFlow', 'React'],
        },
        {
          title: 'Automatisation de Pipeline de Données',
          description: "Pipeline ETL automatisé pour le traitement et l'analyse de grands ensembles de données.",
          tags: ['Apache Airflow', 'Python', 'SQL'],
        },
        {
          title: 'Outil de Traitement du Langage Naturel',
          description: "Outil d'analyse textuelle pour l'analyse de sentiment et la classification.",
          tags: ['NLP', 'Python', 'FastAPI'],
        },
      ],
    },
    contact: {
      title: 'Contact',
      subtitle: 'Vous avez un projet en tête ? Discutons de comment nous pouvons collaborer.',
      form: {
        name: 'Nom',
        email: 'Email',
        message: 'Message',
        submit: 'Envoyer',
      },
    },
  },
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      role: 'Data Analyst & AI Engineer',
      cta: 'Get in touch',
    },
    about: {
      title: 'About',
      description: "I'm a passionate Data Analyst and AI Engineer specializing in data analysis, machine learning, and artificial intelligence. With strong theoretical and practical expertise in AI, I help organizations leverage their data to innovate and make informed decisions.",
    },
    skills: {
      title: 'Skills',
      subtitle: 'A comprehensive set of technical skills and expertise that I bring to every project.',
      list: [
        {
          name: 'Machine Learning',
          description: 'Deep expertise in supervised and unsupervised learning algorithms.',
        },
        {
          name: 'Analyse de Données',
          description: 'Advanced data processing and statistical analysis skills.',
        },
        {
          name: 'Programmation',
          description: 'Proficient in Python, R, and JavaScript for data science.',
        },
        {
          name: 'Gestion de Bases de Données',
          description: 'Experience with SQL and NoSQL databases.',
        },
        {
          name: 'Contrôle de Version',
          description: 'Git and collaborative development workflows.',
        },
        {
          name: 'Cloud Computing',
          description: 'AWS and Google Cloud Platform services.',
        },
      ],
    },
    projects: {
      title: 'Projects',
      subtitle: 'A selection of my most impactful projects in data science and AI.',
      list: [
        {
          title: 'AI-Powered Analytics Platform',
          description: 'A machine learning platform for predictive analytics and data visualization.',
          tags: ['Python', 'TensorFlow', 'React'],
        },
        {
          title: 'Data Pipeline Automation',
          description: 'Automated ETL pipeline for processing and analyzing large datasets.',
          tags: ['Apache Airflow', 'Python', 'SQL'],
        },
        {
          title: 'Natural Language Processing Tool',
          description: 'Text analysis tool for sentiment analysis and classification.',
          tags: ['NLP', 'Python', 'FastAPI'],
        },
      ],
    },
    contact: {
      title: 'Contact',
      subtitle: "Have a project in mind? Let's discuss how we can work together.",
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        submit: 'Send Message',
      },
    },
  },
};