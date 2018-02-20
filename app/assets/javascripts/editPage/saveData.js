function saveData() {
  // Get locations from form
  // Get lats and lngs for each location
  // Save the new locations

  // newLocations = getFormData()
  $(".geolocatedLocationsWindow").removeClass("hidden");
  getDatabaseLocations.then(function(newLocations) {
    // setLatAndLngForExistingLocations(newLocations, oldLocations)
    console.log(newLocations);
    locationsToBeGeocoded = newLocations.filter(function(location) {
      return !location["lat"] || !location["lng"]
    })
    locationsAlreadyGeocoded = newLocations.filter(function(location) {
      return location["lat"] && location["lng"]
    })
    geoLocations = geoLocations.concat(locationsAlreadyGeocoded)
    updateGeoCount()
    geocoder = new google.maps.Geocoder();
    locationsToBeGeocoded.forEach(function(newLocation, location_index) {
      setTimeout(function() {
        geocoder.geocode( { 'address': newLocation.address}, function(results, status) {
          if (status == "OK") {
            updateLocation({
              id: newLocation.id,
              lat: results[0].geometry.location.lat,
              lng: results[0].geometry.location.lng
            })
            geoLocations.push(newLocation)
          } else if (status == "OVER_QUERY_LIMIT"){
            console.log("I tried to save it too fast and got an error...");
          } else if (status == "ZERO_RESULTS"){
            console.log("I couldn't find this address: " + newLocation.address);
          } else {
            console.log("Sorry, random error with this address: " + newLocation.address);
          }
        })
      }, 1000 * location_index)
    })
  })
}
