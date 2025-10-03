import type { SocialLink } from '../types';
import { loadContent } from '../utils/contentManager';

// Load data from JSON with validation
const personalData = loadContent.personalInfo();

export const socialLinks: SocialLink[] = personalData.socialLinks as SocialLink[];

export const contactInfo = {
  email: personalData.contact.email,
  phone: personalData.contact.phone || '',
  location: personalData.location,
  availability: personalData.availability
};