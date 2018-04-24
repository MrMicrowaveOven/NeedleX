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

  // Add day filter buttons at top of screen
  dayOfWeekInt = new Date().getDay();
  var selected;
  DAYSOFWEEK.forEach(function(day, dayIndex) {
    var dayDiv = document.createElement('div');
    selected = dayIndex == dayOfWeekInt
    var dayControl = new DayButton(dayDiv, map, day, selected);

    dayDiv.index = dayIndex;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(dayDiv);
  })
  // Add locations controls at bottom of screen
  CITIES.forEach(function(city, cityIndex) {
    var cityDiv = document.createElement('div');
    var fontSizes = city.fontSizes
    var lineHeights = city.lineHeights
    var cityControl = new CityButton(cityDiv, map, city, fontSizes, lineHeights)
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(cityDiv)
  })

  var centerControlDiv = document.createElement('div');
  var centerControl = new InfoButton(centerControlDiv, map);
  // centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);


  addMarkers(map);
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
