class AvailabilitiesController < ApplicationController
  def index
    render json: Availability.all
  end

  def destroy
    Availability.all.each do |availability|
      availability.destroy
    end
  end
end
