import { Project, Experience, Certification, Creation, PersonalSkill } from '../types';

// Translation dictionaries for projects, experiences, education, and creations
const PROJECTS_EN: Record<string, Partial<Project>> = {
  'mooz-erp': {
    title: 'MOOZ (Multi-store ERP)',
    subtitle: 'Global stock, product, and recipe management with AI assistance for businesses.',
    role: 'Fullstack JavaScript Developer',
    period: 'February 2026 – Present',
    description: 'Frontend and backend development of the backoffice section of a multi-store ERP dedicated to managing inventory, products, recipes, and commercial operations.',
    objectives: 'Design a scalable architecture, ensure accurate inventory data across branches, and automate restocking processes.',
    keyFeatures: [
      'Advanced real-time inventory management with full traceability of inter-store transfers.',
      'Multi-format data imports (CSV, Excel) with strict schema validation.',
      'AI engine for recipe generation and optimization based on profit margins and ingredient availability.',
      'Granular authentication and multi-layered security with Better Auth (role-based access control - RBAC).'
    ],
    results: 'Significant improvements in traceability, reduced stock calculation errors, and immediate ergonomic onboarding for store managers.'
  },
  'job-privee': {
    title: 'JobPrivée (Recruitment Platform)',
    subtitle: 'Complete overhaul and API stabilization for hiring qualified talent.',
    role: 'Fullstack Developer',
    period: 'January 2025 – February 2026',
    description: 'Development of a recruitment management platform with complete technical overhaul and performance optimizations.',
    objectives: 'Analyze technical debt of a complex legacy codebase, refactor functional integration, and rapidly deliver stable REST APIs.',
    keyFeatures: [
      'Global SQL database redesign and MariaDB index optimization to speed up candidate application processing.',
      'Development and integration of robust REST APIs using NestJS to handle complex application statuses.',
      'Creation of fluid and responsive management interfaces using Angular 18.',
      'Rigorous specifications and direct collaboration with the client to align the tool with their business goals.'
    ],
    results: 'Full technical stabilization of the production application with 80% of business objectives achieved in record time.',
    stats: [
      { label: 'Business Goals', value: '80% Progression' },
      { label: 'Client Framework', value: 'Angular 18' },
      { label: 'Backend Stability', value: '99.9% NestJS' }
    ]
  },
  'poker-app': {
    title: 'PokerApp (Hexagonal Core Engine)',
    subtitle: 'Ultra-fast graph-database-backed backend for combinatorial calculations.',
    role: 'Fullstack Developer',
    period: 'December 2024 – February 2025',
    description: 'Advanced poker application structured in hexagonal architecture, leveraging Neo4j to model player interactions and behavioral statistics.',
    objectives: 'Create an engine resilient to technology shifts (Domain-Driven Design) and harness the speed of relational graph queries.',
    keyFeatures: [
      'Pure Hexagonal Architecture: strict decoupling of the business domain from API servers and the database.',
      'Graph modeling of relationships (players, games, betting sessions) with optimized Cypher queries.',
      'Low-latency asynchronous NestJS APIs serving mobile devices and admin dashboards.',
      'Modern React modules for visual behavioral analysis and betting path tracking.'
    ],
    results: 'Highly testable robust codebase and drastically reduced API response times thanks to Neo4j relationship indexes.'
  },
  'ecofish': {
    title: 'Ecofish (Environmental Project Tracker)',
    subtitle: 'Modular reporting and multi-user financial monitoring platform.',
    role: 'Fullstack Developer Intern',
    period: 'July 2024 – November 2024',
    description: 'Initial creation, UML modeling, and full development of an intuitive modular platform for managing funded ecological projects.',
    objectives: 'Provide funding institutions with a precise dashboard showing project progress and automate PDF export for operational audits.',
    keyFeatures: [
      'Complete technical design with UML class diagrams and Merise relational modeling.',
      'Application modules isolated by domains (Conservation Themes, Budgets, Milestones, Reports).',
      'Asynchronous PDF export system for instant generation of bulk reports with integrated statistical charts.',
      'Fine-tuned permissions management by profile (Project Owners, Auditors, Administrators).'
    ],
    results: 'Successful tool launch, reducing the time required to compile and manually validate various annual reports from 10 days to just 1 day.'
  },
  'incuboost': {
    title: 'Incuboost Backend Service',
    subtitle: 'Express creation of high-yield APIs documented under Java environment.',
    role: 'Spring Boot Backend Developer',
    period: 'December 2025',
    description: 'Development of Spring Boot REST APIs to handle complex CRUD operations for portfolio incubation tracking.',
    objectives: 'Adapt instantly to a demanding new technical stack and deliver validated, fully-documented backend architectures in under 3 weeks.',
    keyFeatures: [
      'Integration of Spring Boot with Hibernate JPA for secure and fluid communication with PostgreSQL.',
      'Design of strongly-typed REST controllers with robust input constraint validations.',
      'Full API documentation with Swagger OpenAPI annotations for asynchronous frontend integration.',
      'Unit test coverage and continuous integration via GitLab.'
    ],
    results: 'Delivery of optimized, certified functional backend services, proving exceptional technical reactivity during emergency onboarding phases.'
  },
  'super-app-az': {
    title: 'Super App AZ (E-Commerce Module)',
    subtitle: 'Modular Angular components and micro-interfaces for high-volume sales.',
    role: 'Angular Frontend Developer',
    period: 'September 2022 – January 2023',
    description: 'Development of the e-commerce module for the Super App AZ, focusing on fluid UI integration and client-side micro-services implementation.',
    objectives: 'Guarantee smooth integration cycles without impacting the overall operation of the high-traffic platform.',
    keyFeatures: [
      'Modular Angular architecture with Lazy Loading to optimize initial loading speed.',
      'Unified local state management via RxJS for the cart and product filters.',
      'Creation and refinement of responsive designs adaptive to mobile and tablet screens with Bootstrap.',
      'Joint collaboration to define backend interface contracts and ensure display scalability.'
    ],
    results: 'Complete e-commerce module delivered on schedule, improving user engagement and purchasing flow.'
  },
  'mlgcow': {
    title: 'ITSA - MLGCOW',
    subtitle: 'Dairy cow livestock tracking and digital herd management mobile application.',
    role: 'Frontend Developer (Personal Project)',
    period: 'August 2021 – December 2021',
    description: 'Conception and design of a hybrid mobile application for digital dairy cow tracking and health supervision.',
    objectives: 'Design a practical mobile solution to automate daily livestock data compilation.',
    keyFeatures: [
      'Conception of a hybrid mobile application with Angular and Ionic.',
      'Digitalization of veterinary records and health history checkups.',
      'Real-time milk production logging per cow.',
      'Automated medical treatment schedule reminders.'
    ],
    results: 'Complete digitalization of herd tracking and automated reminders leading to a record-low 0% info loss rate.'
  },
  'etafa-project': {
    title: 'eTAFA Mentoring Platform',
    subtitle: 'Professional mentoring platform linking mentors and mentees.',
    role: 'NestJS Backend Developer',
    period: 'January 2024 – May 2024',
    description: 'Development of high-performance backend REST APIs for professional mentoring connection.',
    objectives: 'Develop a stable REST backend with fully documented OpenAPI/Swagger schemas and MongoDB database constraints.',
    keyFeatures: [
      'Robust NestJS REST APIs design for mentee-mentor pairing matches.',
      'MongoDB database modeling and document structural constraints implementation.',
      'Exhaustive Swagger documentation for developer workspace transparency.'
    ],
    results: 'Full API routes deployment and robust database integration easing frontend integration cycles.'
  }
};

