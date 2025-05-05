from common.utils.custom_response_decorator import custom_response
from courses.models import Mentor
from courses.serializers import MentorSerializer
from rest_framework import viewsets
from rest_framework.views import APIView


@custom_response
class MentorViewSet(viewsets.ReadOnlyModelViewSet, APIView):
    """API endpoint for mentors"""

    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer
