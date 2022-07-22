from django.db import models

# Create your models here.
class Task(models.Model):
    description = models.CharField(max_length=50)
    status = models.CharField(max_length=15)