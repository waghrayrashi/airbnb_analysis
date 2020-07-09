// CREATE LEAFLET MAP OBJECT 
// Create a map object centered at Asheville, NC [35.5950581, -82.5514869] Downtown: 35.5946, -82.5540 Asheville: 35.5950581, -82.5514869
var myMap = L.map("ratingsmapid").setView([35.5950, -82.5514], 13);
    
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
  // Load data from database
  // d3.json("/cleanlistings").then(function(d) {
  d3.csv("/cleanlistings").then((d) => {
    // Confirm that the listings data was read accurately
    console.log(d);

    // Loop through the data and create one circle marker for each listing object
    for (var i = 0; i < d.length; i++) {
      // Conditionals for coloring the circles for each listing based on reviewScore ratings 
      var color = "";
      if (neighbourhood === d[i].neighbourhood_cleansed) {
        var listing = d[i];
        
        // Conditionals for coloring the circles for each listing based on reviewScore ratings 
        var color = "";
        if (listing.review_scores_rating > 96) {color = "green"}
          else if (listing.review_scores_rating >91) {color = "orange"}
            else if (listing.review_scores_rating >81) {color = "yellow"}
              else {color = "red"}

        L.circle([listing.latitude, listing.longitude], {
          fillOpacity: 0.65,
          radius:100,
          color: color,
          // Adjust radius of circle marker 
          // radius: review_scores_rating/4
        }).bindPopup("<h5>Listing ID: " + listing.id + "</h5><hr><h6>Property Type: " + listing.property_type + "</h6><hr><p>Rating: " + listing.review_scores_rating + "</p><hr><p>Price: " + listing.price + "</p>")
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

// Create function for initializing the hood dropdown 
function init() {
  // Select dropdown menu
  var dropdown =  d3.select('#zipCode');
  // Read the data
  d3.csv("static/data/neighbourhoods.csv").then((data) => {
    console.log(data);
    
    // Append neighbourhoods into the dropdown menu
    for (j=0; j < data.length; j++) {
      var hood = data[j].neighbourhood
      dropdown.append("option").text(hood).property("value");
    }
  });
};

// Call function init
init();

