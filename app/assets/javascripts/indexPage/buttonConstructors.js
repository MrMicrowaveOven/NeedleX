function InfoButton(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginTop = '5px';
  controlUI.style.marginRight = '5px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '30px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Info';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    window.open('/info', '_blank');
  });
}

// CityButton Constructor
function CityButton(cityDiv, map, city) {
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.style.width = MOBILE ? '200px' : '100px';
  // controlUI.title = 'Click to show c';
  cityDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = MOBILE ? '24px' : '16px';
  controlText.style.lineHeight = MOBILE ? '57px' : '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = city.name;
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    map.setCenter(city.center)
    map.setZoom(city.zoom)
    // var currentColor = controlUI.style.backgroundColor
    // controlUI.style.backgroundColor = currentColor == "rgb(255, 255, 255)" ? "darkgray" : "rgb(255, 255, 255)";
  });
  cityButtons.push(controlUI)
}

// DayButton Constructor
function DayButton(controlDiv, map, day, selected) {
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = selected ? "darkgray" : '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  // controlUI.title = 'Click to show c';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = MOBILE ? '24px' : '16px';
  controlText.style.lineHeight = MOBILE ? '57px' : '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = day;
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    var currentColor = controlUI.style.backgroundColor
    controlUI.style.backgroundColor = currentColor == "rgb(255, 255, 255)" ? "darkgray" : "rgb(255, 255, 255)";
    hideAllMarkers()
    showApplicableMarkers()
  });
  dayButtons.push(controlUI)
}

function TypeButton(typeDiv, map, filter) {
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = "darkgray";
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  // controlUI.title = 'Click to show c';
  typeDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = MOBILE ? '24px' : '16px';
  controlText.style.lineHeight = MOBILE ? '57px' : '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = filter.name + '<img src="' + filter.imageLink + '" width="16px"> ';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    var currentColor = controlUI.style.backgroundColor
    controlUI.style.backgroundColor = currentColor == "rgb(255, 255, 255)" ? "darkgray" : "rgb(255, 255, 255)";
    // hideAllMarkers()
    // showApplicableMarkers()
  });
  // dayButtons.push(controlUI)
}
