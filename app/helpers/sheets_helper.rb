require "google_drive"

module SheetsHelper
  def self.get_sheet_data

    # Creates a session. This will prompt the credential via command line for the
    # first time and save it to config.json file for later usages.
    # See this document to learn how to create config.json:
    # https://github.com/gimite/google-drive-ruby/blob/master/doc/authorization.md

    config_struct = StringIO.new({
      client_email: ENV['gd_client_email'],
      private_key: ENV['gd_private_key'].gsub(/\\n/, "\n"),
      # Called for in the docs, but seemingly unnecesary.
      # type: ENV['gd_type'],
      # project_id: ENV['gd_project_id'],
      # private_key_id: ENV['gd_private_key_id'],
      # client_id: ENV['gd_client_id'],
      # auth_uri: ENV['gd_auth_uri'],
      # token_uri: ENV['gd_token_uri'],
      # auth_provider_x509_cert_url: ENV['gd_auth_provider_x509_cert_url'],
      # client_x509_cert_url: ENV['gd_client_x509_cert_url']
    }.to_json)

    session = GoogleDrive::Session.from_service_account_key(config_struct)
    session.spreadsheet_by_key(ENV['SPREADSHEET_ID']).worksheets[0]
  end
end

# client_id: ENV['client_id'],
# client_secret: ENV['client_secret'],
# scope: [
#   "https://www.googleapis.com/auth/drive",
#   "https://spreadsheets.google.com/feeds/"
# ],
# refresh_token: ENV['refresh_token']


# Gets content of A2 cell.
# p ws[2, 1]  #==> "hoge"

# Changes content of cells.
# Changes are not sent to the server until you call ws.save().
# ws[2, 1] = "foo"
# ws[2, 2] = "bar"
# ws.save

# Dumps all cells.
# (1..ws.num_rows).each do |row|
#   (1..ws.num_cols).each do |col|
#     p ws[row, col]
#   end
# end

# Yet another way to do so.
# p ws.rows  #==> [["fuga", ""], ["foo", "bar]]

# Reloads the worksheet to get changes by other clients.
# ws.reload
# ws[2,1]
