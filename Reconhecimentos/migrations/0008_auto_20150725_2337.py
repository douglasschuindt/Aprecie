# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.utils.timezone import utc
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('Reconhecimentos', '0007_auto_20150711_0548'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reconhecimento',
            name='data',
            field=models.DateTimeField(default=datetime.datetime(2015, 7, 25, 20, 37, 19, 295965, tzinfo=utc)),
        ),
    ]
