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

  def self.add_lat_and_lng
    config_struct = StringIO.new({
      client_email: ENV['gd_client_email'],
      private_key: ENV['gd_private_key'].gsub(/\\n/, "\n"),
    }.to_json)

    session = GoogleDrive::Session.from_service_account_key(config_struct)

    worksheets = session.spreadsheet_by_key(ENV['SPREADSHEET_ID']).worksheets
    first_worksheet = worksheets[0]
    first_worksheet[2, 24] = "Butts"
    first_worksheet.save
  end
end
