from django.core.management.base import BaseCommand
from portfolio_app.models import Profile, Skill, Experience, Project


class Command(BaseCommand):
    help = 'Populate the database with sample portfolio data'

    def handle(self, *args, **options):
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
            self.stdout.write(self.style.SUCCESS('Created profile for Alex Chen'))
        else:
            self.stdout.write(self.style.WARNING('Profile already exists, skipping...'))

        # Create skills
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
        
        self.stdout.write(self.style.SUCCESS(f'Created {skills_created} skills'))

        # Create experiences
        experiences_data = [
            {
                'company': 'TechCorp AI',
                'position': 'Senior AI Engineer',
                'location': 'San Francisco, CA',
                'start_date': '2022-01-01',
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
                'start_date': '2020-03-01',
                'end_date': '2021-12-31',
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
        
        self.stdout.write(self.style.SUCCESS(f'Created {experiences_created} experiences'))

        # Create projects
        projects_data = [
            {
                'title': 'AI-Powered Medical Diagnosis System',
                'description': 'Deep learning system for automated medical image analysis with 95% accuracy in detecting anomalies.',
                'detailed_description': 'Developed a comprehensive medical diagnosis system using convolutional neural networks to analyze X-rays, MRIs, and CT scans. The system achieved 95% accuracy in detecting various medical conditions and is currently being tested in clinical trials.',
                'github_url': 'https://github.com/alexchen/medical-ai',
                'demo_url': 'https://medical-ai-demo.com',
                'is_featured': True,
                'created_date': '2023-06-01'
            },
            {
                'title': 'Real-time Language Translation API',
                'description': 'High-performance translation service supporting 50+ languages with sub-second response times.',
                'detailed_description': 'Built a scalable translation API using transformer models and optimized for real-time performance. Handles over 1M translations per day with 99.9% uptime.',
                'github_url': 'https://github.com/alexchen/translation-api',
                'demo_url': 'https://translate-api-demo.com',
                'is_featured': True,
                'created_date': '2023-03-01'
            },
            {
                'title': 'Smart Recommendation Engine',
                'description': 'ML-powered recommendation system that increased user engagement by 40% for e-commerce platform.',
                'detailed_description': 'Designed and implemented a hybrid recommendation system combining collaborative filtering and content-based approaches. Deployed on AWS with auto-scaling capabilities.',
                'github_url': 'https://github.com/alexchen/recommendation-engine',
                'demo_url': '',
                'is_featured': True,
                'created_date': '2022-09-01'
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
                f'Successfully populated sample data!\n'
                f'- Profile: {"Created" if Profile.objects.filter(id=1).exists() else "Skipped"}\n'
                f'- Skills: {Skill.objects.count()} total\n'
                f'- Experiences: {Experience.objects.count()} total\n'
                f'- Projects: {Project.objects.count()} total'
            )
        )