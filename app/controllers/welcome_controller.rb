class WelcomeController < ApplicationController
  def show
    render json: {GoogleAPIKey: ENV["GOOGLE_API_KEY"]}
  end

  def info

  end
end
