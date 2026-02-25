from .base import *  # noqa

ALLOWED_HOSTS = [
    "devuser.astrum.uz",
    "astrum.uz",
    "www.astrum.uz",
    "localhost",
    "127.0.0.1",
    "46.101.129.181",
    ".astrum.uz",
    ".netlify.app",
]

# CORS_ALLOWED_ORIGINS = [
#     "https://astrum.uz",
#     "https://www.astrum.uz",
#     "https://devuser.astrum.uz",
#     "https://astrum-edu.netlify.app",
# ]
#
# CORS_ALLOWED_ORIGIN_REGEXES = [
#     r"^https://.*\.astrum\.uz$",
#     r"^https://.*\.netlify\.app$",
# ]
#
# CSRF_TRUSTED_ORIGINS = [
#     "https://devuser.astrum.uz",
#     "https://astrum.uz",
#     "https://www.astrum.uz",
#     "https://*.astrum.uz",
#     "https://*.netlify.app",
# ]

DEBUG = False
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 60 * 60 * 24 * 7 * 52
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SESSION_COOKIE_SECURE = True
SECURE_HSTS_PRELOAD = True
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True

REST_FRAMEWORK.update(  # noqa: F405
    {"DEFAULT_RENDERER_CLASSES": ("rest_framework.renderers.JSONRenderer",)}
)
