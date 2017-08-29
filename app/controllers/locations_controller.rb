class LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    render json: Location.all
  end

  def edit

  end

  def destroy
    Location.all.each do |location|
      location.destroy
    end
  end

  def update
    # Delete all current locations
    Location.all.each do |location|
      location.destroy
    end
    new_locations = []
    default_spreadsheet.each do |location|
      new_location = Location.new(location)
      new_location.save!
      new_locations << new_location
    end
    render json: new_locations
  end

  def create
    @location = Location.new(location_params)
    if @location.save!
      render json: @location
    else
      render json: {failure: "location_save_error"}
    end
  end

  private
  def location_params
    params.require(:location).permit(:day, :time, :name, :address, :description, :link, :phone_number, :lat, :lng)
  end

  def default_spreadsheet
    [
      {day: "Mon-Fri, 9-5pm", time: "Sat, 7-11pm", name: "SFAF SAS", address: "117 6th Street, San Francisco, CA", description: "Harm Reduction Center", link: "", phone_number: "(415)487-8043"},
      {day: "Mon-Wed & Fri & Sun", time: "12-4:30pm", name: "SFDUU", address: "149 Turk Street, San Francisco, CA", description: "", link: "", phone_number: "(415)990-3827"},
      {day: "Mon", time: "4-6pm", name: "SFAF SAS", address: "3rd Street and Innes Ave, San Francisco, CA", description: "Look for white van", link: "", phone_number: "(415)487-8043"},
      {day: "Mon & Wed & Fri", time: "5:30-7:30pm", name: "SFNE", address: "558 Claton St, San Francisco, CA", description: "In the free clinic upstairs", link: "", phone_number: "(415)630-0744"},
      {day: "Mon & Tues", time: "7-9pm", name: "Glide", address: "330 Ellis, San Francisco, CA", description: "Between Jones and Taylor", link: "", phone_number: "(415)674-5180"},
      {day: "Tues", time: "10-12pm", name: "SFAF SAS", address: "117-A 6th St, San Francisco, CA", description: "Between Mission and Howard", link: "", phone_number: "(415)487-8043"},
      # {day: "Tues", time: "12-4:30pm", name: "SFDUU", address: "149 Turk St, San Francisco, CA", description: "", link: "", phone_number: "(415)990-3827"},
      {day: "Tues & Sat", time: "2-5pm", name: "TransThrive", address: "730 Polk St, San Francisco, CA", description: "Transgender only. 4th floor.", link: "", phone_number: "(415)409-4101"},
      {day: "Tues", time: "6-8pm", name: "SFAF SAS", address: "Church and Market", description: "On Duboce St, in bikeway behind Safeway", link: "", phone_number: "(415)487-8043"},
      # {day: "Tues", time: "7-9pm", name: "Glide", address: "330 Ellis, San Francisco, CA", description: "Between Jones and Taylor", link: "", phone_number: "(415)674-5180"},
      # {day: "Wed", time: "12-4:30", name: "SFDUU", address: "149 Turk St, San Francisco, CA", description: "", link: "", phone_number: "(415)990-3827"},
      # {day: "Wed", time: "5:30-7:30pm", name: "SFNE", address: "558 Claton St, San Francisco, CA", description: "In the free clinic upstairs", link: "", phone_number: "(415)630-0744"},
      {day: "Wed", time: "6-8pm", name: "SFAF SAS", address: "Wiese street and 16th, San Francisco, CA", description: "Between Mission and Julian", link: "", phone_number: "(415)487-8043"},
      {day: "Thu", time: "12-2pm", name: "SFAF SAS", address: "225 Potrero, San Francisco, CA", description: "Pick-up only, no disposal", link: "", phone_number: "(415)487-8043"},
      {day: "Thu, 5-8pm", time: "Fri, 6-8pm", name: "St. James", address: "234 Eddy St, San Francisco, CA", description: "Between Jones & Taylor near Windsor Hotel", link: "", phone_number: "(415)312-6306"},
      {day: "Thu", time: "6-8pm", name: "SFNE", address: "Ladies Night 165 Capp, San Francisco, CA", description: "Women only", link: "", phone_number: "(415)630-0744"},
      {day: "Thu", time: "7-9pm", name: "SFAF SAS", address: "Hemlock Alley and Polk, San Francisco, CA", description: "Between Post and Sutter", link: "", phone_number: "(415)487-8043"},
      # {day: "Fri", time: "12-4:30pm", name: "SFDUU", address: "149 Turk Street, San Francisco, CA", description: "", link: "", phone_number: "(415)990-3827"},
      # {day: "Fri", time: "12-2pm", name: "SFAF SAS", address: "117-A 6th St, San Francisco, CA", description: "Between Mission and Howard", link: "", phone_number: "(415)487-8043"},
      # {day: "Fri", time: "5:30-7:30pm", name: "SFNE", address: "558 Clayton St, San Francisco, CA", description: "In the free clinic upstairs", link: "", phone_number: "(415)630-0744"},
      # {day: "Fri", time: "6-8pm", name: "St. James", address: "234 Eddy St, San Francisco, CA", description: "Between Jones and Taylor near Windsor Hotel", link: "", phone_number: "(415)312-6306"},
      {day: "Fri", time: "7-9pm", name: "SFAF SAS", address: "16th and Mission, San Francisco, CA", description: "Mobile outreach", link: "", phone_number: "(415)487-8043"},
      # {day: "Sat", time: "2-5pm", name: "TransThrive", address: "730 Polk Street, San Francisco, CA", description: "Transgender only. 4th floor.", link: "", phone_number: "(415)409-4101"},
      # {day: "Sat", time: "7-11pm", name: "SFAF SAS", address: "117 6th Street, San Francisco, CA", description: "Harm Reduction Center", link: "", phone_number: "(415)487-8043"},
      # {day: "Sun", time: "12-4:30pm", name: "SFDUU", address: "149 Turk Street, San Francisco, CA", description: "", link: "", phone_number: "(415)990-3827"},
    ]
  end
end
