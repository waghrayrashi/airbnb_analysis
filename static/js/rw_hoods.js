// PLOT STACKED BAR CHART FOR NEIGHBOURHOODS
  
  // Load the property type data from rw_listings_by_propertytype.csv
  d3.csv("static/data/rw_listings_by_neighbourhood2.csv").then(function(d) {
    // confirm that the data was read accurately
    console.log(d);
 
    //  Load the data into arrays Property Types, Listings and Percent
    var hoods = d.map((item) => item.neighbourhood);
    var hoodListings = d.map((item) => item.listings);
    var hoodPrices = d.map((item) => item.avgprice);
    var hoodRatings = d.map((item) => item.avgrating);

    console.log(hoods);
    console.log(hoodListings);
    console.log(hoodPrices);
    console.log(hoodRatings);

    // Create the Trace for the Listings
    var hoodsListingTrace = {
    x: hoods,
    y: hoodListings,
    type: "bar",
    barmode: 'relative'
      };

    // Create the Trace for the Avg Price
    var hoodsPriceTrace = {
    x: hoods,
    y: hoodPrices,
    type: "bar",
    barmode: 'relative'
    };

    // Create the Trace for the Avg Rating
    var hoodsRatingsTrace = {
    x: hoods,
    y: hoodRatings,
    type: "bar",
    barmode: 'relative'
    };
  
  // Create the data array for the plot
      var hoodsData = [hoodsListingTrace, hoodsPriceTrace, hoodsRatingsTrace ];
  
  // Define the plot layout
      var hoodsLayout = {
        title: "Neighbourhood Analysis ",
        xaxis: { title: "Neighbourhood" }

  };
  
  // Plot the chart to a div tag with id "propertyType"
  Plotly.newPlot("hoodsplotid", hoodsData, hoodsLayout);
    });
  // }