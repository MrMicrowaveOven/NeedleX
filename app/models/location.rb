class Location < ApplicationRecord
  has_many :availabilities
  validates :address, presence: true
end
