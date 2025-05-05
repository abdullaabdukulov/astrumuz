from courses.models import Course, CourseCategory, CourseCompany, CourseMentor
from courses.serializers import (
    CourseCategorySerializer,
    CourseDetailSerializer,
    CourseListSerializer,
    MentorSerializer,
    TestimonialSerializer,
)
from django.db.models import Prefetch
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class CourseCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for course categories"""

    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer
    lookup_field = "slug"


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for courses"""

    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "retrieve":
            return CourseDetailSerializer
        return CourseListSerializer

    def get_queryset(self):
        """
        Optimized queryset with prefetched related objects
        to prevent N+1 query problem
        """
        queryset = Course.objects.select_related("category")

        # For detailed view, load more related objects
        if self.action == "retrieve":
            queryset = queryset.prefetch_related(
                "outcomes",
                Prefetch(
                    "course_mentors",
                    queryset=CourseMentor.objects.select_related("mentor"),
                    to_attr="prefetched_mentors",
                ),
                Prefetch(
                    "course_companies",
                    queryset=CourseCompany.objects.select_related("company"),
                    to_attr="prefetched_companies",
                ),
                "testimonials__company",
            )

        # Filtering
        category_slug = self.request.query_params.get("category", None)
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)

        level = self.request.query_params.get("level", None)
        if level:
            queryset = queryset.filter(level=level)

        featured = self.request.query_params.get("featured", None)
        if featured and featured.lower() == "true":
            queryset = queryset.filter(featured=True)

        is_new = self.request.query_params.get("is_new", None)
        if is_new and is_new.lower() == "true":
            queryset = queryset.filter(is_new=True)

        return queryset

    def retrieve(self, request, *args, **kwargs):
        """
        Override retrieve method to prefetch related courses
        """
        instance = self.get_object()

        # Prefetch related courses
        related_courses = (
            Course.objects.filter(category=instance.category)
            .exclude(id=instance.id)
            .select_related("category")[:3]
        )

        # Create context with prefetched related courses
        context = self.get_serializer_context()
        context["related_courses"] = {instance.id: related_courses}

        serializer = self.get_serializer(instance, context=context)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def testimonials(self, request, slug=None):
        """
        Get testimonials for a specific course with optimized queries
        """
        course = self.get_object()
        testimonials = course.testimonials.select_related("company")

        serializer = TestimonialSerializer(testimonials, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def mentors(self, request, slug=None):
        """
        Get mentors for a specific course with optimized queries
        """
        course = self.get_object()
        course_mentors = course.course_mentors.select_related("mentor")

        mentors = [cm.mentor for cm in course_mentors]
        serializer = MentorSerializer(mentors, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def related(self, request, slug=None):
        """
        Get related courses with optimized queries
        """
        course = self.get_object()
        related = (
            Course.objects.filter(category=course.category)
            .exclude(id=course.id)
            .select_related("category")[:3]
        )

        serializer = CourseListSerializer(related, many=True)
        return Response(serializer.data)
