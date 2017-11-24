class RemoveDayTimeAndDayStringFromLocations < ActiveRecord::Migration[5.1]
  def change
    remove_column :locations, :time, :string
    remove_column :locations, :day, :string
    remove_column :locations, :day_string, :string
  end
end
