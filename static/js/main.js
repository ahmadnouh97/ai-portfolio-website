// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.darkIcon = document.getElementById('theme-toggle-dark-icon');
        this.lightIcon = document.getElementById('theme-toggle-light-icon');
        
        this.init();
    }
    
    init() {
        // Check for saved theme preference or default to system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            this.setDarkMode(true);
        } else {
            this.setDarkMode(false);
        }
        
        // Add event listener for theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setDarkMode(e.matches);
            }
        });
    }
    
    setDarkMode(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark');
            this.showIcon('dark');
        } else {
            document.documentElement.classList.remove('dark');
            this.showIcon('light');
        }
    }
    
    showIcon(mode) {
        if (mode === 'dark') {
            this.darkIcon?.classList.remove('hidden');
            this.lightIcon?.classList.add('hidden');
        } else {
            this.lightIcon?.classList.remove('hidden');
            this.darkIcon?.classList.add('hidden');
        }
    }
    
    toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        
        if (isDark) {
            this.setDarkMode(false);
            localStorage.setItem('theme', 'light');
        } else {
            this.setDarkMode(true);
            localStorage.setItem('theme', 'dark');
        }
    }
}

// Mobile Navigation
class MobileNavigation {
    constructor() {
        this.mobileMenuButton = document.getElementById('mobile-menu-button');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.mobileMenuIcon = this.mobileMenuButton?.querySelector('svg');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (this.mobileMenuButton) {
            this.mobileMenuButton.addEventListener('click', () => this.toggleMenu());
        }
        
        // Close menu when clicking on links
        const mobileLinks = this.mobileMenu?.querySelectorAll('a');
        mobileLinks?.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.mobileMenu?.contains(e.target) && !this.mobileMenuButton?.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.mobileMenu?.classList.remove('hidden');
        this.mobileMenu?.classList.add('animate-slide-down');
        this.updateMenuIcon(true);
        this.isOpen = true;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
    
    closeMenu() {
        this.mobileMenu?.classList.add('hidden');
        this.mobileMenu?.classList.remove('animate-slide-down');
        this.updateMenuIcon(false);
        this.isOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    updateMenuIcon(isOpen) {
        if (this.mobileMenuIcon) {
            if (isOpen) {
                this.mobileMenuIcon.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                `;
            } else {
                this.mobileMenuIcon.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                `;
            }
        }
    }
}

// Smooth Scrolling and Active Navigation
class NavigationManager {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        this.sections = [];
        
        this.init();
    }
    
    init() {
        // Setup smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Setup intersection observer for active navigation
        this.setupIntersectionObserver();
    }
    
    setupIntersectionObserver() {
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const navLink = document.querySelector(`a[href="#${id}"]`);
                
                if (entry.isIntersecting) {
                    // Remove active class from all links
                    this.navLinks.forEach(link => link.classList.remove('active'));
                    // Add active class to current link
                    navLink?.classList.add('active');
                }
            });
        }, {
            rootMargin: '-80px 0px -50% 0px' // Account for fixed header
        });
        
        sections.forEach(section => observer.observe(section));
    }
}

// Enhanced Scroll Animations
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.animate-on-scroll');
        this.skillItems = document.querySelectorAll('.skill-item');
        this.init();
    }
    
    init() {
        // Main scroll animations observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Handle staggered animations
                    const delay = entry.target.style.animationDelay || '0s';
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, parseFloat(delay) * 1000);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Skills progress animation observer
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillProgress(entry.target);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });
        
        this.animatedElements.forEach(el => observer.observe(el));
        this.skillItems.forEach(el => skillObserver.observe(el));
    }
    
    animateSkillProgress(skillItem) {
        const progressBar = skillItem.querySelector('.skill-progress');
        if (progressBar && !skillItem.classList.contains('animated')) {
            skillItem.classList.add('animated');
            
            // Get the target width from data attribute or class
            let targetWidth = '0%';
            if (progressBar.classList.contains('w-full')) targetWidth = '100%';
            else if (progressBar.classList.contains('w-4/5')) targetWidth = '80%';
            else if (progressBar.classList.contains('w-3/5')) targetWidth = '60%';
            else if (progressBar.classList.contains('w-2/5')) targetWidth = '40%';
            
            // Animate the progress bar
            setTimeout(() => {
                progressBar.style.width = targetWidth;
            }, 200);
        }
    }
}

