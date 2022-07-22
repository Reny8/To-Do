from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Sub_Task
from .serializers import Sub_TaskSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET','PUT'])
def sub_task_details(request,pk):
    if request.method == 'GET':
        sub_tasks = Sub_Task.objects.filter(related_task__id = pk)
        serializer = Sub_TaskSerializer(sub_tasks, many= True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    elif request.method == 'PUT':
        sub_tasks = get_object_or_404(Sub_Task, pk = pk)
        serializer = Sub_TaskSerializer(sub_tasks, data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


@api_view(['POST'])
def create_sub_task(request):
    serializer = Sub_TaskSerializer(data = request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)