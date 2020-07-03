// Creating map object centered at Ashville, NC
console.log("hello");
var myMap = L.map("listings", {
    center: [45.52, -122.67],
    zoom: 11
  });
  
  // Adding a base background tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // // Use this link to get the geojson data.
  // var link = "static/data/neighbourhoods.geojson";
  
  // // Grabbing the GeoJSON data.
  // d3.json(link, function(data) {
  //   // Creating a GeoJSON layer with the retrieved data
  //   L.geoJson(data).addTo(myMap);
  // });
  