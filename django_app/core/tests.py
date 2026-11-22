from django.test import TestCase
from django.urls import reverse
from .models import Project

class ProjectPageTests(TestCase):
    def test_home_lists_only_published_projects(self):
        Project.objects.create(title="Published", slug="published", is_published=True)
        Project.objects.create(title="Draft", slug="draft", is_published=False)
        response = self.client.get(reverse("home"))
        self.assertContains(response, "Published")
        self.assertNotContains(response, "Draft")
