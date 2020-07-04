// Load data from listings_details.csv
d3.csv("static/data/rw_listings.csv").then(function(d) {
    console.log(d);
    var listingIds = d.map((listing) => listing.id);
    var listingLatitudes = d.map((listing) => listing.latitude);
    var listingLongitudes = d.map((listing) => listing.longitude);
    var listingReviewScoresRatings = d.map((listing) => listing.review_scores_rating);
    var listingPropertyTypes = d.map((listing) => listing.property_type);
    var listingPrices = d.map((listing) => listing.price);
    console.log(listingIds);
    console.log(listingLatitudes);
    console.log(listingLongitudes);
    console.log(listingReviewScoresRatings);
    console.log(listingPropertyTypes);
    console.log(listingPrices);
});
// Create a map object centeered at Asheville, NC [35.5950581, -82.5514869]
var myMap = L.map("map", {
    center: [35.5950581, -82.5514869],
    zoom: 3
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Loop through the listingIds array and create one marker for each listing object
  for (var i = 0; i < listingReviewScoresRatings.length; i++) {
  
    // Conditionals for coloring the listings based on reviewScore ratings 
    var color = "";
    if (listingReviewScoresRatings[i] > 96) {
      color = "green";
    }
    else if (listingReviewScoresRatings[i] > 91) {
      color = "yellow";
    }
    else if (listingReviewScoresRatings[i] > 81) {
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
      // Adjust radius
      radius: listingReviewScoresRatings[i] * 1500
    }).bindPopup("<h1>" + listingIds[i] + "</h1> <hr> <h3>Review Rating: " + listingReviewScoresRatings[i] + "</h3>").addTo(myMap);
  };

