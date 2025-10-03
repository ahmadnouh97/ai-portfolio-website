import React, { useState, useMemo } from 'react';
import type { Project } from '../../types';
import { projects, getProjectCategories, getProjectsByCategory } from '../../data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectFilter } from './ProjectFilter';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = useMemo(() => getProjectCategories(), []);
  const filteredProjects = useMemo(() => getProjectsByCategory(activeCategory), [activeCategory]);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore my portfolio of AI/ML projects, web applications, and data science solutions. 
            Each project demonstrates technical expertise and innovative problem-solving.
          </p>
        </div>

        {/* Project Filter */}
        <ProjectFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No projects found
            </h3>
            <p className="text-gray-600">
              Try selecting a different category to see more projects.
            </p>
          </div>
        )}

        {/* Project Count */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Showing {filteredProjects.length} of {projects.length} projects
            {activeCategory !== 'all' && (
              <span className="ml-2">
                in <span className="font-semibold">{activeCategory.replace('-', ' ')}</span>
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};