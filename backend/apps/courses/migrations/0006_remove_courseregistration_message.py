# Generated by Django 5.2 on 2025-05-17 05:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("courses", "0005_rename_name_courseregistration_first_name_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="courseregistration",
            name="message",
        ),
    ]
