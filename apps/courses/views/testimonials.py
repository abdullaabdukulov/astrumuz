from common.pagination import TestimonialsPagination
from common.utils.custom_response_decorator import custom_response
from courses.models import Testimonial
from courses.openapi_schema import (
    testimonial_list_schema,
    testimonial_retrieve_schema,
)
from courses.serializers import TestimonialSerializer
from rest_framework import viewsets
from rest_framework.views import APIView


@custom_response
class TestimonialViewSet(viewsets.ReadOnlyModelViewSet, APIView):
    """API endpoint for testimonials"""

    serializer_class = TestimonialSerializer
    pagination_class = TestimonialsPagination

    def get_queryset(self):
        queryset = Testimonial.objects.select_related("company", "course")

        # Filter by course
        course_slug = self.request.query_params.get("course", None)
        if course_slug:
            queryset = queryset.filter(course__slug=course_slug)

        return queryset

    @testimonial_list_schema
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @testimonial_retrieve_schema
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
