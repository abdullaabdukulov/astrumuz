from common.models import BaseModel
from django.db import models
from tinymce.models import HTMLField


class Vacancy(BaseModel):
    job_title = models.CharField("Должность", max_length=255)
    slug = models.SlugField("Слаг", unique=True, blank=True)
    salary = models.CharField("Зарплата", max_length=255)
    experience = models.CharField("Опыт работы", max_length=255)
    type_work = models.CharField("Тип занятости", max_length=255)
    work_schedule = models.CharField("График работы", max_length=255)
    work_format = models.CharField("Формат работы", max_length=255)
    responsibilities = HTMLField("Обязанности")
    requirements = HTMLField("Требования")
    advantages = HTMLField("Преимущества")

    class Meta:
        verbose_name = "Вакансия"
        verbose_name_plural = "Вакансии"

    def __str__(self):
        return self.job_title


class Application(BaseModel):
    full_name = models.CharField("ФИО", max_length=255)
    phone_number = models.CharField("Номер телефона", max_length=20)
    email = models.EmailField("Эл. почта", blank=True, null=True)
    cv = models.FileField("Резюме (CV)", upload_to="vacancy/applications/")
    cover_letter = models.TextField(
        "Сопроводительное письмо", blank=True, null=True
    )
    vacancy = models.ForeignKey(
        "Vacancy",
        on_delete=models.CASCADE,
        related_name="applications",
        verbose_name="Вакансия",
    )

    class Meta:
        verbose_name = "Заявка на вакансию"
        verbose_name_plural = "Заявки на вакансии"

    def __str__(self):
        return f"{self.full_name} - {self.vacancy.job_title}"
