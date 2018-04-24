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
  {
    name: "SF",
    center: {
      lat: MOBILE ? 37.77 : 37.765,
      lng: MOBILE ? -122.44 : -122.42,
    },
    zoom: 12,
    fontSizes: ['24px', '16px'],
    lineHeights: ['57px', '38px']
  },
  // { name: "East Bay<br>(coming soon)",
  //   center: {
  //     lat: MOBILE ? 37.85 : 37.87,
  //     lng: MOBILE ? -122.25 : -122.2,
  //   }, zoom: 12 },
  { name: "New York City",
    center: {
      lat: 40.717218585112654,
      lng: -73.87810493019094,
    }, zoom: 11,
    fontSizes: ['18px', '14px'],
    lineHeights: ['57px', '38px']
  },
  { name: "Lower Manhattan",
    center: {
      lat: 40.75327946310049,
      lng: -73.98098246158156,
    }, zoom: 13,
    fontSizes: ['18px', '11px'],
    lineHeights: ['57px', '38px']
  },
  { name: "Upper Manhattan / Bronx",
    center: {
      lat: 40.830083685086265,
      lng: -73.90999255425697,
    }, zoom: 13,
    fontSizes: ['18px', '11px'],
    lineHeights: ['57px', '19px']
  },
  { name: "Brooklyn/Queens",
    center: {
      lat: 40.69939410007492,
      lng: -73.84173730596672,
    }, zoom: 12,
    fontSizes: ['18px', '12px'],
    lineHeights: ['57px', '38px']
  },
  { name: "Staten Island",
    center: {
      lat: 40.59850552973282,
      lng: -74.13013228469424,
    }, zoom: 13,
    fontSizes: ['18px', '12px'],
    lineHeights: ['57px', '38px']
  },
  { name: "San Juan, Puerto Rico",
    center: {
      lat: 18.425293714092245,
      lng: -66.04439091616507,
    }, zoom: 13,
    fontSizes: ['18px', '12px'],
    lineHeights: ['57px', '19px']
  },
];
