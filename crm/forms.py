from django import forms
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm 
from .models import CustomUser, Order, OrderProduct, OrderFile, ORDER_STATUSES
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit

class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput, label="Password")
    password_confirm = forms.CharField(widget=forms.PasswordInput, label="Confirm Password")

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'first_name', 'last_name', 'phone', 'password', 'password_confirm']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.add_input(Submit('submit', 'Register'))

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        password_confirm = cleaned_data.get('password_confirm')
        if password and password_confirm and password != password_confirm:
            raise forms.ValidationError("Passwords do not match.")
        return cleaned_data

class UserLoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.add_input(Submit('submit', 'Login'))

class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = [
            'client', 'destination', 'transition_point',
            'shipper', 'shipper_address', 'consignee', 'consignee_address'
        ]
        widgets = {
            'status': forms.Select(choices=ORDER_STATUSES),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.add_input(Submit('submit', 'Save Order'))

class BaseOrderProductFormSet(forms.BaseModelFormSet):
    def clean(self):
        super().clean()
        products = []
        for form in self.forms:
            if form.cleaned_data and not form.cleaned_data.get('DELETE', False):
                product = form.cleaned_data.get('product')
                if product:
                    if product in products:
                        raise forms.ValidationError(f"Продукт {product} выбран более одного раза.")
                    products.append(product)

class OrderProductForm(forms.ModelForm):
    class Meta:
        model = OrderProduct
        fields = ['product', 'quantity', 'gross_weight']  # amount и netto_weight рассчитываются

    def clean_quantity(self):
        quantity = self.cleaned_data['quantity']
        if quantity <= 0:
            raise forms.ValidationError("Quantity must be positive.")
        return quantity

    def clean_gross_weight(self):
        gross_weight = self.cleaned_data['gross_weight']
        if gross_weight <= 0:
            raise forms.ValidationError("Gross weight must be positive.")
        return gross_weight

class OrderFileForm(forms.ModelForm):
    class Meta:
        model = OrderFile
        fields = ['file']
        widgets = {
            'file': forms.ClearableFileInput(),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.add_input(Submit('submit', 'Upload File'))

class UserProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['phone']