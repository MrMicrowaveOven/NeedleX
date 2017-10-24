FactoryBot.define do
  factory :availability do
    opening 5.hours.ago
    closing 1.hour.ago
    day_of_week 3
  end

end
