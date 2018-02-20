function updateRowCount() {
  numRows = $("#table").find(".rowOfData").length
  $("#locationCount").html(numRows);
}
function updateGeoCount() {
  $("#geo-count").html(geoLocations.length)
  $("#non-geolocated").html(numRows - geoLocations.length)
}
