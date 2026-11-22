from django.shortcuts import render
from .models import Project

def index(request):
    projects = Project.objects.filter(is_published=True)
    return render(request, "core/index.html", {"projects": projects})
