from common.utils.bitrix24 import Bitrix24Integration
from common.utils.custom_response_decorator import custom_response
from courses.models import ContactRequest
from courses.openapi_schema import (
    contact_request_schema_decorator,
    course_registration_schema,
)
from courses.serializers import (
    ContactRequestSerializer,
    CourseRegistrationSerializer,
)
from rest_framework import generics, status
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
class ContactRequestCreateView(generics.CreateAPIView, APIView):
    """API endpoint for contact requests"""

    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer
    permission_classes = [AllowAny]

    @contact_request_schema_decorator
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
