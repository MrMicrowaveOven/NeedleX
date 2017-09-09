class CreateAvailabilities < ActiveRecord::Migration[5.1]
  def change
    create_table :availabilities do |t|
      t.time :opening
      t.time :closing
      t.integer :day_of_week
      t.references :location, foreign_key: true
      t.timestamps
    end
  end
end
