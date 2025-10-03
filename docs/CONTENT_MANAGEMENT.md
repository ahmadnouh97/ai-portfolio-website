# Content Management System Documentation

## Overview

The AI Portfolio Website now uses a JSON-based content management system that allows for easy updates to portfolio content without modifying code. All content is stored in JSON files with schema validation to ensure data integrity.

## File Structure

```
src/
├── data/
│   ├── content/           # JSON content files
│   │   ├── personal-info.json
│   │   ├── skills.json
│   │   ├── experience.json
│   │   └── projects.json
│   ├── schemas/           # JSON schema validation files
│   │   ├── personal-info.schema.json
│   │   ├── skills.schema.json
│   │   ├── experience.schema.json
│   │   └── projects.schema.json
│   ├── about.ts          # Refactored to load from JSON
│   ├── contact.ts        # Refactored to load from JSON
│   └── projects.ts       # Refactored to load from JSON
└── utils/
    └── contentManager.ts  # Content loading and validation utilities
```

## Content Files

### 1. Personal Information (`personal-info.json`)

Contains basic personal information, contact details, and social links.

**Structure:**
```json
{
  "name": "Your Name",
  "title": "Your Professional Title",
  "tagline": "Your professional tagline",
  "bio": "Your professional bio",
  "location": "Your location",
  "availability": "Your availability status",
  "contact": {
    "email": "your.email@example.com",
    "phone": "+1 (555) 123-4567"
  },
  "socialLinks": [
    {
      "name": "Platform Name",
      "url": "https://platform.com/yourprofile",
      "icon": "icon-name"
    }
  ]
}
```

### 2. Skills and Technologies (`skills.json`)

Contains your skills and technology proficiencies.

**Structure:**
```json
{
  "skills": [
    {
      "name": "Skill Name",
      "level": 5,
      "category": "technical|soft|language"
    }
  ],
  "technologies": [
    {
      "name": "Technology Name",
      "category": "language|framework|tool|platform",
      "proficiency": 5,
      "icon": "🐍"
    }
  ]
}
```

### 3. Experience and Education (`experience.json`)

Contains work experience, education, and certifications.

**Structure:**
```json
{
  "experiences": [
    {
      "id": "unique-id",
      "company": "Company Name",
      "role": "Your Role",
      "duration": "Start Date - End Date",
      "description": "Role description",
      "achievements": ["Achievement 1", "Achievement 2"],
      "technologies": [/* Technology objects */]
    }
  ],
  "education": [
    {
      "id": "unique-id",
      "institution": "University Name",
      "degree": "Degree Type",
      "field": "Field of Study",
      "duration": "Start Year - End Year",
      "location": "Location",
      "specialization": "Optional specialization"
    }
  ],
  "certifications": [
    {
      "id": "unique-id",
      "name": "Certification Name",
      "issuer": "Issuing Organization",
      "duration": "Date Range",
      "description": "Optional description"
    }
  ]
}
```

### 4. Projects (`projects.json`)

Contains your portfolio projects.

**Structure:**
```json
{
  "projects": [
    {
      "id": "unique-id",
      "title": "Project Title",
      "description": "Short description",
      "longDescription": "Detailed description",
      "technologies": [/* Technology objects */],
      "images": ["/path/to/image1.jpg", "/path/to/image2.jpg"],
      "demoUrl": "https://demo.example.com",
      "githubUrl": "https://github.com/username/repo",
      "featured": true,
      "category": "ai-ml|web-development|data-science|automation|research",
      "metrics": {
        "stars": 45,
        "forks": 12,
        "users": 200,
        "downloads": 1000
      }
    }
  ]
}
```

## How to Update Content

### 1. Direct JSON Editing

Simply edit the JSON files in `src/data/content/` directory:

1. Open the relevant JSON file
2. Make your changes following the schema structure
3. Save the file
4. The changes will be automatically validated and applied

### 2. Schema Validation

All content is automatically validated against JSON schemas. If you make an invalid change:

- The application will show a validation error in the console
- The error message will indicate exactly what's wrong
- Fix the issue and the content will load correctly

### 3. Adding New Projects

To add a new project:

1. Open `src/data/content/projects.json`
2. Add a new project object to the `projects` array
3. Ensure all required fields are included
4. Use a unique `id` for the project
5. Save the file

### 4. Updating Skills

To update your skills:

1. Open `src/data/content/skills.json`
2. Modify the `skills` or `technologies` arrays
3. Use proficiency levels from 1-5
4. Choose appropriate categories from the allowed values
5. Save the file

## Validation Rules

### Required Fields

Each content type has required fields that must be present:

- **Personal Info**: name, title, contact.email, socialLinks
- **Skills**: name, level, category (for each skill)
- **Experience**: id, company, role, duration, description, achievements, technologies
- **Projects**: id, title, description, longDescription, technologies, images, featured, category

### Data Types

- **Proficiency levels**: Numbers from 1-5
- **URLs**: Must be valid URLs (validated automatically)
- **Email**: Must be valid email format
- **Categories**: Must match predefined enum values

### Icons

For technologies and social links, use:
- Emoji icons (🐍, 🧠, etc.) for technologies
- Icon names (linkedin, github, etc.) for social links

## Content Management Utilities

The `contentManager.ts` file provides utilities for:

- **Loading content**: `loadContent.personalInfo()`, `loadContent.skills()`, etc.
- **Validating content**: `validateContent.personalInfo(data)`, etc.
- **Future updates**: `updateContent.*()` functions for programmatic updates

## Best Practices

1. **Backup**: Always backup your JSON files before making major changes
2. **Validation**: Check the browser console for validation errors after updates
3. **Testing**: Test your changes in development before deploying
4. **Consistency**: Use consistent formatting and naming conventions
5. **Images**: Ensure image paths are correct and images exist in the public directory

## Troubleshooting

### Common Issues

1. **Validation Errors**: Check the console for detailed error messages
2. **Missing Content**: Ensure all required fields are present
3. **Invalid URLs**: Make sure URLs include the protocol (https://)
4. **Wrong Categories**: Use only the predefined category values
5. **JSON Syntax**: Ensure proper JSON syntax (commas, quotes, brackets)

### Error Messages

The system provides detailed error messages indicating:
- Which field has an error
- What type of error occurred
- The expected format or value

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Validate your JSON syntax using an online JSON validator
3. Compare your structure with the examples in this documentation
4. Ensure all required fields are present and correctly formatted

## Future Enhancements

The content management system is designed to be extensible. Future enhancements may include:

- Web-based content editor interface
- Automatic content backup and versioning
- Integration with headless CMS
- Real-time content preview
- Bulk import/export functionality