// Enhanced Hero Interactions
class HeroInteractions {
    constructor() {
        this.init();
    }
    
    init() {
        // Add parallax effect to hero background elements
        this.setupParallax();
        
        // Add typing effect to name (if desired)
        this.setupTypingEffect();
        
        // Add smooth scroll indicator interaction
        this.setupScrollIndicator();
    }
    
    setupParallax() {
        const blobs = document.querySelectorAll('.animate-blob');
        
        window.addEventListener('scroll', portfolioUtils.debounce(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            blobs.forEach((blob, index) => {
                const speed = 0.2 + (index * 0.1);
                blob.style.transform = `translate3d(0, ${rate * speed}px, 0)`;
            });
        }, 10));
    }
    
    setupTypingEffect() {
        // Optional: Add typing effect to the hero title
        const heroTitle = document.querySelector('#home h1 span');
        if (heroTitle && heroTitle.textContent) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            heroTitle.style.borderRight = '2px solid';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 60);
                } else {
                    heroTitle.style.borderRight = 'none';
                }
            };
            
            // Start typing effect immediately
            setTimeout(typeWriter, 100);
        }
    }
    
    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
}

// Skills Interaction Enhancement
class SkillsInteractions {
    constructor() {
        this.init();
    }
    
    init() {
        // Add hover effects for skill cards
        this.setupSkillCardHovers();
        
        // Add click interactions for skill details
        this.setupSkillDetails();
    }
    
