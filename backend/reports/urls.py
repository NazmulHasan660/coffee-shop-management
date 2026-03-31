from django.urls import path
from .views import (
    dashboard_summary,
    expense_summary,
    purchase_summary,
    inventory_alerts,
)

urlpatterns = [
    path("dashboard/", dashboard_summary, name="dashboard-summary"),
    path("expenses-summary/", expense_summary, name="expense-summary"),
    path("purchase-summary/", purchase_summary, name="purchase-summary"),
    path("alerts/", inventory_alerts, name="inventory-alerts"),
]