from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Client, Transport, UserClient, Product, Order, OrderProduct

admin.site.register(Transport)

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'phone', 'is_staff']
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('phone', 'address')}),
    )

class OrderProductInline(admin.TabularInline):
    model = OrderProduct
    extra = 1

class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_number', 'client', 'status', 'created_at']
    list_filter = ['status', 'client']
    inlines = [OrderProductInline]

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Client)
admin.site.register(UserClient)
admin.site.register(Product)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderProduct)