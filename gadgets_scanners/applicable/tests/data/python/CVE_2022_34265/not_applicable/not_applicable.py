from django.db.models.functions import Extract, Trunc
from . import models

lookup_name = input()
kind = input()

DB_response = models.Experiment.objects.annotate(start_year=Extract("start_datetime", "hour"))

DB_response = models.Experiment.objects.annotate(start_year=Trunc("start_datetime", "day"))
