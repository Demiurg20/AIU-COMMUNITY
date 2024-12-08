from rest_framework import serializers
from .models import Question, Answer, Faculty, UserProfile

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'name', 'question_text', 'created_at', 'faculty_id', 'user_id']

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'answer_text', 'question_id', 'created_at', 'likes', 'user_id']
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'name', 'email', 'bio', 'faculty', 'profile_picture', 'resume', 'github_link', 'linkedin_link', 'created_at']

class UserProfileSerializer(serializers.ModelSerializer):
    faculty = serializers.PrimaryKeyRelatedField(queryset=Faculty.objects.all(), required=False)

    class Meta:
        model = UserProfile
        fields = '__all__'
class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = '__all__'