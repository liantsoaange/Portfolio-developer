import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const DICTIONARY: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation & Layout
    'nav.profile': 'À PROPOS',
    'nav.projects': 'PROJETS',
    'nav.experiences': 'EXPÉRIENCES',
    'nav.parcours': 'PARCOURS',
    'nav.certificats': 'CERTIFICATS',
    'nav.creations': 'CRÉATIONS',
    'nav.contact': 'Contact',
    'nav.lang': 'EN',
    
    // Header/Hero details
    'hero.badge': 'DÉVELOPPEUSE FULLSTACK & AGRONOME',
    'hero.title': 'Allier Technologie et Impact Réel',
    'hero.subtitle': 'Spécialiste en ingénierie logicielle durable, architectures robustes et interfaces hautement soignées.',
    'hero.cv': 'Télécharger mon CV',
    'hero.contact': 'Me contacter',
    'hero.loc': 'Antananarivo, Madagascar & International (Télétravail)',
    'hero.experience': 'Ans d\'expérience',
    'hero.projectsCount': 'Projets déployés',
    'hero.satisfaction': 'Taux de réussite',
    
    // Approach
    'approach.badge': 'Mon Approche & Singularité',
    'approach.title': "Qu'est-ce qui me différencie ?",
    'approach.subtitle': 'Une double compétence rare alliant rigueur technique, démarche scientifique et sensibilité écologique.',
    'approach.01.title': 'Agronomie & Écologie réelle',
    'approach.01.desc': "À la fois technicienne agronome et développeuse informatique, concevoir des applications ayant un impact réel sur l'écologie ou l'environnement est une grande fierté. Qu'il s'agisse de l'application de lutte contre le gaspillage alimentaire MOOZ, du suivi laitier prédictif de MLG-COW, ou de la solution de préservation des ressources aquacoles EcoFish, j'aime mettre la technique au service de la nature.",
    'approach.02.title': 'Analyse & Force de proposition',
    'approach.02.desc': "Dans mon travail de développement, je n'applique pas seulement des spécifications : j'aime analyser profondément les enjeux, décortiquer les besoins opérationnels réels et être une réelle force de proposition. Proposer des chemins d'architecture viables, robustes et stables fait partie de ma rigueur d'ingénierie quotidienne.",
    'approach.03.title': 'Engagement Humain & Collaboration',
    'approach.03.desc': "Le partage humain est au cœur de ma démarche. J'apprécie la relation directe et de confiance avec des clients francophones, tout comme l'émulation née de la coopération avec des étudiants et bénévoles étrangers — à l'instar de notre travail d'équipe pluridisciplinaire sur le projet d'accès à l'eau solaire RANOSOA ou pour l'association MATOKISA.",
    
    // Sections general
    'sect.projects': 'PROJETS SÉLECTIONNÉS',
    'sect.projects.sub': 'Découvrez mes réalisations full-stack phares, avec architectures de production, modèles de données réels et codes sources interactifs.',
    'sect.exp': 'PARCOURS PROFESSIONNEL',
    'sect.exp.sub': 'Des expériences concrètes au service de la transformation digitale et des projets de développement durable.',
    'sect.parcours': 'FORMATION & PARCOURS',
    'sect.parcours.sub': 'Cursus académique double et spécialisations.',
    'sect.cert': 'CERTIFICATIONS PROFESSIONNELLES',
    'sect.cert.sub': 'Validations académiques et techniques obtenues auprès d\'institutions d\'excellence.',
    'sect.creations': 'CRÉATIONS GRAPHIQUES & IDENTITÉS',
    'sect.creations.sub': 'Des chartes étudiées et des designs d\'interfaces concrétisant l\'impact de la communication digitale.',
    
    // Buttons & Interactivity
    'btn.demo': 'Démarrer la démo',
    'btn.source': 'Consulter le code',
    'btn.details': 'En savoir plus',
    'btn.close': 'Fermer',
    'btn.zoom': 'Agrandir l\'image',
    'btn.backToTop': 'Retour en haut',
    'btn.loading': 'Démarrage en cours...',
    
    // Project modal labels
    'modal.context': 'CONTEXTE & OBJECTIFS',
    'modal.objectives': 'Objectifs principaux',
    'modal.keyFeatures': 'Fonctionnalités clés',
    'modal.results': 'Résultats & Impact',
    'modal.tech': 'ARCHITECTURE & STACK TECHNIQUE',
    'modal.demoTitle': 'Lecteur de démo interactive',
    'modal.demoDesc': 'Testez les fonctionnalités clés directement dans ce simulateur interactif connecté à une fausse console de logs en temps réel.',
    
    // Experience labels
    'exp.internship': 'STAGE',
    'exp.impact': 'Impact direct :',
    'exp.tags': 'Technologies et compétences clés',
    'exp.links': 'Ressources associées',
    
    // Contact section
    'contact.title': 'Un projet de développement ?',
    'contact.subtitle': 'Je suis disponible pour des contrats freelance ou des opportunités en télétravail. Échangeons sur vos besoins métiers !',
    'contact.form.name': 'Votre nom',
    'contact.form.email': 'Adresse email',
    'contact.form.message': 'Votre message',
    'contact.form.send': 'Envoyer le message',
    'contact.form.sending': 'Envoi en cours...',
    'contact.form.success': 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.',
    'contact.info': 'Informations de contact',
    'contact.direct': 'Lignes directes'
  },
  en: {
    // Navigation & Layout
    'nav.profile': 'ABOUT',
    'nav.projects': 'PROJECTS',
    'nav.experiences': 'EXPERIENCES',
    'nav.parcours': 'PATH',
    'nav.certificats': 'CERTIFICATES',
    'nav.creations': 'CREATIONS',
    'nav.contact': 'Contact',
    'nav.lang': 'FR',
    
    // Header/Hero details
    'hero.badge': 'FULLSTACK DEVELOPER & AGRONOMIST',
    'hero.title': 'Combining Technology & Real-World Impact',
    'hero.subtitle': 'Specialist in sustainable software engineering, robust architectures, and beautifully polished user interfaces.',
    'hero.cv': 'Download my CV',
    'hero.contact': 'Contact me',
    'hero.loc': 'Antananarivo, Madagascar & International (Remote)',
    'hero.experience': 'Years of experience',
    'hero.projectsCount': 'Deployed projects',
    'hero.satisfaction': 'Success rate',
    
    // Approach
    'approach.badge': 'My Approach & Singularity',
    'approach.title': 'What sets me apart?',
    'approach.subtitle': 'A rare dual expertise combining technical rigor, scientific method, and ecological sensitivity.',
    'approach.01.title': 'Agronomy & Real Ecology',
    'approach.01.desc': "As both an agronomist technician and a computer developer, designing applications with a real impact on ecology or the environment is a source of great pride. Whether it's the MOOZ food waste management app, the MLG-COW predictive dairy tracker, or the EcoFish aquaculture preservation solution, I love putting technology at the service of nature.",
    'approach.02.title': 'Analysis & Proactive Value',
    'approach.02.desc': "In my development work, I don't just implement specifications: I like to deeply analyze challenges, deconstruct operational needs, and offer proactive solutions. Proposing viable, robust, and stable architectural paths is part of my daily engineering discipline.",
    'approach.03.title': 'Human Commitment & Collaboration',
    'approach.03.desc': "Human connection is at the heart of my approach. I appreciate direct, trust-based relationships with French-speaking clients, as well as the dynamic collaboration with international students and volunteers — as seen in our multi-disciplinary team on the RANOSOA solar water project or for the MATOKISA association.",
    
    // Sections general
    'sect.projects': 'SELECTED PROJECTS',
    'sect.projects.sub': 'Explore my key full-stack creations, featuring production architectures, real-world data models, and interactive source code players.',
    'sect.exp': 'PROFESSIONAL EXPERIENCE',
    'sect.exp.sub': 'Concrete experiences serving digital transformation and sustainable development projects.',
    'sect.parcours': 'EDUCATION & TIMELINE',
    'sect.parcours.sub': 'Double academic curriculum and specializations.',
    'sect.cert': 'PROFESSIONAL CERTIFICATIONS',
    'sect.cert.sub': 'Academic and technical credentials obtained from institutions of excellence.',
    'sect.creations': 'GRAPHIC DESIGN & IDENTITIES',
    'sect.creations.sub': 'Thoughtful visual branding and user interface designs making digital communication impactful.',
    
    // Buttons & Interactivity
    'btn.demo': 'Start interactive demo',
    'btn.source': 'View Source Code',
    'btn.details': 'Learn more',
    'btn.close': 'Close',
    'btn.zoom': 'Enlarge image',
    'btn.backToTop': 'Back to top',
    'btn.loading': 'Starting system...',
    
    // Project modal labels
    'modal.context': 'CONTEXT & GOALS',
    'modal.objectives': 'Core Objectives',
    'modal.keyFeatures': 'Key Features',
    'modal.results': 'Results & Impact',
    'modal.tech': 'ARCHITECTURE & STACK',
    'modal.demoTitle': 'Interactive Simulation Player',
    'modal.demoDesc': 'Try out key features inside this real-time simulator connected to a live-streaming terminal log console.',
    
    // Experience labels
    'exp.internship': 'INTERNSHIP',
    'exp.impact': 'Direct Impact:',
    'exp.tags': 'Key technologies and skills',
    'exp.links': 'Associated resources',
    
    // Contact section
    'contact.title': 'Have a project in mind?',
    'contact.subtitle': "I am available for freelance contracts or remote opportunities. Let's discuss your business needs!",
    'contact.form.name': 'Your name',
    'contact.form.email': 'Email address',
    'contact.form.message': 'Your message',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Message successfully sent! I will get back to you as soon as possible.',
    'contact.info': 'Contact Details',
    'contact.direct': 'Direct lines'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return (saved === 'fr' || saved === 'en') ? saved : 'fr';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('portfolio_lang', newLang);
  };

  const t = (key: string): string => {
    return DICTIONARY[lang][key] || DICTIONARY['fr'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
