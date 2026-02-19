from modeltranslation.translator import TranslationOptions, register

from .models import Page, Setting


@register(Setting)
class SettingTranslationOptions(TranslationOptions):
    fields = (
        "location_name",
        "location_description",
        "address",
    )


@register(Page)
class PageTranslationOptions(TranslationOptions):
    fields = ("title", "content")
