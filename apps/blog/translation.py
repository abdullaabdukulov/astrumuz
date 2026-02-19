from modeltranslation.translator import TranslationOptions, register

from .models import Blog, BlogCategory


@register(BlogCategory)
class BlogCategoryTranslationOptions(TranslationOptions):
    fields = ("name",)


@register(Blog)
class BlogTranslationOptions(TranslationOptions):
    fields = (
        "title",
        "content",
    )
