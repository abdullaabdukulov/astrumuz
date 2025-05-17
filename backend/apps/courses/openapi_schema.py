from drf_yasg import openapi
from drf_yasg.inspectors import SwaggerAutoSchema
from drf_yasg.utils import swagger_auto_schema


# Custom schema inspector to handle multilingual fields
class MultilingualSwaggerAutoSchema(SwaggerAutoSchema):
    def get_operation_id(self, operation_keys):
        """
        Generate a unique operation ID based on the view's name and HTTP method.
        """
        operation_id = super().get_operation_id(operation_keys)
        return operation_id


# Common response schemas
success_response_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "success": openapi.Schema(type=openapi.TYPE_BOOLEAN, default=True),
        "errors": openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(type=openapi.TYPE_OBJECT),
            default=[],
        ),
        "data": openapi.Schema(type=openapi.TYPE_OBJECT),
    },
)

error_response_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "success": openapi.Schema(type=openapi.TYPE_BOOLEAN, default=False),
        "errors": openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "field": openapi.Schema(type=openapi.TYPE_STRING),
                    "message": openapi.Schema(type=openapi.TYPE_STRING),
                    "code": openapi.Schema(type=openapi.TYPE_STRING),
                },
            ),
        ),
        "data": openapi.Schema(type=openapi.TYPE_OBJECT, default={}),
    },
)

# Course Category schemas
course_category_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "id": openapi.Schema(type=openapi.TYPE_INTEGER),
        "name": openapi.Schema(type=openapi.TYPE_STRING),
        "slug": openapi.Schema(type=openapi.TYPE_STRING),
    },
)

course_category_list_response = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "success": openapi.Schema(type=openapi.TYPE_BOOLEAN, default=True),
        "errors": openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(type=openapi.TYPE_OBJECT),
            default=[],
        ),
        "data": openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "count": openapi.Schema(type=openapi.TYPE_INTEGER),
                "next": openapi.Schema(
                    type=openapi.TYPE_STRING, nullable=True
                ),
                "previous": openapi.Schema(
                    type=openapi.TYPE_STRING, nullable=True
                ),
                "results": openapi.Schema(
                    type=openapi.TYPE_ARRAY, items=course_category_schema
                ),
            },
        ),
    },
)

# Course schemas
course_list_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "id": openapi.Schema(type=openapi.TYPE_INTEGER),
        "title": openapi.Schema(type=openapi.TYPE_STRING),
        "slug": openapi.Schema(type=openapi.TYPE_STRING),
        "description": openapi.Schema(type=openapi.TYPE_STRING),
        "icon": openapi.Schema(type=openapi.TYPE_STRING, nullable=True),
        "icon_type": openapi.Schema(type=openapi.TYPE_STRING),
        "level": openapi.Schema(type=openapi.TYPE_STRING),
        "duration": openapi.Schema(type=openapi.TYPE_STRING),
        "featured": openapi.Schema(type=openapi.TYPE_BOOLEAN),
        "is_new": openapi.Schema(type=openapi.TYPE_BOOLEAN),
        "category": openapi.Schema(type=openapi.TYPE_INTEGER),
        "category_name": openapi.Schema(type=openapi.TYPE_STRING),
    },
)

course_outcome_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "id": openapi.Schema(type=openapi.TYPE_INTEGER),
        "text": openapi.Schema(type=openapi.TYPE_STRING),
        "order": openapi.Schema(type=openapi.TYPE_INTEGER),
    },
)

mentor_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "id": openapi.Schema(type=openapi.TYPE_INTEGER),
        "name": openapi.Schema(type=openapi.TYPE_STRING),
        "position": openapi.Schema(type=openapi.TYPE_STRING),
        "bio": openapi.Schema(type=openapi.TYPE_STRING),
        "photo": openapi.Schema(type=openapi.TYPE_STRING),
    },
)

company_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "id": openapi.Schema(type=openapi.TYPE_INTEGER),
        "name": openapi.Schema(type=openapi.TYPE_STRING),
        "logo": openapi.Schema(type=openapi.TYPE_STRING),
        "color": openapi.Schema(type=openapi.TYPE_STRING),
    },
)

