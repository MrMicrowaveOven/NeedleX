class LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    render json: Location.all
  end

  def edit

  end

  def update
    # Delete all current locations
    Location.all.each do |location|
      location.destroy
    end
    locations = params[:locations]

    num_locations = params[:locations].keys.length
    num_locations.times do |location_index|
      location_object = locations[location_index.to_s]
      location = {
        day: location_object[:day],
        time: location_object[:time],
        name: location_object[:name],
        address: location_object[:address],
        description: location_object[:description],
        link: location_object[:link],
        phone_number: location_object[:phone_number],
      }
      new_location = Location.new(location)
      new_location.save!
    end
    render json: {yo: "success"}
  end

  def create
    @location = Location.new(location_params)
    if @location.save
      render json: @location
    else
      render json: {failure: "location_save_error"}
    end
  end

  private
  def location_params
    params.require(:location).permit(:name, :address, :description, :link, :phone_number)
  end
end
