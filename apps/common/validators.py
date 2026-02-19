from django.core.validators import FileExtensionValidator, RegexValidator

validate_telegram_username = RegexValidator(
    regex=r"^@?[\w]+$",
    message="Telegram username can contain letters, numbers, and underscores, optionally starting with '@'",
    code="WRONG_TELEGRAM_USERNAME",
)

validate_pinfl = RegexValidator(
    regex=r"^\d{14}$",
    message="PINFL must consist of exactly 14 digits",
    code="WRONG_PINFL",
)

validate_passport_series = RegexValidator(
    regex=r"^[A-Z0-9]{2}$",
    message="Passport series must consist of exactly 2 uppercase letters or digits",
    code="WRONG_PASSPORT_SERIES",
)

validate_passport_number = RegexValidator(
    regex=r"^\d{7}$",
    message="Passport number must consist of exactly 7 digits",
    code="WRONG_PASSPORT_NUMBER",
)

image_common_extensions = FileExtensionValidator(
    allowed_extensions=("jpeg", "jpg", "png", "heic", "heif"),
    message="Wrong format uploaded image. Format must be: jpeg, jpg, png, heic or heif",
    code="WRONG_IMAGE",
)

validate_phone = RegexValidator(
    regex=r"^998\d{9}$",
    message="Phone number must begin with 998 and contain only 12 numbers",
    code="WRONG_PHONE_NUMBER",
)
