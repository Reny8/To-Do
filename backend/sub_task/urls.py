from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/', views.sub_task_details)
]