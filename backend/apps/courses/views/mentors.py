from common.pagination import MentorPagination
from common.utils.custom_response_decorator import custom_response
from courses.models import Mentor
from courses.openapi_schema import mentor_list_schema, mentor_retrieve_schema
from courses.serializers import MentorSerializer
from rest_framework import viewsets
from rest_framework.views import APIView


@custom_response
class MentorViewSet(viewsets.ReadOnlyModelViewSet, APIView):
    """API endpoint for mentors"""

    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer
    pagination_class = MentorPagination

    @mentor_list_schema
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @mentor_retrieve_schema
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
