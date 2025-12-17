from careers.models import ShortRequirement, Vacancy
from modeltranslation.translator import TranslationOptions, register


@register(Vacancy)
class VacancyTranslationOptions(TranslationOptions):
    fields = (
        "job_title",
        "salary",
        "experience",
        "type_work",
        "work_schedule",
        "work_format",
        "responsibilities",
        "requirements",
        "advantages",
    )


@register(ShortRequirement)
class ShortRequirementTranslationOptions(TranslationOptions):
    fields = ("text",)
