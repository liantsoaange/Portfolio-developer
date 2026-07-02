export interface Project {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  role: string;
  period: string;
  stack: string[];
  description: string;
  objectives: string;
  keyFeatures: string[];
  results: string;
  videoDemoType: 'erp' | 'recruitment' | 'poker' | 'database' | 'reporting' | 'ecommerce' | 'mlgcow' | 'etafa';
  stats?: { label: string; value: string }[];
  codeFiles?: { name: string; language: string; content: string }[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  isInternship?: boolean;
  project?: string;
  stack: string[];
  description: string[];
  result: string;
  tags?: string[]; // Custom tags shown in portfolio
  links?: { label: string; url: string }[]; // Links shown in portfolio
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface PersonalSkill {
  name: string;
  percentage: number; // For visualization
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl?: string; // Optional mockup url or placeholder
  pdfUrl?: string; // Optional document view
}

export interface Creation {
  id: string;
  title: string;
  description: string;
  category: 'Communication' | 'Branding' | 'Événementiel';
  tags: string[];
  imageUrl?: string;
}
