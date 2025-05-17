from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r"categories", views.CourseCategoryViewSet)
router.register(r"courses", views.CourseViewSet, basename="course")
router.register(r"mentors", views.MentorViewSet)
router.register(r"companies", views.CompanyViewSet)
router.register(
    r"testimonials", views.TestimonialViewSet, basename="testimonial"
)

urlpatterns = [
    path("", include(router.urls)),
    path(
        "register/",
        views.CourseRegistrationBitrixView.as_view(),
        name="course-registration",
    ),
    path(
        "contact/",
        views.ContactRequestCreateView.as_view(),
        name="contact-request",
    ),
]
