function updateLocation(location) {
  $.ajax({
    type: "PATCH",
    url: "/locations/" + location.id,
    data: location,
    success: function(res) {
      if (res.status == "Successfuly geolocated location!") {
        console.log(res);
        geoLocations.push(location);
        updateGeoCount();
      }
    },
    error: function(res) {
      console.log(res);
    }
  })
}
function postLocation(location) {
  $.ajax({
    type: "POST",
    url: "/locations",
    data: {location: location},
    success: function(res) {
      // console.log(res);
    },
    error: function(e) {
      // console.log(e);
    }
  })
}
