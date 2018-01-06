class DropAvailabilities < ActiveRecord::Migration[5.1]
  def change
    drop_table :availabilities
  end
end
