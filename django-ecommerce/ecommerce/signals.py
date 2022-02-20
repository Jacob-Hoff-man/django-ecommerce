from .models import User
# pre_save lets us fire an action before saving to db
from django.db.models.signals import pre_save

# fires when a user model is saved
def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email

pre_save.connect(updateUser, sender=User)
    