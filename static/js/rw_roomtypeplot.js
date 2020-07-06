  // PLOT LISTINGS BY ROOM TYPE
  // Load Room type counts from the csv file
  d3.csv("static/data/rw_listings_by_roomtype.csv").then(function(d) {
    // console.log(d);
    //  Load the data into arrays Room Types, Listings and Percent
    var roomTypes = d.map((item) => item.roomtype);
    var roomTypeListings = d.map((item) => item.listings);
    var roomTypePercent = d.map((item) => item.percent);
    // Confirm that the 3 arrays loaded correctly
    console.log(roomTypes);
    console.log(roomTypeListings);
    console.log(roomTypePercent);
    
    // Create the Trace for the bar chart
      var roomTypeTrace = {
        x: roomTypes,
        y: roomTypePercent,
        type: "bar",
        };
    
    // Create the data array for the plot
      var roomTypeData = [roomTypeTrace];
    
    // Define the plot layout
      var roomTypeLayout = {
        title: "Types of Listings",
        // innerHeight: 100,
        // outerHeight: 150
      
      // xaxis: { title: "Room Type" }
      // yaxis: { title: "Room Type" }
    };
    // Define a variable to make the chart responsive
    var config = {responsive: true}
    
    // Plot the chart to a div tag with id "roomType"
    Plotly.newPlot("roomtypeplotid", roomTypeData, roomTypeLayout, config);
    });  
