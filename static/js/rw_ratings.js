// CREATE LEAFLET MAP OBJECT 
// Create a map object centered at Asheville, NC [35.5950581, -82.5514869]
var myMap = L.map("ratingsmapid").setView([35.5950581, -82.5514869], 13);
    
// ADD STREET MAP TILE LAYER USING MAPBOX 
// Add a tile layer to display the streets on the map using Mapbox tiles
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY
}).addTo(myMap);

// Create a group of layers
var layerGroup = L.layerGroup().addTo(myMap);

// FUNCTION TO CREATE MAP LAYERS TO SHOW RATING SCORE FOR EACH LISTING 
function createMarker(neighbourhood){
  // Load data from rw_listings.csv
  d3.csv("static/data/listings_details.csv").then(function(d) {
    // Confirm that the listings data was read accurately
    console.log(d);

    // Loop through the data and create one circle marker for each listing object
    for (var i = 0; i < d.length; i++) {
      // Conditionals for coloring the circles for each listing based on reviewScore ratings 
      var color = "";
      if (neighbourhood === d[i].zipcode) {
        var listing = d[i];
        
        // Conditionals for coloring the circles for each listing based on reviewScore ratings 
        var fillcolor = "";
        if ((listing.review_scores_rating/10) == 10) {
              fillcolor = "green"
            }
            else {
              fillcolor = "red"
            }

        L.circle([listing.latitude, listing.longitude], {
          fillOpacity: 0.65,
          color: "white",
          fillColor: fillcolor,
          // Adjust radius of circle marker 
          radius: review_scores_rating/4
        }).bindPopup("<h4>" + listing.id + "</h4> <hr> <p>Property Type: " + listing.property_type + "</p> <hr> <p>Rating: " + listing.review_scores_rating + "</p>")
        .addTo(layerGroup);
      }
    }
  });
}

// Create function for change in the event
function optionChanged(neighbourhood){
  layerGroup.clearLayers();
  createMarker(neighbourhood);
}

// Create function for initial data rendering via dropdown begins
function init() {
  // Select dropdown menu
  var dropdown =  d3.select('#zipCode');
  // Read the data
  d3.csv("static/data/neighbourhoods.csv").then((data) => {
    console.log(data);
    
    // Append zipcodes into the dropdown menu
    for (i=0; i < data.length; i++) {
      var area = data[i].neighbourhood
      dropdown.append("option").text(area).property("value");
    }
  });
};

// Call function init
init();

