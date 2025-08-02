from modeltranslation.translator import TranslationOptions, register
from news.models import News, NewsCategory


@register(NewsCategory)
class NewsCategoryTranslationOptions(TranslationOptions):
    fields = ("name",)


@register(News)
class NewsTranslationOptions(TranslationOptions):
    fields = (
        "title",
        "content",
    )
