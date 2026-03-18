from django.contrib import admin

# Register your models here.

from .models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'category', 'price', 'stock_quantity', 'is_available', 'created_at']
    list_filter = ['category', 'is_available']
    search_fields = ['name']