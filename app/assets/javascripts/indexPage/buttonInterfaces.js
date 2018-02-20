function addDayFilterButtonsToMap(map) {
  dayOfWeekInt = new Date().getDay();
  var selected;
  DAYSOFWEEK.forEach(function(day, dayIndex) {
    var dayDiv = document.createElement('div');
    selected = dayIndex == dayOfWeekInt
    var dayControl = new DayButton(dayDiv, map, day, selected);

    dayDiv.index = dayIndex;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(dayDiv);
  })
}

function addLocationControlsToMap(map) {
  CITIES.forEach(function(city, cityIndex) {
    var cityDiv = document.createElement('div');
    var cityControl = new CityButton(cityDiv, map, city)
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(cityDiv)
  })
}

function addInfoButtonToMap(map) {
  var centerControlDiv = document.createElement('div');
  var centerControl = new InfoButton(centerControlDiv, map);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
}

function addTypeFiltersToMap(map) {
  FILTERS.forEach(function(filter) {
    var typeDiv = document.createElement('div');
    var typeControl = new TypeButton(typeDiv, map, filter)
    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(typeDiv)
  })
}
