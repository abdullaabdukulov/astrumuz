from modeltranslation.translator import register, TranslationOptions
from .models import Corporate, CorporateFeature


@register(Corporate)
class CorporateTranslationOptions(TranslationOptions):
    fields = ("title", "description")


@register(CorporateFeature)
class CorporateFeatureTranslationOptions(TranslationOptions):
    fields = ("name",)
