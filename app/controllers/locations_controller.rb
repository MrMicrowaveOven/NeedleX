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
    Availability.all.each do |availability|
      availability.destroy
    end
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
          sun_open: Time.local(2000, 1, 1, row[9].to_i / 100, row[9].to_i % 100),
          sun_close: Time.local(2000, 1, 1, row[10].to_i / 100, row[10].to_i % 100),
          mon_open: Time.local(2000, 1, 1, row[11].to_i / 100, row[11].to_i % 100),
          mon_close: Time.local(2000, 1, 1, row[12].to_i / 100, row[12].to_i % 100),
          tues_open: Time.local(2000, 1, 1, row[13].to_i / 100, row[13].to_i % 100),
          tues_close: Time.local(2000, 1, 1, row[14].to_i / 100, row[14].to_i % 100),
          wed_open: Time.local(2000, 1, 1, row[15].to_i / 100, row[15].to_i % 100),
          wed_close: Time.local(2000, 1, 1, row[16].to_i / 100, row[16].to_i % 100),
          thurs_open: Time.local(2000, 1, 1, row[17].to_i / 100, row[17].to_i % 100),
          thurs_close: Time.local(2000, 1, 1, row[18].to_i / 100, row[18].to_i % 100),
          fri_open: Time.local(2000, 1, 1, row[19].to_i / 100, row[19].to_i % 100),
          fri_close: Time.local(2000, 1, 1, row[20].to_i / 100, row[20].to_i % 100),
          sat_open: Time.local(2000, 1, 1, row[21].to_i / 100, row[21].to_i % 100),
          sat_close: Time.local(2000, 1, 1, row[22].to_i / 100, row[22].to_i % 100),
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
