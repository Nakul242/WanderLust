const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage with stunning ocean views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60" },
    price: 1500,
    location: "Malibu",
    country: "United States",
    geometry: { type: "Point", coordinates: [-118.7798, 34.0259] }
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stylish loft apartment in the heart of the city.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60" },
    price: 1200,
    location: "New York City",
    country: "United States",
    geometry: { type: "Point", coordinates: [-74.0060, 40.7128] }
  },
  {
    title: "Mountain Retreat",
    description: "Peaceful mountain cabin surrounded by nature.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60" },
    price: 1000,
    location: "Aspen",
    country: "United States",
    geometry: { type: "Point", coordinates: [-106.8236, 39.1911] }
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Beautifully restored villa in the hills of Tuscany.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60" },
    price: 2500,
    location: "Florence",
    country: "Italy",
    geometry: { type: "Point", coordinates: [11.2558, 43.7696] }
  },
  {
    title: "Treehouse Getaway",
    description: "Unique treehouse stay among forest trees.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60" },
    price: 800,
    location: "Portland",
    country: "United States",
    geometry: { type: "Point", coordinates: [-122.6765, 45.5231] }
  },
  {
    title: "Beachfront Paradise",
    description: "Step out directly onto sandy beaches.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60" },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    geometry: { type: "Point", coordinates: [-86.8515, 21.1619] }
  },
  {
    title: "Lake Cabin",
    description: "Fishing and kayaking by the lake.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60" },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    geometry: { type: "Point", coordinates: [-120.0440, 38.9399] }
  },
  {
    title: "Luxury Penthouse",
    description: "Panoramic city skyline views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60" },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    geometry: { type: "Point", coordinates: [-118.2437, 34.0522] }
  },
  {
    title: "Safari Lodge",
    description: "Wildlife experience in Serengeti.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60" },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    geometry: { type: "Point", coordinates: [34.6857, -2.3333] }
  },
  {
    title: "Canal House Stay",
    description: "Historic canal home in Amsterdam.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=60" },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    geometry: { type: "Point", coordinates: [4.9041, 52.3676] }
  },
  {
    title: "Beach Villa in Bali",
    description: "Relax by the ocean in Bali.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1602391833977-358a52198938?auto=format&fit=crop&w=800&q=60" },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
    geometry: { type: "Point", coordinates: [115.1889, -8.4095] }
  },
  {
    title: "Mountain Cabin in Banff",
    description: "Canadian Rockies mountain cabin.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=800&q=60" },
    price: 1500,
    location: "Banff",
    country: "Canada",
    geometry: { type: "Point", coordinates: [-115.5708, 51.1784] }
  },
  {
    title: "Art Deco Apartment",
    description: "Vintage Miami style apartment.",
    image: { filename: "listingimage", url: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?auto=format&fit=crop&w=800&q=60" },
    price: 1600,
    location: "Miami",
    country: "United States",
    geometry: { type: "Point", coordinates: [-80.1918, 25.7617] }
  },
  {
    title: "Villa in Phuket",
    description: "Private infinity pool villa.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?auto=format&fit=crop&w=800&q=60" },
    price: 3000,
    location: "Phuket",
    country: "Thailand",
    geometry: { type: "Point", coordinates: [98.3923, 7.8804] }
  },
  {
    title: "Castle in Scotland",
    description: "Royal living in Scottish Highlands.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=800&q=60" },
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
    geometry: { type: "Point", coordinates: [-4.2026, 57.4778] }
  },
  {
    title: "Luxury Desert Resort",
    description: "Private pool oasis in Dubai.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=60" },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    geometry: { type: "Point", coordinates: [55.2708, 25.2048] }
  },
  {
    title: "Log Cabin in Montana",
    description: "Peaceful nature cabin stay.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?auto=format&fit=crop&w=800&q=60" },
    price: 1100,
    location: "Montana",
    country: "United States",
    geometry: { type: "Point", coordinates: [-110.3626, 46.8797] }
  },
  {
    title: "Beach Villa in Greece",
    description: "Mediterranean beachfront luxury.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=800&q=60" },
    price: 2500,
    location: "Mykonos",
    country: "Greece",
    geometry: { type: "Point", coordinates: [25.3289, 37.4467] }
  },
  {
    title: "Eco Treehouse",
    description: "Sustainable jungle living.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?auto=format&fit=crop&w=800&q=60" },
    price: 750,
    location: "Costa Rica",
    country: "Costa Rica",
    geometry: { type: "Point", coordinates: [-84.0739, 9.7489] }
  },
  {
    title: "Modern Apartment in Tokyo",
    description: "Central Tokyo living.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=60" },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
    geometry: { type: "Point", coordinates: [139.6917, 35.6895] }
  }
];

module.exports = { data: sampleListings };
