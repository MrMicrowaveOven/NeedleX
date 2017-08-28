class AddDayAndTimeToLocations < ActiveRecord::Migration[5.1]
  def change
    add_column :locations, :day, :string
    add_column :locations, :time, :string
  end
end
