from django.db import models
from task.models import Task
# Create your models here.
class Sub_Task(models.Model):
    related_task = models.ForeignKey(Task, on_delete = models.CASCADE)
    description = models.CharField(max_length = 50)
    status = models.CharField(max_length = 15)