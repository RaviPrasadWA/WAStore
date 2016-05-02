# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django_prices.models
import saleor.product.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_auto_20150722_0545'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fixedproductdiscount',
            name='discount',
            field=django_prices.models.PriceField(currency=b'INR', verbose_name='discount value', max_digits=12, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='product',
            name='description',
            field=models.TextField(verbose_name='description'),
        ),
        migrations.AlterField(
            model_name='product',
            name='price',
            field=django_prices.models.PriceField(currency=b'INR', verbose_name='price', max_digits=12, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='product',
            name='weight',
            field=saleor.product.models.fields.WeightField(unit=b'kg', verbose_name='weight', max_digits=6, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='productvariant',
            name='price_override',
            field=django_prices.models.PriceField(decimal_places=2, currency=b'INR', max_digits=12, blank=True, null=True, verbose_name='price override'),
        ),
        migrations.AlterField(
            model_name='productvariant',
            name='weight_override',
            field=saleor.product.models.fields.WeightField(decimal_places=2, max_digits=6, blank=True, null=True, verbose_name='weight override', unit=b'kg'),
        ),
        migrations.AlterField(
            model_name='stock',
            name='cost_price',
            field=django_prices.models.PriceField(decimal_places=2, currency=b'INR', max_digits=12, blank=True, null=True, verbose_name='cost price'),
        ),
    ]
