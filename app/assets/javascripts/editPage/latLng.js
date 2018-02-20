function setLatAndLngForExistingLocations(newLocations, oldLocations) {
  newLocations.forEach(function(newLocation) {
    sameLocation = oldLocations.filter(function(oldLocation) {
      return oldLocation["address"] == newLocation["address"]
    })
    if (sameLocation.length > 0) {
      newLocation["lat"] = sameLocation[0]["lat"]
      newLocation["lng"] = sameLocation[0]["lng"]
    }
  })
}
