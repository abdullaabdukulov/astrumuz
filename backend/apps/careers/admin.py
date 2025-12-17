from django.contrib import admin
from modeltranslation.admin import (
    TabbedTranslationAdmin,
    TranslationTabularInline,
)

from .models import Application, ShortRequirement, Vacancy


class ShortRequirementInline(TranslationTabularInline):
    model = ShortRequirement
    extra = 0
    fields = (
        "order",
        "text",
    )
    ordering = ("order",)


@admin.register(Vacancy)
class VacancyAdmin(TabbedTranslationAdmin):
    list_display = (
        "job_title",
        "salary",
        "experience",
        "type_work",
        "work_format",
        "work_schedule",
    )
    search_fields = ("job_title", "type_work", "work_format")
    list_filter = ("type_work", "work_format", "work_schedule", "created_time")
    prepopulated_fields = {"slug": ("job_title",)}
    inlines = [ShortRequirementInline]


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "phone_number",
        "email",
        "vacancy",
        "created_time",
    )
    list_filter = ("vacancy", "created_time")
    search_fields = (
        "full_name",
        "email",
        "phone_number",
        "vacancy__job_title",
    )
    readonly_fields = ("created_time", "updated_time")