testimonial_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "id": openapi.Schema(type=openapi.TYPE_INTEGER),
        "name": openapi.Schema(type=openapi.TYPE_STRING),
        "position": openapi.Schema(type=openapi.TYPE_STRING),
        "company": openapi.Schema(type=openapi.TYPE_INTEGER),
        "company_name": openapi.Schema(type=openapi.TYPE_STRING),
        "company_logo": openapi.Schema(type=openapi.TYPE_STRING),
        "company_color": openapi.Schema(type=openapi.TYPE_STRING),
        "avatar": openapi.Schema(type=openapi.TYPE_STRING),
        "text": openapi.Schema(type=openapi.TYPE_STRING),
    },
)

course_detail_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "id": openapi.Schema(type=openapi.TYPE_INTEGER),
        "title": openapi.Schema(type=openapi.TYPE_STRING),
        "slug": openapi.Schema(type=openapi.TYPE_STRING),
        "description": openapi.Schema(type=openapi.TYPE_STRING),
        "icon": openapi.Schema(type=openapi.TYPE_STRING, nullable=True),
        "icon_type": openapi.Schema(type=openapi.TYPE_STRING),
        "level": openapi.Schema(type=openapi.TYPE_STRING),
        "duration": openapi.Schema(type=openapi.TYPE_STRING),
        "featured": openapi.Schema(type=openapi.TYPE_BOOLEAN),
        "is_new": openapi.Schema(type=openapi.TYPE_BOOLEAN),
        "category": openapi.Schema(type=openapi.TYPE_INTEGER),
        "category_name": openapi.Schema(type=openapi.TYPE_STRING),
        "what_will_learn": openapi.Schema(type=openapi.TYPE_STRING),
        "video_hours": openapi.Schema(type=openapi.TYPE_INTEGER),
        "coding_exercises": openapi.Schema(type=openapi.TYPE_INTEGER),
        "articles": openapi.Schema(type=openapi.TYPE_INTEGER),
        "has_certificate": openapi.Schema(type=openapi.TYPE_BOOLEAN),
        "outcomes": openapi.Schema(
            type=openapi.TYPE_ARRAY, items=course_outcome_schema
        ),
        "mentors": openapi.Schema(
            type=openapi.TYPE_ARRAY, items=mentor_schema
        ),
        "companies": openapi.Schema(
            type=openapi.TYPE_ARRAY, items=company_schema
        ),
        "testimonials": openapi.Schema(
            type=openapi.TYPE_ARRAY, items=testimonial_schema
        ),
        "related_courses": openapi.Schema(
            type=openapi.TYPE_ARRAY, items=course_list_schema
        ),
    },
)

course_list_response = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "success": openapi.Schema(type=openapi.TYPE_BOOLEAN, default=True),
        "errors": openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(type=openapi.TYPE_OBJECT),
            default=[],
        ),
        "data": openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "count": openapi.Schema(type=openapi.TYPE_INTEGER),
                "next": openapi.Schema(
                    type=openapi.TYPE_STRING, nullable=True
                ),
                "previous": openapi.Schema(
                    type=openapi.TYPE_STRING, nullable=True
                ),
                "results": openapi.Schema(
                    type=openapi.TYPE_ARRAY, items=course_list_schema
                ),
            },
        ),
    },
)

course_detail_response = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "success": openapi.Schema(type=openapi.TYPE_BOOLEAN, default=True),
        "errors": openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(type=openapi.TYPE_OBJECT),
            default=[],
        ),
        "data": course_detail_schema,
    },
)

# Mentor schemas
mentor_list_response = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "success": openapi.Schema(type=openapi.TYPE_BOOLEAN, default=True),
        "errors": openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(type=openapi.TYPE_OBJECT),
            default=[],
        ),
        "data": openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "count": openapi.Schema(type=openapi.TYPE_INTEGER),
                "next": openapi.Schema(
                    type=openapi.TYPE_STRING, nullable=True
                ),
                "previous": openapi.Schema(
                    type=openapi.TYPE_STRING, nullable=True
                ),
                "results": openapi.Schema(
                    type=openapi.TYPE_ARRAY, items=mentor_schema
                ),
            },
        ),
    },
)

