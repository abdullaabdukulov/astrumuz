from courses.models import Course, CourseCategory, CourseOutcome
from rest_framework import serializers


class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = ["id", "name", "slug"]


class CourseOutcomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseOutcome
        fields = ["id", "text", "order"]


class CourseListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source="category.name", read_only=True
    )

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "icon",
            "icon_type",
            "level",
            "duration",
            "featured",
            "is_new",
            "category",
            "category_name",
        ]
        extra_kwargs = {
            "url": {"view_name": "course-detail", "lookup_field": "slug"}
        }


class CourseDetailSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source="category.name", read_only=True
    )
    outcomes = CourseOutcomeSerializer(many=True, read_only=True)

    # Optimized fields for related objects
    mentors = serializers.SerializerMethodField()
    companies = serializers.SerializerMethodField()
    testimonials = serializers.SerializerMethodField()
    related_courses = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "icon",
            "icon_type",
            "level",
            "duration",
            "featured",
            "is_new",
            "category",
            "category_name",
            "what_will_learn",
            "video_hours",
            "coding_exercises",
            "articles",
            "has_certificate",
            "outcomes",
            "mentors",
            "companies",
            "testimonials",
            "related_courses",
        ]

    def get_mentors(self, obj):
        from courses.serializers.mentors import MentorSerializer

        # Get mentors from prefetched data if available
        if hasattr(obj, "prefetched_mentors"):
            mentors = [cm.mentor for cm in obj.prefetched_mentors]
            return MentorSerializer(mentors, many=True).data
        return []

    def get_companies(self, obj):
        from courses.serializers.companies import CompanySerializer

        # Get companies from prefetched data if available
        if hasattr(obj, "prefetched_companies"):
            companies = [cc.company for cc in obj.prefetched_companies]
            return CompanySerializer(companies, many=True).data
        return []

    def get_testimonials(self, obj):
        from courses.serializers.testimonials import TestimonialSerializer

        return TestimonialSerializer(obj.testimonials.all(), many=True).data

    def get_related_courses(self, obj):
        # Get related courses from context if they were prefetched
        if "related_courses" in self.context:
            related_courses = self.context["related_courses"].get(obj.id, [])
            return CourseListSerializer(related_courses, many=True).data

        # Fallback if related courses were not prefetched
        related = Course.objects.filter(category=obj.category).exclude(
            id=obj.id
        )[:3]
        return CourseListSerializer(related, many=True).data
