import logging
import random
import string

from django.core.cache import cache


class OTPService:
    """Service for OTP generation and verification"""

    OTP_CACHE_TIMEOUT = 4 * 60
    OTP_LENGTH = 6
    CACHE_PREFIX = "phone_verification_otp_"

    @classmethod
    def generate_otp(cls, phone_number: str) -> str:
        """Generate a random OTP code and store in cache"""
        otp_code = "".join(random.choices(string.digits, k=cls.OTP_LENGTH))
        cache_key = f"{cls.CACHE_PREFIX}{phone_number}"
        cache.set(cache_key, otp_code, cls.OTP_CACHE_TIMEOUT)
        logging.info(f"Generated OTP code for {phone_number}")
        return otp_code

    @classmethod
    def verify_otp(cls, phone_number: str, otp_code: str) -> bool:
        """Verify the OTP code for the given phone number"""
        cache_key = f"{cls.CACHE_PREFIX}{phone_number}"
        stored_otp = cache.get(cache_key)

        if not stored_otp:
            return False

        is_valid = stored_otp == otp_code

        if is_valid:
            cache.delete(cache_key)

        return is_valid
