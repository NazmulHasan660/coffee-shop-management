from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from products.models import Product, Category


def dashboard_summary(request):
    total_products = Product.objects.count()
    available_products = Product.objects.filter(is_available=True).count()
    out_of_stock_products = Product.objects.filter(stock_quantity=0).count()
    total_categories = Category.objects.count()

    data = {
        "total_products": total_products,
        "available_products": available_products,
        "out_of_stock_products": out_of_stock_products,
        "total_categories": total_categories,
    }

    return JsonResponse(data)