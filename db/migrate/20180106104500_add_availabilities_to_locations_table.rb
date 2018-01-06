class AddAvailabilitiesToLocationsTable < ActiveRecord::Migration[5.1]
  def change
    add_column :locations, :sun_open, :time
    add_column :locations, :sun_close, :time
    add_column :locations, :mon_open, :time
    add_column :locations, :mon_close, :time
    add_column :locations, :tues_open, :time
    add_column :locations, :tues_close, :time
    add_column :locations, :wed_open, :time
    add_column :locations, :wed_close, :time
    add_column :locations, :thurs_open, :time
    add_column :locations, :thurs_close, :time
    add_column :locations, :fri_open, :time
    add_column :locations, :fri_close, :time
    add_column :locations, :sat_open, :time
    add_column :locations, :sat_close, :time
  end
end
