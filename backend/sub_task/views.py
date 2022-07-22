from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Sub_Task
from .serializers import Sub_TaskSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def sub_task_details(request,pk):
    if request.method == 'GET':
        sub_tasks = Sub_Task.objects.filter(related_task__id = pk)
        serializer = Sub_TaskSerializer(sub_tasks, many= True)
        return Response(serializer.data, status= status.HTTP_200_OK)