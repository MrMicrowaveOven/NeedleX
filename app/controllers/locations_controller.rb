require 'time'

class LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    locations = Location.includes(:availabilities)
    all_locations = []
    locations.each do |location|
      all_locations << {
        id: location.id,
        name: location.name,
        address: location.address,
        description: location.description,
        link: location.link,
        phone_number: location.phone_number,
        created_at: location.created_at,
        updated_at: location.updated_at,
        day: location.day,
        time: location.time,
        lat: location.lat,
        lng: location.lng,
        day_string: location.day_string,
        availabilities: location.availabilities,
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
    render json: {locations: "Deleted successfully", please_wait: "Update in progress"}
  end

  def update
    location = Location.find(params[:id])
    location[:lat] = params[:lat]
    location[:lng] = params[:lng]
    if location.save
      render json: {locationSave: "Success!"}
    else
      render json: {locationSave: "Error #{params[:id]}"}
    end
  end

  def create
    ws = SheetsHelper.get_sheet_data
    rows = []

    # ws is array-like.  rows will be an actual array.
    (2..ws.num_rows).each do |row|
      rows << []
      (1..ws.num_cols).each do |col|
        rows.last << ws[row, col]
      end
    end

    rows.each_with_index do |row, index|
      break if row[1].blank?
      location = Location.new({
        name: row[1],
        address: "#{row[2]}, #{row[3]}, #{row[4]}, #{row[5]}",
        description: row[6],
        link: row[7],
        phone_number: row[8],
      })
      unless location.save
        render json: {error: "failure to save Location ##{index}"}
        return
      end

      (9..22).each do |col|
        next if col % 2 == 0
        next if row[col].blank?
        opening_time = row[col].to_i
        closing_time = row[col + 1].to_i
        day_of_week = (col - 9) / 2
        availability = Availability.new({
          location_id: location.id,
          opening: Time.new(2000, 1, 1, opening_time / 100, opening_time % 100),
          closing: Time.new(2000, 1, 1, closing_time / 100, closing_time % 100),
          day_of_week: day_of_week
        })
        unless availability.save
          render json: {error: "failure to save availability #{day_of_week} for Location ##{index}"}
          return
        end
      end
    end

    render json: {locations: "Successfully updated!  Please reload the page to see the update."}
  end

  private
  def location_params
    params.require(:location).permit(:day, :day_string, :time, :name, :address, :description, :link, :phone_number, :lat, :lng)
  end
end
