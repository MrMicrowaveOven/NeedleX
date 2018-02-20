if (window.location.href.indexOf('/locations/1/edit') !== -1) {
  var geoLocations = [];
  var numRows = 0;
  function updateFromSpreadsheet() {
    $(".statusWindow").removeClass("hidden");

    $.ajax({
      url: "/locations/1",
      type: "DELETE",
      success: function(response) {
        console.log(response);
        $("#status").html(response.status)
        $.post("/locations", function(response) {
          console.log(response);
          $("#status").html(response.status)
        })
      },
      error: function(response) {
        console.log(response)
      }
    })

  }
  function addRow(data) {
    data = data || {
      name: "",
      address: "",
      description: "",
      link: "",
      phoneNumber: "",
    }
    $("table").append(
      "<tr class='rowOfData'><td>"
      + $("table tbody tr").length + "</td><td>"
      + data.name + "</td><td>"
      + data.address + "</td><td>"
      + data.description + "</td><td>"
      + data.link + "</td><td>"
      + data.phone_number + "</td><td>"

      + (new Date(data.sun_open)).getHours() + ":" + ((new Date(data.sun_open)).getMinutes() || "00")
      + "," + (new Date(data.sun_close)).getHours() + ":" + ((new Date(data.sun_close)).getMinutes() || "00") + "</td><td>"
      + (new Date(data.mon_open)).getHours() + ":" + ((new Date(data.mon_open)).getMinutes() || "00")
      + "," + (new Date(data.mon_close)).getHours() + ":" + ((new Date(data.mon_close)).getMinutes() || "00") + "</td><td>"
      + (new Date(data.tues_open)).getHours() + ":" + ((new Date(data.tues_open)).getMinutes() || "00")
      + "," + (new Date(data.tues_close)).getHours() + ":" + ((new Date(data.tues_close)).getMinutes() || "00") + "</td><td>"
      + (new Date(data.wed_open)).getHours() + ":" + ((new Date(data.wed_open)).getMinutes() || "00")
      + "," + (new Date(data.wed_close)).getHours() + ":" + ((new Date(data.wed_close)).getMinutes() || "00") + "</td><td>"
      + (new Date(data.thurs_open)).getHours() + ":" + ((new Date(data.thurs_open)).getMinutes() || "00")
      + "," + (new Date(data.thurs_close)).getHours() + ":" + ((new Date(data.thurs_close)).getMinutes() || "00") + "</td><td>"
      + (new Date(data.fri_open)).getHours() + ":" + ((new Date(data.fri_open)).getMinutes() || "00")
      + "," + (new Date(data.fri_close)).getHours() + ":" + ((new Date(data.fri_close)).getMinutes() || "00") + "</td><td>"
      + (new Date(data.sat_open)).getHours() + ":" + ((new Date(data.sat_open)).getMinutes() || "00")
      + "," + (new Date(data.sat_close)).getHours() + ":" + ((new Date(data.sat_close)).getMinutes() || "00") + "</td><td>"
      + data.services + "</td><td>"
      + data.lat + "</td><td>"
      + data.lng + "</td></tr>"
    )
    updateRowCount();
  }

  function getData() {
    $.get("/locations", function(data) {
      data.forEach(function(location) {
        if (location.name || location.address || location.address || location.description || location.link || location.phoneNumber) {
          addRow(location)
        }
      })
    })
  }
  getData();

  // Include Google Maps script with env variables
  var GOOGLE_API_KEY = $.get("/welcome/1", function(googleApiKey) {
    var JSLink = "https://maps.googleapis.com/maps/api/js?key=" + googleApiKey.GoogleAPIKey;
    var JSElement = document.createElement('script');
    JSElement.src = JSLink;
    document.getElementsByTagName('head')[0].appendChild(JSElement);
  })

  function getFormData() {
    locations = [];
    var location = {};
    $(".rowOfData").each(function(index, row) {
      location = {};
      location["name"] = row.cells[1].innerHTML;
      location["address"] = row.cells[2].innerHTML;
      location["description"] = row.cells[3].innerHTML;
      location["link"] = row.cells[4].innerHTML;
      location["phone_number"] = row.cells[5].innerHTML;
      location["sunday"] = row.cells[6].innerHTML;
      location["monday"] = row.cells[7].innerHTML;
      location["tuesday"] = row.cells[8].innerHTML;
      location["wednesday"] = row.cells[9].innerHTML;
      location["thursday"] = row.cells[10].innerHTML;
      location["friday"] = row.cells[11].innerHTML;
      location["saturday"] = row.cells[12].innerHTML;

      locations.push(location)
    })
    return locations
  }

  var getDatabaseLocations = new Promise(function(resolve, reject) {
    $.get("/locations", function(oldLocations) {
      resolve(oldLocations)
    })
  })

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

  function updateRowCount() {
    numRows = $("#table").find(".rowOfData").length
    $("#locationCount").html(numRows);
  }
  function updateGeoCount() {
    $("#geo-count").html(geoLocations.length)
    $("#non-geolocated").html(numRows - geoLocations.length)
  }
}