mentor_detail_response = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "success": openapi.Schema(type=openapi.TYPE_BOOLEAN, default=True),
        "errors": openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(type=openapi.TYPE_OBJECT),
            default=[],
        ),
        "data": mentor_schema,
    },
)

# Company schemas
company_list_response = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "success": openapi.Schema(type=openapi.TYPE_BOOLEAN, default=True),
        "errors": openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(type=openapi.TYPE_OBJECT),
            default=[],
        ),
        "data": openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "count": openapi.Schema(type=openapi.TYPE_INTEGER),
                "next": openapi.Schema(
                    type=openapi.TYPE_STRING, nullable=True
                ),
                "previous": openapi.Schema(
                    type=openapi.TYPE_STRING, nullable=True
                ),
                "results": openapi.Schema(
                    type=openapi.TYPE_ARRAY, items=company_schema
                ),
            },
        ),
    },
)

company_detail_response = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "success": openapi.Schema(type=openapi.TYPE_BOOLEAN, default=True),
        "errors": openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(type=openapi.TYPE_OBJECT),
            default=[],
        ),
        "data": company_schema,
    },
)

# Testimonial schemas
testimonial_list_response = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "success": openapi.Schema(type=openapi.TYPE_BOOLEAN, default=True),
        "errors": openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(type=openapi.TYPE_OBJECT),
            default=[],
        ),
        "data": openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "count": openapi.Schema(type=openapi.TYPE_INTEGER),
                "next": openapi.Schema(
                    type=openapi.TYPE_STRING, nullable=True
                ),
                "previous": openapi.Schema(
                    type=openapi.TYPE_STRING, nullable=True
                ),
                "results": openapi.Schema(
                    type=openapi.TYPE_ARRAY, items=testimonial_schema
                ),
            },
        ),
    },
)

testimonial_detail_response = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "success": openapi.Schema(type=openapi.TYPE_BOOLEAN, default=True),
        "errors": openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(type=openapi.TYPE_OBJECT),
            default=[],
        ),
        "data": testimonial_schema,
    },
)

course_registration_request = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "course": openapi.Schema(type=openapi.TYPE_INTEGER),
        "last_name": openapi.Schema(type=openapi.TYPE_STRING),
        "first_name": openapi.Schema(type=openapi.TYPE_STRING),
        "middle_name": openapi.Schema(type=openapi.TYPE_STRING),
        "birth_date": openapi.Schema(
            type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE
        ),
        "passport_series": openapi.Schema(type=openapi.TYPE_STRING),
        "passport_number": openapi.Schema(type=openapi.TYPE_STRING),
        "passport_image": openapi.Schema(
            type=openapi.TYPE_STRING, format=openapi.FORMAT_BINARY
        ),  # fayl uchun
        "pinfl": openapi.Schema(type=openapi.TYPE_STRING),
        "phone": openapi.Schema(type=openapi.TYPE_STRING),
        "email": openapi.Schema(
            type=openapi.TYPE_STRING, format=openapi.FORMAT_EMAIL
        ),
        "telegram_username": openapi.Schema(type=openapi.TYPE_STRING),
        "message": openapi.Schema(type=openapi.TYPE_STRING),
    },
    required=[
        "course",
        "last_name",
        "first_name",
        "birth_date",
        "passport_series",
        "passport_number",
        "pinfl",
        "phone",
        "email",
    ],
)

