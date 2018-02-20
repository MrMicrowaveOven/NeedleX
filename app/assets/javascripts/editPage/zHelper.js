if (window.location.href.indexOf('/locations/1/edit') !== -1) {
  var geoLocations = [];
  var numRows = 0;

  getData();

  // Include Google Maps script with env variables
  var GOOGLE_API_KEY = $.get("/welcome/1", function(googleApiKey) {
    var JSLink = "https://maps.googleapis.com/maps/api/js?key=" + googleApiKey.GoogleAPIKey;
    var JSElement = document.createElement('script');
    JSElement.src = JSLink;
    document.getElementsByTagName('head')[0].appendChild(JSElement);
  })

  var getDatabaseLocations = new Promise(function(resolve, reject) {
    $.get("/locations", function(oldLocations) {
      resolve(oldLocations)
    })
  })
}
