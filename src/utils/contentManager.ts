import Ajv from 'ajv';
import addFormats from 'ajv-formats';

// Import JSON content
import personalInfoData from '../data/content/personal-info.json';
import skillsData from '../data/content/skills.json';
import experienceData from '../data/content/experience.json';
import projectsData from '../data/content/projects.json';

// Import schemas
import personalInfoSchema from '../data/schemas/personal-info.schema.json';
import skillsSchema from '../data/schemas/skills.schema.json';
import experienceSchema from '../data/schemas/experience.schema.json';
import projectsSchema from '../data/schemas/projects.schema.json';

// Initialize AJV validator
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Compile schemas
const validatePersonalInfo = ajv.compile(personalInfoSchema);
const validateSkills = ajv.compile(skillsSchema);
const validateExperience = ajv.compile(experienceSchema);
const validateProjects = ajv.compile(projectsSchema);

// Validation functions
export const validateContent = {
  personalInfo: (data: any) => {
    const valid = validatePersonalInfo(data);
    if (!valid) {
      throw new Error(`Personal info validation failed: ${ajv.errorsText(validatePersonalInfo.errors)}`);
    }
    return valid;
  },
  
  skills: (data: any) => {
    const valid = validateSkills(data);
    if (!valid) {
      throw new Error(`Skills validation failed: ${ajv.errorsText(validateSkills.errors)}`);
    }
    return valid;
  },
  
  experience: (data: any) => {
    const valid = validateExperience(data);
    if (!valid) {
      throw new Error(`Experience validation failed: ${ajv.errorsText(validateExperience.errors)}`);
    }
    return valid;
  },
  
  projects: (data: any) => {
    const valid = validateProjects(data);
    if (!valid) {
      throw new Error(`Projects validation failed: ${ajv.errorsText(validateProjects.errors)}`);
    }
    return valid;
  }
};

// Content loading functions with validation
export const loadContent = {
  personalInfo: () => {
    validateContent.personalInfo(personalInfoData);
    return personalInfoData;
  },
  
  skills: () => {
    validateContent.skills(skillsData);
    return skillsData;
  },
  
  experience: () => {
    validateContent.experience(experienceData);
    return experienceData;
  },
  
  projects: () => {
    validateContent.projects(projectsData);
    return projectsData;
  }
};

// Content update functions (for future use)
export const updateContent = {
  personalInfo: (newData: any) => {
    validateContent.personalInfo(newData);
    // In a real implementation, this would write to the JSON file
    console.log('Personal info updated:', newData);
  },
  
  skills: (newData: any) => {
    validateContent.skills(newData);
    console.log('Skills updated:', newData);
  },
  
  experience: (newData: any) => {
    validateContent.experience(newData);
    console.log('Experience updated:', newData);
  },
  
  projects: (newData: any) => {
    validateContent.projects(newData);
    console.log('Projects updated:', newData);
  }
};