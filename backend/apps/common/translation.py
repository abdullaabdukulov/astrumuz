from modeltranslation.translator import TranslationOptions, register

from .models import Page, Setting


@register(Setting)
class SettingTranslationOptions(TranslationOptions):
    fields = (
        "location_name",
        "address",
    )


@register(Page)
class PageTranslationOptions(TranslationOptions):
    fields = ("title", "content")
