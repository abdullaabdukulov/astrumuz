import os
import shutil

import requests
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Load media files from a source directory or download from URLs"

    def add_arguments(self, parser):
        parser.add_argument(
            "source_dir",
            type=str,
            nargs="?",
            default=None,
            help="Source directory containing media files (optional)",
        )
        parser.add_argument(
            "--download",
            action="store_true",
            help="Download media files from predefined URLs",
        )

    def handle(self, *args, **options):
        source_dir = options["source_dir"]
        download = options["download"]

        # Create media directories if they don't exist
        self.create_media_directories()

        if download:
            # Download files from predefined URLs
            self.download_media_files()
        elif source_dir:
            if not os.path.exists(source_dir):
                self.stdout.write(
                    self.style.ERROR(
                        f"Source directory {source_dir} does not exist!"
                    )
                )
                return

            # Copy files from source directory to media directories
            self.copy_media_files(source_dir)
        else:
            self.stdout.write(
                self.style.ERROR(
                    "Either source_dir or --download option must be provided!"
                )
            )
            return

        self.stdout.write(
            self.style.SUCCESS("Media files loaded successfully!")
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

    def copy_media_files(self, source_dir):
        """Copy media files from source directory to media directories"""
        self.stdout.write("Copying media files...")

        # Define mapping of source subdirectories to destination directories
        dir_mapping = {
            "courses_icons": "media/courses/icons",
            "mentors": "media/mentors",
            "companies": "media/companies",
            "testimonials": "media/testimonials",
        }

        # Copy files from each source subdirectory to the corresponding destination directory
        for src_subdir, dest_dir in dir_mapping.items():
            src_path = os.path.join(source_dir, src_subdir)

            if not os.path.exists(src_path):
                self.stdout.write(
                    self.style.WARNING(
                        f"Source subdirectory {src_path} does not exist, skipping..."
                    )
                )
                continue

            self.stdout.write(
                f"Copying files from {src_path} to {dest_dir}..."
            )

            # Get all files in the source subdirectory
            files = [
                f
                for f in os.listdir(src_path)
                if os.path.isfile(os.path.join(src_path, f))
            ]

            for file in files:
                src_file = os.path.join(src_path, file)
                dest_file = os.path.join(dest_dir, file)

                # Copy the file
                shutil.copy2(src_file, dest_file)
                self.stdout.write(f"Copied {file} to {dest_dir}")

        self.stdout.write(
            self.style.SUCCESS("Media files copied successfully!")
        )

    def download_media_files(self):
        """Download media files from predefined URLs"""
        self.stdout.write("Downloading media files from internet...")

        # Define URLs for media files
        media_urls = {
            "media/courses/icons": {
                "python.png": "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
                "php.png": "https://cdn-icons-png.flaticon.com/512/5968/5968332.png",
                "node.png": "https://cdn-icons-png.flaticon.com/512/5968/5968322.png",
                "csharp.png": "https://cdn-icons-png.flaticon.com/512/6132/6132221.png",
                "react.png": "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
                "3d.png": "https://cdn-icons-png.flaticon.com/512/1809/1809280.png",
            },
            "media/mentors": {
                "jasur.jpg": "https://randomuser.me/api/portraits/men/1.jpg",
                "sarvar.jpg": "https://randomuser.me/api/portraits/men/2.jpg",
                "bobur.jpg": "https://randomuser.me/api/portraits/men/3.jpg",
                "nilufar.jpg": "https://randomuser.me/api/portraits/women/1.jpg",
                "timur.jpg": "https://randomuser.me/api/portraits/men/4.jpg",
                "diyora.jpg": "https://randomuser.me/api/portraits/women/2.jpg",
                "default.jpg": "https://randomuser.me/api/portraits/lego/1.jpg",
            },
            "media/companies": {
                "google.png": "https://cdn-icons-png.flaticon.com/512/2702/2702602.png",
                "youtube.png": "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
                "amazon.png": "https://cdn-icons-png.flaticon.com/512/5968/5968217.png",
                "netflix.png": "https://cdn-icons-png.flaticon.com/512/5977/5977590.png",
                "slack.png": "https://cdn-icons-png.flaticon.com/512/5968/5968943.png",
                "lenovo.png": "https://cdn-icons-png.flaticon.com/512/882/882836.png",
                "apple.png": "https://cdn-icons-png.flaticon.com/512/0/747.png",
                "microsoft.png": "https://cdn-icons-png.flaticon.com/512/732/732221.png",
                "uber.png": "https://cdn-icons-png.flaticon.com/512/5969/5969103.png",
                "airbnb.png": "https://cdn-icons-png.flaticon.com/512/2111/2111320.png",
            },
            "media/testimonials": {
                "default.jpg": "https://randomuser.me/api/portraits/lego/1.jpg",
            },
        }

        # Download files from URLs
        for dest_dir, files in media_urls.items():
            self.stdout.write(f"Downloading files to {dest_dir}...")

            for filename, url in files.items():
                dest_file = os.path.join(dest_dir, filename)

                try:
                    # Download the file
                    response = requests.get(url, stream=True)
                    response.raise_for_status()  # Raise an exception for HTTP errors

                    # Save the file
                    with open(dest_file, "wb") as f:
                        for chunk in response.iter_content(chunk_size=8192):
                            f.write(chunk)

                    self.stdout.write(f"Downloaded {filename} to {dest_dir}")
                except Exception as e:
                    self.stdout.write(
                        self.style.ERROR(
                            f"Failed to download {filename}: {str(e)}"
                        )
                    )

        self.stdout.write(
            self.style.SUCCESS("Media files downloaded successfully!")
        )
