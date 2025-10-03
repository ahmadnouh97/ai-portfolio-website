import type { Technology, Experience, Skill, Education, Certification } from '../types';
import { loadContent } from '../utils/contentManager';

// Load data from JSON with validation
const skillsData = loadContent.skills();
const experienceData = loadContent.experience();

export const skills: Skill[] = skillsData.skills as Skill[];
export const technologies: Technology[] = skillsData.technologies as Technology[];
export const experiences: Experience[] = experienceData.experiences as Experience[];
export const education: Education[] = (experienceData.education || []) as Education[];
export const certifications: Certification[] = (experienceData.certifications || []) as Certification[];