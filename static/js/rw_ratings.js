// DATA SOURCE
// Load data from listings_details.csv
  var listings = d3.csv("static/data/rw_listings.csv").then(function(d) {
    // Confirm that the listings data was read accurately
    console.log(d);
    // From the listings object, prepare individual arrays for: listing IDs, latitudes, longitudes, ratings, prices and property types
    var listingIds = d.map((listing) => listing.id);
    var listingLatitudes = d.map((listing) => listing.latitude);
    var listingLongitudes = d.map((listing) => listing.longitude);
    var listingRatings = d.map((listing) => listing.review_scores_rating);
    var listingPropertyTypes = d.map((listing) => listing.property_type);
    var listingPrices = d.map((listing) => listing.price);
    // Confirm that the arrays have the data as expected
    console.log(listingIds);
    console.log(listingRatings);

    // CREATE LEAFLET MAP OBJECT 
    // Create a map object centered at Asheville, NC [35.5950581, -82.5514869]
    var myMap = L.map("mapid").setView([35.5950581, -82.5514869], 12);
    
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

    // ADD CIRCLE MARKER LAYER TO SHOW RATING SCORE ON THE MAP FOR EACH LISTING
    // Loop through the listingIds array and create one marker for each listing object
    for (var i = 0; i < listingIds.length; i++) {

    // Conditionals for coloring the circles for each listing based on reviewScore ratings 
    var color = "";
    if (listingRatings[i] > 96) {
      color = "green";
    }
    else if (listingRatings[i] > 91) {
      color = "yellow";
    }
    else if (listingRatings[i] > 81) {
      color = "orange";
    }
    else {
      color = "blue";
    }

    // Add circles to map L.circle([lat,lng], radius).addTo(map); Bind the id, price and rating and add to map
    L.circle([listingLatitudes[i], listingLongitudes[i]], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      // Adjust radius of circle marker 
      radius: listingRatings[i]
    }).bindPopup("<h4>" + listingIds[i] + "</h4> <hr> <p>Property Type: " + listingPropertyTypes[i] + "</p> <hr> <p>Rating: " + listingRatings[i] + "</p>").addTo(myMap);
  };
}); 

