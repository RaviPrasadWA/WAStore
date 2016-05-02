from django.template.response import TemplateResponse
from saleor.product.models import Product
from notifications.models import Notification


def home(request):
    products = Product.objects.get_available_products()[:12]
    products = products.prefetch_related('categories', 'images',
                                         'variants__stock')
    notifications = Notification.objects.order_by('-pk')[:6]
    return TemplateResponse(
        request, 'base.html',
        {'products': products,
         'parent': None,
         'notifications': notifications,})
