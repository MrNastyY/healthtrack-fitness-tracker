from django.db import models

class Activity(models.Model):
    STATUS_CHOICES = [
        ('planned', 'Planned'),
        ('in progress', 'In Progress'),
        ('completed', 'Completed'),
    ]

    title = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    duration = models.IntegerField(help_text="Duration in minutes")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planned')
    created_at = models.DateTimeField(auto_now_add=True)  # ✅ automatically set when created
    updated_at = models.DateTimeField(auto_now=True)      # ✅ automatically updated

    def __str__(self):
        return self.title
