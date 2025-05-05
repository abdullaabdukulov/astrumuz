from courses.models import Mentor
from courses.serializers import MentorSerializer
from rest_framework import viewsets


class MentorViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for mentors"""

    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer
