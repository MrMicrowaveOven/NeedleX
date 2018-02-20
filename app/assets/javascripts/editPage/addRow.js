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
