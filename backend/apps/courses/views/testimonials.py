from common.utils.custom_response_decorator import custom_response
from courses.models import Testimonial
from courses.serializers import TestimonialSerializer
from rest_framework import viewsets
from rest_framework.views import APIView


@custom_response
class TestimonialViewSet(viewsets.ReadOnlyModelViewSet, APIView):
    """API endpoint for testimonials"""

    serializer_class = TestimonialSerializer

    def get_queryset(self):
        queryset = Testimonial.objects.select_related("company", "course")

        # Filter by course
        course_slug = self.request.query_params.get("course", None)
        if course_slug:
            queryset = queryset.filter(course__slug=course_slug)

        return queryset
