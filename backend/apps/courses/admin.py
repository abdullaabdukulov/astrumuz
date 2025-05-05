from django.contrib import admin

from .models import (
    Company,
    ContactRequest,
    Course,
    CourseCategory,
    CourseCompany,
    CourseMentor,
    CourseOutcome,
    CourseRegistration,
    Mentor,
    Testimonial,
)


@admin.register(CourseCategory)
class CourseCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}


class CourseOutcomeInline(admin.TabularInline):
    model = CourseOutcome
    extra = 3


class CourseMentorInline(admin.TabularInline):
    model = CourseMentor
    extra = 1


class CourseCompanyInline(admin.TabularInline):
    model = CourseCompany
    extra = 1


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "slug",
        "level",
        "duration",
        "category",
        "featured",
        "is_new",
        "created_time",
    )
    list_filter = ("level", "category", "featured", "is_new")
    search_fields = ("title", "description")
    prepopulated_fields = {"slug": ("title",)}
    inlines = [CourseOutcomeInline, CourseMentorInline, CourseCompanyInline]
    fieldsets = (
        (
            None,
            {
                "fields": (
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
                )
            },
        ),
        (
            "Детальная информация",
            {
                "fields": (
                    "what_will_learn",
                    "video_hours",
                    "coding_exercises",
                    "articles",
                    "has_certificate",
                ),
                "classes": ("collapse",),
            },
        ),
    )


@admin.register(Mentor)
class MentorAdmin(admin.ModelAdmin):
    list_display = ("name", "position")
    search_fields = ("name", "position")


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ("name", "color")
    search_fields = ("name",)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "position", "company", "course")
    list_filter = ("company", "course")
    search_fields = ("name", "text")


@admin.register(CourseRegistration)
class CourseRegistrationAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "email", "course", "created_time")
    list_filter = ("course", "created_time")
    search_fields = ("name", "phone", "email")
    readonly_fields = ("created_time",)


@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "email", "created_time")
    list_filter = ("created_time",)
    search_fields = ("name", "phone", "email", "message")
    readonly_fields = ("created_time",)
