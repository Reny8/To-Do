# Generated by Django 4.0.6 on 2022-07-22 19:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sub_task', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sub_task',
            name='status',
            field=models.CharField(max_length=15),
        ),
    ]
