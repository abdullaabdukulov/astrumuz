from courses.models import ContactRequest, Course, CourseRegistration
from rest_framework import serializers


class CourseRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseRegistration
        fields = [
            "id",
            "course",
            "last_name",
            "first_name",
            "middle_name",
            "birth_date",
            "passport_series",
            "passport_number",
            "passport_image",
            "pinfl",
            "phone",
            "email",
            "telegram_username",
            "message",
        ]
        extra_kwargs = {
            "telegram_username": {"required": False, "allow_blank": True},
        }

    def validate_course(self, value):
        try:
            Course.objects.get(pk=value.id)
        except Course.DoesNotExist:
            raise serializers.ValidationError("Указанный курс не существует")
        return value


class ContactRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = ["id", "name", "phone", "email", "message"]
