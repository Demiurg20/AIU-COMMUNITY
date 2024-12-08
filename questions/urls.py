from django.urls import path
from .views import QuestionList, FacultyList,AnswerList, UserProfileDetail
from . import views
urlpatterns = [
    path('questions/', QuestionList.as_view(), name='question-list'),
    path('questions/<int:question_id>/answers/', AnswerList.as_view(), name='question-list'),
    path('userprofiles/', views.UserProfileCreate.as_view(), name='userprofile_create'),
    path('userprofiles/<int:pk>/', views.UserProfileDetail.as_view(), name='userprofile_detail'),

    # path('answers/', AnswerList.as_view(), name='answer-list'),
    path('faculties/', FacultyList.as_view(), name='faculty-list')]
