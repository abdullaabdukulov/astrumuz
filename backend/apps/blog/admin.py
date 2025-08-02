from django.contrib import admin
from django.db import models
from modeltranslation.admin import TabbedTranslationAdmin
from tinymce.widgets import TinyMCE

from .models import BlogCategory, Blog


@admin.register(BlogCategory)
class BlogCategoryAdmin(TabbedTranslationAdmin):
    list_display = ('id', 'name', 'created_time')
    search_fields = ('name',)
    ordering = ('-created_time',)


@admin.register(Blog)
class BlogAdmin(TabbedTranslationAdmin):
    list_display = ('id', 'title', 'category', 'created_time')
    search_fields = ('title', 'slug')
    list_filter = ('category',)
    prepopulated_fields = {"slug": ("title",)}
    ordering = ('-created_time',)
    formfield_overrides = {
        models.TextField: {"widget": TinyMCE(attrs={"cols": 80, "rows": 30})},
    }
