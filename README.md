# Todo:

Right now a map update involves:
1) Deleting the Database
2) Adding locations to the Database from the Google Spreadsheet
3) Geolocating these new locations, saving Lat and Lng to the database.

This causes a period of time when the database will be empty, and zero locations will show on the map.  Here's a process that will eliminate this period of time: We'll have an extra column for every location and availability for update_id.  This will specify the update when that location was created.  When we update the map:
1) Create a unique ID for the new update.
2) Add locations 
