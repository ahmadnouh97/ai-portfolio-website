#!/usr/bin/env node

/**
 * Standalone Content Validation Script
 * 
 * This script validates all content files against their schemas without
 * requiring the TypeScript build process.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../src/data/content');
const SCHEMA_DIR = path.join(__dirname, '../src/data/schemas');

// Initialize AJV validator
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Helper functions
const readJsonFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const validateContent = async () => {
  console.log('🔍 Validating all content...');
  
  const validations = [
    {
      name: 'Personal Info',
      contentFile: 'personal-info.json',
      schemaFile: 'personal-info.schema.json'
    },
    {
      name: 'Skills',
      contentFile: 'skills.json',
      schemaFile: 'skills.schema.json'
    },
    {
      name: 'Experience',
      contentFile: 'experience.json',
      schemaFile: 'experience.schema.json'
    },
    {
      name: 'Projects',
      contentFile: 'projects.json',
      schemaFile: 'projects.schema.json'
    }
  ];

  let allValid = true;

  for (const validation of validations) {
    try {
      // Load schema and content
      const schemaPath = path.join(SCHEMA_DIR, validation.schemaFile);
      const contentPath = path.join(CONTENT_DIR, validation.contentFile);
      
      const schema = readJsonFile(schemaPath);
      const content = readJsonFile(contentPath);
      
      // Compile and validate
      const validate = ajv.compile(schema);
      const valid = validate(content);
      
      if (valid) {
        console.log(`✅ ${validation.name}: Valid`);
      } else {
        console.error(`❌ ${validation.name}: Validation failed`);
        validate.errors.forEach(error => {
          console.error(`   - ${error.instancePath || 'root'}: ${error.message}`);
          if (error.data !== undefined) {
            console.error(`     Current value: ${JSON.stringify(error.data)}`);
          }
          if (error.schema) {
            console.error(`     Expected: ${JSON.stringify(error.schema)}`);
          }
        });
        allValid = false;
      }
    } catch (error) {
      console.error(`❌ ${validation.name}: Error during validation`);
      console.error(`   ${error.message}`);
      allValid = false;
    }
  }

  if (allValid) {
    console.log('🎉 All content is valid!');
  } else {
    console.log('⚠️  Some content has validation errors. Please fix them before deploying.');
    process.exit(1);
  }
};

// Run validation
validateContent().catch(error => {
  console.error('❌ Validation script failed:', error.message);
  process.exit(1);
});