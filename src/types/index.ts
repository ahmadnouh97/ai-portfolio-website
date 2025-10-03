export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: Technology[];
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: ProjectCategory;
  metrics?: ProjectMetrics;
}

export interface Technology {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'platform';
  proficiency: number; // 1-5 scale
  icon: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: Technology[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ProjectCategory = 'ai-ml' | 'web-development' | 'data-science' | 'automation' | 'research';

export interface ProjectMetrics {
  stars?: number;
  forks?: number;
  downloads?: number;
  users?: number;
}

export interface Skill {
  name: string;
  level: number; // 1-5 scale
  category: 'technical' | 'soft' | 'language';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
  specialization?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  duration: string;
  description?: string;
}