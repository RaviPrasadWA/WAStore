# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django_prices.models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='payment',
            options={'ordering': ('-pk',)},
        ),
        migrations.AlterField(
            model_name='deliverygroup',
            name='shipping_price',
            field=django_prices.models.PriceField(decimal_places=4, default=0, editable=False, currency=b'INR', max_digits=12, verbose_name='shipping price'),
        ),
    ]
