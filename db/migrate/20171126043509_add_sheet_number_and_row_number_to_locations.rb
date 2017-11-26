class AddSheetNumberAndRowNumberToLocations < ActiveRecord::Migration[5.1]
  def change
    add_column :locations, :sheet_number, :integer
    add_column :locations, :row_number, :integer
  end
end
