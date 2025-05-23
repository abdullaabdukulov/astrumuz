# Generated by Django 5.2 on 2025-05-17 05:12

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("courses", "0006_remove_courseregistration_message"),
    ]

    operations = [
        migrations.AlterField(
            model_name="courseregistration",
            name="passport_image",
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to="passport_scans/",
                validators=[
                    django.core.validators.FileExtensionValidator(
                        allowed_extensions=(
                            "jpeg",
                            "jpg",
                            "png",
                            "heic",
                            "heif",
                        ),
                        code="WRONG_IMAGE",
                        message="Wrong format uploaded image. Format must be: jpeg, jpg, png, heic or heif",
                    )
                ],
                verbose_name="Скан паспорта",
            ),
        ),
        migrations.AlterField(
            model_name="courseregistration",
            name="passport_number",
            field=models.CharField(
                max_length=7,
                validators=[
                    django.core.validators.RegexValidator(
                        code="WRONG_PASSPORT_NUMBER",
                        message="Passport number must consist of exactly 7 digits",
                        regex="^\\d{7}$",
                    )
                ],
                verbose_name="Номер паспорта",
            ),
        ),
        migrations.AlterField(
            model_name="courseregistration",
            name="passport_series",
            field=models.CharField(
                max_length=2,
                validators=[
                    django.core.validators.RegexValidator(
                        code="WRONG_PASSPORT_SERIES",
                        message="Passport series must consist of exactly 2 uppercase letters or digits",
                        regex="^[A-Z0-9]{2}$",
                    )
                ],
                verbose_name="Серия паспорта",
            ),
        ),
        migrations.AlterField(
            model_name="courseregistration",
            name="phone",
            field=models.CharField(
                max_length=20,
                validators=[
                    django.core.validators.RegexValidator(
                        code="WRONG_PHONE_NUMBER",
                        message="Phone number must begin with 998 and contain only 12 numbers",
                        regex="^998\\d{9}$",
                    )
                ],
                verbose_name="Телефон",
            ),
        ),
        migrations.AlterField(
            model_name="courseregistration",
            name="pinfl",
            field=models.CharField(
                max_length=14,
                validators=[
                    django.core.validators.RegexValidator(
                        code="WRONG_PINFL",
                        message="PINFL must consist of exactly 14 digits",
                        regex="^\\d{14}$",
                    )
                ],
                verbose_name="ЖШШИР (PINFL)",
            ),
        ),
        migrations.AlterField(
            model_name="courseregistration",
            name="telegram_username",
            field=models.CharField(
                blank=True,
                max_length=100,
                validators=[
                    django.core.validators.RegexValidator(
                        code="WRONG_TELEGRAM_USERNAME",
                        message="Telegram username must be 5-32 characters long and can contain letters, numbers, and underscores, optionally starting with '@'",
                        regex="^@?[\\w]{5,32}$",
                    )
                ],
                verbose_name="Telegram username",
            ),
        ),
    ]
