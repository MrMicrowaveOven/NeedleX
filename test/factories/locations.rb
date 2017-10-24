FactoryBot.define do
  factory :location do
    address "1416 Castro St."
  end

  factory :location_with_avail, parent: :location do
    after(:create) do |location|
      create_list(:availability, 1, location: location)
    end
  end
end
