from django.contrib import admin
from modeltranslation.admin import (
    TabbedTranslationAdmin,
    TranslationStackedInline,
)

from .models import (
    Company,
    CompanyStudent,
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
class CourseCategoryAdmin(TabbedTranslationAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name_ru",)}


@admin.register(CompanyStudent)
class CompanyStudentAdmin(TabbedTranslationAdmin):
    list_display = ("id", "company_name")


class CourseOutcomeInline(TranslationStackedInline):
    model = CourseOutcome
    extra = 1


class CourseMentorInline(admin.TabularInline):
    model = CourseMentor
    extra = 1


class CourseCompanyInline(admin.StackedInline):
    model = CourseCompany
    extra = 1


@admin.register(Course)
class CourseAdmin(TabbedTranslationAdmin):
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
    prepopulated_fields = {"slug": ("title_ru",)}
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
                    "bitrix_category_id",
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


@admin.register(CourseOutcome)
class CourseOutcomeAdmin(TabbedTranslationAdmin):
    list_display = ("course", "text", "order")
    list_filter = ("course",)
    search_fields = ("text",)


@admin.register(Mentor)
class MentorAdmin(TabbedTranslationAdmin):
    list_display = ("name", "position")
    search_fields = ("name", "position")


@admin.register(Company)
class CompanyAdmin(TabbedTranslationAdmin):
    list_display = ("name", "color")
    search_fields = ("name",)


@admin.register(Testimonial)
class TestimonialAdmin(TabbedTranslationAdmin):
    list_display = ("name", "position", "company", "course")
    list_filter = ("company", "course")
    search_fields = ("name", "text")


@admin.register(CourseRegistration)
class CourseRegistrationAdmin(admin.ModelAdmin):
    list_display = (
        "last_name",
        "first_name",
        "middle_name",
        "phone",
        "email",
        "course",
        "created_time",
    )
    list_filter = ("course", "created_time")
    search_fields = (
        "last_name",
        "first_name",
        "middle_name",
        "phone",
        "email",
    )
    readonly_fields = ("created_time",)

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "course",
                    ("last_name", "first_name", "middle_name"),
                    "birth_date",
                    ("passport_series", "passport_number"),
                    "passport_image",
                    "pinfl",
                    "phone",
                    "email",
                    "telegram_username",
                )
            },
        ),
        (
            "Информация о создании",
            {
                "fields": ("created_time",),
                "classes": ("collapse",),
            },
        ),
    )


@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "email", "created_time")
    list_filter = ("created_time",)
    search_fields = ("name", "phone", "email", "message")
    readonly_fields = ("created_time",)


admin.site.register(CourseMentor)
admin.site.register(CourseCompany)
