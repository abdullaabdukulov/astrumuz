from common.models import BaseModel
from django.db import models
from django.utils.translation import gettext_lazy as _

from .courses import Course


class Mentor(BaseModel):
    """Model for course mentors"""

    name = models.CharField(_("Имя"), max_length=255)
    position = models.CharField(_("Должность"), max_length=255)
    bio = models.TextField(_("Биография"), blank=True)
    photo = models.ImageField(_("Фото"), upload_to="mentors/")

    class Meta:
        verbose_name = _("Ментор")
        verbose_name_plural = _("Менторы")

    def __str__(self):
        return self.name


class CourseMentor(BaseModel):
    """Many-to-many relationship between courses and mentors"""

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="course_mentors",
        verbose_name=_("Курс"),
    )
    mentor = models.ForeignKey(
        Mentor,
        on_delete=models.CASCADE,
        related_name="mentor_courses",
        verbose_name=_("Ментор"),
    )

    class Meta:
        verbose_name = _("Ментор курса")
        verbose_name_plural = _("Менторы курсов")
        unique_together = ("course", "mentor")

    def __str__(self):
        return f"{self.course.title} - {self.mentor.name}"
