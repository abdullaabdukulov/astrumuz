import logging
from typing import Any, Dict

import requests
from django.conf import settings


class Bitrix24Integration:
    """
    Class for handling Bitrix24 CRM integration.
    Provides methods to create contacts and deals in Bitrix24 CRM.
    Returns data in a format compatible with custom_response decorator.
    """

    @classmethod
    def format_error(
        cls, field: str, message: str, code: str = "ERROR"
    ) -> Dict[str, str]:
        """
        Format an error in the structure expected by custom_response

        Args:
            field: The field with the error
            message: Error message
            code: Error code

        Returns:
            dict: Formatted error
        """
        return {"field": field, "message": message, "code": code}

    @classmethod
    def create_contact(cls, registration) -> Dict[str, Any]:
        """
        Create a contact in Bitrix24 based on course registration data

        Args:
            registration: CourseRegistration instance

        Returns:
            dict: Response with success flag, data and errors
        """
        try:
            contact_data = {
                "fields": {
                    "NAME": registration.first_name,
                    "LAST_NAME": registration.last_name,
                    "SECOND_NAME": registration.middle_name,
                    "BIRTHDATE": (
                        registration.birth_date.strftime("%Y-%m-%d")
                        if registration.birth_date
                        else ""
                    ),
                    "PHONE": [
                        {"VALUE": registration.phone, "VALUE_TYPE": "WORK"}
                    ],
                    "EMAIL": [
                        {"VALUE": registration.email, "VALUE_TYPE": "WORK"}
                    ],
                    "UF_CRM_616F7E3810AFB": registration.passport_series,  # Серия паспорта
                    "UF_CRM_1640158035566": registration.passport_number,  # Номер паспорта
                    "UF_CRM_1664772076922": registration.pinfl,  # ПИНФЛ
                    "UF_CRM_6488092EEC562": registration.telegram_username,  # Никнейм в телеграм
                }
            }

            response = requests.post(
                settings.CONTACT_API_URL, json=contact_data
            )
            response_data = response.json()

            if "result" in response_data and response_data["result"] > 0:
                return {
                    "success": True,
                    "data": {
                        "contact_id": response_data["result"],
                        "time": response_data.get("time", {}),
                    },
                    "errors": [],
                }
            else:
                error_msg = response_data.get(
                    "error_description", "Unknown error creating contact"
                )
                logging.exception(
                    f"Bitrix24 contact creation failed: {error_msg}"
                )
                return {
                    "success": False,
                    "data": {},
                    "errors": [
                        cls.format_error(
                            "bitrix24", error_msg, "BITRIX24_CONTACT_ERROR"
                        )
                    ],
                }

        except Exception as e:
            logging.exception(f"Exception creating Bitrix24 contact: {str(e)}")
            return {
                "success": False,
                "data": {},
                "errors": [
                    cls.format_error(
                        "bitrix24",
                        f"Exception: {str(e)}",
                        "BITRIX24_EXCEPTION",
                    )
                ],
            }

    @classmethod
    def create_deal(cls, registration, contact_id: int) -> Dict[str, Any]:
        """
        Create a deal in Bitrix24 based on course registration data and contact ID

        Args:
            registration: CourseRegistration instance
            contact_id: ID of the contact in Bitrix24

        Returns:
            dict: Response with success flag, data and errors
        """
        try:
            course = registration.course

            deal_data = {
                "fields": {
                    "TITLE": f"{registration.last_name} {registration.first_name} - {course.title}",
                    "CONTACT_ID": contact_id,
                    "CATEGORY_ID": course.bitrix_category_id,  # Using the course's Bitrix category ID
                    "COMMENTS": f"Registration from website. Course: {course.title}",
                    "UF_CRM_620E99B9D06E4": course.title,  # Направление обучения
                    "UF_CRM_676E46AB7683D": [
                        course.title
                    ],  # Заинтересован курсу(ам)
                    "UF_CRM_616FE09315135": registration.last_name,  # Фамилия
                    "UF_CRM_61B88631159A8": registration.middle_name,  # Отчество
                    "UF_CRM_616FE09331687": [registration.phone],  # Телефон
                    "UF_CRM_616FE0933D8EF": [registration.email],  # E-mail
                    "UF_CRM_616E92488947B": registration.passport_series,  # Серия паспорта
                    "UF_CRM_620E99B9E49E0": [
                        registration.passport_number
                    ],  # Номер паспорта
                    "UF_CRM_64D9B9125F4BB": registration.telegram_username,  # Никнейм в телеграм
                }
            }

            response = requests.post(settings.DEAL_API_URL, json=deal_data)
            response_data = response.json()

            if "result" in response_data and response_data["result"] > 0:
                return {
                    "success": True,
                    "data": {
                        "deal_id": response_data["result"],
                        "time": response_data.get("time", {}),
                    },
                    "errors": [],
                }
            else:
                error_msg = response_data.get(
                    "error_description", "Unknown error creating deal"
                )
                logging.exception(
                    f"Bitrix24 deal creation failed: {error_msg}"
                )
                return {
                    "success": False,
                    "data": {},
                    "errors": [
                        cls.format_error(
                            "bitrix24", error_msg, "BITRIX24_DEAL_ERROR"
                        )
                    ],
                }

        except Exception as e:
            logging.exception(f"Exception creating Bitrix24 deal: {str(e)}")
            return {
                "success": False,
                "data": {},
                "errors": [
                    cls.format_error(
                        "bitrix24",
                        f"Exception: {str(e)}",
                        "BITRIX24_EXCEPTION",
                    )
                ],
            }

    @classmethod
    def process_registration(cls, registration) -> Dict[str, Any]:
        """
        Process a course registration by creating a contact and deal in Bitrix24

        Args:
            registration: CourseRegistration instance

        Returns:
            dict: Result with success flag, data and errors
        """
        contact_result = cls.create_contact(registration)

        if not contact_result["success"]:
            return contact_result

        contact_id = contact_result["data"]["contact_id"]

        deal_result = cls.create_deal(registration, contact_id)

        if not deal_result["success"]:
            return {
                "success": False,
                "data": {"contact_id": contact_id, "partial_success": True},
                "errors": deal_result["errors"],
            }

        return {
            "success": True,
            "data": {
                "contact_id": contact_id,
                "deal_id": deal_result["data"]["deal_id"],
            },
            "errors": [],
        }
