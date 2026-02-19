from modeltranslation.translator import TranslationOptions, register

from .models import Corporate, CorporateFeature


@register(Corporate)
class CorporateTranslationOptions(TranslationOptions):
    fields = ("title", "description")


@register(CorporateFeature)
class CorporateFeatureTranslationOptions(TranslationOptions):
    fields = ("name",)
