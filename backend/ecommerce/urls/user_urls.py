from django.urls import path
from ecommerce.views import user_views as views

urlpatterns = [
    # using the custom token view that has custom user data
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name="register"),
    path('profile/', views.getUser, name="users-profile"),
    path('profile/update/', views.updateUser, name="users-profile-update"),
    path('', views.getUsers, name="users"),

]