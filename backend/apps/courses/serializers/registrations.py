from common.validators import validate_phone
from courses.models import ContactRequest, Course, CourseRegistration
from rest_framework import serializers


class PhoneNumberSerializer(serializers.Serializer):
    """Serializer for phone number validation"""

    phone = serializers.CharField(
        validators=[validate_phone], max_length=12, min_length=12
    )


class OTPVerificationSerializer(serializers.Serializer):
    """Serializer for OTP verification"""

    phone = serializers.CharField(
        validators=[validate_phone], max_length=12, min_length=12
    )
    otp_code = serializers.CharField(max_length=6, min_length=6)

    def validate_otp_code(self, value):
        if not value.isdigit():
            raise serializers.ValidationError(
                "OTP code must contain only digits"
            )
        return value


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
