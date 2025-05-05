from courses.models import Testimonial
from courses.serializers import TestimonialSerializer
from rest_framework import viewsets


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for testimonials"""

    serializer_class = TestimonialSerializer

    def get_queryset(self):
        queryset = Testimonial.objects.select_related("company", "course")

        # Filter by course
        course_slug = self.request.query_params.get("course", None)
        if course_slug:
            queryset = queryset.filter(course__slug=course_slug)

        return queryset
