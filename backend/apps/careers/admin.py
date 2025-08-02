from django.contrib import admin
from modeltranslation.admin import TabbedTranslationAdmin
from .models import Vacancy, Application


@admin.register(Vacancy)
class VacancyAdmin(TabbedTranslationAdmin):
    list_display = ("job_title", "salary", "experience", "type_work", "work_format")
    search_fields = ("job_title", "type_work", "work_format")
    list_filter = ("type_work", "work_format", "work_schedule", "created_time")
    prepopulated_fields = {'slug': ('job_title',)}


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("full_name", "phone_number", "email", "vacancy", "created_time")
    list_filter = ("vacancy", "created_time")
    search_fields = ("full_name", "email", "phone_number", "vacancy__job_title")
    readonly_fields = ("created_time", "updated_time")
