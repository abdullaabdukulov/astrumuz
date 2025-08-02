import uuid

from django.db import models


class BaseModel(models.Model):
    guid = models.UUIDField(
        unique=True, default=uuid.uuid4, editable=False, db_index=True
    )
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Page(BaseModel):
    slug = models.SlugField("Слаг", unique=True)
    title = models.CharField("Заголовок", max_length=100)
    content = models.TextField("Контент")

    class Meta:
        verbose_name = "Страница"
        verbose_name_plural = "Страницы"

    def __str__(self):
        return self.title


class Setting(BaseModel):
    location_name = models.CharField("Название локации", max_length=255)
    phone_number = models.CharField(
        "Номер телефона", max_length=14, unique=True
    )
    address = models.CharField("Адрес", max_length=255)
    email = models.EmailField("Email", unique=True)

    class Meta:
        verbose_name = "Настройка"
        verbose_name_plural = "Настройки"

    def __str__(self):
        return f"{self.location_name} ({self.phone_number})"


class SocialMedia(BaseModel):
    url = models.URLField("Ссылка")
    logo = models.ImageField("Логотип", upload_to="social/logos/")
    setting = models.ForeignKey(
        Setting,
        on_delete=models.CASCADE,
        related_name="links",
        verbose_name="Настройка",
    )

    class Meta:
        verbose_name = "Социальная сеть"
        verbose_name_plural = "Социальные сети"

    def __str__(self):
        return self.url
