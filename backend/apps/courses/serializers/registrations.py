from courses.models import ContactRequest, Course, CourseRegistration
from rest_framework import serializers


class CourseRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseRegistration
        fields = ["id", "course", "name", "phone", "email", "message"]

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
