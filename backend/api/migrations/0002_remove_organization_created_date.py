# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-01-10 22:07
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='organization',
            name='created_date',
        ),
    ]
