from swampdragon import route_handler
from swampdragon.route_handler import ModelPubRouter
from notifications.models import Notification
from notifications.serializers import NotificationSerializer


class NotificationRouter(ModelPubRouter):
    valid_verbs = ['subscribe']
    route_name = 'notifications'
    model = Notification
    serializer_class = NotificationSerializer


route_handler.register(NotificationRouter)
