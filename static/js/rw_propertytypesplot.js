  // PLOT LISTINGS BY PROPERTY TYPE
  
  // Load the property type data from rw_listings_by_propertytype.csv
  d3.csv("static/data/rw_listings_by_propertytype.csv").then(function(d) {
    // confirm that the data was read accurately
    console.log(d);
 
    //  Load the data into arrays Property Types, Listings and Percent
    var propertyTypes = d.map((item) => item.propertytype);
    var propertyTypeListings = d.map((item) => item.listings);
    var propertyTypePercent = d.map((item) => item.percent);

    console.log(propertyTypes);
    console.log(propertyTypeListings);
    console.log(propertyTypePercent);

    // Create the Trace for the bar chart
      var propertyTypeTrace = {
        x: propertyTypes,
        y: propertyTypePercent,
        type: "bar",
        barmode: 'relative',
        bargap: 0.3
      };
  
  // Create the data array for the plot
      var propertyTypeData = [propertyTypeTrace];
  
  // Define the plot layout
      var propertyTypeLayout = {
        title: "Top Property Types by Listings",
        yaxis: { title: "Percentage of Listings" }

  };
  
  // Plot the chart to a div tag with id "propertyType"
  Plotly.newPlot("propertytypesplotid", propertyTypeData, propertyTypeLayout);
    });
  // }