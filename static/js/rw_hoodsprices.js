
// PLOT PRICES BY NEIGHBOURHOOD
  // Load Room type counts from the csv file
  d3.json("/hoodssummary").then(function(d) {
    // console.log(d);
    //  Load the data into arrays Room Types, Listings and Percent
    var localities = d.map((item) => item.locality);
    var avgprices = d.map((item) => item.avgprice);
    // Confirm that the 3 arrays loaded correctly
    console.log(localities);
    console.log(avgprices);

    
    // Create the Trace for the bar chart
    var trace = {
      x: localities,
      y: avgprices,
      type: "bar",
    };
    
    // Create the data array for the plot
    var data = [trace];
    
    // Define the plot layout
    var layout = {
      title: "Average Prices by Neighbourhood"
    };

    // Define a variable to make the chart responsive
    var config = {responsive: true}
    
    // Plot the chart to a div tag with id "roomType"
    Plotly.newPlot("hoodspricesplotid", data, layout, config);
  });  

  