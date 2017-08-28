class LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    render json: Location.all
  end

  def edit
    
  end

  def create
    # render json: location_params

    @location = Location.new(location_params)

    if @location.save
      render json: @location

      # return
    else
      render json: {failure: "location_save_error"}
      # return
    end
  end

  private
  def location_params
    params.require(:location).permit(:name, :address, :description, :link, :phone_number)
  end
end
