#!/usr/bin/env node

/**
 * Content Update Utility
 * 
 * This script provides a simple CLI interface for updating portfolio content.
 * Usage: node scripts/update-content.js [command] [options]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../src/data/content');

// Helper functions
const readJsonFile = (filename) => {
  const filePath = path.join(CONTENT_DIR, filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const writeJsonFile = (filename, data) => {
  const filePath = path.join(CONTENT_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✅ Updated ${filename}`);
};

const commands = {
  // List all available content
  list: () => {
    console.log('📋 Available content files:');
    const files = fs.readdirSync(CONTENT_DIR);
    files.forEach(file => {
      if (file.endsWith('.json')) {
        console.log(`  - ${file}`);
      }
    });
  },

  // Show content structure
  show: (filename) => {
    if (!filename) {
      console.error('❌ Please specify a filename (e.g., personal-info.json)');
      return;
    }

    try {
      const data = readJsonFile(filename);
      console.log(`📄 Content of ${filename}:`);
      console.log(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`❌ Error reading ${filename}:`, error.message);
    }
  },

  // Add a new project
  'add-project': () => {
    console.log('🚀 Adding a new project...');
    console.log('Please edit src/data/content/projects.json manually to add your project.');
    console.log('Use the following template:');
    console.log(`
{
  "id": "unique-project-id",
  "title": "Your Project Title",
  "description": "Short description",
  "longDescription": "Detailed description",
  "technologies": [
    {
      "name": "Technology Name",
      "category": "language|framework|tool|platform",
      "proficiency": 5,
      "icon": "🔧"
    }
  ],
  "images": ["/projects/your-project-1.jpg"],
  "githubUrl": "https://github.com/username/repo",
  "demoUrl": "https://your-demo.com",
  "featured": true,
  "category": "ai-ml|web-development|data-science|automation|research",
  "metrics": {
    "stars": 0,
    "forks": 0,
    "users": 0
  }
}
    `);
  },

  // Validate all content
  validate: async () => {
    console.log('🔍 Validating all content...');

    try {
      // Import the content manager (dynamic import for ES modules)
      const { loadContent } = await import('../src/utils/contentManager.js');

      const contentTypes = ['personalInfo', 'skills', 'experience', 'projects'];
      let allValid = true;

      for (const type of contentTypes) {
        try {
          loadContent[type]();
          console.log(`✅ ${type}: Valid`);
        } catch (error) {
          console.error(`❌ ${type}: ${error.message}`);
          allValid = false;
        }
      }

      if (allValid) {
        console.log('🎉 All content is valid!');
      } else {
        console.log('⚠️  Some content has validation errors. Please fix them before deploying.');
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Error during validation:', error.message);
      console.log('💡 Make sure to build the project first: npm run build');
    }
  },

  // Backup content
  backup: () => {
    const backupDir = path.join(__dirname, '../backups');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(backupDir, `content-backup-${timestamp}`);

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    fs.mkdirSync(backupPath, { recursive: true });

    const files = fs.readdirSync(CONTENT_DIR);
    files.forEach(file => {
      if (file.endsWith('.json')) {
        fs.copyFileSync(
          path.join(CONTENT_DIR, file),
          path.join(backupPath, file)
        );
      }
    });

    console.log(`💾 Content backed up to: ${backupPath}`);
  },

  // Show help
  help: () => {
    console.log(`
📚 Content Update Utility Help

Available commands:
  list                 - List all content files
  show <filename>      - Show content of a specific file
  add-project         - Show template for adding a new project
  validate            - Validate all content against schemas
  backup              - Create a backup of all content files
  help                - Show this help message

Examples:
  node scripts/update-content.js list
  node scripts/update-content.js show personal-info.json
  node scripts/update-content.js validate
  node scripts/update-content.js backup

For detailed documentation, see: docs/CONTENT_MANAGEMENT.md
    `);
  }
};

// Main execution
const [, , command, ...args] = process.argv;

if (!command || !commands[command]) {
  console.log('❌ Invalid or missing command');
  commands.help();
  process.exit(1);
}

commands[command](...args);