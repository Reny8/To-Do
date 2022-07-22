from rest_framework import serializers
from .models import Sub_Task

class Sub_TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sub_Task
        fields = ['id','related_task','related_task_id','description','status']
        depth = 1
    related_task_id = serializers.IntegerField(write_only = True)