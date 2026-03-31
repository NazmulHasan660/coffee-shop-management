from rest_framework import generics, permissions
from .models import Purchase
from .serializers import PurchaseSerializer
from accounts.permissions import IsAdminUserRole


class PurchaseListCreateView(generics.ListCreateAPIView):
    queryset = Purchase.objects.all().order_by("-created_at")
    serializer_class = PurchaseSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.IsAuthenticated()]
        return [IsAdminUserRole()]


class PurchaseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.IsAuthenticated()]
        return [IsAdminUserRole()]