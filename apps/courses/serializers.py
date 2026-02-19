from rest_framework import serializers

from .models import (
    Company,
    ContactRequest,
    Course,
    CourseCategory,
    CourseOutcome,
    CourseRegistration,
    Mentor,
    Testimonial,
)


class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = ["id", "name", "slug"]


class CourseOutcomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseOutcome
        fields = ["id", "text", "order"]


class MentorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mentor
        fields = ["id", "name", "position", "bio", "photo"]


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ["id", "name", "logo", "color"]


class TestimonialSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source="company.name", read_only=True)
    company_logo = serializers.ImageField(
        source="company.logo", read_only=True
    )
    company_color = serializers.CharField(
        source="company.color", read_only=True
    )

    class Meta:
        model = Testimonial
        fields = [
            "id",
            "name",
            "position",
            "company",
            "company_name",
            "company_logo",
            "company_color",
            "avatar",
            "text",
        ]


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


class CourseDetailSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source="category.name", read_only=True
    )
    outcomes = CourseOutcomeSerializer(many=True, read_only=True)

    # Оптимизированные поля для связанных объектов
    mentors = MentorSerializer(
        source="course_mentors.mentor", many=True, read_only=True
    )
    companies = CompanySerializer(
        source="course_companies.company", many=True, read_only=True
    )
    testimonials = TestimonialSerializer(many=True, read_only=True)
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

    def get_related_courses(self, obj):
        # Получаем связанные курсы из контекста, если они были предварительно загружены
        if "related_courses" in self.context:
            related_courses = self.context["related_courses"].get(obj.id, [])
            return CourseListSerializer(related_courses, many=True).data

        # Запасной вариант, если связанные курсы не были предварительно загружены
        related = Course.objects.filter(category=obj.category).exclude(
            id=obj.id
        )[:3]
        return CourseListSerializer(related, many=True).data


class CourseRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseRegistration
        fields = ["id", "course", "name", "phone", "email", "message"]

    def validate_course(self, value):
        try:
            Course.objects.get(pk=value.id)
        except Course.DoesNotExist:
            raise serializers.ValidationError("Указанный курс не существует")
        return value


class ContactRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = ["id", "name", "phone", "email", "message"]
