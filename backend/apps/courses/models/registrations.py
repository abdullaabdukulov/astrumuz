from common.models import BaseModel
from django.db import models
from django.utils.translation import gettext_lazy as _

from .courses import Course


class CourseRegistration(BaseModel):
    """Model for course registrations"""

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="registrations",
        verbose_name=_("Курс"),
    )
    name = models.CharField(_("Имя"), max_length=255)
    phone = models.CharField(_("Телефон"), max_length=20)
    email = models.EmailField(_("Email"))
    message = models.TextField(_("Сообщение"), blank=True)

    class Meta:
        verbose_name = _("Регистрация на курс")
        verbose_name_plural = _("Регистрации на курсы")
        ordering = ["-created_time"]

    def __str__(self):
        return f"{self.name} - {self.course.title}"


class ContactRequest(BaseModel):
    """Model for contact requests"""

    name = models.CharField(_("Имя"), max_length=255)
    phone = models.CharField(_("Телефон"), max_length=20)
    email = models.EmailField(_("Email"))
    message = models.TextField(_("Сообщение"), blank=True)

    class Meta:
        verbose_name = _("Заявка на контакт")
        verbose_name_plural = _("Заявки на контакт")
        ordering = ["-created_time"]

    def __str__(self):
        return f"{self.name} - {self.created_time.strftime('%Y-%m-%d')}"
