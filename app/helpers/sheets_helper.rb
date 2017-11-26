require "google_drive"

module SheetsHelper
  def self.get_sheet_data

    config_struct = StringIO.new({
      client_email: ENV['gd_client_email'],
      private_key: ENV['gd_private_key'].gsub(/\\n/, "\n"),
    }.to_json)

    session = GoogleDrive::Session.from_service_account_key(config_struct)
    worksheets_array = []
    worksheets = session.spreadsheet_by_key(ENV['SPREADSHEET_ID']).worksheets
    worksheets.each do |worksheet|
      next if worksheet[1,1].blank?
      rows = [];
      (2..worksheet.num_rows).each_with_index do |row|
        break if worksheet[row, 1].blank?
        new_row = []
        (1..worksheet.num_cols).each do |col|
          new_row << worksheet[row, col]
        end
        rows << new_row
      end
      worksheets_array += rows
    end

    worksheets_array
  end

  def self.add_lat_and_lng(location, worksheet_index, row_index)
    config_struct = StringIO.new({
      client_email: ENV['gd_client_email'],
      private_key: ENV['gd_private_key'].gsub(/\\n/, "\n"),
    }.to_json)

    session = GoogleDrive::Session.from_service_account_key(config_struct)
    worksheets = session.spreadsheet_by_key(ENV['SPREADSHEET_ID']).worksheets
    current_worksheet = worksheets[worksheet_index]

    current_worksheet[row_index, 24] = location.lat
    current_worksheet[row_index, 25] = location.lng
    current_worksheet.save
  end
end
