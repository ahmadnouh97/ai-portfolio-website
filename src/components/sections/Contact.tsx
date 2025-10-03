import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Download,
  Github,
  Linkedin,
  Twitter,
  MessageCircle
} from 'lucide-react';
import { socialLinks, contactInfo } from '../../data/contact';

const Contact: React.FC = () => {
  // Icon mapping for social links
  const iconMap: Record<string, React.ComponentType<any>> = {
    linkedin: Linkedin,
    github: Github,
    twitter: Twitter,
    mail: Mail,
    '💼': Linkedin, // Map emoji to Lucide icon
    '🐙': Github,
    '🐦': Twitter,
    '📧': Mail
  };

  // Contact methods data
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Me',
      description: 'Best way to reach me for business inquiries',
      action: `mailto:${contactInfo.email}`,
      actionText: 'Send Email',
      color: 'blue'
    },
    {
      icon: MessageCircle,
      title: 'Let\'s Chat',
      description: 'Connect with me on LinkedIn for professional discussions',
      action: socialLinks.find(link => link.name.toLowerCase().includes('linkedin'))?.url || '#',
      actionText: 'Message on LinkedIn',
      color: 'indigo'
    }
  ];

  // Handle resume download
  const handleResumeDownload = () => {
    // In a real implementation, this would download the actual resume file
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // This should point to your actual resume file
    link.download = 'Ahmad_Nouh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className="min-h-screen py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I'm always interested in new opportunities and exciting projects.
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                {contactInfo.phone && (
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">{contactInfo.phone}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">{contactInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Availability</p>
                    <p className="text-gray-600">{contactInfo.availability}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Connect with me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => {
                  const IconComponent = iconMap[link.icon] || iconMap[link.name.toLowerCase()] || Mail;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-100 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      {IconComponent ? (
                        <IconComponent className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                      ) : (
                        <span className="text-lg">{link.icon}</span>
                      )}
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Resume Download */}
            <motion.button
              onClick={handleResumeDownload}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5" />
              <span>Download Resume</span>
            </motion.button>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Reach Me</h3>

            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              const colorClasses = {
                blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
                indigo: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
                amber: 'bg-amber-50 border-amber-200 hover:bg-amber-100'
              };
              const iconColors = {
                blue: 'text-blue-600',
                indigo: 'text-indigo-600',
                amber: 'text-amber-600'
              };
              const buttonColors = {
                blue: 'bg-blue-600 hover:bg-blue-700',
                indigo: 'bg-indigo-600 hover:bg-indigo-700',
                amber: 'bg-amber-600 hover:bg-amber-700'
              };

              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 ${colorClasses[method.color as keyof typeof colorClasses]}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${method.color === 'blue' ? 'bg-blue-100' : method.color === 'indigo' ? 'bg-indigo-100' : 'bg-amber-100'}`}>
                      <IconComponent className={`w-6 h-6 ${iconColors[method.color as keyof typeof iconColors]}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h4>
                      <p className="text-gray-600 mb-4">{method.description}</p>
                      <motion.a
                        href={method.action}
                        target={method.action.startsWith('http') ? '_blank' : undefined}
                        rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium transition-colors ${buttonColors[method.color as keyof typeof buttonColors]}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{method.actionText}</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Quick Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h4 className="text-lg font-semibold text-gray-900">Quick Response</h4>
              </div>
              <p className="text-gray-600">
                I typically respond to emails within 24 hours during business days.
                For urgent matters, feel free to mention it in your subject line.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;