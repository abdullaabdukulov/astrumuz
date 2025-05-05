from django.db.models import Prefetch
from rest_framework import generics, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import (
    Company,
    ContactRequest,
    Course,
    CourseCategory,
    CourseCompany,
    CourseMentor,
    CourseRegistration,
    Mentor,
    Testimonial,
)
from .serializers import (
    CompanySerializer,
    ContactRequestSerializer,
    CourseCategorySerializer,
    CourseDetailSerializer,
    CourseListSerializer,
    CourseRegistrationSerializer,
    MentorSerializer,
    TestimonialSerializer,
)


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
        Оптимизированный queryset с предварительной загрузкой связанных объектов
        для предотвращения проблемы N+1 запросов
        """
        queryset = Course.objects.select_related("category")

        # Для детального представления загружаем больше связанных объектов
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

        # Фильтрация
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
        Переопределяем метод retrieve для предварительной загрузки связанных курсов
        """
        instance = self.get_object()

        # Предварительно загружаем связанные курсы
        related_courses = (
            Course.objects.filter(category=instance.category)
            .exclude(id=instance.id)
            .select_related("category")[:3]
        )

        # Создаем контекст с предварительно загруженными связанными курсами
        context = self.get_serializer_context()
        context["related_courses"] = {instance.id: related_courses}

        serializer = self.get_serializer(instance, context=context)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def testimonials(self, request, slug=None):
        """
        Получение отзывов для конкретного курса с оптимизированными запросами
        """
        course = self.get_object()
        testimonials = Testimonial.objects.filter(
            course=course
        ).select_related("company")

        serializer = TestimonialSerializer(testimonials, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def mentors(self, request, slug=None):
        """
        Получение менторов для конкретного курса с оптимизированными запросами
        """
        course = self.get_object()
        course_mentors = CourseMentor.objects.filter(
            course=course
        ).select_related("mentor")

        mentors = [cm.mentor for cm in course_mentors]
        serializer = MentorSerializer(mentors, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def related(self, request, slug=None):
        """
        Получение связанных курсов с оптимизированными запросами
        """
        course = self.get_object()
        related = (
            Course.objects.filter(category=course.category)
            .exclude(id=course.id)
            .select_related("category")[:3]
        )

        serializer = CourseListSerializer(related, many=True)
        return Response(serializer.data)


class MentorViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for mentors"""

    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer


class CompanyViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for companies"""

    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for testimonials"""

    serializer_class = TestimonialSerializer

    def get_queryset(self):
        queryset = Testimonial.objects.select_related("company", "course")

        # Фильтрация по курсу
        course_slug = self.request.query_params.get("course", None)
        if course_slug:
            queryset = queryset.filter(course__slug=course_slug)

        return queryset


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
