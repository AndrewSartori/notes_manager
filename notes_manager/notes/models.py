from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title       = models.CharField(max_length=140)
    body        = models.CharField(max_length=1000)
    created_at  = models.DateTimeField(auto_now_add=True)

    owner = models.ForeignKey(
        User, 
        related_name="notes", 
        on_delete=models.CASCADE, 
        null=True
    )


