function makeMap(lat, lng) {
  lat = MOBILE ? 37.77 : 37.765
  lng = MOBILE ? -122.44 : -122.42
  var mapOptions = {
    center: new google.maps.LatLng(lat, lng),
    zoom: MOBILE ? 13 : 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_LEFT
    },
    styles: MAP_STYLES
  }
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  addDayFilterButtonsToMap(map)
  addLocationControlsToMap(map)
  addInfoButtonToMap(map)

  addMarkers(map);

  // For admins to add locations
  map.addListener('click', function(position) {
    console.log("Click recorded!  Here's your information:");
    console.log('You clicked at a latitude of:');
    console.log(position.latLng.lat());
    console.log('And at a longitude of:');
    console.log(position.latLng.lng());
    console.log('And with a zoom of:');
    console.log(map.getZoom());
    console.log("Now get this info to Malekai!");
  })
}
