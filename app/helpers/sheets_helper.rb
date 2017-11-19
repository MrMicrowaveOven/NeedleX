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
      (2..worksheet.num_rows).each_with_index do |row, row_index|
        break if worksheet[row_index + 1, 1].blank?
        rows << []
        (1..worksheet.num_cols).each do |col|
          rows.last << worksheet[row, col]
        end
      end
      worksheets_array += rows
    end

    worksheets_array
  end
end
