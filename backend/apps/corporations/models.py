from common.models import BaseModel
from django.db import models


class Corporate(BaseModel):
    title = models.CharField("Заголовок", max_length=255)
    description = models.TextField("Описание")

    class Meta:
        verbose_name = "Корпоратив"
        verbose_name_plural = "Корпоративы"

    def __str__(self):
        return self.title


class CorporateFeature(BaseModel):
    corporate = models.ForeignKey(
        Corporate,
        on_delete=models.CASCADE,
        related_name="features",
        verbose_name="Корпоратив",
    )
    name = models.CharField("Особенность", max_length=255)

    class Meta:
        verbose_name = "Особенность корпоратива"
        verbose_name_plural = "Особенности корпоратива"

    def __str__(self):
        return self.name


class ApplyCorporateRequest(BaseModel):
    first_name = models.CharField("Имя", max_length=100)
    last_name = models.CharField("Фамилия", max_length=100)
    phone_number = models.CharField("Телефон", max_length=20)
    email_address = models.EmailField("Email")
    cv = models.FileField("Резюме (CV)", upload_to="corporate/cv/")
    message = models.TextField("Сообщение", blank=True)
    company = models.ForeignKey(
        "Corporate",
        on_delete=models.CASCADE,
        related_name="applications",
        verbose_name="Компания",
    )

    class Meta:
        verbose_name = "Заявка на корпоратив"
        verbose_name_plural = "Заявки на корпоратив"

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.company.title}"
