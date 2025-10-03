import React from 'react';
import { Button } from '../ui';

interface ProjectFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
      'all': 'All Projects',
      'ai-ml': 'AI & ML',
      'web-development': 'Web Development',
      'data-science': 'Data Science',
      'automation': 'Automation',
      'research': 'Research'
    };
    return labels[category] || category;
  };

  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      'all': '📁',
      'ai-ml': '🤖',
      'web-development': '🌐',
      'data-science': '📊',
      'automation': '⚙️',
      'research': '🔬'
    };
    return icons[category] || '📄';
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className="flex items-center gap-2"
        >
          <span>{getCategoryIcon(category)}</span>
          {getCategoryLabel(category)}
        </Button>
      ))}
    </div>
  );
};