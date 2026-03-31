from django.http import JsonResponse
from django.db.models import Sum, Count
from django.utils.timezone import now
from products.models import Product, Category
from expenses.models import Expense
from purchases.models import Purchase


def dashboard_summary(request):
    total_products = Product.objects.count()
    available_products = Product.objects.filter(
        is_available=True,
        stock_quantity__gt=0
    ).count()
    out_of_stock_products = Product.objects.filter(stock_quantity=0).count()
    low_stock_products = Product.objects.filter(
        stock_quantity__gt=0,
        stock_quantity__lt=10
    ).count()
    total_categories = Category.objects.count()

    data = {
        "total_products": total_products,
        "available_products": available_products,
        "out_of_stock_products": out_of_stock_products,
        "low_stock_products": low_stock_products,
        "total_categories": total_categories,
    }

    return JsonResponse(data)


def expense_summary(request):
    today = now().date()
    current_month = today.month
    current_year = today.year

    total_expenses = Expense.objects.aggregate(
        total=Sum("amount")
    )["total"] or 0

    today_expense = Expense.objects.filter(
        expense_date=today
    ).aggregate(total=Sum("amount"))["total"] or 0

    monthly_expense = Expense.objects.filter(
        expense_date__month=current_month,
        expense_date__year=current_year
    ).aggregate(total=Sum("amount"))["total"] or 0

    total_expense_records = Expense.objects.count()

    data = {
        "total_expenses": total_expenses,
        "today_expense": today_expense,
        "monthly_expense": monthly_expense,
        "total_expense_records": total_expense_records,
    }

    return JsonResponse(data)


def purchase_summary(request):
    today = now().date()
    current_month = today.month
    current_year = today.year

    total_purchase_amount = Purchase.objects.aggregate(
        total=Sum("purchase_price")
    )["total"] or 0

    total_purchase_records = Purchase.objects.count()

    today_purchase_records = Purchase.objects.filter(
        purchase_date=today
    ).count()

    monthly_purchase_records = Purchase.objects.filter(
        purchase_date__month=current_month,
        purchase_date__year=current_year
    ).count()

    total_purchase_quantity = Purchase.objects.aggregate(
        total=Sum("quantity")
    )["total"] or 0

    data = {
        "total_purchase_amount": total_purchase_amount,
        "total_purchase_records": total_purchase_records,
        "today_purchase_records": today_purchase_records,
        "monthly_purchase_records": monthly_purchase_records,
        "total_purchase_quantity": total_purchase_quantity,
    }

    return JsonResponse(data)


def inventory_alerts(request):
    low_stock_products = Product.objects.filter(
        stock_quantity__gt=0,
        stock_quantity__lt=10
    ).values("id", "name", "stock_quantity")

    out_of_stock_products = Product.objects.filter(
        stock_quantity=0
    ).values("id", "name", "stock_quantity")

    data = {
        "low_stock_count": low_stock_products.count(),
        "out_of_stock_count": out_of_stock_products.count(),
        "low_stock_products": list(low_stock_products),
        "out_of_stock_products": list(out_of_stock_products),
    }

    return JsonResponse(data)