const EXPERIENCES_EN: Record<string, Partial<Experience>> = {
  'exp1': {
    role: 'Fullstack JavaScript Developer',
    period: 'February 2026 – Present',
    description: [
      'Frontend and backend development of the backoffice section of a multi-store ERP dedicated to stock, product, recipe, and sales management.',
      'Application architecture design, database modeling, and setup of secure authentication with role-based access control.',
      'Implementation of key features: advanced inventory management, multi-format imports, automated API synchronization, and AI-assisted recipe creation.'
    ],
    result: 'improved operational traceability, reliable data synchronization, and optimized UX thanks to a modern, intuitive interface.'
  },
  'exp-visuelle': {
    role: 'UI Interface Designer & Graphic Designer',
    period: '2025 – Present',
    description: [
      'Designed the official logo, web design, and branding guidelines for the MATOKISA association.',
      'Designed intuitive user interfaces (UI) and digital graphic assets for promoting social activities.'
    ],
    result: 'Strong brand identity and modern interfaces, facilitating public engagement and fundraising for the association.'
  },
  'exp2': {
    role: 'Fullstack Developer',
    period: 'January 2025 – February 2026',
    description: [
      'Frontend and backend development of a recruitment management platform.',
      'Project analysis, followed by a complete functional and technical overhaul.',
      'Development and integration of secure REST APIs.'
    ],
    result: 'Stabilized production application with 80% of business goals achieved in production.'
  },
  'exp3': {
    role: 'Spring Boot Backend Developer',
    period: 'December 2025',
    description: [
      'Development of REST APIs with Spring Boot to handle complex CRUD operations.',
      'Design and integration of backend endpoints connected to PostgreSQL.',
      'Rigorous documentation and continuous unit testing of APIs using Swagger.'
    ],
    result: 'Quick adaptation to the technical stack in less than two weeks, immediate onboarding, and valuable contribution to deliverables.'
  },
  'exp4': {
    role: 'Fullstack Developer',
    period: 'December 2024 – February 2025',
    description: [
      'Poker mobile and admin application using hexagonal architecture and Neo4j graph database.',
      'Development of high-performance NestJS REST APIs for both mobile and back-office.',
      'Complete code refactoring and creation of reusable React modules.'
    ],
    result: 'Clear performance improvements and significant reduction in matchmaking API response times.'
  },
  'exp6': {
    role: 'NestJS Backend Developer',
    period: 'January 2024 – May 2024',
    description: [
      'Development of secure and highly documented REST APIs using NestJS to connect mentors and mentees.',
      'MongoDB NoSQL database design, modeling, and structured optimization.',
      'Ensuring exhaustive and clean OpenAPI/Swagger API documentation for frontend developers.'
    ],
    result: 'Stable and highly reliable APIs certified functional, significantly easing frontend onboarding.'
  },
  'exp5': {
    role: 'Fullstack Developer Intern',
    period: 'July 2024 – November 2024',
    description: [
      'Development of a modular and intuitive project management platform funded by thematic streams.',
      'Complete technical design from scratch (UML class diagrams, relational database architecture).',
      'Implementation of fine-grained user roles and access rights.',
      'Creation of a custom PDF report export subsystem with integrated statistical charts for administrative tracking.'
    ],
    result: 'Simple, effective, and scalable platform tailored to the business needs of donors and auditors.'
  },
  'exp-ranosoa': {
    role: 'PV Project Companion & Trainer',
    period: '2023',
    description: [
      'Global coordination and academic mentoring of students from the University of Sherbrooke (Canada).',
      'Supervision of practical sessions during the PV FIANARA 2023 summer school for deploying solar water pumps.'
    ],
    result: 'Successful international cooperation and mentoring of Canadian engineering students.'
  },
  'exp7': {
    role: 'Angular Frontend Developer',
    period: 'September 2022 – January 2023',
    description: [
      'Development of the e-commerce module for the super application.',
      'Integration of fluid, highly reactive, and responsive interfaces.',
      'Participation in study, design, module ideation, and micro-frontend architecture.'
    ],
    result: 'Intuitive and scalable interface delivered to production, facilitating purchase transactions.'
  },
  'exp-mlgcow': {
    role: 'Frontend Developer (Personal Project)',
    period: 'August 2021 – December 2021',
    description: [
      'Conception of a hybrid mobile application for livestock tracking and digital dairy cow management.',
      'Real-time tracking of daily milk production per animal.',
      'Development of modules for veterinaries treatment planning and health checkup reminders.'
    ],
    result: 'Rigorous and digitalized herd tracking with information loss reduced close to 0%.'
  },
  'exp-draep': {
    role: 'Developer Intern',
    period: 'March 2019 – May 2019',
    description: [
      'Development of a web application for water management and tracking of agricultural resources.',
      'Creation of automatic data import modules from Excel spreadsheets to MySQL database.',
      'Conception of automated PDF report generation modules for administrative audits.'
    ],
    result: 'Complete digitization of paper archives and complete automation of official reports.'
  }
};

