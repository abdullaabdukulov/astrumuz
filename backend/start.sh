#!/bin/bash

# .env faylni yuklash
export $(cat .env | xargs)

# Django serverini ishga tushirish
python manage.py runserver
