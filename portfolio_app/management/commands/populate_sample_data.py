from django.core.management.base import BaseCommand
from portfolio_app.models import Profile, Skill, Experience, Project
from datetime import date


class Command(BaseCommand):
    help = 'Populate the database with Ahmad Nouh portfolio data based on resume'

    def add_arguments(self, parser):
        parser.add_argument(
            '--sample',
            action='store_true',
            help='Load sample data instead of Ahmad Nouh data',
        )

    def handle(self, *args, **options):
        if options['sample']:
            self.load_sample_data()
        else:
            self.load_ahmad_data()

    def load_ahmad_data(self):
        """Load Ahmad Nouh's actual data from resume"""
        # Create or update profile
        profile, created = Profile.objects.get_or_create(
            id=1,
            defaults={
                'full_name': 'Ahmad Nouh',
                'title': 'AI and Backend Engineer',
                'bio': 'Highly analytical and results-driven AI and Backend Engineer with five years of experience developing, optimizing, and deploying intelligent systems and scalable backend architectures. Proven ability to translate complex conceptual models into robust, high-performance tools, specializing in Generative AI, RAG, Prompt Engineering, and Natural Language Processing (NLP). Expertise in full-cycle ML system development, from research and optimization to deployment of production microservices.',
                'location': 'Turkey, Istanbul',
                'email': 'ahmadnouh428@gmail.com',
                'phone': '',
                'linkedin_url': 'https://www.linkedin.com/in/ahmad-nouh/',
                'github_url': '',
                'twitter_url': '',
                'meta_description': 'AI and Backend Engineer specializing in Generative AI, RAG, Prompt Engineering, and NLP. 5+ years experience in ML system development and deployment.',
                'meta_keywords': 'AI Engineer, Backend Engineer, Generative AI, RAG, Prompt Engineering, NLP, Machine Learning, Python, Django, FastAPI'
            }
        )
        
        if created:
            self.stdout.write(self.style.SUCCESS('Created profile for Ahmad Nouh'))
        else:
            self.stdout.write(self.style.WARNING('Profile already exists, updating...'))
            # Update existing profile with Ahmad's data
            for key, value in {
                'full_name': 'Ahmad Nouh',
                'title': 'AI and Backend Engineer',
                'bio': 'Highly analytical and results-driven AI and Backend Engineer with five years of experience developing, optimizing, and deploying intelligent systems and scalable backend architectures. Proven ability to translate complex conceptual models into robust, high-performance tools, specializing in Generative AI, RAG, Prompt Engineering, and Natural Language Processing (NLP). Expertise in full-cycle ML system development, from research and optimization to deployment of production microservices.',
                'location': 'Turkey, Istanbul',
                'email': 'ahmadnouh428@gmail.com',
                'linkedin_url': 'https://www.linkedin.com/in/ahmad-nouh/',
                'meta_description': 'AI and Backend Engineer specializing in Generative AI, RAG, Prompt Engineering, and NLP. 5+ years experience in ML system development and deployment.',
                'meta_keywords': 'AI Engineer, Backend Engineer, Generative AI, RAG, Prompt Engineering, NLP, Machine Learning, Python, Django, FastAPI'
            }.items():
                setattr(profile, key, value)
            profile.save()

        # Create skills based on Ahmad's resume
        skills_data = [
            # Programming Languages
            {'name': 'Python', 'category': 'programming', 'proficiency': 'expert', 'years_experience': 5, 'is_featured': True, 'order': 1},
            {'name': 'Go', 'category': 'programming', 'proficiency': 'advanced', 'years_experience': 3, 'is_featured': True, 'order': 2},
            {'name': 'Java', 'category': 'programming', 'proficiency': 'advanced', 'years_experience': 3, 'is_featured': True, 'order': 3},
            {'name': 'JavaScript', 'category': 'programming', 'proficiency': 'advanced', 'years_experience': 4, 'is_featured': True, 'order': 4},
            {'name': 'SQL', 'category': 'programming', 'proficiency': 'advanced', 'years_experience': 5, 'is_featured': True, 'order': 5},
            
            # AI/ML Frameworks
            {'name': 'Langchain', 'category': 'ai_ml', 'proficiency': 'expert', 'years_experience': 2, 'is_featured': True, 'order': 1},
            {'name': 'TensorFlow', 'category': 'ai_ml', 'proficiency': 'expert', 'years_experience': 4, 'is_featured': True, 'order': 2},
            {'name': 'Keras', 'category': 'ai_ml', 'proficiency': 'expert', 'years_experience': 4, 'is_featured': True, 'order': 3},
            {'name': 'Scikit-learn', 'category': 'ai_ml', 'proficiency': 'expert', 'years_experience': 5, 'is_featured': True, 'order': 4},
            {'name': 'Pandas', 'category': 'ai_ml', 'proficiency': 'expert', 'years_experience': 5, 'is_featured': True, 'order': 5},
            {'name': 'Numpy', 'category': 'ai_ml', 'proficiency': 'expert', 'years_experience': 5, 'is_featured': True, 'order': 6},
            {'name': 'Seaborn', 'category': 'ai_ml', 'proficiency': 'advanced', 'years_experience': 4, 'is_featured': False, 'order': 7},
            
            # Backend/Data
            {'name': 'FastAPI', 'category': 'backend', 'proficiency': 'expert', 'years_experience': 3, 'is_featured': True, 'order': 1},
            {'name': 'Django', 'category': 'backend', 'proficiency': 'advanced', 'years_experience': 2, 'is_featured': True, 'order': 2},
            {'name': 'RabbitMQ', 'category': 'backend', 'proficiency': 'advanced', 'years_experience': 3, 'is_featured': True, 'order': 3},
            {'name': 'Celery', 'category': 'backend', 'proficiency': 'advanced', 'years_experience': 3, 'is_featured': True, 'order': 4},
            {'name': 'MongoDB', 'category': 'backend', 'proficiency': 'advanced', 'years_experience': 4, 'is_featured': True, 'order': 5},
            {'name': 'Neo4j', 'category': 'backend', 'proficiency': 'advanced', 'years_experience': 2, 'is_featured': True, 'order': 6},
            {'name': 'Vector Databases', 'category': 'backend', 'proficiency': 'advanced', 'years_experience': 2, 'is_featured': True, 'order': 7},
            {'name': 'Flask', 'category': 'backend', 'proficiency': 'advanced', 'years_experience': 4, 'is_featured': False, 'order': 8},
            {'name': 'Go-fiber', 'category': 'backend', 'proficiency': 'advanced', 'years_experience': 2, 'is_featured': False, 'order': 9},
            
            # Engineering Tools
            {'name': 'Docker', 'category': 'tools', 'proficiency': 'expert', 'years_experience': 4, 'is_featured': True, 'order': 1},
            {'name': 'Data Version Control (DVC)', 'category': 'tools', 'proficiency': 'advanced', 'years_experience': 2, 'is_featured': True, 'order': 2},
            {'name': 'Git/Version Control', 'category': 'tools', 'proficiency': 'expert', 'years_experience': 5, 'is_featured': True, 'order': 3},
            {'name': 'n8n', 'category': 'tools', 'proficiency': 'intermediate', 'years_experience': 1, 'is_featured': False, 'order': 4},
            
            # Cloud/MLOps
            {'name': 'MLOps Principles', 'category': 'cloud', 'proficiency': 'advanced', 'years_experience': 3, 'is_featured': True, 'order': 1},
            {'name': 'AWS', 'category': 'cloud', 'proficiency': 'advanced', 'years_experience': 3, 'is_featured': True, 'order': 2},
            {'name': 'Azure', 'category': 'cloud', 'proficiency': 'intermediate', 'years_experience': 2, 'is_featured': True, 'order': 3},
        ]
        
        skills_created = 0
        for skill_data in skills_data:
            skill, created = Skill.objects.get_or_create(
                name=skill_data['name'],
                category=skill_data['category'],
                defaults=skill_data
            )
            if created:
                skills_created += 1
        
        self.stdout.write(self.style.SUCCESS(f'Created {skills_created} skills'))

        # Create experiences based on Ahmad's resume
        experiences_data = [
            {
                'company': 'Blink Tech',
                'position': 'AI Engineer',
                'location': 'Fairfax, Virginia, USA',
                'start_date': date(2025, 10, 1),
                'end_date': None,
                'is_current': True,
                'description': 'Collaborating with product and engineering teams to establish the technical direction for upcoming AI features.',
                'achievements': [
                    'Collaborating with product and engineering teams to establish the technical direction for upcoming AI features'
                ],
                'order': 1
            },
            {
                'company': 'MENT',
                'position': 'AI Engineer',
                'location': 'Fairfax, Virginia, USA',
                'start_date': date(2023, 10, 1),
                'end_date': date(2025, 9, 30),
                'is_current': False,
                'description': 'Optimized core AI components and engineered data collection pipelines for network intelligence platform in a privacy-first environment.',
                'achievements': [
                    'Optimized core AI components to reduce processing time from 15 minutes to under one second, significantly enhancing real-time responsiveness and user experience',
                    'Engineered data collection pipelines and services, achieving an average 33% improvement in data accuracy through systematic research and optimization',
                    'Designed and deployed highly scalable and efficient microservices to manage data enrichment, retrieval, and insight generation',
                    'Applied advanced prompt engineering and model fine-tuning techniques to Large Language Models (LLMs), ensuring maximum performance and alignment with platform objectives',
                    'Collaborated across cross-functional teams (product, research) to integrate innovative AI solutions and maintain platform reliability'
                ],
                'order': 2
            },
            {
                'company': 'Lableb',
                'position': 'AI Engineer',
                'location': 'Abu Dhabi, UAE',
                'start_date': date(2020, 4, 1),
                'end_date': date(2023, 9, 30),
                'is_current': False,
                'description': 'Engineered high-performance AI services and NLP tools for B2B SaaS clients, focusing on spam classification, data extraction, and Arabic language processing.',
                'achievements': [
                    'Engineered and deployed a high-performance spam classification service for B2B SaaS clients, successfully filtering over 90% of spam search queries and scaling to handle up to 30K requests per day',
                    'Developed and optimized multiple high-performance microservices (synonym extraction, transliteration) using Flask, Spring Boot, and Go-fiber',
                    'Developed a solution for extracting structured information from unstructured data, enabling better organization and utilization of complex datasets',
                    'Improved the accuracy of an Arabic spelling checking model by approximately 20% through iterative research and deep learning experimentation',
                    'Prototyped and implemented a suite of Arabic Natural Language Processing (NLP) tools, including Named Entity Recognition (NER) and semantic search'
                ],
                'order': 3
            }
        ]
        
        experiences_created = 0
        for exp_data in experiences_data:
            experience, created = Experience.objects.get_or_create(
                profile=profile,
                company=exp_data['company'],
                position=exp_data['position'],
                defaults=exp_data
            )
            if created:
                experiences_created += 1
        
        self.stdout.write(self.style.SUCCESS(f'Created {experiences_created} experiences'))

        # Create projects based on Ahmad's experience
        projects_data = [
            {
                'title': 'High-Performance Spam Classification Service',
                'description': 'B2B SaaS spam classification system filtering 90%+ spam queries, handling 30K+ requests daily.',
                'detailed_description': 'Engineered and deployed a high-performance spam classification service for B2B SaaS clients. The system successfully filters over 90% of spam search queries while scaling to handle up to 30,000 requests per day. Built with advanced machine learning algorithms and optimized for real-time performance with minimal false positives.',
                'github_url': '',
                'demo_url': '',
                'is_featured': True,
                'created_date': date(2022, 6, 1),
                'order': 1
            },
            {
                'title': 'Arabic NLP Processing Suite',
                'description': 'Comprehensive Arabic language processing tools including NER, semantic search, and spelling correction.',
                'detailed_description': 'Prototyped and implemented a comprehensive suite of Arabic Natural Language Processing (NLP) tools, including Named Entity Recognition (NER) and semantic search capabilities. Improved Arabic spelling checking model accuracy by approximately 20% through iterative research and deep learning experimentation. The suite handles complex Arabic language nuances and provides robust text processing capabilities.',
                'github_url': '',
                'demo_url': '',
                'is_featured': True,
                'created_date': date(2021, 8, 1),
                'order': 2
            },
            {
                'title': 'Structured Data Extraction System',
                'description': 'AI-powered solution for extracting structured information from unstructured data sources.',
                'detailed_description': 'Developed an advanced solution for extracting structured information from unstructured data, enabling better organization and utilization of complex datasets for clients. The system uses machine learning techniques to identify patterns and extract meaningful data points from various unstructured sources including documents, web content, and text files.',
                'github_url': '',
                'demo_url': '',
                'is_featured': True,
                'created_date': date(2021, 3, 1),
                'order': 3
            },
            {
                'title': 'Real-time Network Intelligence Platform',
                'description': 'Optimized AI components reducing processing time from 15 minutes to under 1 second.',
                'detailed_description': 'Optimized core AI components for a network intelligence platform, achieving a dramatic performance improvement by reducing processing time from 15 minutes to under one second. This enhancement significantly improved real-time responsiveness and user experience. The platform operates in a privacy-first environment and includes advanced data collection pipelines with 33% improved accuracy.',
                'github_url': '',
                'demo_url': '',
                'is_featured': True,
                'created_date': date(2024, 2, 1),
                'order': 4
            }
        ]
        
        projects_created = 0
        for proj_data in projects_data:
            project, created = Project.objects.get_or_create(
                profile=profile,
                title=proj_data['title'],
                defaults=proj_data
            )
            if created:
                projects_created += 1
        
        self.stdout.write(self.style.SUCCESS(f'Created {projects_created} projects'))
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully populated Ahmad Nouh portfolio data!\n'
                f'- Profile: {"Created" if Profile.objects.filter(id=1).exists() else "Updated"}\n'
                f'- Skills: {Skill.objects.count()} total\n'
                f'- Experiences: {Experience.objects.count()} total\n'
                f'- Projects: {Project.objects.count()} total'
            )
        )

    def load_sample_data(self):
        """Load sample data for demonstration purposes"""
        # Create or update profile
        profile, created = Profile.objects.get_or_create(
            id=1,
            defaults={
                'full_name': 'Alex Chen',
                'title': 'Senior AI Engineer & Machine Learning Specialist',
                'bio': 'Passionate AI engineer with 5+ years of experience building intelligent systems that solve real-world problems. Specialized in deep learning, computer vision, and natural language processing with a track record of deploying ML models at scale.',
                'location': 'San Francisco, CA',
                'email': 'alex.chen@example.com',
                'phone': '+1 (555) 123-4567',
                'linkedin_url': 'https://linkedin.com/in/alexchen',
                'github_url': 'https://github.com/alexchen',
                'twitter_url': 'https://twitter.com/alexchen_ai',
                'meta_description': 'Senior AI Engineer specializing in machine learning, deep learning, and computer vision. Building intelligent systems that make a difference.',
                'meta_keywords': 'AI Engineer, Machine Learning, Deep Learning, Computer Vision, NLP, Python, TensorFlow, PyTorch'
            }
        )
        
        if created:
            self.stdout.write(self.style.SUCCESS('Created sample profile for Alex Chen'))
        else:
            self.stdout.write(self.style.WARNING('Profile already exists, skipping sample data...'))
            return

        # Create sample skills
        skills_data = [
            # Programming Languages
            {'name': 'Python', 'category': 'programming', 'proficiency': 'expert', 'years_experience': 5, 'is_featured': True},
            {'name': 'JavaScript', 'category': 'programming', 'proficiency': 'advanced', 'years_experience': 4, 'is_featured': True},
            {'name': 'SQL', 'category': 'programming', 'proficiency': 'advanced', 'years_experience': 4, 'is_featured': True},
            {'name': 'R', 'category': 'programming', 'proficiency': 'intermediate', 'years_experience': 2, 'is_featured': False},
            
            # AI/ML Frameworks
            {'name': 'TensorFlow', 'category': 'ai_ml', 'proficiency': 'expert', 'years_experience': 4, 'is_featured': True},
            {'name': 'PyTorch', 'category': 'ai_ml', 'proficiency': 'expert', 'years_experience': 3, 'is_featured': True},
            {'name': 'Scikit-learn', 'category': 'ai_ml', 'proficiency': 'expert', 'years_experience': 5, 'is_featured': True},
            {'name': 'Hugging Face', 'category': 'ai_ml', 'proficiency': 'advanced', 'years_experience': 2, 'is_featured': True},
            {'name': 'OpenCV', 'category': 'ai_ml', 'proficiency': 'advanced', 'years_experience': 3, 'is_featured': True},
            {'name': 'Keras', 'category': 'ai_ml', 'proficiency': 'expert', 'years_experience': 4, 'is_featured': False},
            
            # Backend/Data
            {'name': 'Django', 'category': 'backend', 'proficiency': 'advanced', 'years_experience': 3, 'is_featured': True},
            {'name': 'FastAPI', 'category': 'backend', 'proficiency': 'advanced', 'years_experience': 2, 'is_featured': True},
            {'name': 'PostgreSQL', 'category': 'backend', 'proficiency': 'advanced', 'years_experience': 4, 'is_featured': True},
            {'name': 'MongoDB', 'category': 'backend', 'proficiency': 'intermediate', 'years_experience': 2, 'is_featured': False},
            {'name': 'Redis', 'category': 'backend', 'proficiency': 'intermediate', 'years_experience': 2, 'is_featured': True},
            {'name': 'Apache Spark', 'category': 'backend', 'proficiency': 'intermediate', 'years_experience': 2, 'is_featured': True},
            
            # Engineering Tools
            {'name': 'Docker', 'category': 'tools', 'proficiency': 'advanced', 'years_experience': 3, 'is_featured': True},
            {'name': 'Git', 'category': 'tools', 'proficiency': 'expert', 'years_experience': 5, 'is_featured': True},
            {'name': 'Jupyter', 'category': 'tools', 'proficiency': 'expert', 'years_experience': 5, 'is_featured': True},
            {'name': 'VS Code', 'category': 'tools', 'proficiency': 'expert', 'years_experience': 5, 'is_featured': False},
            {'name': 'Linux', 'category': 'tools', 'proficiency': 'advanced', 'years_experience': 4, 'is_featured': True},
            
            # Cloud/MLOps
            {'name': 'AWS', 'category': 'cloud', 'proficiency': 'advanced', 'years_experience': 3, 'is_featured': True},
            {'name': 'Google Cloud', 'category': 'cloud', 'proficiency': 'intermediate', 'years_experience': 2, 'is_featured': True},
            {'name': 'MLflow', 'category': 'cloud', 'proficiency': 'advanced', 'years_experience': 2, 'is_featured': True},
            {'name': 'Kubernetes', 'category': 'cloud', 'proficiency': 'intermediate', 'years_experience': 1, 'is_featured': True},
            {'name': 'Terraform', 'category': 'cloud', 'proficiency': 'intermediate', 'years_experience': 1, 'is_featured': False},
        ]
        
        skills_created = 0
        for skill_data in skills_data:
            skill, created = Skill.objects.get_or_create(
                name=skill_data['name'],
                category=skill_data['category'],
                defaults=skill_data
            )
            if created:
                skills_created += 1
        
        self.stdout.write(self.style.SUCCESS(f'Created {skills_created} sample skills'))

        # Create sample experiences
        experiences_data = [
            {
                'company': 'TechCorp AI',
                'position': 'Senior AI Engineer',
                'location': 'San Francisco, CA',
                'start_date': date(2022, 1, 1),
                'end_date': None,
                'is_current': True,
                'description': 'Lead AI engineer responsible for developing and deploying machine learning models for computer vision and NLP applications. Built scalable ML pipelines serving millions of users daily.',
                'achievements': [
                    'Improved model accuracy by 25% through advanced feature engineering and ensemble methods',
                    'Reduced inference latency by 40% through model optimization and efficient deployment strategies',
                    'Led a team of 4 ML engineers in developing a real-time recommendation system',
                    'Implemented MLOps best practices, reducing model deployment time from weeks to hours'
                ]
            },
            {
                'company': 'DataScience Inc',
                'position': 'Machine Learning Engineer',
                'location': 'Palo Alto, CA',
                'start_date': date(2020, 3, 1),
                'end_date': date(2021, 12, 31),
                'is_current': False,
                'description': 'Developed end-to-end machine learning solutions for e-commerce and fintech clients. Specialized in deep learning models for image recognition and natural language processing.',
                'achievements': [
                    'Built a fraud detection system that reduced false positives by 60%',
                    'Developed computer vision models for automated quality control in manufacturing',
                    'Created NLP pipelines for sentiment analysis and document classification',
                    'Mentored junior developers and conducted ML workshops'
                ]
            }
        ]
        
        experiences_created = 0
        for exp_data in experiences_data:
            experience, created = Experience.objects.get_or_create(
                profile=profile,
                company=exp_data['company'],
                position=exp_data['position'],
                defaults=exp_data
            )
            if created:
                experiences_created += 1
        
        self.stdout.write(self.style.SUCCESS(f'Created {experiences_created} sample experiences'))

        # Create sample projects
        projects_data = [
            {
                'title': 'AI-Powered Medical Diagnosis System',
                'description': 'Deep learning system for automated medical image analysis with 95% accuracy in detecting anomalies.',
                'detailed_description': 'Developed a comprehensive medical diagnosis system using convolutional neural networks to analyze X-rays, MRIs, and CT scans. The system achieved 95% accuracy in detecting various medical conditions and is currently being tested in clinical trials.',
                'github_url': 'https://github.com/alexchen/medical-ai',
                'demo_url': 'https://medical-ai-demo.com',
                'is_featured': True,
                'created_date': date(2023, 6, 1)
            },
            {
                'title': 'Real-time Language Translation API',
                'description': 'High-performance translation service supporting 50+ languages with sub-second response times.',
                'detailed_description': 'Built a scalable translation API using transformer models and optimized for real-time performance. Handles over 1M translations per day with 99.9% uptime.',
                'github_url': 'https://github.com/alexchen/translation-api',
                'demo_url': 'https://translate-api-demo.com',
                'is_featured': True,
                'created_date': date(2023, 3, 1)
            },
            {
                'title': 'Smart Recommendation Engine',
                'description': 'ML-powered recommendation system that increased user engagement by 40% for e-commerce platform.',
                'detailed_description': 'Designed and implemented a hybrid recommendation system combining collaborative filtering and content-based approaches. Deployed on AWS with auto-scaling capabilities.',
                'github_url': 'https://github.com/alexchen/recommendation-engine',
                'demo_url': '',
                'is_featured': True,
                'created_date': date(2022, 9, 1)
            }
        ]
        
        projects_created = 0
        for proj_data in projects_data:
            project, created = Project.objects.get_or_create(
                profile=profile,
                title=proj_data['title'],
                defaults=proj_data
            )
            if created:
                projects_created += 1
        
        self.stdout.write(self.style.SUCCESS(f'Created {projects_created} sample projects'))
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully populated sample data!\n'
                f'- Profile: {"Created" if Profile.objects.filter(id=1).exists() else "Skipped"}\n'
                f'- Skills: {Skill.objects.count()} total\n'
                f'- Experiences: {Experience.objects.count()} total\n'
                f'- Projects: {Project.objects.count()} total'
            )
        )