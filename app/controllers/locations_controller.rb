require 'time'

class LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    all_locations = []
    Location.all.each do |location|
      all_locations << {
        id: location.id,
        name: location.name,
        address: location.address,
        description: location.description,
        link: location.link,
        phone_number: location.phone_number,
        created_at: location.created_at,
        updated_at: location.updated_at,
        lat: location.lat,
        lng: location.lng,
        services: location.services,
        sheet_number: location.sheet_number,
        row_number: location.row_number,
        sun_open: location.sun_open,
        sun_close: location.sun_close,
        mon_open: location.mon_open,
        mon_close: location.mon_close,
        tues_open: location.tues_open,
        tues_close: location.tues_close,
        wed_open: location.wed_open,
        wed_close: location.wed_close,
        thurs_open: location.thurs_open,
        thurs_close: location.thurs_close,
        fri_open: location.fri_open,
        fri_close: location.fri_close,
        sat_open: location.sat_open,
        sat_close: location.sat_close,
      }
    end
    render json: all_locations
  end

  def destroy
    Location.all.each do |location|
      location.destroy
    end
    render json: {status: "Old locations deleted successfully, please standby for update.", please_wait: "Update in progress"}
  end

  def update
    location = Location.find(params[:id])
    location[:lat] = params[:lat]
    location[:lng] = params[:lng]
    SheetsHelper.add_lat_and_lng(location)
    if location.save
      render json: {status: "Successfuly geolocated location!"}
    else
      render json: {locationSave: "Error #{params[:id]}"}
    end
  end

  def create
    sheets = SheetsHelper.get_sheet_data

    sheets.each_with_index do |sheet, sheet_index|
      sheet.each_with_index do |row, location_index|
        services = []
        (26..49).to_a.each do |service_index|
          services << (row[service_index] == 'Y' || row[service_index] == 'T' ? '1' : '0')
        end
        services_string = services.join
        location = Location.new({
          name: row[1],
          address: "#{row[2]}, #{row[3]}, #{row[4]}, #{row[5]}",
          description: row[6],
          link: row[7],
          phone_number: row[8],
          sheet_number: sheet_index,
          # Actual data starts at row 2, which is 1-indexed.
          row_number: location_index + 2,
          lat: row[23],
          lng: row[24],
          services: services_string,
          sun_open: row[9].empty? ? nil : Time.local(2000, 1, 1, row[9].to_i / 100, row[9].to_i % 100),
          sun_close: row[10].empty? ? nil : Time.local(2000, 1, 1, row[10].to_i / 100, row[10].to_i % 100),
          mon_open: row[11].empty? ? nil : Time.local(2000, 1, 1, row[11].to_i / 100, row[11].to_i % 100),
          mon_close: row[12].empty? ? nil : Time.local(2000, 1, 1, row[12].to_i / 100, row[12].to_i % 100),
          tues_open: row[13].empty? ? nil : Time.local(2000, 1, 1, row[13].to_i / 100, row[13].to_i % 100),
          tues_close: row[14].empty? ? nil : Time.local(2000, 1, 1, row[14].to_i / 100, row[14].to_i % 100),
          wed_open: row[15].empty? ? nil : Time.local(2000, 1, 1, row[15].to_i / 100, row[15].to_i % 100),
          wed_close: row[16].empty? ? nil : Time.local(2000, 1, 1, row[16].to_i / 100, row[16].to_i % 100),
          thurs_open: row[17].empty? ? nil : Time.local(2000, 1, 1, row[17].to_i / 100, row[17].to_i % 100),
          thurs_close: row[18].empty? ? nil : Time.local(2000, 1, 1, row[18].to_i / 100, row[18].to_i % 100),
          fri_open: row[19].empty? ? nil : Time.local(2000, 1, 1, row[19].to_i / 100, row[19].to_i % 100),
          fri_close: row[20].empty? ? nil : Time.local(2000, 1, 1, row[20].to_i / 100, row[20].to_i % 100),
          sat_open: row[21].empty? ? nil : Time.local(2000, 1, 1, row[21].to_i / 100, row[21].to_i % 100),
          sat_close: row[22].empty? ? nil : Time.local(2000, 1, 1, row[22].to_i / 100, row[22].to_i % 100),
        })
        unless location.save
          render json: {error: "failure to save Location ##{location_index}"}
          return
        end
      end
    end

    render json: {status: "Successfully updated from spreadsheet!  Please reload the page to see the update, then Geolocate."}
  end

  private
  def location_params
    params.require(:location).permit(:name, :address, :description, :link, :phone_number, :lat, :lng, :sheet_number, :row_number)
  end
end
