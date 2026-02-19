import os
import random

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
        parser.add_argument(
            "--download-media",
            action="store_true",
            help="Download media files from internet",
        )

    def handle(self, *args, **options):
        # Create media directories
        self.create_media_directories()

        # Download media if requested
        if options["download_media"]:
            self.download_media_files()

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

    def download_media_files(self):
        """Download media files from internet"""
        self.stdout.write("Downloading media files...")

        # Call the load_media command with --download option
        call_command("load_media", download=True)

        self.stdout.write(
            self.style.SUCCESS("Media files downloaded successfully!")
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
        """Seed the database with initial data in multiple languages"""
        self.stdout.write("Seeding database with multilingual content...")

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

        # Multilingual data for categories
        categories_data = {
            "academy": {
                "ru": "Академия",
                "uz": "Akademiya",
                "en": "Academy",
            },
            "corporate": {
                "ru": "Корпоративное",
                "uz": "Korporativ",
                "en": "Corporate",
            },
        }

        # Create categories with translations
        self.stdout.write("Creating categories with translations...")
        for slug, translations in categories_data.items():
            category, created = CourseCategory.objects.get_or_create(
                slug=slug,
                defaults={
                    "name": translations["ru"]
                },  # Default language is Russian
            )

            # Add translations
            if created or not hasattr(category, "name_uz"):
                category.name_ru = translations["ru"]
                category.name_uz = translations["uz"]
                category.name_en = translations["en"]
                category.save()

        academy_category = CourseCategory.objects.get(slug="academy")
        corporate_category = CourseCategory.objects.get(slug="corporate")

        # Multilingual data for courses
        courses_data = [
            {
                "slug": "python-django",
                "title": {
                    "ru": "Python Django Backend Developer",
                    "uz": "Python Django Backend Dasturchi",
                    "en": "Python Django Backend Developer",
                },
                "description": {
                    "ru": "Погрузитесь в мир Python и Django! Изучите основы языка Python и фреймворка Django для создания мощных веб-приложений.",
                    "uz": "Python va Django dunyosiga sho'ng'ing! Kuchli veb-ilovalarni yaratish uchun Python tili va Django freymvorkining asoslarini o'rganing.",
                    "en": "Dive into the world of Python and Django! Learn the basics of Python language and Django framework to create powerful web applications.",
                },
                "level": {
                    "ru": "beginner",
                    "uz": "boshlang'ich",
                    "en": "beginner",
                },
                "duration": {
                    "ru": "8-12 месяцев",
                    "uz": "8-12 oy",
                    "en": "8-12 months",
                },
                "what_will_learn": {
                    "ru": "Изучите Python с нуля, освойте Django фреймворк, научитесь работать с базами данных, создавать API и многое другое.",
                    "uz": "Pythonni noldan o'rganing, Django freymvorkini o'zlashtiring, ma'lumotlar bazalari bilan ishlashni, API yaratishni va boshqa ko'p narsalarni o'rganing.",
                    "en": "Learn Python from scratch, master the Django framework, learn to work with databases, create APIs, and much more.",
                },
                "icon_type": "python",
                "featured": False,
                "is_new": True,
                "category": academy_category,
                "video_hours": 65,
                "coding_exercises": 42,
                "articles": 35,
            },
            {
                "slug": "php-laravel",
                "title": {
                    "ru": "PHP (Laravel) Backend Developer",
                    "uz": "PHP (Laravel) Backend Dasturchi",
                    "en": "PHP (Laravel) Backend Developer",
                },
                "description": {
                    "ru": "Станьте профессиональным PHP разработчиком! Изучите основы PHP и фреймворк Laravel для создания современных веб-приложений.",
                    "uz": "Professional PHP dasturchisi bo'ling! Zamonaviy veb-ilovalarni yaratish uchun PHP asoslari va Laravel freymvorkini o'rganing.",
                    "en": "Become a professional PHP developer! Learn the basics of PHP and the Laravel framework to create modern web applications.",
                },
                "level": {
                    "ru": "beginner",
                    "uz": "boshlang'ich",
                    "en": "beginner",
                },
                "duration": {
                    "ru": "8-12 месяцев",
                    "uz": "8-12 oy",
                    "en": "8-12 months",
                },
                "what_will_learn": {
                    "ru": "Изучите PHP с нуля, освойте Laravel фреймворк, научитесь работать с базами данных, создавать API и многое другое.",
                    "uz": "PHPni noldan o'rganing, Laravel freymvorkini o'zlashtiring, ma'lumotlar bazalari bilan ishlashni, API yaratishni va boshqa ko'p narsalarni o'rganing.",
                    "en": "Learn PHP from scratch, master the Laravel framework, learn to work with databases, create APIs, and much more.",
                },
                "icon_type": "php",
                "featured": False,
                "is_new": False,
                "category": academy_category,
                "video_hours": 70,
                "coding_exercises": 45,
                "articles": 30,
            },
            {
                "slug": "nodejs",
                "title": {
                    "ru": "Node.js Backend Developer",
                    "uz": "Node.js Backend Dasturchi",
                    "en": "Node.js Backend Developer",
                },
                "description": {
                    "ru": "Изучите Node.js и станьте востребованным backend разработчиком! Создавайте масштабируемые и высокопроизводительные приложения.",
                    "uz": "Node.js ni o'rganing va talabgor backend dasturchi bo'ling! Masshtablanadigan va yuqori samarali ilovalarni yarating.",
                    "en": "Learn Node.js and become a sought-after backend developer! Create scalable and high-performance applications.",
                },
                "level": {
                    "ru": "beginner",
                    "uz": "boshlang'ich",
                    "en": "beginner",
                },
                "duration": {
                    "ru": "8-12 месяцев",
                    "uz": "8-12 oy",
                    "en": "8-12 months",
                },
                "what_will_learn": {
                    "ru": "Изучите JavaScript и Node.js, освойте Express.js, научитесь работать с MongoDB, создавать RESTful API и многое другое.",
                    "uz": "JavaScript va Node.js ni o'rganing, Express.js ni o'zlashtiring, MongoDB bilan ishlashni, RESTful API yaratishni va boshqa ko'p narsalarni o'rganing.",
                    "en": "Learn JavaScript and Node.js, master Express.js, learn to work with MongoDB, create RESTful APIs, and much more.",
                },
                "icon_type": "node",
                "featured": False,
                "is_new": True,
                "category": academy_category,
                "video_hours": 68,
                "coding_exercises": 40,
                "articles": 32,
            },
            {
                "slug": "csharp-dotnet",
                "title": {
                    "ru": "C# .Net Backend Developer",
                    "uz": "C# .Net Backend Dasturchi",
                    "en": "C# .Net Backend Developer",
                },
                "description": {
                    "ru": "Освойте C# и .NET для создания мощных корпоративных приложений! Изучите основы языка C# и платформы .NET.",
                    "uz": "Kuchli korporativ ilovalarni yaratish uchun C# va .NET ni o'rganing! C# tili va .NET platformasining asoslarini o'rganing.",
                    "en": "Master C# and .NET to create powerful enterprise applications! Learn the basics of the C# language and .NET platform.",
                },
                "level": {
                    "ru": "beginner",
                    "uz": "boshlang'ich",
                    "en": "beginner",
                },
                "duration": {
                    "ru": "8-12 месяцев",
                    "uz": "8-12 oy",
                    "en": "8-12 months",
                },
                "what_will_learn": {
                    "ru": "Изучите C# с нуля, освойте .NET Core, научитесь работать с SQL Server, создавать веб-приложения с ASP.NET и многое другое.",
                    "uz": "C# ni noldan o'rganing, .NET Core ni o'zlashtiring, SQL Server bilan ishlashni, ASP.NET bilan veb-ilovalar yaratishni va boshqa ko'p narsalarni o'rganing.",
                    "en": "Learn C# from scratch, master .NET Core, learn to work with SQL Server, create web applications with ASP.NET, and much more.",
                },
                "icon_type": "csharp",
                "featured": True,
                "is_new": False,
                "category": academy_category,
                "video_hours": 75,
                "coding_exercises": 50,
                "articles": 40,
            },
            {
                "slug": "react",
                "title": {
                    "ru": "React.js Frontend Developer",
                    "uz": "React.js Frontend Dasturchi",
                    "en": "React.js Frontend Developer",
                },
                "description": {
                    "ru": "Погрузитесь и изучите React.js с нуля! Изучите React, Hooks, Redux, React Router, Next.js, лучшие практики и многое другое!",
                    "uz": "React.js ni noldan o'rganing! React, Hooks, Redux, React Router, Next.js, eng yaxshi amaliyotlar va boshqa ko'p narsalarni o'rganing!",
                    "en": "Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, Next.js, best practices, and much more!",
                },
                "level": {
                    "ru": "beginner",
                    "uz": "boshlang'ich",
                    "en": "beginner",
                },
                "duration": {
                    "ru": "8-12 месяцев",
                    "uz": "8-12 oy",
                    "en": "8-12 months",
                },
                "what_will_learn": {
                    "ru": "Изучите React с нуля, освойте Hooks, Redux, React Router, научитесь создавать современные пользовательские интерфейсы и многое другое.",
                    "uz": "React ni noldan o'rganing, Hooks, Redux, React Router ni o'zlashtiring, zamonaviy foydalanuvchi interfeyslarini yaratishni va boshqa ko'p narsalarni o'rganing.",
                    "en": "Learn React from scratch, master Hooks, Redux, React Router, learn to create modern user interfaces, and much more.",
                },
                "icon_type": "react",
                "featured": False,
                "is_new": False,
                "category": academy_category,
                "video_hours": 71,
                "coding_exercises": 37,
                "articles": 47,
            },
            {
                "slug": "3d-max",
                "title": {
                    "ru": "3D Max & Interior Design",
                    "uz": "3D Max & Interyer Dizayni",
                    "en": "3D Max & Interior Design",
                },
                "description": {
                    "ru": "Станьте профессиональным 3D дизайнером! Изучите 3D Max и создавайте потрясающие интерьеры и визуализации.",
                    "uz": "Professional 3D dizayner bo'ling! 3D Max ni o'rganing va ajoyib interyerlar va vizualizatsiyalarni yarating.",
                    "en": "Become a professional 3D designer! Learn 3D Max and create stunning interiors and visualizations.",
                },
                "level": {
                    "ru": "beginner",
                    "uz": "boshlang'ich",
                    "en": "beginner",
                },
                "duration": {
                    "ru": "8-12 месяцев",
                    "uz": "8-12 oy",
                    "en": "8-12 months",
                },
                "what_will_learn": {
                    "ru": "Изучите 3D Max с нуля, освойте моделирование, текстурирование, освещение, рендеринг и многое другое.",
                    "uz": "3D Max ni noldan o'rganing, modellashtirish, teksturalash, yoritish, renderingni va boshqa ko'p narsalarni o'zlashtiring.",
                    "en": "Learn 3D Max from scratch, master modeling, texturing, lighting, rendering, and much more.",
                },
                "icon_type": "3d",
                "featured": False,
                "is_new": False,
                "category": academy_category,
                "video_hours": 80,
                "coding_exercises": 0,
                "articles": 25,
            },
            {
                "slug": "corporate-python-analytics",
                "title": {
                    "ru": "Корпоративный Python для аналитиков",
                    "uz": "Korporativ Python tahlilchilar uchun",
                    "en": "Corporate Python for Analysts",
                },
                "description": {
                    "ru": "Специализированный курс Python для корпоративных аналитиков. Научитесь обрабатывать и визуализировать данные.",
                    "uz": "Korporativ tahlilchilar uchun maxsus Python kursi. Ma'lumotlarni qayta ishlash va vizualizatsiya qilishni o'rganing.",
                    "en": "Specialized Python course for corporate analysts. Learn to process and visualize data.",
                },
                "level": {
                    "ru": "intermediate",
                    "uz": "o'rta",
                    "en": "intermediate",
                },
                "duration": {
                    "ru": "3-4 месяца",
                    "uz": "3-4 oy",
                    "en": "3-4 months",
                },
                "what_will_learn": {
                    "ru": "Освойте Python для анализа данных, научитесь работать с pandas, numpy, matplotlib, seaborn и другими библиотеками.",
                    "uz": "Ma'lumotlarni tahlil qilish uchun Python ni o'rganing, pandas, numpy, matplotlib, seaborn va boshqa kutubxonalar bilan ishlashni o'rganing.",
                    "en": "Master Python for data analysis, learn to work with pandas, numpy, matplotlib, seaborn, and other libraries.",
                },
                "icon_type": "python",
                "featured": True,
                "is_new": True,
                "category": corporate_category,
                "video_hours": 40,
                "coding_exercises": 30,
                "articles": 15,
            },
            {
                "slug": "corporate-cybersecurity",
                "title": {
                    "ru": "Корпоративная кибербезопасность",
                    "uz": "Korporativ kiberhavfsizlik",
                    "en": "Corporate Cybersecurity",
                },
                "description": {
                    "ru": "Комплексный курс по кибербезопасности для корпоративных клиентов. Защитите свою компанию от современных угроз.",
                    "uz": "Korporativ mijozlar uchun kompleks kiberhavfsizlik kursi. Kompaniyangizni zamonaviy tahdidlardan himoya qiling.",
                    "en": "Comprehensive cybersecurity course for corporate clients. Protect your company from modern threats.",
                },
                "level": {
                    "ru": "advanced",
                    "uz": "yuqori",
                    "en": "advanced",
                },
                "duration": {
                    "ru": "4-6 месяцев",
                    "uz": "4-6 oy",
                    "en": "4-6 months",
                },
                "what_will_learn": {
                    "ru": "Изучите основы кибербезопасности, методы защиты от атак, управление рисками и соответствие нормативным требованиям.",
                    "uz": "Kiberhavfsizlik asoslarini, hujumlardan himoyalanish usullarini, xavflarni boshqarish va me'yoriy talablarga muvofiqlikni o'rganing.",
                    "en": "Learn the basics of cybersecurity, methods of protection against attacks, risk management, and compliance with regulatory requirements.",
                },
                "icon_type": "security",
                "featured": False,
                "is_new": True,
                "category": corporate_category,
                "video_hours": 55,
                "coding_exercises": 20,
                "articles": 45,
            },
        ]

        # Create courses with translations
        self.stdout.write("Creating courses with translations...")
        created_courses = []
        for course_data in courses_data:
            # Extract the base data
            slug = course_data["slug"]
            icon_type = course_data["icon_type"]
            featured = course_data["featured"]
            is_new = course_data["is_new"]
            category = course_data["category"]
            video_hours = course_data["video_hours"]
            coding_exercises = course_data["coding_exercises"]
            articles = course_data["articles"]

            # Get or create the course with default Russian values
            course, created = Course.objects.get_or_create(
                slug=slug,
                defaults={
                    "title": course_data["title"]["ru"],
                    "description": course_data["description"]["ru"],
                    "level": course_data["level"]["ru"],
                    "duration": course_data["duration"]["ru"],
                    "what_will_learn": course_data["what_will_learn"]["ru"],
                    "icon_type": icon_type,
                    "featured": featured,
                    "is_new": is_new,
                    "category": category,
                    "video_hours": video_hours,
                    "coding_exercises": coding_exercises,
                    "articles": articles,
                },
            )

            # Add translations
            if created or not hasattr(course, "title_uz"):
                # Russian
                course.title_ru = course_data["title"]["ru"]
                course.description_ru = course_data["description"]["ru"]
                course.level_ru = course_data["level"]["ru"]
                course.duration_ru = course_data["duration"]["ru"]
                course.what_will_learn_ru = course_data["what_will_learn"][
                    "ru"
                ]

                # Uzbek
                course.title_uz = course_data["title"]["uz"]
                course.description_uz = course_data["description"]["uz"]
                course.level_uz = course_data["level"]["uz"]
                course.duration_uz = course_data["duration"]["uz"]
                course.what_will_learn_uz = course_data["what_will_learn"][
                    "uz"
                ]

                # English
                course.title_en = course_data["title"]["en"]
                course.description_en = course_data["description"]["en"]
                course.level_en = course_data["level"]["en"]
                course.duration_en = course_data["duration"]["en"]
                course.what_will_learn_en = course_data["what_will_learn"][
                    "en"
                ]

                course.save()

            created_courses.append(course)

            # Create outcomes for each course with translations
            if (
                created
                or not CourseOutcome.objects.filter(course=course).exists()
            ):
                outcomes_data = [
                    {
                        "ru": "Изучите основы языка программирования с нуля",
                        "uz": "Dasturlash tilining asoslarini noldan o'rganing",
                        "en": "Learn the basics of the programming language from scratch",
                    },
                    {
                        "ru": "Создавайте полнофункциональные веб-приложения",
                        "uz": "To'liq funksional veb-ilovalarni yarating",
                        "en": "Create fully functional web applications",
                    },
                    {
                        "ru": "Работайте с базами данных и API",
                        "uz": "Ma'lumotlar bazalari va API bilan ishlang",
                        "en": "Work with databases and APIs",
                    },
                    {
                        "ru": "Освойте современные инструменты разработки",
                        "uz": "Zamonaviy dasturlash vositalarini o'zlashtiring",
                        "en": "Master modern development tools",
                    },
                    {
                        "ru": "Научитесь писать чистый и поддерживаемый код",
                        "uz": "Toza va qo'llab-quvvatlanadigan kod yozishni o'rganing",
                        "en": "Learn to write clean and maintainable code",
                    },
                    {
                        "ru": "Создайте портфолио проектов для трудоустройства",
                        "uz": "Ishga joylashish uchun loyihalar portfoliosini yarating",
                        "en": "Create a portfolio of projects for employment",
                    },
                    {
                        "ru": "Получите сертификат об окончании курса",
                        "uz": "Kursni tugatganlik haqida sertifikat oling",
                        "en": "Get a certificate of course completion",
                    },
                    {
                        "ru": "Подготовьтесь к собеседованиям и начните карьеру",
                        "uz": "Suhbatlarga tayyorlaning va karyerangizni boshlang",
                        "en": "Prepare for interviews and start your career",
                    },
                ]

                for i, outcome_data in enumerate(outcomes_data):
                    outcome = CourseOutcome.objects.create(
                        course=course,
                        text=outcome_data["ru"],  # Default language is Russian
                        order=i,
                    )

                    # Add translations
                    outcome.text_ru = outcome_data["ru"]
                    outcome.text_uz = outcome_data["uz"]
                    outcome.text_en = outcome_data["en"]
                    outcome.save()

        # Create mentors with translations
        self.stdout.write("Creating mentors with translations...")
        mentors_data = [
            {
                "name": {
                    "ru": "Шукуров Жасур",
                    "uz": "Shukurov Jasur",
                    "en": "Shukurov Jasur",
                },
                "position": {
                    "ru": "PHP (Laravel) Backend Developer",
                    "uz": "PHP (Laravel) Backend Dasturchi",
                    "en": "PHP (Laravel) Backend Developer",
                },
                "bio": {
                    "ru": "Опытный разработчик с более чем 5-летним стажем работы в веб-разработке. Специализируется на PHP и Laravel.",
                    "uz": "5 yildan ortiq veb-dasturlash tajribasiga ega tajribali dasturchi. PHP va Laravel bo'yicha mutaxassis.",
                    "en": "Experienced developer with more than 5 years of experience in web development. Specializes in PHP and Laravel.",
                },
                "photo": "mentors/jasur.jpg",
            },
            {
                "name": {
                    "ru": "Шомуродов Сарвар",
                    "uz": "Shomurodov Sarvar",
                    "en": "Shomurodov Sarvar",
                },
                "position": {
                    "ru": "PHP (Laravel) Backend Developer",
                    "uz": "PHP (Laravel) Backend Dasturchi",
                    "en": "PHP (Laravel) Backend Developer",
                },
                "bio": {
                    "ru": "Профессиональный разработчик с опытом создания высоконагруженных веб-приложений. Эксперт в PHP и Laravel.",
                    "uz": "Yuqori yuklamali veb-ilovalarni yaratish tajribasiga ega professional dasturchi. PHP va Laravel bo'yicha ekspert.",
                    "en": "Professional developer with experience in creating high-load web applications. Expert in PHP and Laravel.",
                },
                "photo": "mentors/sarvar.jpg",
            },
            {
                "name": {
                    "ru": "Алимов Бобур",
                    "uz": "Alimov Bobur",
                    "en": "Alimov Bobur",
                },
                "position": {
                    "ru": "Python Django Developer",
                    "uz": "Python Django Dasturchi",
                    "en": "Python Django Developer",
                },
                "bio": {
                    "ru": "Опытный Python разработчик с глубоким знанием Django и Flask. Работал над множеством проектов различной сложности.",
                    "uz": "Django va Flask chuqur bilimiga ega tajribali Python dasturchi. Turli murakkablikdagi ko'plab loyihalar ustida ishlagan.",
                    "en": "Experienced Python developer with deep knowledge of Django and Flask. Has worked on many projects of varying complexity.",
                },
                "photo": "mentors/bobur.jpg",
            },
            {
                "name": {
                    "ru": "Каримова Нилуфар",
                    "uz": "Karimova Nilufar",
                    "en": "Karimova Nilufar",
                },
                "position": {
                    "ru": "React.js Frontend Developer",
                    "uz": "React.js Frontend Dasturchi",
                    "en": "React.js Frontend Developer",
                },
                "bio": {
                    "ru": "Frontend разработчик с опытом создания современных пользовательских интерфейсов. Эксперт в React.js и Redux.",
                    "uz": "Zamonaviy foydalanuvchi interfeyslarini yaratish tajribasiga ega Frontend dasturchi. React.js va Redux bo'yicha ekspert.",
                    "en": "Frontend developer with experience in creating modern user interfaces. Expert in React.js and Redux.",
                },
                "photo": "mentors/nilufar.jpg",
            },
            {
                "name": {
                    "ru": "Рахимов Тимур",
                    "uz": "Rahimov Timur",
                    "en": "Rakhimov Timur",
                },
                "position": {
                    "ru": "Node.js Backend Developer",
                    "uz": "Node.js Backend Dasturchi",
                    "en": "Node.js Backend Developer",
                },
                "bio": {
                    "ru": "Fullstack разработчик с фокусом на Node.js и Express. Имеет опыт работы с MongoDB, PostgreSQL и Redis.",
                    "uz": "Node.js va Express ga yo'naltirilgan Fullstack dasturchi. MongoDB, PostgreSQL va Redis bilan ishlash tajribasiga ega.",
                    "en": "Fullstack developer focused on Node.js and Express. Has experience working with MongoDB, PostgreSQL, and Redis.",
                },
                "photo": "mentors/timur.jpg",
            },
            {
                "name": {
                    "ru": "Исмаилова Диёра",
                    "uz": "Ismailova Diyora",
                    "en": "Ismailova Diyora",
                },
                "position": {
                    "ru": "3D Max & Interior Designer",
                    "uz": "3D Max & Interyer Dizayneri",
                    "en": "3D Max & Interior Designer",
                },
                "bio": {
                    "ru": "Профессиональный дизайнер интерьеров с опытом работы более 7 лет. Эксперт в 3D Max и V-Ray.",
                    "uz": "7 yildan ortiq tajribaga ega professional interyer dizayneri. 3D Max va V-Ray bo'yicha ekspert.",
                    "en": "Professional interior designer with over 7 years of experience. Expert in 3D Max and V-Ray.",
                },
                "photo": "mentors/diyora.jpg",
            },
        ]

        created_mentors = []
        for mentor_data in mentors_data:
            # Get or create the mentor with default Russian values
            mentor, created = Mentor.objects.get_or_create(
                name=mentor_data["name"]["ru"],
                defaults={
                    "position": mentor_data["position"]["ru"],
                    "bio": mentor_data["bio"]["ru"],
                    "photo": mentor_data["photo"],
                },
            )

            # Add translations
            if created or not hasattr(mentor, "name_uz"):
                # Russian
                mentor.name_ru = mentor_data["name"]["ru"]
                mentor.position_ru = mentor_data["position"]["ru"]
                mentor.bio_ru = mentor_data["bio"]["ru"]

                # Uzbek
                mentor.name_uz = mentor_data["name"]["uz"]
                mentor.position_uz = mentor_data["position"]["uz"]
                mentor.bio_uz = mentor_data["bio"]["uz"]

                # English
                mentor.name_en = mentor_data["name"]["en"]
                mentor.position_en = mentor_data["position"]["en"]
                mentor.bio_en = mentor_data["bio"]["en"]

                mentor.save()

            created_mentors.append(mentor)

        # Assign mentors to courses
        self.stdout.write("Assigning mentors to courses...")
        CourseMentor.objects.all().delete()  # Clear existing relationships

        # PHP Laravel course with PHP mentors
        php_course = Course.objects.get(slug="php-laravel")
        php_mentors = [m for m in created_mentors if "PHP" in m.position_ru]
        for mentor in php_mentors:
            CourseMentor.objects.create(course=php_course, mentor=mentor)

        # Python Django course with Python mentors
        python_course = Course.objects.get(slug="python-django")
        python_mentors = [
            m for m in created_mentors if "Python" in m.position_ru
        ]
        for mentor in python_mentors:
            CourseMentor.objects.create(course=python_course, mentor=mentor)

        # React course with React mentors
        react_course = Course.objects.get(slug="react")
        react_mentors = [
            m for m in created_mentors if "React" in m.position_ru
        ]
        for mentor in react_mentors:
            CourseMentor.objects.create(course=react_course, mentor=mentor)

        # Node.js course with Node.js mentors
        node_course = Course.objects.get(slug="nodejs")
        node_mentors = [m for m in created_mentors if "Node" in m.position_ru]
        for mentor in node_mentors:
            CourseMentor.objects.create(course=node_course, mentor=mentor)

        # 3D Max course with 3D mentors
        design_course = Course.objects.get(slug="3d-max")
        design_mentors = [m for m in created_mentors if "3D" in m.position_ru]
        for mentor in design_mentors:
            CourseMentor.objects.create(course=design_course, mentor=mentor)

        # Create companies with translations
        self.stdout.write("Creating companies with translations...")
        companies_data = [
            {
                "name": {
                    "ru": "Google",
                    "uz": "Google",
                    "en": "Google",
                },
                "logo": "companies/google.png",
                "color": "#4285F4",
            },
            {
                "name": {
                    "ru": "YouTube",
                    "uz": "YouTube",
                    "en": "YouTube",
                },
                "logo": "companies/youtube.png",
                "color": "#FF0000",
            },
            {
                "name": {
                    "ru": "Amazon",
                    "uz": "Amazon",
                    "en": "Amazon",
                },
                "logo": "companies/amazon.png",
                "color": "#FF9900",
            },
            {
                "name": {
                    "ru": "Netflix",
                    "uz": "Netflix",
                    "en": "Netflix",
                },
                "logo": "companies/netflix.png",
                "color": "#E50914",
            },
            {
                "name": {
                    "ru": "Slack",
                    "uz": "Slack",
                    "en": "Slack",
                },
                "logo": "companies/slack.png",
                "color": "#4A154B",
            },
            {
                "name": {
                    "ru": "Lenovo",
                    "uz": "Lenovo",
                    "en": "Lenovo",
                },
                "logo": "companies/lenovo.png",
                "color": "#E2231A",
            },
            {
                "name": {
                    "ru": "Apple",
                    "uz": "Apple",
                    "en": "Apple",
                },
                "logo": "companies/apple.png",
                "color": "#999999",
            },
            {
                "name": {
                    "ru": "Microsoft",
                    "uz": "Microsoft",
                    "en": "Microsoft",
                },
                "logo": "companies/microsoft.png",
                "color": "#00A4EF",
            },
            {
                "name": {
                    "ru": "Uber",
                    "uz": "Uber",
                    "en": "Uber",
                },
                "logo": "companies/uber.png",
                "color": "#000000",
            },
            {
                "name": {
                    "ru": "Airbnb",
                    "uz": "Airbnb",
                    "en": "Airbnb",
                },
                "logo": "companies/airbnb.png",
                "color": "#FF5A5F",
            },
        ]

        created_companies = []
        for company_data in companies_data:
            # Get or create the company with default Russian values
            company, created = Company.objects.get_or_create(
                name=company_data["name"]["ru"],
                defaults={
                    "logo": company_data["logo"],
                    "color": company_data["color"],
                },
            )

            # Add translations
            if created or not hasattr(company, "name_uz"):
                company.name_ru = company_data["name"]["ru"]
                company.name_uz = company_data["name"]["uz"]
                company.name_en = company_data["name"]["en"]
                company.save()

            created_companies.append(company)

        # Assign companies to courses
        self.stdout.write("Assigning companies to courses...")
        CourseCompany.objects.all().delete()  # Clear existing relationships

        for course in created_courses:
            # Assign 3-5 random companies to each course
            num_companies = random.randint(3, 5)
            selected_companies = random.sample(
                created_companies, num_companies
            )

            for company in selected_companies:
                CourseCompany.objects.create(course=course, company=company)

        # Create testimonials with translations
        self.stdout.write("Creating testimonials with translations...")
        Testimonial.objects.all().delete()  # Clear existing testimonials

        names_data = [
            {
                "ru": "Аннет Блэк",
                "uz": "Annet Blek",
                "en": "Annette Black",
            },
            {
                "ru": "Джейн Купер",
                "uz": "Jeyn Kuper",
                "en": "Jane Cooper",
            },
            {
                "ru": "Эстер Ховард",
                "uz": "Ester Xovard",
                "en": "Esther Howard",
            },
            {
                "ru": "Дженни Уилсон",
                "uz": "Jenni Uilson",
                "en": "Jenny Wilson",
            },
            {
                "ru": "Лесли Александр",
                "uz": "Lesli Aleksandr",
                "en": "Leslie Alexander",
            },
            {
                "ru": "Гай Хокинс",
                "uz": "Gay Xokins",
                "en": "Guy Hawkins",
            },
            {
                "ru": "Джейкоб Джонс",
                "uz": "Jeykob Jons",
                "en": "Jacob Jones",
            },
            {
                "ru": "Камерон Уильямсон",
                "uz": "Kameron Uilyamson",
                "en": "Cameron Williamson",
            },
            {
                "ru": "Алексей Смирнов",
                "uz": "Aleksey Smirnov",
                "en": "Alexei Smirnov",
            },
            {
                "ru": "Екатерина Иванова",
                "uz": "Yekaterina Ivanova",
                "en": "Ekaterina Ivanova",
            },
        ]

        positions_data = [
            {
                "ru": "Backend разработчик",
                "uz": "Backend dasturchi",
                "en": "Backend Developer",
            },
            {
                "ru": "Frontend разработчик",
                "uz": "Frontend dasturchi",
                "en": "Frontend Developer",
            },
            {
                "ru": "Fullstack разработчик",
                "uz": "Fullstack dasturchi",
                "en": "Fullstack Developer",
            },
            {
                "ru": "UI/UX Дизайнер",
                "uz": "UI/UX Dizayner",
                "en": "UI/UX Designer",
            },
            {
                "ru": "Проектный менеджер",
                "uz": "Loyiha menejeri",
                "en": "Project Manager",
            },
        ]

        testimonial_texts_data = [
            {
                "ru": "Этот курс превзошел все мои ожидания! Материал подается очень понятно и структурированно. Я смог быстро освоить новые навыки и уже применяю их в работе.",
                "uz": "Bu kurs barcha kutganlarimdan oshib tushdi! Material juda tushunarli va tizimli tarzda taqdim etiladi. Men yangi ko'nikmalarni tez o'zlashtirdim va ularni allaqachon ishimda qo'llayapman.",
                "en": "This course exceeded all my expectations! The material is presented very clearly and in a structured way. I was able to quickly master new skills and am already applying them in my work.",
            },
            {
                "ru": "Отличный курс для начинающих! Преподаватели объясняют сложные концепции простым языком. Рекомендую всем, кто хочет начать карьеру в IT.",
                "uz": "Boshlang'ichlar uchun ajoyib kurs! O'qituvchilar murakkab tushunchalarni oddiy tilda tushuntiradilar. IT sohasida karyerasini boshlashni xohlagan barcha insonlarga tavsiya qilaman.",
                "en": "Great course for beginners! The teachers explain complex concepts in simple language. I recommend it to everyone who wants to start a career in IT.",
            },
            {
                "ru": "Благодаря этому курсу я смог сменить профессию и найти работу мечты. Материал актуальный, много практики и поддержка менторов на высшем уровне.",
                "uz": "Ushbu kurs tufayli men kasbimni o'zgartira oldim va orzu qilgan ishimni topdim. Material dolzarb, amaliyot ko'p va mentorlarning qo'llab-quvvatlashi eng yuqori darajada.",
                "en": "Thanks to this course, I was able to change my profession and find my dream job. The material is relevant, there is a lot of practice, and the support of mentors is at the highest level.",
            },
            {
                "ru": "Курс очень интенсивный, но результат того стоит. За несколько месяцев я освоил технологии, которые сейчас востребованы на рынке труда.",
                "uz": "Kurs juda intensiv, lekin natija bunga arziydi. Bir necha oy ichida men hozirgi mehnat bozorida talab qilinadigan texnologiyalarni o'zlashtirdim.",
                "en": "The course is very intensive, but the result is worth it. In a few months, I mastered technologies that are now in demand in the labor market.",
            },
            {
                "ru": "Прекрасная структура обучения и отзывчивые преподаватели. Всегда готовы помочь и ответить на вопросы. Я очень доволен своим выбором!",
                "uz": "Ajoyib o'quv tuzilishi va e'tiborli o'qituvchilar. Har doim yordam berishga va savollarga javob berishga tayyor. Men o'z tanlovimdan juda mamnunman!",
                "en": "Excellent learning structure and responsive teachers. Always ready to help and answer questions. I am very satisfied with my choice!",
            },
        ]

        for course in created_courses:
            # Create 2-4 testimonials for each course
            num_testimonials = random.randint(2, 4)

            for _ in range(num_testimonials):
                name_data = random.choice(names_data)
                position_data = random.choice(positions_data)
                text_data = random.choice(testimonial_texts_data)
                company = random.choice(created_companies)

                testimonial = Testimonial.objects.create(
                    name=name_data["ru"],  # Default language is Russian
                    position=position_data[
                        "ru"
                    ],  # Default language is Russian
                    company=company,
                    avatar="testimonials/default.jpg",  # Placeholder avatar
                    text=text_data["ru"],  # Default language is Russian
                    course=course,
                )

                # Add translations
                testimonial.name_ru = name_data["ru"]
                testimonial.name_uz = name_data["uz"]
                testimonial.name_en = name_data["en"]

                testimonial.position_ru = position_data["ru"]
                testimonial.position_uz = position_data["uz"]
                testimonial.position_en = position_data["en"]

                testimonial.text_ru = text_data["ru"]
                testimonial.text_uz = text_data["uz"]
                testimonial.text_en = text_data["en"]

                testimonial.save()

        self.stdout.write(
            self.style.SUCCESS(
                "Database seeded successfully with multilingual content!"
            )
        )
