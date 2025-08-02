from django.contrib import admin
from modeltranslation.admin import TabbedTranslationAdmin

from .models import Page, Setting, SocialMedia


class SocialMediaInline(admin.TabularInline):
    model = SocialMedia
    extra = 1


@admin.register(Setting)
class SettingAdmin(TabbedTranslationAdmin):
    list_display = ("location_name", "phone_number", "email")
    inlines = [SocialMediaInline]

    def has_add_permission(self, request):
        return not Setting.objects.exists()


@admin.register(Page)
class PageAdmin(TabbedTranslationAdmin):
    list_display = ("title", "slug")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "slug")
