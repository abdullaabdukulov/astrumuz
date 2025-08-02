from rest_framework import serializers

from .models import Application, Vacancy


class VacancyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = (
            "id",
            "job_title",
            "salary",
            "experience",
            "type_work",
            "work_format",
        )


class VacancyDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = (
            "id",
            "job_title",
            "salary",
            "experience",
            "type_work",
            "work_schedule",
            "work_format",
            "responsibilities",
            "requirements",
            "advantages",
        )


class ApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = (
            "id",
            "full_name",
            "phone_number",
            "email",
            "cv",
            "cover_letter",
            "vacancy",
        )
