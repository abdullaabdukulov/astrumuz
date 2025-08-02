from django.contrib import admin
from modeltranslation.admin import (
    TabbedTranslationAdmin,
    TranslationTabularInline,
)

from .models import ApplyCorporateRequest, Corporate, CorporateFeature


class CorporateFeatureInline(TranslationTabularInline):
    model = CorporateFeature
    extra = 1


@admin.register(Corporate)
class CorporateAdmin(TabbedTranslationAdmin):
    list_display = ("title", "created_time")
    inlines = [CorporateFeatureInline]
    search_fields = ("title",)
    readonly_fields = ("created_time", "updated_time")


@admin.register(CorporateFeature)
class CorporateFeatureAdmin(TabbedTranslationAdmin):
    list_display = ("name", "corporate", "created_time")
    list_filter = ("corporate",)
    search_fields = ("name",)
    readonly_fields = ("created_time", "updated_time")


@admin.register(ApplyCorporateRequest)
class ApplyCorporateRequestAdmin(admin.ModelAdmin):
    list_display = (
        "first_name",
        "last_name",
        "email_address",
        "company",
        "created_time",
    )
    search_fields = (
        "first_name",
        "last_name",
        "email_address",
        "company__title",
    )
    list_filter = ("company", "created_time")
