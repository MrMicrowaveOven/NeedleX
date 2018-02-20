function hideAllMarkers() {
  markers.forEach(function(marker) {
    marker.setVisible(false);
  })
  infoWindows.forEach(function(infoWindow) {
    infoWindow.close();
  })
}

function showApplicableMarkers() {
  markers.forEach(function(marker, locationIndex) {
    for (var i = 0; i < 7; i++) {
      if (dayButtons[i].style.backgroundColor == "darkgray" && availabilities[locationIndex][i]) {
        marker.setVisible(true)
      }
    }
  })
}
