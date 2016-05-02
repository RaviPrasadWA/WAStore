from django.db import models
from swampdragon.models import SelfPublishModel
from notifications.serializers import NotificationSerializer


class Notification(SelfPublishModel, models.Model):
    serializer_class = NotificationSerializer
    message = models.TextField()
