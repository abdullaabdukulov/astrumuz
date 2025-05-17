from django.contrib import admin
from modeltranslation.admin import (
    TranslationAdmin,
    TranslationStackedInline,
)

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
class CourseCategoryAdmin(TranslationAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name_ru",)}

    class Media:
        js = (
            "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
            "https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js",
            "modeltranslation/js/tabbed_translation_fields.js",
        )
        css = {
            "screen": ("modeltranslation/css/tabbed_translation_fields.css",),
        }


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
class CourseAdmin(TranslationAdmin):
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

    class Media:
        js = (
            "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
            "https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js",
            "modeltranslation/js/tabbed_translation_fields.js",
        )
        css = {
            "screen": ("modeltranslation/css/tabbed_translation_fields.css",),
        }


@admin.register(CourseOutcome)
class CourseOutcomeAdmin(TranslationAdmin):
    list_display = ("course", "text", "order")
    list_filter = ("course",)
    search_fields = ("text",)

    class Media:
        js = (
            "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
            "https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js",
            "modeltranslation/js/tabbed_translation_fields.js",
        )
        css = {
            "screen": ("modeltranslation/css/tabbed_translation_fields.css",),
        }


@admin.register(Mentor)
class MentorAdmin(TranslationAdmin):
    list_display = ("name", "position")
    search_fields = ("name", "position")

    class Media:
        js = (
            "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
            "https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js",
            "modeltranslation/js/tabbed_translation_fields.js",
        )
        css = {
            "screen": ("modeltranslation/css/tabbed_translation_fields.css",),
        }


@admin.register(Company)
class CompanyAdmin(TranslationAdmin):
    list_display = ("name", "color")
    search_fields = ("name",)

    class Media:
        js = (
            "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
            "https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js",
            "modeltranslation/js/tabbed_translation_fields.js",
        )
        css = {
            "screen": ("modeltranslation/css/tabbed_translation_fields.css",),
        }


@admin.register(Testimonial)
class TestimonialAdmin(TranslationAdmin):
    list_display = ("name", "position", "company", "course")
    list_filter = ("company", "course")
    search_fields = ("name", "text")

    class Media:
        js = (
            "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
            "https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js",
            "modeltranslation/js/tabbed_translation_fields.js",
        )
        css = {
            "screen": ("modeltranslation/css/tabbed_translation_fields.css",),
        }


@admin.register(CourseRegistration)
class CourseRegistrationAdmin(TranslationAdmin):
    list_display = ("name", "phone", "email", "course", "created_time")
    list_filter = ("course", "created_time")
    search_fields = ("name", "phone", "email")
    readonly_fields = ("created_time",)

    class Media:
        js = (
            "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
            "https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js",
            "modeltranslation/js/tabbed_translation_fields.js",
        )
        css = {
            "screen": ("modeltranslation/css/tabbed_translation_fields.css",),
        }


@admin.register(ContactRequest)
class ContactRequestAdmin(TranslationAdmin):
    list_display = ("name", "phone", "email", "created_time")
    list_filter = ("created_time",)
    search_fields = ("name", "phone", "email", "message")
    readonly_fields = ("created_time",)

    class Media:
        js = (
            "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
            "https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js",
            "modeltranslation/js/tabbed_translation_fields.js",
        )
        css = {
            "screen": ("modeltranslation/css/tabbed_translation_fields.css",),
        }


# Register the remaining models
admin.site.register(CourseMentor)
admin.site.register(CourseCompany)
