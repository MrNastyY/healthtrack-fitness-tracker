from django.db import models

class Activity(models.Model):
    title = models.CharField(max_length=100)
    duration = models.PositiveIntegerField()
    category = models.CharField(max_length=100)  # ✅ NEW FIELD
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