course_registration_response = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "success": openapi.Schema(type=openapi.TYPE_BOOLEAN, default=True),
        "errors": openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(type=openapi.TYPE_OBJECT),
            default=[],
        ),
        "data": openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "id": openapi.Schema(type=openapi.TYPE_INTEGER),
                "course": openapi.Schema(type=openapi.TYPE_INTEGER),
                "name": openapi.Schema(type=openapi.TYPE_STRING),
                "phone": openapi.Schema(type=openapi.TYPE_STRING),
                "email": openapi.Schema(type=openapi.TYPE_STRING),
                "message": openapi.Schema(type=openapi.TYPE_STRING),
            },
        ),
    },
)

contact_request_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "name": openapi.Schema(type=openapi.TYPE_STRING),
        "phone": openapi.Schema(type=openapi.TYPE_STRING),
        "email": openapi.Schema(
            type=openapi.TYPE_STRING, format=openapi.FORMAT_EMAIL
        ),
        "message": openapi.Schema(type=openapi.TYPE_STRING),
    },
    required=["name", "phone", "email"],
)

contact_response_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "success": openapi.Schema(type=openapi.TYPE_BOOLEAN, default=True),
        "errors": openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(type=openapi.TYPE_OBJECT),
            default=[],
        ),
        "data": openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "id": openapi.Schema(type=openapi.TYPE_INTEGER),
                "name": openapi.Schema(type=openapi.TYPE_STRING),
                "phone": openapi.Schema(type=openapi.TYPE_STRING),
                "email": openapi.Schema(type=openapi.TYPE_STRING),
                "message": openapi.Schema(type=openapi.TYPE_STRING),
            },
        ),
    },
)

# Swagger decorators for views
course_category_list_schema = swagger_auto_schema(
    operation_description="Get a list of all course categories",
    operation_summary="List course categories",
    responses={
        200: openapi.Response(
            "Successful response", course_category_list_response
        ),
        400: openapi.Response("Bad request", error_response_schema),
        500: openapi.Response("Server error", error_response_schema),
    },
    tags=["Categories"],
)

course_category_retrieve_schema = swagger_auto_schema(
    operation_description="Get details of a specific course category",
    operation_summary="Retrieve course category",
    responses={
        200: openapi.Response(
            "Successful response", course_category_list_response
        ),
        404: openapi.Response("Category not found", error_response_schema),
        500: openapi.Response("Server error", error_response_schema),
    },
    tags=["Categories"],
)

course_list_schema_decorator = swagger_auto_schema(
    operation_description="Get a list of all courses with optional filtering",
    operation_summary="List courses",
    manual_parameters=[
        openapi.Parameter(
            "category",
            openapi.IN_QUERY,
            description="Filter by category slug",
            type=openapi.TYPE_STRING,
            required=False,
        ),
        openapi.Parameter(
            "level",
            openapi.IN_QUERY,
            description="Filter by level (beginner, intermediate, advanced)",
            type=openapi.TYPE_STRING,
            required=False,
        ),
        openapi.Parameter(
            "featured",
            openapi.IN_QUERY,
            description="Filter by featured status (true/false)",
            type=openapi.TYPE_BOOLEAN,
            required=False,
        ),
        openapi.Parameter(
            "is_new",
            openapi.IN_QUERY,
            description="Filter by new status (true/false)",
            type=openapi.TYPE_BOOLEAN,
            required=False,
        ),
    ],
    responses={
        200: openapi.Response("Successful response", course_list_response),
        400: openapi.Response("Bad request", error_response_schema),
        500: openapi.Response("Server error", error_response_schema),
    },
    tags=["Courses"],
)

course_retrieve_schema = swagger_auto_schema(
    operation_description="Get detailed information about a specific course",
    operation_summary="Retrieve course details",
    responses={
        200: openapi.Response("Successful response", course_detail_response),
        404: openapi.Response("Course not found", error_response_schema),
        500: openapi.Response("Server error", error_response_schema),
    },
    tags=["Courses"],
)

course_testimonials_schema = swagger_auto_schema(
    operation_description="Get testimonials for a specific course",
    operation_summary="Course testimonials",
    responses={
        200: openapi.Response(
            "Successful response", testimonial_list_response
        ),
        404: openapi.Response("Course not found", error_response_schema),
        500: openapi.Response("Server error", error_response_schema),
    },
    tags=["Courses"],
)

