require 'test_helper'

class LocationsControllerTest < ActionDispatch::IntegrationTest
  class LocationsPostTest < ActionDispatch::IntegrationTest
    test "requires address" do
      control = Location.all.length
      post locations_url, params:
      {
        location: {
          name: "Tommy's needs",
          link: "www.google.com",
          phone_number: "7148099426",
          lat: 1.8,
          lng: 12.8
        }
      }
      assert_equal control, Location.all.length
    end
    test "creates an availability for a day location is open" do
      control = Availability.all.length
      post locations_url, params:
      {
        location: {
          sunday: "8am,6pm",
          name: "Tommy's needs",
          address: "1416 Castro St.",
          link: "www.google.com",
          phone_number: "7148099426",
          lat: 1.8,
          lng: 12.8
        }
      }
      assert_equal control + 1, Availability.all.length
    end
    test "creates an availability for each day location is open" do
      control = Availability.all.length
      post locations_url, params:
      {
        location: {
          sunday: "8am,6pm",
          monday: "12pm,4pm",
          name: "Tommy's needs",
          address: "1416 Castro St.",
          link: "www.google.com",
          phone_number: "7148099426",
          lat: 1.8,
          lng: 12.8
        }
      }
      assert_equal control + 2, Availability.all.length
    end
  end
  class LocationsGetTest < ActionDispatch::IntegrationTest
    test "gives all locations" do
      get locations_url
      control = JSON.parse(response.body).length
      create(:location)
      get locations_url
      assert_equal control + 1, JSON.parse(response.body).length
    end
    test "gives all availabilities for locations" do
      location_with_avails = create(:location_with_avail)
      get locations_url
      assert_equal 1, JSON.parse(response.body).last["availabilities"].length
      create(:availability, location: location_with_avails)
      get locations_url
      assert_equal 2, JSON.parse(response.body).last["availabilities"].length
    end
  end
end
