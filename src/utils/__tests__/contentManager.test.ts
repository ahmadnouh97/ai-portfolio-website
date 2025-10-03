import { describe, it, expect } from 'vitest';
import { loadContent, validateContent } from '../contentManager';

describe('Content Management System', () => {
  describe('loadContent', () => {
    it('should load personal info without errors', () => {
      expect(() => loadContent.personalInfo()).not.toThrow();
      const data = loadContent.personalInfo();
      expect(data).toHaveProperty('name');
      expect(data).toHaveProperty('title');
      expect(data).toHaveProperty('contact');
      expect(data).toHaveProperty('socialLinks');
    });

    it('should load skills without errors', () => {
      expect(() => loadContent.skills()).not.toThrow();
      const data = loadContent.skills();
      expect(data).toHaveProperty('skills');
      expect(data).toHaveProperty('technologies');
      expect(Array.isArray(data.skills)).toBe(true);
      expect(Array.isArray(data.technologies)).toBe(true);
    });

    it('should load experience without errors', () => {
      expect(() => loadContent.experience()).not.toThrow();
      const data = loadContent.experience();
      expect(data).toHaveProperty('experiences');
      expect(Array.isArray(data.experiences)).toBe(true);
    });

    it('should load projects without errors', () => {
      expect(() => loadContent.projects()).not.toThrow();
      const data = loadContent.projects();
      expect(data).toHaveProperty('projects');
      expect(Array.isArray(data.projects)).toBe(true);
    });
  });

  describe('validateContent', () => {
    it('should validate personal info structure', () => {
      const validData = {
        name: 'Test Name',
        title: 'Test Title',
        contact: { email: 'test@example.com' },
        socialLinks: [
          { name: 'LinkedIn', url: 'https://linkedin.com/test', icon: 'linkedin' }
        ]
      };
      expect(() => validateContent.personalInfo(validData)).not.toThrow();
    });

    it('should validate skills structure', () => {
      const validData = {
        skills: [
          { name: 'Test Skill', level: 5, category: 'technical' }
        ],
        technologies: [
          { name: 'Test Tech', category: 'language', proficiency: 4, icon: '🔧' }
        ]
      };
      expect(() => validateContent.skills(validData)).not.toThrow();
    });

    it('should throw error for invalid data', () => {
      const invalidData = {
        name: 'Test',
        // missing required fields
      };
      expect(() => validateContent.personalInfo(invalidData)).toThrow();
    });
  });

  describe('data integrity', () => {
    it('should have consistent skill levels (1-5)', () => {
      const data = loadContent.skills();
      data.skills.forEach(skill => {
        expect(skill.level).toBeGreaterThanOrEqual(1);
        expect(skill.level).toBeLessThanOrEqual(5);
      });
    });

    it('should have consistent technology proficiencies (1-5)', () => {
      const data = loadContent.skills();
      data.technologies.forEach(tech => {
        expect(tech.proficiency).toBeGreaterThanOrEqual(1);
        expect(tech.proficiency).toBeLessThanOrEqual(5);
      });
    });

    it('should have valid project categories', () => {
      const data = loadContent.projects();
      const validCategories = ['ai-ml', 'web-development', 'data-science', 'automation', 'research'];
      data.projects.forEach(project => {
        expect(validCategories).toContain(project.category);
      });
    });

    it('should have valid email format in personal info', () => {
      const data = loadContent.personalInfo();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(data.contact.email)).toBe(true);
    });
  });
});