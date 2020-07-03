  // PLOT LISTINGS BY PROPERTY TYPE
  // Load data from listings_details.csv
  d3.csv("static/data/rw_listings_by_propertytype.csv").then(function(d) {
    // console.log(d);
    var propertyTypes = d.map((item) => item.propertytype);
    var propertyTypeListings = d.map((item) => item.listings);
    // console.log(propertyTypes);
    // console.log(propertyTypeCounts);

    // Create the Trace
      var propertyTypeTrace = {
        x: propertyTypes,
        y: propertyTypeListings,
        type: "bar"
      };
  
  // Create the data array for the plot
      var propertyTypeData = [propertyTypeTrace];
  
  // Define the plot layout
      var propertyTypeLayout = {
        title: "Listings categorized by Property Type"
    // yaxis: { title: "Property Type" }
    // yaxis: { title: "Room Type" }
  };
  
  // Plot the chart to a div tag with id "propertyType"
  Plotly.newPlot("propertytype", propertyTypeData, propertyTypeLayout);
    });