const EDUCATION_EN = [
  {
    diploma: 'Master of Computer Science – Software Engineering & Databases',
    school: 'University of Fianarantsoa (ENI)',
    period: 'Nov. 2023 – Dec. 2024',
    details: 'In-depth training in advanced software modeling (UML, Merise), relational DBMS, SQL & NoSQL, and complex systems architecture.'
  },
  {
    diploma: 'Bachelor of Computer Science – Software Engineering & Databases',
    school: 'University of Fianarantsoa (ENI)',
    period: 'Nov. 2015 – Dec. 2018',
    details: 'Development of complex applications, object-oriented programming (Java, PHP, JS/TS), advanced algorithms, and database design.'
  },
  {
    diploma: 'Bachelor of Agronomy – Livestock & Breeding',
    school: 'Agricultural Higher Technical Institute (ITSA)',
    period: 'Nov. 2018 – Oct. 2019',
    details: 'Scientific rigor, systems modeling, and advanced problem-solving methodologies for complex agricultural and environmental challenges.'
  }
];

const CREATIONS_EN: Record<string, Partial<Creation>> = {
  'create1': {
    title: 'Fundraising Ticket',
    description: "Communication design for 'Opération Brioche au CHOCO': a solidarity sale to fund the charitable projects of the MATOKISA association.",
    category: 'Communication'
  },
  'create2': {
    title: 'MATOKISA Association Logo',
    description: 'Visual identity of the MATOKISA association, which provides caring support for wonderful children with mental disabilities.',
    category: 'Branding'
  },
  'create3': {
    title: 'Baptism Invitation Card',
    description: 'Custom, tailor-made graphic design for a warm baptism ceremony, blending sweetness and modern elegance.',
    category: 'Événementiel'
  }
};

