from django.conf.urls import patterns
from django.conf.urls import url
from smarturls import surl

urlpatterns = patterns('dcavenue.views',
                       surl("/", "index", name="dcavenue-index"),
                       surl("/start/", "start", name="dcavenue-start"),
                       surl("/callback/", "callback", name="dcavenue-callback")
                       )
