from rest_framework import serializers

from .models import Application, ShortRequirement, Vacancy


class ShortRequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortRequirement
        fields = ("id", "text", "order")


class VacancyListSerializer(serializers.ModelSerializer):
    short_requirements = ShortRequirementSerializer(
        source="short_requirements_list", many=True, read_only=True
    )

    class Meta:
        model = Vacancy
        fields = (
            "id",
            "job_title",
            "slug",
            "salary",
            "experience",
            "type_work",
            "work_format",
            "short_requirements",
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
