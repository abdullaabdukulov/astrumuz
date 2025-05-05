from common.models import BaseModel
from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _


class CourseCategory(BaseModel):
    """Model for course categories (e.g., Academy, Corporate)"""

    name = models.CharField(_("Название"), max_length=100)
    slug = models.SlugField(_("Slug"), max_length=100, unique=True)

    class Meta:
        verbose_name = _("Категория курса")
        verbose_name_plural = _("Категории курсов")

    def __str__(self):
        return self.name


class Course(BaseModel):
    """Model for courses"""

    LEVEL_CHOICES = (
        ("beginner", _("Новички")),
        ("intermediate", _("Средний")),
        ("advanced", _("Продвинутый")),
    )

    title = models.CharField(_("Название"), max_length=255)
    slug = models.SlugField(_("Slug"), max_length=255, unique=True)
    description = models.TextField(_("Описание"))
    icon = models.ImageField(
        _("Иконка"), upload_to="courses/icons/", blank=True, null=True
    )
    icon_type = models.CharField(
        _("Тип иконки"),
        max_length=50,
        blank=True,
        help_text="Например: python, react, node",
    )
    level = models.CharField(
        _("Уровень"), max_length=20, choices=LEVEL_CHOICES, default="beginner"
    )
    duration = models.CharField(
        _("Продолжительность"), max_length=50, default="8-12 месяцев"
    )
    featured = models.BooleanField(_("Рекомендуемый"), default=False)
    is_new = models.BooleanField(_("Новый курс"), default=False)
    category = models.ForeignKey(
        CourseCategory,
        on_delete=models.CASCADE,
        related_name="courses",
        verbose_name=_("Категория"),
    )

    # Detailed course information
    what_will_learn = models.TextField(_("Чему вы научитесь"), blank=True)
    video_hours = models.PositiveIntegerField(_("Часы видео"), default=0)
    coding_exercises = models.PositiveIntegerField(
        _("Упражнения по кодированию"), default=0
    )
    articles = models.PositiveIntegerField(_("Статьи"), default=0)
    has_certificate = models.BooleanField(_("Сертификат"), default=True)

    class Meta:
        verbose_name = _("Курс")
        verbose_name_plural = _("Курсы")
        ordering = ["-created_time"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class CourseOutcome(BaseModel):
    """Model for course outcomes (what students will learn)"""

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="outcomes",
        verbose_name=_("Курс"),
    )
    text = models.TextField(_("Текст"))
    order = models.PositiveIntegerField(_("Порядок"), default=0)

    class Meta:
        verbose_name = _("Результат обучения")
        verbose_name_plural = _("Результаты обучения")
        ordering = ["order"]

    def __str__(self):
        return f"{self.course.title} - Outcome {self.order}"