course_mentors_schema = swagger_auto_schema(
    operation_description="Get mentors for a specific course",
    operation_summary="Course mentors",
    responses={
        200: openapi.Response("Successful response", mentor_list_response),
        404: openapi.Response("Course not found", error_response_schema),
        500: openapi.Response("Server error", error_response_schema),
    },
    tags=["Courses"],
)

course_related_schema = swagger_auto_schema(
    operation_description="Get related courses for a specific course",
    operation_summary="Related courses",
    responses={
        200: openapi.Response("Successful response", course_list_response),
        404: openapi.Response("Course not found", error_response_schema),
        500: openapi.Response("Server error", error_response_schema),
    },
    tags=["Courses"],
)

mentor_list_schema = swagger_auto_schema(
    operation_description="Get a list of all mentors",
    operation_summary="List mentors",
    responses={
        200: openapi.Response("Successful response", mentor_list_response),
        400: openapi.Response("Bad request", error_response_schema),
        500: openapi.Response("Server error", error_response_schema),
    },
    tags=["Mentors"],
)

mentor_retrieve_schema = swagger_auto_schema(
    operation_description="Get details of a specific mentor",
    operation_summary="Retrieve mentor",
    responses={
        200: openapi.Response("Successful response", mentor_detail_response),
        404: openapi.Response("Mentor not found", error_response_schema),
        500: openapi.Response("Server error", error_response_schema),
    },
    tags=["Mentors"],
)

company_list_schema = swagger_auto_schema(
    operation_description="Get a list of all companies",
    operation_summary="List companies",
    responses={
        200: openapi.Response("Successful response", company_list_response),
        400: openapi.Response("Bad request", error_response_schema),
        500: openapi.Response("Server error", error_response_schema),
    },
    tags=["Companies"],
)

company_retrieve_schema = swagger_auto_schema(
    operation_description="Get details of a specific company",
    operation_summary="Retrieve company",
    responses={
        200: openapi.Response("Successful response", company_detail_response),
        404: openapi.Response("Company not found", error_response_schema),
        500: openapi.Response("Server error", error_response_schema),
    },
    tags=["Companies"],
)

testimonial_list_schema = swagger_auto_schema(
    operation_description="Get a list of all testimonials with optional filtering",
    operation_summary="List testimonials",
    manual_parameters=[
        openapi.Parameter(
            "course",
            openapi.IN_QUERY,
            description="Filter by course slug",
            type=openapi.TYPE_STRING,
            required=False,
        ),
    ],
    responses={
        200: openapi.Response(
            "Successful response", testimonial_list_response
        ),
        400: openapi.Response("Bad request", error_response_schema),
        500: openapi.Response("Server error", error_response_schema),
    },
    tags=["Testimonials"],
)

testimonial_retrieve_schema = swagger_auto_schema(
    operation_description="Get details of a specific testimonial",
    operation_summary="Retrieve testimonial",
    responses={
        200: openapi.Response(
            "Successful response", testimonial_detail_response
        ),
        404: openapi.Response("Testimonial not found", error_response_schema),
        500: openapi.Response("Server error", error_response_schema),
    },
    tags=["Testimonials"],
)

course_registration_schema = swagger_auto_schema(
    operation_description="Register for a course",
    operation_summary="Course registration",
    request_body=course_registration_request,
    responses={
        201: openapi.Response(
            "Registration successful", course_registration_response
        ),
        400: openapi.Response("Invalid data", error_response_schema),
        500: openapi.Response("Server error", error_response_schema),
    },
    tags=["Registration"],
)

contact_request_schema_decorator = swagger_auto_schema(
    operation_description="Submit a contact request",
    operation_summary="Contact request",
    request_body=contact_request_schema,
    responses={
        201: openapi.Response(
            "Contact request submitted", contact_response_schema
        ),
        400: openapi.Response("Invalid data", error_response_schema),
        500: openapi.Response("Server error", error_response_schema),
    },
    tags=["Contact"],
)
