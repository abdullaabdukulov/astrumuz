from common.models import BaseModel
from common.validators import (
    image_common_extensions,
    validate_passport_number,
    validate_passport_series,
    validate_phone,
    validate_pinfl,
    validate_telegram_username,
)
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

    # Full name
    last_name = models.CharField(_("Фамилия"), max_length=255)
    first_name = models.CharField(_("Имя"), max_length=255)
    middle_name = models.CharField(_("Отчество"), max_length=255, blank=True)

    birth_date = models.DateField(_("Дата рождения"))

    # Passport
    passport_series = models.CharField(
        _("Серия паспорта"),
        max_length=2,
        validators=[validate_passport_series],
    )
    passport_number = models.CharField(
        _("Номер паспорта"),
        max_length=7,
        validators=[validate_passport_number],
    )
    passport_image = models.ImageField(
        _("Скан паспорта"),
        upload_to="passport_scans/",
        blank=True,
        null=True,
        validators=[image_common_extensions],
    )

    pinfl = models.CharField(
        _("ЖШШИР (PINFL)"),
        max_length=14,
        validators=[validate_pinfl],
    )

    # Contact info
    phone = models.CharField(
        _("Телефон"),
        max_length=20,
        validators=[validate_phone],
    )
    email = models.EmailField(_("Email"))
    telegram_username = models.CharField(
        _("Telegram username"),
        max_length=100,
        blank=True,
        validators=[validate_telegram_username],
    )

    class Meta:
        verbose_name = _("Регистрация на курс")
        verbose_name_plural = _("Регистрации на курсы")
        ordering = ["-created_time"]

    def __str__(self):
        return f"{self.last_name} {self.first_name} - {self.course.title}"


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
