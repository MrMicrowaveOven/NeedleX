function addMarkers(map) {
  $.get("/locations", function(data) {
    console.log(data.filter(function(location) {
      if (location.lat && location.lng) {
        return true;
      }
    }));
    console.log("Greetings admin!  This is where click information will be displayed.");
    var NEEDLE_IMAGE_LINK = "https://68.media.tumblr.com/08815ef78ff0dc07bf671d7dc25f2428/tumblr_ovgx0j0zXk1v497yzo1_75sq.png"
    var WALGREENS_IMAGE_LINK = "https://78.media.tumblr.com/092aab67ffc39aae023e160375e9bb7f/tumblr_p4bc3tXoZ91v497yzo1_75sq.png"
    var NEEDLE_DROP_24_HOUR_IMAGE_LINK = "https://78.media.tumblr.com/ffc3326aaf468702a057b9bac366f9c5/tumblr_p4bc3tXoZ91v497yzo2_75sq.png"

    WALGREENS_INDEX = SERVICES.indexOf("Walgreens Pharmacy")
    NEEDLE_DROP_INDEX = SERVICES.indexOf("24 Hour Needle Drop")

    data.forEach(function(location, locationIndex) {
      // map.setCenter(results[0].geometry.location);
      var sizeOfIcons = MOBILE ? new google.maps.Size(96, 96) : new google.maps.Size(48, 48)
      if (location.services[WALGREENS_INDEX] == "1") {
        var image_link = WALGREENS_IMAGE_LINK
      } else if (location.services[NEEDLE_DROP_INDEX] == "1") {
        var image_link = NEEDLE_DROP_24_HOUR_IMAGE_LINK
      } else {
        var image_link = NEEDLE_IMAGE_LINK
      }

      var image = {
        url: image_link,
        scaledSize: sizeOfIcons,
        // size: new google.maps.Size(64, 64),
        // origin: new google.maps.Point(0, 0),
        // anchor: new google.maps.Point(0, 128)
      }
      var marker = new google.maps.Marker({
        map: map,
        position: {lat: parseFloat(location.lat), lng: parseFloat(location.lng)},
        icon: image,
        opacity: 0.75
      });

      if(location.phone_number) {
        var firstThreeDigits = location.phone_number.slice(0,3)
        var secondThreeDigits = location.phone_number.slice(3,6)
        var lastFourDigits = location.phone_number.slice(6,10)
        var phone_number = "(" + firstThreeDigits + ") " + secondThreeDigits + "-" + lastFourDigits;

        var phone_number_link = '<a href="tel:+1-' + firstThreeDigits + "-" + secondThreeDigits + "-" + lastFourDigits + '">' + phone_number + '</a>'
      } else {
        var phone_number_link = "";
      }

      var contentString = "<h3>" + location.name + "</h3>" + location.address.split(",")[0] + "<br>";

      secondHalfOfAddress = location.address.split(",")
      secondHalfOfAddress.shift()
      contentString += secondHalfOfAddress.join() + "<br>";
      location.description ? contentString += location.description + "<br>" : 0;
      location.link ? contentString += '<a href="' + location.link + '" target="_blank">Website</a>' + "<br>" : 0;
      contentString += phone_number_link + "<br><br>";

      services_string = location.services;

      if (services_string.indexOf("1") !== -1) {
        contentString += "<strong>Services: </strong><br>"
        for (var i = 0; i < services_string.length; i++) {
          if (services_string[i] == "1") {
            contentString += SERVICES[i] + '<br>'
          }
        }
        contentString += "<br>";
      }

      contentString += "<strong>Hours:</strong><br>";

      opening_times = [location.sun_open, location.mon_open, location.tues_open, location.wed_open, location.thurs_open, location.fri_open, location.sat_open]
      closing_times = [location.sun_close, location.mon_close, location.tues_close, location.wed_close, location.thurs_close, location.fri_close, location.sat_close]

      availability = []
      DAYSOFWEEK.forEach(function(day, dayIndex) {
        if (dayOfWeek == dayIndex) {
          contentString += "<strong>"
        }
        contentString += "<div class='availability'><div class='day_of_week'>" + day + ":</div>"

        opening = opening_times[dayIndex]
        closing = closing_times[dayIndex]

        if (!opening || !closing) {
          contentString += "<div class='hours'> Closed</div></div>";
          availability[dayIndex] = false;
        } else if (opening == closing) {
          contentString += "<div class='hours'> 24 hours</div></div>";
          availability[dayIndex] = true;
        } else {
          var openingTimeString = formatAMPM(new Date(opening));
          var closingTimeString = formatAMPM(new Date(closing));
          contentString += "<div class='hours'> " + openingTimeString + "-" + closingTimeString + "</div></div>";
          availability[dayIndex] = true;
        }
        if (dayOfWeek == dayIndex) {
          contentString += "</strong>"
        }
      })

      var gMapsLinkBase = "https://www.google.com/maps/place/" + location.address.split("+");
      contentString += '<br><a href="' + gMapsLinkBase + '" target="_blank">View on Google Maps</a><br>';

      contentString = "<div class='" + (MOBILE ? 'infoWindowContentMobile' : 'infoWindowContent') + "'>" + contentString + "</div>"

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
        // An attempt at making the "close" button larger for mobile.  Image didn't resize to its outside width.
        // if (MOBILE) {
          // $("#map > div > div > div:nth-child(1) > div:nth-child(4) > div:nth-child(4) > div > img")
        // }
      });
      // google.maps.event.addListener(map, 'click', infowindow.close());
      map.addListener('click', function() {
        infowindow.close();
      });
      markers.push(marker)
      infoWindows.push(infowindow)
      availabilities.push(availability)
    });
    hideAllMarkers()
    showApplicableMarkers()
  })
}
