require "google_drive"

module SheetsHelper
  def self.get_sheet_data

    config_struct = StringIO.new({
      client_email: ENV['gd_client_email'],
      private_key: ENV['gd_private_key'].gsub(/\\n/, "\n"),
    }.to_json)

    session = GoogleDrive::Session.from_service_account_key(config_struct)
    session.spreadsheet_by_key(ENV['SPREADSHEET_ID']).worksheets[0]
  end
end
