import os
from pathlib import Path

import django
from django.conf import settings
from django.contrib.auth.models import User
from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Setup project: run migrations and seed data"

    def add_arguments(self, parser):
        parser.add_argument(
            "--with-superuser",
            action="store_true",
            help="Create a superuser if it does not exist",
        )
        parser.add_argument(
            "--skip-migrations",
            action="store_true",
            help="Skip running migrations",
        )

    def handle(self, *args, **options):
        # Create media directories
        self.create_media_directories()

        # Run migrations if not skipped
        if not options["skip_migrations"]:
            self.run_migrations()

        # Seed data
        self.seed_data()

        # Create superuser if requested
        if options["with_superuser"]:
            self.create_superuser()

        self.stdout.write(
            self.style.SUCCESS("Project setup completed successfully!")
        )

    def create_media_directories(self):
        """Create necessary media directories"""
        self.stdout.write("Creating media directories...")

        media_dirs = [
            "media/courses/icons",
            "media/mentors",
            "media/companies",
            "media/testimonials",
        ]

        for directory in media_dirs:
            os.makedirs(directory, exist_ok=True)

        self.stdout.write(
            self.style.SUCCESS("Media directories created successfully!")
        )

    def run_migrations(self):
        """Run makemigrations and migrate commands"""
        self.stdout.write("Running migrations...")

        call_command("makemigrations")
        call_command("migrate")

        self.stdout.write(
            self.style.SUCCESS("Migrations completed successfully!")
        )

    def create_superuser(self):
        """Create a superuser if it doesn't exist"""
        self.stdout.write("Checking if superuser exists...")

        if not User.objects.filter(username="admin").exists():
            self.stdout.write("Creating superuser...")
            User.objects.create_superuser(
                "admin", "admin@example.com", "admin"
            )
            self.stdout.write(
                self.style.SUCCESS("Superuser created successfully!")
            )
        else:
            self.stdout.write(self.style.SUCCESS("Superuser already exists!"))

    def seed_data(self):
        """Seed the database with initial data"""
        self.stdout.write("Seeding database...")

        # Import models here to avoid circular imports
        from courses.models import (
            Company,
            Course,
            CourseCategory,
            CourseCompany,
            CourseMentor,
            CourseOutcome,
            Mentor,
            Testimonial,
        )

        # Create categories
        self.stdout.write("Creating categories...")
        categories = [
            {"name": "Академия", "slug": "academy"},
            {"name": "Корпоративное", "slug": "corporate"},
        ]

        for category_data in categories:
            CourseCategory.objects.get_or_create(
                slug=category_data["slug"],
                defaults={"name": category_data["name"]},
            )

        academy_category = CourseCategory.objects.get(slug="academy")
        corporate_category = CourseCategory.objects.get(slug="corporate")

        # Create courses
        self.stdout.write("Creating courses...")
        courses_data = [
            {
                "title": "Python Django Backend Developer",
                "slug": "python-django",
                "description": "Погрузитесь в мир Python и Django! Изучите основы языка Python и фреймворка Django для создания мощных веб-приложений.",
                "icon_type": "python",
                "level": "beginner",
                "duration": "8-12 месяцев",
                "featured": False,
                "is_new": True,
                "category": academy_category,
                "what_will_learn": "Изучите Python с нуля, освойте Django фреймворк, научитесь работать с базами данных, создавать API и многое другое.",
                "video_hours": 65,
                "coding_exercises": 42,
                "articles": 35,
            },
            {
                "title": "PHP (Laravel) Backend Developer",
                "slug": "php-laravel",
                "description": "Станьте профессиональным PHP разработчиком! Изучите основы PHP и фреймворк Laravel для создания современных веб-приложений.",
                "icon_type": "php",
                "level": "beginner",
                "duration": "8-12 месяцев",
                "featured": False,
                "is_new": False,
                "category": academy_category,
                "what_will_learn": "Изучите PHP с нуля, освойте Laravel фреймворк, научитесь работать с базами данных, создавать API и многое другое.",
                "video_hours": 70,
                "coding_exercises": 45,
                "articles": 30,
            },
            {
                "title": "Node.js Backend Developer",
                "slug": "nodejs",
                "description": "Изучите Node.js и станьте востребованным backend разработчиком! Создавайте масштабируемые и высокопроизводительные приложения.",
                "icon_type": "node",
                "level": "beginner",
                "duration": "8-12 месяцев",
                "featured": False,
                "is_new": True,
                "category": academy_category,
                "what_will_learn": "Изучите JavaScript и Node.js, освойте Express.js, научитесь работать с MongoDB, создавать RESTful API и многое другое.",
                "video_hours": 68,
                "coding_exercises": 40,
                "articles": 32,
            },
            {
                "title": "C# .Net Backend Developer",
                "slug": "csharp-dotnet",
                "description": "Освойте C# и .NET для создания мощных корпоративных приложений! Изучите основы языка C# и платформы .NET.",
                "icon_type": "csharp",
                "level": "beginner",
                "duration": "8-12 месяцев",
                "featured": True,
                "is_new": False,
                "category": academy_category,
                "what_will_learn": "Изучите C# с нуля, освойте .NET Core, научитесь работать с SQL Server, создавать веб-приложения с ASP.NET и многое другое.",
                "video_hours": 75,
                "coding_exercises": 50,
                "articles": 40,
            },
            {
                "title": "React.js Frontend Developer",
                "slug": "react",
                "description": "Погрузитесь и изучите React.js с нуля! Изучите React, Hooks, Redux, React Router, Next.js, лучшие практики и многое другое!",
                "icon_type": "react",
                "level": "beginner",
                "duration": "8-12 месяцев",
                "featured": False,
                "is_new": False,
                "category": academy_category,
                "what_will_learn": "Изучите React с нуля, освойте Hooks, Redux, React Router, научитесь создавать современные пользовательские интерфейсы и многое другое.",
                "video_hours": 71,
                "coding_exercises": 37,
                "articles": 47,
            },
            {
                "title": "3D Max & Interior Design",
                "slug": "3d-max",
                "description": "Станьте профессиональным 3D дизайнером! Изучите 3D Max и создавайте потрясающие интерьеры и визуализации.",
                "icon_type": "3d",
                "level": "beginner",
                "duration": "8-12 месяцев",
                "featured": False,
                "is_new": False,
                "category": academy_category,
                "what_will_learn": "Изучите 3D Max с нуля, освойте моделирование, текстурирование, освещение, рендеринг и многое другое.",
                "video_hours": 80,
                "coding_exercises": 0,
                "articles": 25,
            },
            {
                "title": "Корпоративный Python для аналитиков",
                "slug": "corporate-python-analytics",
                "description": "Специал��зированный курс Python для корпоративных аналитиков. Научитесь обрабатывать и визуализировать данные.",
                "icon_type": "python",
                "level": "intermediate",
                "duration": "3-4 месяца",
                "featured": True,
                "is_new": True,
                "category": corporate_category,
                "what_will_learn": "Освойте Python для анализа данных, научитесь работать с pandas, numpy, matplotlib, seaborn и другими библиотеками.",
                "video_hours": 40,
                "coding_exercises": 30,
                "articles": 15,
            },
            {
                "title": "Корпоративная кибербезопасность",
                "slug": "corporate-cybersecurity",
                "description": "Комплексный курс по кибербезопасности для корпоративных клиентов. Защитите свою компанию от современных угроз.",
                "icon_type": "security",
                "level": "advanced",
                "duration": "4-6 месяцев",
                "featured": False,
                "is_new": True,
                "category": corporate_category,
                "what_will_learn": "Изучите основы кибербезопасности, методы защиты от атак, управление рисками и соответствие нормативным требованиям.",
                "video_hours": 55,
                "coding_exercises": 20,
                "articles": 45,
            },
        ]

        created_courses = []
        for course_data in courses_data:
            course, created = Course.objects.get_or_create(
                slug=course_data["slug"], defaults=course_data
            )
            created_courses.append(course)

            # Create outcomes for each course
            if created:
                outcomes = [
                    "Изучите основы языка программирования с нуля",
                    "Создавайте полнофункциональные веб-приложения",
                    "Работайте с базами данных и API",
                    "Освойте современные инструменты разработки",
                    "Научитесь писать чистый и поддерживаемый код",
                    "Создайте портфолио проектов для трудоустройства",
                    "Получите сертификат об окончании курса",
                    "Подготовьтесь к собеседованиям и начните карьеру",
                ]

                for i, outcome_text in enumerate(outcomes):
                    CourseOutcome.objects.create(
                        course=course, text=outcome_text, order=i
                    )

        # Create mentors
        self.stdout.write("Creating mentors...")
        mentors_data = [
            {
                "name": "Шукуров Жасур",
                "position": "PHP (Laravel) Backend Developer",
                "bio": "Опытный разработчик с более чем 5-летним стажем работы в веб-разработке. Специализируется на PHP и Laravel.",
                "photo": "mentors/jasur.jpg",
            },
            {
                "name": "Шомуродов Сарвар",
                "position": "PHP (Laravel) Backend Developer",
                "bio": "Профессиональный разработчик с опытом создания высоконагруженных веб-приложений. Эксперт в PHP и Laravel.",
                "photo": "mentors/sarvar.jpg",
            },
            {
                "name": "Алимов Бобур",
                "position": "Python Django Developer",
                "bio": "Опытный Python разработчик с глубоким знанием Django и Flask. Работал над множеством проектов различной сложности.",
                "photo": "mentors/bobur.jpg",
            },
            {
                "name": "Каримова Нилуфар",
                "position": "React.js Frontend Developer",
                "bio": "Frontend разработчик с опытом создания современных пользовательских интерфейсов. Эксперт в React.js и Redux.",
                "photo": "mentors/nilufar.jpg",
            },
            {
                "name": "Рахимов Тимур",
                "position": "Node.js Backend Developer",
                "bio": "Fullstack разработчик с фокусом на Node.js и Express. Имеет опыт работы с MongoDB, PostgreSQL и Redis.",
                "photo": "mentors/timur.jpg",
            },
            {
                "name": "Исмаилова Диёра",
                "position": "3D Max & Interior Designer",
                "bio": "Профессиональный дизайнер интерьеров с опытом работы более 7 лет. Эксперт в 3D Max и V-Ray.",
                "photo": "mentors/diyora.jpg",
            },
        ]

        created_mentors = []
        for mentor_data in mentors_data:
            mentor, created = Mentor.objects.get_or_create(
                name=mentor_data["name"], defaults=mentor_data
            )
            created_mentors.append(mentor)

        # Assign mentors to courses
        self.stdout.write("Assigning mentors to courses...")
        CourseMentor.objects.all().delete()  # Clear existing relationships

        # PHP Laravel course with PHP mentors
        php_course = Course.objects.get(slug="php-laravel")
        php_mentors = [m for m in created_mentors if "PHP" in m.position]
        for mentor in php_mentors:
            CourseMentor.objects.create(course=php_course, mentor=mentor)

        # Python Django course with Python mentors
        python_course = Course.objects.get(slug="python-django")
        python_mentors = [m for m in created_mentors if "Python" in m.position]
        for mentor in python_mentors:
            CourseMentor.objects.create(course=python_course, mentor=mentor)

        # React course with React mentors
        react_course = Course.objects.get(slug="react")
        react_mentors = [m for m in created_mentors if "React" in m.position]
        for mentor in react_mentors:
            CourseMentor.objects.create(course=react_course, mentor=mentor)

        # Node.js course with Node.js mentors
        node_course = Course.objects.get(slug="nodejs")
        node_mentors = [m for m in created_mentors if "Node" in m.position]
        for mentor in node_mentors:
            CourseMentor.objects.create(course=node_course, mentor=mentor)

        # 3D Max course with 3D mentors
        design_course = Course.objects.get(slug="3d-max")
        design_mentors = [m for m in created_mentors if "3D" in m.position]
        for mentor in design_mentors:
            CourseMentor.objects.create(course=design_course, mentor=mentor)

        # Create companies
        self.stdout.write("Creating companies...")
        companies_data = [
            {
                "name": "Google",
                "logo": "companies/google.png",
                "color": "#4285F4",
            },
            {
                "name": "YouTube",
                "logo": "companies/youtube.png",
                "color": "#FF0000",
            },
            {
                "name": "Amazon",
                "logo": "companies/amazon.png",
                "color": "#FF9900",
            },
            {
                "name": "Netflix",
                "logo": "companies/netflix.png",
                "color": "#E50914",
            },
            {
                "name": "Slack",
                "logo": "companies/slack.png",
                "color": "#4A154B",
            },
            {
                "name": "Lenovo",
                "logo": "companies/lenovo.png",
                "color": "#E2231A",
            },
            {
                "name": "Apple",
                "logo": "companies/apple.png",
                "color": "#999999",
            },
            {
                "name": "Microsoft",
                "logo": "companies/microsoft.png",
                "color": "#00A4EF",
            },
            {"name": "Uber", "logo": "companies/uber.png", "color": "#000000"},
            {
                "name": "Airbnb",
                "logo": "companies/airbnb.png",
                "color": "#FF5A5F",
            },
        ]

        created_companies = []
        for company_data in companies_data:
            company, created = Company.objects.get_or_create(
                name=company_data["name"], defaults=company_data
            )
            created_companies.append(company)

        # Assign companies to courses
        self.stdout.write("Assigning companies to courses...")
        CourseCompany.objects.all().delete()  # Clear existing relationships

        import random

        for course in created_courses:
            # Assign 3-5 random companies to each course
            num_companies = random.randint(3, 5)
            selected_companies = random.sample(
                created_companies, num_companies
            )

            for company in selected_companies:
                CourseCompany.objects.create(course=course, company=company)

        # Create testimonials
        self.stdout.write("Creating testimonials...")
        Testimonial.objects.all().delete()  # Clear existing testimonials

        names = [
            "Аннет Блэк",
            "Джейн Купер",
            "Эстер Ховард",
            "Дженни Уилсон",
            "Лесли Александр",
            "Гай Хокинс",
            "Джейкоб Джонс",
            "Камерон Уильямсон",
            "Алексей Смирнов",
            "Екатерина Иванова",
            "Дмитрий Петров",
            "Ольга Козлова",
            "Сергей Новиков",
            "Анна Морозова",
            "Михаил Волков",
            "Наталья Соколова",
        ]

        positions = [
            "Backend разработчик",
            "Frontend разработчик",
            "Fullstack разработчик",
            "UI/UX Дизайнер",
            "Проектный менеджер",
            "DevOps инженер",
            "Data аналитик",
            "QA инженер",
            "Product менеджер",
            "Системный администратор",
        ]

        testimonial_texts = [
            "Этот курс превзошел все мои ожидания! Материал подается очень понятно и структурированно. Я смог быстро освоить новые навыки и уже применяю их в работе.",
            "Отличный курс для начинающих! Преподаватели объясняют сложные концепции простым языком. Рекомендую всем, кто хочет начать карьеру в IT.",
            "Благодаря этому курсу я смог сменить профессию и найти работу мечты. Материал актуальный, много практики и поддержка менторов на высшем уровне.",
            "Курс очень интенсивный, но результат того стоит. За несколько месяцев я освоил технологии, которые сейчас востребованы на рынке труда.",
            "Прекрасная структура обучения и отзывчивые преподаватели. Всегда готовы помочь и ответить на вопросы. Я очень доволен своим выбором!",
            "Я уже имел опыт в программировании, но этот курс помог мне структурировать знания и заполнить пробелы. Теперь я чувствую себя увереннее как специалист.",
            "Отличное соотношение цены и качества. Курс дает реальные практические навыки, которые можно сразу применять в работе.",
            "Менторы курса - настоящие профессионалы своего дела. Они делятся не только теоретическими знаниями, но и практическим опытом работы в индустрии.",
            "После окончания курса я сразу нашел работу в крупной компании. Полученные знания полностью соответствуют требованиям рынка.",
            "Я прошел несколько онлайн-курсов, но этот однозначно лучший. Качество материала, поддержка и практические задания на высоте.",
        ]

        for course in created_courses:
            # Create 2-4 testimonials for each course
            num_testimonials = random.randint(2, 4)

            for _ in range(num_testimonials):
                name = random.choice(names)
                position = random.choice(positions)
                company = random.choice(created_companies)
                text = random.choice(testimonial_texts)

                Testimonial.objects.create(
                    name=name,
                    position=position,
                    company=company,
                    avatar="testimonials/default.jpg",  # Placeholder avatar
                    text=text,
                    course=course,
                )

        self.stdout.write(self.style.SUCCESS("Database seeded successfully!"))
