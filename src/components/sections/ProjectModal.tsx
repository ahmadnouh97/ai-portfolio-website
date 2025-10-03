import React from 'react';
import type { Project } from '../../types';
import { Modal, Button } from '../ui';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  const categoryColors = {
    'ai-ml': 'bg-blue-100 text-blue-800',
    'web-development': 'bg-green-100 text-green-800',
    'data-science': 'bg-purple-100 text-purple-800',
    'automation': 'bg-orange-100 text-orange-800',
    'research': 'bg-red-100 text-red-800'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project.title}>
      <div className="space-y-6">
        {/* Project Images */}
        {project.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((image, index) => (
              <div key={index} className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden">
                <img 
                  src={image} 
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Category and Featured Badge */}
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[project.category]}`}>
            {project.category.replace('-', ' ').toUpperCase()}
          </span>
          {project.featured && (
            <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
              Featured Project
            </span>
          )}
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">About This Project</h3>
          <p className="text-gray-700 leading-relaxed">{project.longDescription}</p>
        </div>

        {/* Technologies */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Technologies Used</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {project.technologies.map((tech, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <span className="text-lg">{tech.icon}</span>
                <div>
                  <div className="font-medium text-gray-900">{tech.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{tech.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>  
      {/* Metrics */}
        {project.metrics && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.metrics.stars && (
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 text-yellow-600 mb-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{project.metrics.stars}</div>
                  <div className="text-sm text-gray-600">Stars</div>
                </div>
              )}
              
              {project.metrics.forks && (
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 7l3.707-3.707a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{project.metrics.forks}</div>
                  <div className="text-sm text-gray-600">Forks</div>
                </div>
              )}
              
              {project.metrics.users && (
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{project.metrics.users}</div>
                  <div className="text-sm text-gray-600">Users</div>
                </div>
              )}
              
              {project.metrics.downloads && (
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{project.metrics.downloads}</div>
                  <div className="text-sm text-gray-600">Downloads</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t">
          {project.demoUrl && (
            <Button 
              variant="primary"
              onClick={() => window.open(project.demoUrl, '_blank')}
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Live Demo
            </Button>
          )}
          
          {project.githubUrl && (
            <Button 
              variant="outline"
              onClick={() => window.open(project.githubUrl, '_blank')}
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              View Source Code
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};