MOBILE = navigator.userAgent.indexOf('iPhone') != -1 || navigator.userAgent.indexOf('Android') != -1
DAYSOFWEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
SERVICES = [
  "Needle Exchange", "Naloxone Kits", "HIV Testing and Counseling",	"Hep C Testing",
  "Drug Treatment", "Support and Counseling",	"General Medical Clinic",
  "Case Management Services", "Wound care", "Food Banks",	"Sack Lunch",
  "Hot Meals", "Showers", "Laundry", "Housing", "Homeless Support",
  "Speciality in Sex worker support", "Speciality in Transgender support",
  "Speciality LGBTQ+ services", "Speciality in HIV Services", "Crisis Intervention",
  "Herbal/Acupuncture Services", "24 Hour Needle Drop", "Walgreens Pharmacy"
]
CITIES = [
  { name: "SF",
    center: {
      lat: MOBILE ? 37.77 : 37.765,
      lng: MOBILE ? -122.44 : -122.42,
    }, zoom: 13 },
  { name: "East Bay<br>(coming soon)",
    center: {
      lat: MOBILE ? 37.85 : 37.87,
      lng: MOBILE ? -122.25 : -122.2,
    }, zoom: 12 },
  { name: "NY<br>(coming soon)",
    center: {
      lat: MOBILE ? 43 : 43,
      lng: MOBILE ? -76 : -76,
    }, zoom: 7 }
];
