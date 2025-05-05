from courses.models import ContactRequest, CourseRegistration
from courses.serializers import (
    ContactRequestSerializer,
    CourseRegistrationSerializer,
)
from rest_framework import generics
from rest_framework.permissions import AllowAny


class CourseRegistrationCreateView(generics.CreateAPIView):
    """API endpoint for course registrations"""

    queryset = CourseRegistration.objects.all()
    serializer_class = CourseRegistrationSerializer
    permission_classes = [AllowAny]


class ContactRequestCreateView(generics.CreateAPIView):
    """API endpoint for contact requests"""

    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer
    permission_classes = [AllowAny]
