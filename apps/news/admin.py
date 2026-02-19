from django.contrib import admin
from django.db import models
from modeltranslation.admin import TabbedTranslationAdmin
from news.models import News, NewsCategory
from tinymce.widgets import TinyMCE


@admin.register(NewsCategory)
class NewsCategoryAdmin(TabbedTranslationAdmin):
    list_display = ["name"]
    search_fields = ["name"]


@admin.register(News)
class NewsAdmin(TabbedTranslationAdmin):
    list_display = ["title", "category", "created_time"]
    list_filter = ["category", "created_time"]
    search_fields = ["title", "content"]
    prepopulated_fields = {"slug": ("title",)}
    formfield_overrides = {
        models.TextField: {"widget": TinyMCE(attrs={"cols": 80, "rows": 30})},
    }
