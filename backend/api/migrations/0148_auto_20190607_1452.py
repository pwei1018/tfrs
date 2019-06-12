# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-06-07 14:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0147_auto_20190606_2242'),
    ]

    operations = [
        migrations.AddField(
            model_name='carbonintensitydeterminationtype',
            name='fuel',
            field=models.ManyToManyField(through='api.ApprovedFuelProvision', to='api.ApprovedFuel'),
        ),
        migrations.AddField(
            model_name='carbonintensitydeterminationtype',
            name='provision_act',
            field=models.ManyToManyField(through='api.ApprovedFuelProvision', to='api.ProvisionOfTheAct'),
        ),
    ]