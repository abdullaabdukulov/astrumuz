from common.models import BaseModel
from django.db import models
from django.utils.translation import gettext_lazy as _

from .companies import Company
from .courses import Course


class Testimonial(BaseModel):
    """Model for testimonials"""

    name = models.CharField(_("Имя"), max_length=255)
    position = models.CharField(_("Должность"), max_length=255)
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="testimonials",
        verbose_name=_("Компания"),
    )
    avatar = models.ImageField(_("Аватар"), upload_to="testimonials/")
    text = models.TextField(_("Текст отзыва"))
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="testimonials",
        verbose_name=_("Курс"),
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = _("Отзыв")
        verbose_name_plural = _("Отзывы")

    def __str__(self):
        return f"{self.name} - {self.company.name}"
