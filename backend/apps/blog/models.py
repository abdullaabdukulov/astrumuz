from common.models import BaseModel
from django.db import models
from tinymce.models import HTMLField


class BlogCategory(BaseModel):
    name = models.CharField("Название категории", max_length=255)

    class Meta:
        verbose_name = "Категория блога"
        verbose_name_plural = "Категории блогов"

    def __str__(self):
        return self.name


class Blog(BaseModel):
    title = models.CharField("Заголовок", max_length=255)
    slug = models.SlugField("Слаг", unique=True, blank=True)
    content = HTMLField("Контент")
    category = models.ForeignKey(
        BlogCategory,
        on_delete=models.CASCADE,
        related_name="blogs",
        verbose_name="Категория",
    )

    class Meta:
        verbose_name = "Блог"
        verbose_name_plural = "Блоги"

    def __str__(self):
        return self.title
