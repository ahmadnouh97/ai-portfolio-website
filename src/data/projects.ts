import type { Project } from '../types';
import { loadContent } from '../utils/contentManager';

// Load projects from JSON with validation
const projectsData = loadContent.projects();
export const projects: Project[] = projectsData.projects as Project[];

// Helper functions for filtering and sorting
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getProjectCategories = (): string[] => {
  const categories = projects.map(project => project.category);
  return ['all', ...Array.from(new Set(categories))];
};