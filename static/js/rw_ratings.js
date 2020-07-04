
// Load data from listings_details.csv
var listings = d3.csv("static/data/rw_listings.csv").then(function(d) {
    console.log(d);
    // listingIds = d.map.((listing) => listing.id);
    // listingLatitudes = d.map((listing) => listing.latitude);
    // listingLongitudes = d.map((listing) => listing.longitude);
    // listingReviewScoresRatings = d.map((listing) => listing.review_scores_rating);
    // listingPropertyTypes = d.map((listing) => listing.property_type);
    // listingPrices = d.map((listing) => listing.price);
    // console.log(listingIds);
    // console.log(listingLatitudes);
    // console.log(listingLongitudes);
    // console.log(listingReviewScoresRatings);
    // console.log(listingPropertyTypes);
    // console.log(listingPrices);
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
  //for (var i = 0; i < listingReviewScoresRatings.length; i++) {
    for (var i = 0; i < listings.length; i++) {
  
    // Conditionals for coloring the listings based on reviewScore ratings 
    var color = "";
    if (listings.review_scores_rating[i] > 96) {
      color = "green";
    }
    else if (listings.review_scores_rating[i] > 91) {
      color = "yellow";
    }
    else if (listings.review_scores_rating[i] > 81) {
      color = "orange";
    }
    else {
      color = "blue";
    }
  
    // var color = "";
    // if (listingReviewScoresRatings[i] > 96) {
    //   color = "green";
    // }
    // else if (listingReviewScoresRatings[i] > 91) {
    //   color = "yellow";
    // }
    // else if (listingReviewScoresRatings[i] > 81) {
    //   color = "orange";
    // }
    // else {
    //   color = "blue";
    // }
    // Add circles to map L.circle([lat,lng], radius).addTo(map); Bind the id, price and rating and add to map
    L.circle([listings.latitudes[i], listings.longitudes[i]], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      // Adjust radius
      radius: listings.review_scores_rating[i] * 1500
    }).bindPopup("<h1>" + listings.id[i] + "</h1> <hr> <h3>Rating: " + review_scores_rating[i] + "</h3> + <hr> <h3>Price: " + review_scores_rating[i] + "</h3>").addTo(myMap);
  };

