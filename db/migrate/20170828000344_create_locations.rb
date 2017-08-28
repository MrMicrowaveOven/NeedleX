class CreateLocations < ActiveRecord::Migration[5.1]
  def change
    create_table :locations do |t|
      t.string :name
      t.string :address
      t.text :description
      t.string :link
      t.string :phone_number
      t.timestamps
    end
  end
end