    setupSkillCardHovers() {
        const skillCards = document.querySelectorAll('#about .group');
        
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Add subtle animation to skill progress bars
                const progressBars = card.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    bar.style.transform = 'scaleX(1.02)';
                    bar.style.transition = 'transform 0.3s ease';
                });
            });
            
            card.addEventListener('mouseleave', () => {
                const progressBars = card.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    bar.style.transform = 'scaleX(1)';
                });
            });
        });
    }
    
    setupSkillDetails() {
        // Add click handlers for skill items to show more details
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            item.addEventListener('click', () => {
                // Add a subtle pulse effect when clicked
                item.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }
}

// Project Filtering and Modal System
class ProjectsManager {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.viewMoreButtons = document.querySelectorAll('.view-more-btn');
        this.modal = document.getElementById('project-modal');
        this.modalBackdrop = document.getElementById('modal-backdrop');
        this.closeModalBtn = document.getElementById('close-modal');
        
        this.init();
    }
    
    init() {
        // Setup filter functionality
        this.setupFiltering();
        
        // Setup modal functionality
        this.setupModal();
        
        // Setup expandable achievements
        this.setupExpandableAchievements();
    }
    
    setupFiltering() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.filterProjects(filter);
                this.updateActiveFilter(e.target);
            });
        });
    }
    
    filterProjects(filter) {
        this.projectCards.forEach(card => {
            const technologies = card.getAttribute('data-technologies');
            
            if (filter === 'all' || technologies.includes(filter)) {
                card.style.display = 'block';
                card.classList.add('animate-on-scroll');
                // Trigger animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    updateActiveFilter(activeButton) {
        this.filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.classList.remove('bg-primary-600', 'text-white');
            btn.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
        });
        
        activeButton.classList.add('active');
        activeButton.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
        activeButton.classList.add('bg-primary-600', 'text-white');
    }
    
    setupModal() {
        // Open modal
        this.viewMoreButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = button.getAttribute('data-project-id');
                this.openModal(projectId);
            });
        });
        
        // Close modal
        this.closeModalBtn?.addEventListener('click', () => this.closeModal());
        this.modalBackdrop?.addEventListener('click', () => this.closeModal());
        
        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal?.classList.contains('hidden')) {
                this.closeModal();
            }
        });
    }
    
    openModal(projectId) {
        const projectDetails = document.querySelector(`.project-details[data-project-id="${projectId}"]`);
        if (!projectDetails) return;
        
        // Extract project data
        const title = projectDetails.querySelector('.project-title').textContent;
        const description = projectDetails.querySelector('.project-description').textContent;
        const image = projectDetails.querySelector('.project-image').textContent;
        const github = projectDetails.querySelector('.project-github').textContent;
        const demo = projectDetails.querySelector('.project-demo').textContent;
        const technologies = projectDetails.querySelector('.project-technologies').textContent;
        const date = projectDetails.querySelector('.project-date').textContent;
        
        // Populate modal
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-date').textContent = date;
        document.getElementById('modal-description').textContent = description;
        
        // Handle image
        const modalImageContainer = document.getElementById('modal-image-container');
        const modalImage = document.getElementById('modal-image');
        if (image) {
            modalImage.src = image;
            modalImage.alt = title;
            modalImageContainer.style.display = 'block';
        } else {
            modalImageContainer.style.display = 'none';
        }
        
        // Handle technologies
        const modalTechnologies = document.getElementById('modal-technologies');
        modalTechnologies.innerHTML = '';
        if (technologies) {
            technologies.split(', ').forEach(tech => {
                const techTag = document.createElement('span');
                techTag.className = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200';
                techTag.textContent = tech.trim();
                modalTechnologies.appendChild(techTag);
            });
        }
        
        // Handle links
        const githubLink = document.getElementById('modal-github-link');
        const demoLink = document.getElementById('modal-demo-link');
        
        if (github) {
            githubLink.href = github;
            githubLink.classList.remove('hidden');
        } else {
            githubLink.classList.add('hidden');
        }
        
        if (demo) {
            demoLink.href = demo;
            demoLink.classList.remove('hidden');
        } else {
            demoLink.classList.add('hidden');
        }
        
        // Show modal
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        this.closeModalBtn?.focus();
    }
    
    closeModal() {
        this.modal?.classList.add('hidden');
        document.body.style.overflow = '';
    }
    
    setupExpandableAchievements() {
        const achievementToggles = document.querySelectorAll('.achievements-toggle');
        
        achievementToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const experienceId = toggle.getAttribute('data-experience-id');
                const content = document.getElementById(`achievements-${experienceId}`);
                const chevron = toggle.querySelector('.chevron-icon');
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                
                if (isExpanded) {
                    // Collapse
                    content.classList.add('hidden');
                    toggle.setAttribute('aria-expanded', 'false');
                    chevron.style.transform = 'rotate(0deg)';
                } else {
                    // Expand
                    content.classList.remove('hidden');
                    toggle.setAttribute('aria-expanded', 'true');
                    chevron.style.transform = 'rotate(180deg)';
                    
                    // Trigger animations for achievement items
                    const achievementItems = content.querySelectorAll('.animate-on-scroll');
                    achievementItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        });
    }
}

// Enhanced Experience Interactions
class ExperienceInteractions {
    constructor() {
        this.experienceCards = document.querySelectorAll('#experience .group');
        this.init();
    }
    
    init() {
        this.setupHoverEffects();
        this.setupTimelineAnimations();
    }
    
    setupHoverEffects() {
        this.experienceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Add subtle glow effect to timeline dot
                const timelineDot = card.querySelector('.absolute.w-4.h-4');
                if (timelineDot) {
                    timelineDot.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const timelineDot = card.querySelector('.absolute.w-4.h-4');
                if (timelineDot) {
                    timelineDot.style.boxShadow = '';
                }
            });
        });
    }
    
    setupTimelineAnimations() {
        // Add intersection observer for timeline items
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('timeline-visible');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        this.experienceCards.forEach(card => observer.observe(card));
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new MobileNavigation();
    new NavigationManager();
    new ScrollAnimations();
    new HeroInteractions();
    new SkillsInteractions();
    new ProjectsManager();
    new ExperienceInteractions();
});

// Utility functions
window.portfolioUtils = {
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Format date helper
    formatDate: (dateString) => {
        const options = { year: 'numeric', month: 'long' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    },
    
    // Copy to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy text: ', err);
            return false;
        }
    }
};