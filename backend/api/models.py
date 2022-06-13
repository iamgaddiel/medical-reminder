from django.db import models



class Alarms(models.Model):
    title = models.CharField(max_length=400)
    description = models.TextField()
    remainder = models.DateTimeField()

    def __str__(self) -> str:
        return self.title

class Medication(models.Model):
    pass

    def __str__(self) -> str:
        return super().__str__()

