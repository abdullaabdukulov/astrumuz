from common.utils.bitrix24 import Bitrix24Integration
from common.utils.custom_response_decorator import custom_response
from common.utils.otp import OTPService
from common.utils.sms import SMSService
from courses.models import ContactRequest
from courses.openapi_schema import (
    contact_request_schema_decorator,
    course_registration_schema,
)
from courses.serializers import (
    ContactRequestSerializer,
    CourseRegistrationSerializer,
)
from courses.serializers.registrations import (
    OTPVerificationSerializer,
    PhoneNumberSerializer,
)
from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


@custom_response
class CourseRegistrationBitrixView(APIView):
    """API endpoint for course registrations with Bitrix24 integration"""

    permission_classes = [AllowAny]

    @course_registration_schema
    def post(self, request, *args, **kwargs):
        serializer = CourseRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            registration = serializer.save()

            bitrix_result = Bitrix24Integration.process_registration(
                registration
            )

            response_data = {
                "registration": serializer.data,
                "bitrix": bitrix_result["data"],
            }

            if not bitrix_result["success"]:
                return Response(
                    {"errors": bitrix_result["errors"]},
                    status=status.HTTP_207_MULTI_STATUS,
                    exception=True,
                )

            return Response(response_data, status=status.HTTP_201_CREATED)

        errors = []
        for field, messages in serializer.errors.items():
            for message in messages:
                errors.append({"field": field, "message": message})

        return Response(
            {"errors": errors},
            status=status.HTTP_400_BAD_REQUEST,
            exception=True,
        )


@custom_response
class RequestOTPView(APIView):
    """API endpoint for requesting an OTP code"""

    def post(self, request, *args, **kwargs):
        serializer = PhoneNumberSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone_number = serializer.validated_data["phone"]
        otp_code = OTPService.generate_otp(phone_number)

        message = f"Your verification code is {otp_code}. Valid for 4 minutes."
        sms_sent = SMSService.send_sms(phone_number, message)

        if not sms_sent:
            raise ValidationError(
                {"errors": [{"field": "sms", "message": "Failed to send SMS"}]}
            )

        return Response(
            {"message": "OTP code sent successfully", "phone": phone_number}
        )


@custom_response
class VerifyOTPView(APIView):
    """API endpoint for verifying an OTP code"""

    def post(self, request, *args, **kwargs):
        serializer = OTPVerificationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone_number = serializer.validated_data["phone"]
        otp_code = serializer.validated_data["otp_code"]

        is_valid = OTPService.verify_otp(phone_number, otp_code)

        if not is_valid:
            raise ValidationError(
                {
                    "errors": [
                        {
                            "field": "otp_code",
                            "message": "Invalid or expired OTP code",
                        }
                    ]
                }
            )

        return Response(
            {
                "message": "Phone number verified successfully",
                "phone": phone_number,
                "verified": True,
            }
        )


@custom_response
class ContactRequestCreateView(generics.CreateAPIView, APIView):
    """API endpoint for contact requests"""

    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer
    permission_classes = [AllowAny]

    @contact_request_schema_decorator
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
