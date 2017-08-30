class AddDayStringToLocations < ActiveRecord::Migration[5.1]
  def change
    add_column :locations, :day_string, :string
  end
end
