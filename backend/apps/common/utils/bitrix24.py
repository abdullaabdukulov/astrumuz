import logging
from typing import Any, Dict

import requests
from django.conf import settings
from requests.exceptions import RequestException


class Bitrix24Integration:
    """
    Class for handling Bitrix24 CRM integration with direct connection.
    """

    @classmethod
    def format_error(
        cls, field: str, message: str, code: str = "ERROR"
    ) -> Dict[str, str]:
        """Format an error in the structure expected by custom_response"""
        return {"field": field, "message": message, "code": code}

    @classmethod
    def make_direct_request(
        cls, url: str, data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Make a direct request to Bitrix24 API bypassing any proxy

        Args:
            url: API endpoint URL
            data: Request data

        Returns:
            dict: Response with success flag, data and errors
        """
        try:
            # Create a new session that doesn't use any proxy
            session = requests.Session()
            session.trust_env = False  # Ignore environment variables for proxy

            # Make the request with a timeout
            response = session.post(url, json=data, timeout=30)

            # Check for HTTP errors
            response.raise_for_status()

            # Parse response
            response_data = response.json()

            if "result" in response_data and response_data["result"] > 0:
                return {
                    "success": True,
                    "data": {
                        "id": response_data["result"],
                        "time": response_data.get("time", {}),
                    },
                    "errors": [],
                }
            else:
                error_msg = response_data.get(
                    "error_description", "Unknown API error"
                )
                logging.error(f"Bitrix24 API error: {error_msg}")
                return {
                    "success": False,
                    "data": {},
                    "errors": [
                        cls.format_error(
                            "bitrix24", error_msg, "BITRIX24_API_ERROR"
                        )
                    ],
                }

        except RequestException as e:
            logging.error(f"Request error to Bitrix24: {str(e)}")
            return {
                "success": False,
                "data": {},
                "errors": [
                    cls.format_error(
                        "bitrix24",
                        f"Connection error: {str(e)}",
                        "CONNECTION_ERROR",
                    )
                ],
            }

        except Exception as e:
            logging.exception(f"Exception in Bitrix24 API request: {str(e)}")
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
    def create_contact(cls, registration) -> Dict[str, Any]:
        """Create a contact in Bitrix24 based on course registration data"""
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

            # Use direct request method
            result = cls.make_direct_request(
                settings.CONTACT_API_URL, contact_data
            )

            if result["success"]:
                result["data"]["contact_id"] = result["data"].pop("id")

            return result

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
        """Create a deal in Bitrix24 based on course registration data and contact ID"""
        try:
            course = registration.course

            deal_data = {
                "fields": {
                    "TITLE": f"{registration.last_name} {registration.first_name} - {course.title}",
                    "CONTACT_ID": contact_id,
                    "CATEGORY_ID": course.bitrix_category_id,
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

            # Use direct request method
            result = cls.make_direct_request(settings.DEAL_API_URL, deal_data)

            if result["success"]:
                result["data"]["deal_id"] = result["data"].pop("id")

            return result

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
        """Process a course registration by creating a contact and deal in Bitrix24"""
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
