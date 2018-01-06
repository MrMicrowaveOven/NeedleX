# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180106104500) do

  create_table "availabilities", force: :cascade do |t|
    t.time "opening"
    t.time "closing"
    t.integer "day_of_week"
    t.integer "location_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location_id"], name: "index_availabilities_on_location_id"
  end

  create_table "locations", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.text "description"
    t.string "link"
    t.string "phone_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "lat"
    t.decimal "lng"
    t.integer "sheet_number"
    t.integer "row_number"
    t.time "sun_open"
    t.time "sun_close"
    t.time "mon_open"
    t.time "mon_close"
    t.time "tues_open"
    t.time "tues_close"
    t.time "wed_open"
    t.time "wed_close"
    t.time "thurs_open"
    t.time "thurs_close"
    t.time "fri_open"
    t.time "fri_close"
    t.time "sat_open"
    t.time "sat_close"
  end

end
