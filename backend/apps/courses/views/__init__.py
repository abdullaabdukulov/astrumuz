from .companies import CompanyViewSet
from .courses import CourseCategoryViewSet, CourseViewSet
from .mentors import MentorViewSet
from .registrations import (
    ContactRequestCreateView,
    CourseRegistrationBitrixView,
    RequestOTPView,
    VerifyOTPView,
)
from .testimonials import TestimonialViewSet

__all__ = [
    "CourseCategoryViewSet",
    "CourseViewSet",
    "MentorViewSet",
    "CompanyViewSet",
    "TestimonialViewSet",
    "CourseRegistrationBitrixView",
    "RequestOTPView",
    "VerifyOTPView",
    "ContactRequestCreateView",
]
