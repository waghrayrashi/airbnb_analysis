
// function createMap(listings) {

//   // Adding a base background tile layer
// var basemap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// });

// // Create a baseMaps object to hold the basemap layer
// var baseMaps = {
//   "Base Map": basemap
// };
// // Create an overlayMaps object to hold the bikeStations layer
// var overlayMaps = {
//   "Listings": listings
// };
// // // Creating map object centered at Ashville, NC
// var map = L.map("map-id", {
//   center: [35.5950581, -82.5514869],
//   zoom: 12,
//   layers: [basemap, listings]
// });

// // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(map);
// }

// function createMarkers(res)
// var myMap = L.map("listings", {
//     center: [45.52, -122.67],
//     zoom: 11
//   });
  
 
//   // Use this link to get the geojson data.
//   var link = "static/data/neighbourhoods.geojson";
  
//   // Grabbing the GeoJSON data.
//   d3.json(link, function(data) {
//     // Creating a GeoJSON layer with the retrieved data
//     L.geoJson(data).addTo(myMap);
//   });
//   .addTo(myMap);