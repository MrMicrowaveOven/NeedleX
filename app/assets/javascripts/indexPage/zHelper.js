if (window.location.href.indexOf('/info') === -1 && window.location.href.indexOf('/locations/1/edit') === -1) {
  dayButtons = [];
  cityButtons = [];
  markers = [];
  infoWindows = [];
  availabilities = []
  dayOfWeek = new Date().getDay();

  // Include Google Maps script with env variables
  var GOOGLE_API_KEY = $.get("/welcome/1", function(googleApiKey) {
    var JSLink = "https://maps.googleapis.com/maps/api/js?key=" + googleApiKey.GoogleAPIKey + "&callback=makeMap";
    var JSElement = document.createElement('script');
    JSElement.src = JSLink;
    document.getElementsByTagName('head')[0].appendChild(JSElement);
  })
}
