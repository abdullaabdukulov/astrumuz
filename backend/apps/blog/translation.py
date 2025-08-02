from modeltranslation.translator import register, TranslationOptions
from .models import BlogCategory, Blog


@register(BlogCategory)
class BlogCategoryTranslationOptions(TranslationOptions):
    fields = ('name',)


@register(Blog)
class BlogTranslationOptions(TranslationOptions):
    fields = ('title', 'content',)
