from modeltranslation.translator import TranslationOptions, register

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


@register(Testimonial)
class TestimonialTranslationOptions(TranslationOptions):
    fields = ("name", "position", "text")


@register(CourseRegistration)
class CourseRegistrationTranslationOptions(TranslationOptions):
    fields = ("name", "message")


@register(ContactRequest)
class ContactRequestTranslationOptions(TranslationOptions):
    fields = ("name", "message")
