from modeltranslation.translator import TranslationOptions, register

from careers.models import Vacancy


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
