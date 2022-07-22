from django.urls import path
from . import views

urlpatterns = [
    path('',views.task_details),
    path('<int:pk>/', views.update_task)
]