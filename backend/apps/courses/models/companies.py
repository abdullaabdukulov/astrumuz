from common.models import BaseModel
from django.db import models
from django.utils.translation import gettext_lazy as _

from .courses import Course


class Company(BaseModel):
    """Model for companies that offer courses to their employees"""

    name = models.CharField(_("Название"), max_length=255)
    logo = models.ImageField(_("Логотип"), upload_to="companies/")
    color = models.CharField(
        _("Цвет"), max_length=20, blank=True, help_text="HEX код цвета"
    )

    class Meta:
        verbose_name = _("Компания")
        verbose_name_plural = _("Компании")

    def __str__(self):
        return self.name


class CourseCompany(BaseModel):
    """Many-to-many relationship between courses and companies"""

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="course_companies",
        verbose_name=_("Курс"),
    )
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="company_courses",
        verbose_name=_("Компания"),
    )

    class Meta:
        verbose_name = _("Компания курса")
        verbose_name_plural = _("Компании курсов")
        unique_together = ("course", "company")

    def __str__(self):
        return f"{self.course.title} - {self.company.name}"
