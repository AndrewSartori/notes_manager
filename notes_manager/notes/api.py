from notes.models import Note
from rest_framework import viewsets, permissions
from .serializers import NoteSerializer

# Note Viewset
class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = NoteSerializer

    def get_queryset(self):
        return self.request.user.notes.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    