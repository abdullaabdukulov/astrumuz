from common.models import Badge, BaseModel
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
    badge = models.ForeignKey(
        Badge,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="blogs",
        verbose_name="Бейдж",
    )
    category = models.ForeignKey(
        BlogCategory,
        on_delete=models.CASCADE,
        related_name="blogs",
        verbose_name="Категория",
    )
    image = models.ImageField(
        "Изображение", upload_to="blog_images/", blank=True, null=True
    )

    class Meta:
        verbose_name = "Блог"
        verbose_name_plural = "Блоги"

    def __str__(self):
        return self.title
