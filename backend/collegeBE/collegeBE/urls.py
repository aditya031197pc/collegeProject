
from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from .accounts.views import PredictionView


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^accounts/', include('collegeBE.accounts.urls')),
    url(r'disease/$', PredictionView.as_view(), name="prediction-api")
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

