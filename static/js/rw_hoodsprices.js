//  CHLOROPETH OF NEIGHBOURHOODS BY PRICES
// Create basic leaflet map centered around Ashville, NC[35.5951, -82.5515]
var myMap = L.map('highpricehoodsmapid').setView([35.5951, -82.5515], 13);

// Add a streets tile layer to the leaflet map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap)

// Create a group of layers
// var layerGroup = L.layerGroup().addTo(mymap);

// Create a function to read the neighbourhood for each listing 



// Create function for change in the event


// Create function for initial data rendering via dropdown begins



// Call function init
// init();




































 // Load the property type data from rw_listings_by_propertytype.csv
  d3.csv("static/data/rw_listings_by_neighbourhood2.csv").then(function(d) {
    // confirm that the data was read accurately
    console.log(d);

    
  });


  