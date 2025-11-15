from decimal import Decimal
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

def order_file_upload_path(instance, filename):
    """Generate upload path for OrderFile: invoices/<order_id>/files/<filename>"""
    return f'invoices/{instance.order.id}/files/{filename}'

class CustomUser(AbstractUser):
    phone = models.CharField(
        max_length=15,
        validators=[RegexValidator(r'^\+?1?\d{9,15}$', message="Введите корректный номер телефона.")],
        unique=True,
        blank=True,
        null=True
    )
    email = models.EmailField(unique=True)
    address = models.TextField(blank=True, null=True)

    class Meta:
        permissions = [
            ("can_view_all_orders", "Can view all orders"),
            ("can_manage_orders", "Can manage orders"),
        ]

class Client(models.Model):
    name = models.CharField(max_length=255)
    contact_email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class UserClient(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='clients')
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='users')
    role = models.CharField(max_length=50, choices=[
        ('client_admin', 'Client Admin'),
        ('client_user', 'Client User'),
    ], default='client_user')

    class Meta:
        unique_together = ('user', 'client')

class Product(models.Model):
    product_name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    price_mult = models.DecimalField(max_digits=10, decimal_places=2)
    product_mark = models.CharField(max_length=100, blank=True)
    product_country = models.CharField(max_length=100, blank=True)
    contract = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.product_name} ({self.code})"

class Transport(models.Model):
    car_number = models.CharField(max_length=20, unique=True, help_text="Номер машины")
    trailer_number = models.CharField(max_length=20, null=True, help_text="Номер прицепа")
    driver_number = models.CharField(max_length=20, blank=True, null=True, help_text="Номер телефона водителя")
    car_weight = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    trailer_weight = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.car_number} / {self.driver_number}"

ORDER_STATUSES = [
    ('created', 'Создан'),
]

class Order(models.Model):
    CURRENCY_CHOICES = [
        ('USD', 'USD'),
        ('CNY', 'CNY'),
        ('RUB', 'RUB'),
        ('KZT', 'KZT'),
        ('EUR', 'EUR'),
    ]
    order_number = models.PositiveIntegerField(unique=True)
    invoice_number = models.PositiveIntegerField(unique=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='orders')
    manager = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, related_name='managed_orders')
    destination = models.CharField(max_length=255)
    transition_point = models.CharField(max_length=255)
    status = models.CharField(max_length=50, choices=ORDER_STATUSES, default='created')
    shipper = models.CharField(max_length=255)
    shipper_address = models.TextField()
    consignee = models.CharField(max_length=255)
    consignee_address = models.TextField()
    total_amount = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    gross_weight = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    netto_weight = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, default='USD')
    loaded_weight = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    products = models.ManyToManyField(Product, through='OrderProduct', related_name='orders')
    transport = models.ForeignKey(Transport, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')

    def __str__(self):
        return f"Order {self.order_number} for {self.client.name}"

    def calculate_totals(self):
        """Calculate total_amount, gross_weight, and netto_weight from Orderシェア

System: Products."""
        order_products = self.order_products.all()
        self.total_amount = sum(op.amount for op in order_products)
        self.gross_weight = sum(op.gross_weight for op in order_products)
        self.netto_weight = sum(op.netto_weight for op in order_products)
        self.save()

class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_products')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='order_products')
    quantity = models.PositiveIntegerField(default=1)
    gross_weight = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    netto_weight = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    amount = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)

    class Meta:
        unique_together = ('order', 'product')

    def save(self, *args, **kwargs):
        """Calculate netto_weight and amount before saving."""
        if not self.product:
            raise ValueError("Product must be specified.")
        self.netto_weight = self.gross_weight * Decimal('0.82')  # Используем Decimal вместо float
        self.amount = self.netto_weight * self.product.price_mult
        super().save(*args, **kwargs)

class OrderFile(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='files')
    file = models.FileField(upload_to=order_file_upload_path)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"File for Order {self.order.order_number} - {self.file.name}"