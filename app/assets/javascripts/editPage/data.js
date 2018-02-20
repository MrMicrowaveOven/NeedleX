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

function getData() {
  $.get("/locations", function(data) {
    data.forEach(function(location) {
      if (location.name || location.address || location.address || location.description || location.link || location.phoneNumber) {
        addRow(location)
      }
    })
  })
}

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
