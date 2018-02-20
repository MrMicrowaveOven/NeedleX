MOBILE = navigator.userAgent.indexOf('iPhone') != -1 || navigator.userAgent.indexOf('Android') != -1
DAYSOFWEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

NEEDLE_IMAGE_LINK = "https://68.media.tumblr.com/08815ef78ff0dc07bf671d7dc25f2428/tumblr_ovgx0j0zXk1v497yzo1_75sq.png"
WALGREENS_IMAGE_LINK = "https://78.media.tumblr.com/092aab67ffc39aae023e160375e9bb7f/tumblr_p4bc3tXoZ91v497yzo1_75sq.png"
NEEDLE_DROP_24_HOUR_IMAGE_LINK = "https://78.media.tumblr.com/ffc3326aaf468702a057b9bac366f9c5/tumblr_p4bc3tXoZ91v497yzo2_75sq.png"

SERVICES = [
  "Needle Exchange", "Naloxone Kits", "HIV Testing and Counseling",	"Hep C Testing",
  "Drug Treatment", "Support and Counseling",	"General Medical Clinic",
  "Case Management Services", "Wound care", "Food Banks",	"Sack Lunch",
  "Hot Meals", "Showers", "Laundry", "Housing", "Homeless Support",
  "Speciality in Sex worker support", "Speciality in Transgender support",
  "Speciality LGBTQ+ services", "Speciality in HIV Services", "Crisis Intervention",
  "Herbal/Acupuncture Services", "24 Hour Needle Drop", "Walgreens Pharmacy"
]

WALGREENS_INDEX = SERVICES.indexOf("Walgreens Pharmacy")
NEEDLE_DROP_INDEX = SERVICES.indexOf("24 Hour Needle Drop")

CITIES = [
  { name: "SF",
    center: {
      lat: MOBILE ? 37.77 : 37.765,
      lng: MOBILE ? -122.44 : -122.42,
    }, zoom: 13 },
  { name: "East Bay",
    center: {
      lat: MOBILE ? 37.85 : 37.87,
      lng: MOBILE ? -122.25 : -122.2,
    }, zoom: 12 },
  { name: "NY",
    center: {
      lat: MOBILE ? 43 : 43,
      lng: MOBILE ? -76 : -76,
    }, zoom: 7 }
];

FILTERS = [
  {
    name: 'Needle Exchange Location',
    imageLink: NEEDLE_IMAGE_LINK
  },
  {
    name: 'Walgreens Sharps Bin',
    imageLink: WALGREENS_IMAGE_LINK
  },
  {
    name: '24-hour Needle Drop',
    imageLink: NEEDLE_DROP_24_HOUR_IMAGE_LINK
  }
]
