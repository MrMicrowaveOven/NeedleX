class AddServicesToLocations < ActiveRecord::Migration[5.1]
  def change
    add_column :locations, :services, :string
  end
end
