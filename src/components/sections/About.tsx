import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, TrendingUp } from 'lucide-react';
import { skills, technologies, experiences } from '../../data/about';
import type { Skill, Technology, Experience } from '../../types';

const About: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'language' | 'framework' | 'tool' | 'platform'>('all');
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);

  const filteredTechnologies = selectedCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const SkillBar: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
        <span className="text-sm text-gray-500">{skill.level}/5</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${(skill.level / 5) * 100}%` }}
          transition={{ duration: 1, delay: index * 0.1 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );

  const TechnologyCard: React.FC<{ tech: Technology; index: number }> = ({ tech, index }) => (
    <motion.div
      className="group relative bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.05 }}
    >
      <div className="text-center">
        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
          {tech.icon}
        </div>
        <h3 className="font-semibold text-gray-800 text-sm mb-1">{tech.name}</h3>
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full mx-0.5 ${
                i < tech.proficiency ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500 capitalize">{tech.category}</span>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );

  const ExperienceCard: React.FC<{ experience: Experience; index: number }> = ({ experience, index }) => {
    const isExpanded = expandedExperience === experience.id;
    
    return (
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        viewport={{ once: true }}
      >
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
        
        {/* Timeline dot */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full z-10" />
        
        {/* Content */}
        <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:ml-auto'}`}>
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
            whileHover={{ scale: 1.02, y: -2 }}
            onClick={() => setExpandedExperience(isExpanded ? null : experience.id)}
          >
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Calendar size={16} />
              <span>{experience.duration}</span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-1">{experience.role}</h3>
            <div className="flex items-center gap-2 text-blue-600 font-semibold mb-3">
              <MapPin size={16} />
              <span>{experience.company}</span>
            </div>
            
            <p className="text-gray-600 mb-4">{experience.description}</p>
            
            {/* Technologies used */}
            <div className="flex flex-wrap gap-2 mb-4">
              {experience.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  <span>{tech.icon}</span>
                  {tech.name}
                </span>
              ))}
            </div>
            
            {/* Achievements (expandable) */}
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? 'auto' : 0 }}
              className="overflow-hidden"
            >
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Award size={16} />
                  Key Achievements
                </div>
                <ul className="space-y-2">
                  {experience.achievements.map((achievement, achIndex) => (
                    <motion.li
                      key={achIndex}
                      className="flex items-start gap-2 text-sm text-gray-600"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: achIndex * 0.1 }}
                    >
                      <TrendingUp size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            <div className="text-center mt-4">
              <span className="text-xs text-gray-400">
                {isExpanded ? 'Click to collapse' : 'Click to expand'}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="about" className="min-h-screen bg-gray-50 py-20">
      <div className="container-max section-padding">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Passionate AI Engineer with expertise in machine learning, deep learning, and data science. 
            I transform complex problems into intelligent solutions that drive innovation and create value.
          </p>
        </motion.div>

        {/* Skills Visualization */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-2xl font-bold text-gray-800 mb-8 text-center"
            variants={itemVariants}
          >
            Technical Skills
          </motion.h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Core Technologies</h4>
              {skills.filter(skill => skill.category === 'technical').slice(0, 6).map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Soft Skills</h4>
              {skills.filter(skill => skill.category === 'soft').map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
              {skills.filter(skill => skill.category === 'technical').slice(6).map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index + 2} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Technology Icons Grid */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-2xl font-bold text-gray-800 mb-8 text-center"
            variants={itemVariants}
          >
            Technologies & Tools
          </motion.h3>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['all', 'language', 'framework', 'tool', 'platform'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            layout
          >
            {filteredTechnologies.map((tech, index) => (
              <TechnologyCard key={tech.name} tech={tech} index={index} />
            ))}
          </motion.div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-2xl font-bold text-gray-800 mb-12 text-center"
            variants={itemVariants}
          >
            Professional Experience
          </motion.h3>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <ExperienceCard key={experience.id} experience={experience} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;