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
    path("request-otp/", views.RequestOTPView.as_view(), name="request-otp"),
    path("verify-otp/", views.VerifyOTPView.as_view(), name="verify-otp"),
    path(
        "contact/",
        views.ContactRequestCreateView.as_view(),
        name="contact-request",
    ),
    path(
        "student/companies/",
        views.CompanyListView.as_view(),
        name="company-student",
    ),
]
