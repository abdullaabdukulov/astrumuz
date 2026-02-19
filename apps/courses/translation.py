from modeltranslation.translator import TranslationOptions, register

from .models import (
    Company,
    CompanyStudent,
    Course,
    CourseCategory,
    CourseOutcome,
    Mentor,
    Testimonial,
)


@register(CourseCategory)
class CourseCategoryTranslationOptions(TranslationOptions):
    fields = ("name",)


@register(Course)
class CourseTranslationOptions(TranslationOptions):
    fields = ("title", "description", "what_will_learn", "duration", "level")


@register(CourseOutcome)
class CourseOutcomeTranslationOptions(TranslationOptions):
    fields = ("text",)


@register(Mentor)
class MentorTranslationOptions(TranslationOptions):
    fields = ("name", "position", "bio")


@register(Company)
class CompanyTranslationOptions(TranslationOptions):
    fields = ("name",)


@register(CompanyStudent)
class CompanyTranslationOptions(TranslationOptions):
    fields = ("company_name",)


@register(Testimonial)
class TestimonialTranslationOptions(TranslationOptions):
    fields = ("name", "position", "text")
