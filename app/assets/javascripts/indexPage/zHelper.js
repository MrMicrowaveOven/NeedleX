if (window.location.href.indexOf('/info') === -1 && window.location.href.indexOf('/locations/1/edit') === -1) {
  mobile = navigator.userAgent.indexOf('iPhone') != -1 || navigator.userAgent.indexOf('Android') != -1
  DAYSOFWEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  SERVICES = [
    "Needle Exchange", "Naloxone Kits", "HIV Testing and Counseling",	"Hep C Testing",
    "Drug Treatment", "Support and Counseling",	"General Medical Clinic",
    "Case Management Services", "Wound care", "Food Banks",	"Sack Lunch",
    "Hot Meals", "Showers", "Laundry", "Housing", "Homeless Support",
    "Speciality in Sex worker support", "Speciality in Transgender support",
    "Speciality LGBTQ+ services", "Speciality in HIV Services", "Crisis Intervention",
    "Herbal/Acupuncture Services", "24 Hour Needle Drop", "Walgreens Pharmacy"
  ]
  CITIES = [
    { name: "SF",
      center: {
        lat: mobile ? 37.77 : 37.765,
        lng: mobile ? -122.44 : -122.42,
      }, zoom: 13 },
    { name: "East Bay",
      center: {
        lat: mobile ? 37.85 : 37.87,
        lng: mobile ? -122.25 : -122.2,
      }, zoom: 12 },
    { name: "NY",
      center: {
        lat: mobile ? 43 : 43,
        lng: mobile ? -76 : -76,
      }, zoom: 7 }
  ];
  dayButtons = [];
  cityButtons = [];
  markers = [];
  infoWindows = [];
  availabilities = []
  dayOfWeek = new Date().getDay();

  function makeMap(lat, lng) {
    lat = mobile ? 37.77 : 37.765
    lng = mobile ? -122.44 : -122.42
    var mapOptions = {
      center: new google.maps.LatLng(lat, lng),
      zoom: mobile ? 13 : 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_LEFT
      }
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
      var cityControl = new CityButton(cityDiv, map, city)
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

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ampm;
    return strTime;
  }

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
        var sizeOfIcons = mobile ? new google.maps.Size(96, 96) : new google.maps.Size(48, 48)
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

        contentString = "<div class='" + (mobile ? 'infoWindowContentMobile' : 'infoWindowContent') + "'>" + contentString + "</div>"

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
          // An attempt at making the "close" button larger for mobile.  Image didn't resize to its outside width.
          // if (mobile) {
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

  // Include Google Maps script with env variables
  var GOOGLE_API_KEY = $.get("/welcome/1", function(googleApiKey) {
    var JSLink = "https://maps.googleapis.com/maps/api/js?key=" + googleApiKey.GoogleAPIKey + "&callback=makeMap";
    var JSElement = document.createElement('script');
    JSElement.src = JSLink;
    document.getElementsByTagName('head')[0].appendChild(JSElement);
  })
}