const PERSONAL_SKILLS_EN: PersonalSkill[] = [
  { name: 'Problem Solving', percentage: 95, description: 'Methodical analysis and resolution of complex technical anomalies.' },
  { name: 'User Empathy', percentage: 90, description: 'Deep understanding of business needs and ergonomic design.' },
  { name: 'Proactive Value', percentage: 88, description: 'Active recommendation of modern architectures and optimization tools.' },
  { name: 'Team Player', percentage: 92, description: 'Fluid cooperation in Agile methodology with clients and developers.' },
  { name: 'Adaptability', percentage: 95, description: 'Rapid mastering of new stacks (e.g. Spring Boot or Neo4j in record time).' },
];

const LANGUAGES_EN = [
  { name: 'Malagasy', level: 'Mother tongue' },
  { name: 'French', level: 'Upper Intermediate (C1/Professional)' },
  { name: 'English', level: 'Intermediate (B2/Technical)' },
];

// Translation selector helpers
export function translateProject(proj: Project, lang: 'fr' | 'en'): Project {
  if (lang === 'fr') return proj;
  const translation = PROJECTS_EN[proj.id];
  if (!translation) return proj;
  return {
    ...proj,
    ...translation,
    stats: proj.stats?.map(s => {
      // translate simple stat labels
      let label = s.label;
      if (s.label === "Efficacité d'import") label = "Import efficiency";
      if (s.label === "Calcul de marge") label = "Margin calculation";
      if (s.label === "Gestion d'accès") label = "Access control";
      if (s.label === "Objectifs Métier") label = "Business goals";
      if (s.label === "Vitesse de Filtrage") label = "Filtering speed";
      if (s.label === "Stabilité Production") label = "Production stability";
      if (s.label === "Temps API (latence)") label = "API time (latency)";
      if (s.label === "Découplage code") label = "Code decoupling";
      if (s.label === "Modèle Graphes") label = "Graph Model";
      if (s.label === "Gain temps reporting") label = "Reporting time saved";
      if (s.label === "Fichiers audités") label = "Audited files";
      if (s.label === "Utilisateurs actifs") label = "Active users";
      if (s.label === "Onboarding Code") label = "Code onboarding";
      if (s.label === "Tests Endpoints") label = "Endpoints testing";
      if (s.label === "Contrôle CRUD") label = "CRUD control";
      if (s.label === "Taux de Conversion") label = "Conversion rate";
      if (s.label === "Lazy Loading") label = "Lazy Loading";
      if (s.label === "Responsive Design") label = "Responsive Design";
      if (s.label === "Framework Client") label = "Client Framework";
      if (s.label === "Stabilité Backend") label = "Backend Stability";
      if (s.label === "Suivi individuel") label = "Individual tracking";
      if (s.label === "Perte de données") label = "Data loss";
      if (s.label === "Accompagnement") label = "Internship Support";
      if (s.label === "Routes API") label = "API Routes";
      if (s.label === "Intégration") label = "Integration";
      if (s.label === "Modèle Base") label = "Database Model";
      
      let value = s.value;
      if (s.value === "Temps réel") value = "Real-time";
      if (s.value === "Multi-rôle (RBAC)") value = "Multi-role (RBAC)";
      if (s.value === "80% Atteints") value = "80% Achieved";
      if (s.value === "80% Progression") value = "80% Progression";
      if (s.value === "Angular 18") value = "Angular 18";
      if (s.value === "99.9% NestJS") value = "99.9% NestJS";
      if (s.value === "100% Digital") value = "100% Digital";
      if (s.value === "Proche de 0%") value = "Close to 0%";
      if (s.value === "6 Mois de Stage") value = "6-Month Internship";
      if (s.value === "100% Documentées") value = "100% Documented";
      if (s.value === "Swagger Complet") value = "Full Swagger";
      if (s.value === "MongoDB NoSQL") value = "MongoDB NoSQL";
      if (s.value === "-45% temps") value = "-45% time";
      if (s.value === "-60% de baisse") value = "-60% decrease";
      if (s.value === "100% Core") value = "100% Core";
      if (s.value === "De 10 à 1 jour") value = "From 10 to 1 day";
      if (s.value === "Exports PDF automatiques") value = "Automated PDF exports";
      if (s.value === "Multi-rôles") value = "Multi-roles";
      if (s.value === "< 2 Jours") value = "< 2 Days";
      if (s.value === "Auto-généré JPA") value = "JPA Auto-generated";
      if (s.value === "Actif (-40% poids)") value = "Active (-40% weight)";
      
      return { label, value };
    })
  };
}

export function translateExperience(exp: Experience, lang: 'fr' | 'en'): Experience {
  if (lang === 'fr') return exp;
  const translation = EXPERIENCES_EN[exp.id];
  if (!translation) return exp;
  return {
    ...exp,
    ...translation
  };
}

export function translateEducation(lang: 'fr' | 'en') {
  if (lang === 'fr') return null; // Use original
  return EDUCATION_EN;
}

export function translateCreation(create: Creation, lang: 'fr' | 'en'): Creation {
  if (lang === 'fr') return create;
  const translation = CREATIONS_EN[create.id];
  if (!translation) return create;
  return {
    ...create,
    ...translation
  };
}

export function translatePersonalSkills(skills: typeof PERSONAL_SKILLS_EN, lang: 'fr' | 'en') {
  if (lang === 'fr') return null;
  return PERSONAL_SKILLS_EN;
}

export function translateLanguages(lang: 'fr' | 'en') {
  if (lang === 'fr') return null;
  return LANGUAGES_EN;
}
