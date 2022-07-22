from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Sub_Task
from .serializers import Sub_TaskSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET','PUT','DELETE'])
def sub_task_details(request,pk):
    if request.method == 'PUT':
        serializer = Sub_TaskSerializer(sub_update, data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    elif request.method == 'DELETE': 
        sub_update = get_object_or_404(Sub_Task, pk = pk)
        sub_update.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST','GET'])
def get_and_create(request):
    if request.method == 'GET':
        sub_tasks = Sub_Task.objects.all()
        serializer = Sub_TaskSerializer(sub_tasks, many= True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = Sub_TaskSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)