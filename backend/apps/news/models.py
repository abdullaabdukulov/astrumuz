from common.models import BaseModel
from django.db import models
from tinymce.models import HTMLField


class NewsCategory(BaseModel):
    name = models.CharField("Название категории", max_length=255)

    class Meta:
        verbose_name = "Категория новости"
        verbose_name_plural = "Категории новостей"

    def __str__(self):
        return self.name


class News(BaseModel):
    title = models.CharField("Заголовок", max_length=255)
    slug = models.SlugField("Слаг", unique=True, blank=True)
    content = HTMLField()
    category = models.ForeignKey(
        NewsCategory,
        on_delete=models.CASCADE,
        related_name="news",
        verbose_name="Категория",
    )
    image = models.ImageField(
        "Изображение", upload_to="news_images/", blank=True, null=True
    )

    class Meta:
        verbose_name = "Новость"
        verbose_name_plural = "Новости"

    def __str__(self):
        return self.title
