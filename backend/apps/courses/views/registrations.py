from common.utils.custom_response_decorator import custom_response
from courses.models import ContactRequest, CourseRegistration
from courses.openapi_schema import (
    contact_request_schema_decorator,
    course_registration_schema,
)
from courses.serializers import (
    ContactRequestSerializer,
    CourseRegistrationSerializer,
)
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView


@custom_response
class CourseRegistrationCreateView(generics.CreateAPIView, APIView):
    """API endpoint for course registrations"""

    queryset = CourseRegistration.objects.all()
    serializer_class = CourseRegistrationSerializer
    permission_classes = [AllowAny]

    @course_registration_schema
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


@custom_response
class ContactRequestCreateView(generics.CreateAPIView, APIView):
    """API endpoint for contact requests"""

    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer
    permission_classes = [AllowAny]

    @contact_request_schema_decorator
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
