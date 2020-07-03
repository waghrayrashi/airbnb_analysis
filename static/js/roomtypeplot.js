  // PLOT LISTINGS BY ROOM TYPE
  // Load Room type counts from the csv file
  d3.csv("static/data/rw_listings_by_roomtype.csv").then(function(d) {
    // console.log(d);
    //  Load the data into 2 arrays: roomTypes and Counts
    var roomTypes = d.map((item) => item.roomtype);
    var roomTypeListings = d.map((item) => item.listings);
    // console.log(roomTypes);
    // console.log(roomTypeCounts);
    
    // Create the Trace
      var roomTypeTrace = {
        y: roomTypes,
        x: roomTypeListings,
        type: "bar",
        orientation: 'h'};
    
    // Create the data array for the plot
      var roomTypeData = [roomTypeTrace];
    
    // Define the plot layout
      var roomTypeLayout = {
        title: "Listings categorized by Room Type",
        innerHeight: 100,
        outerHeight: 150
      
      // xaxis: { title: "Room Type" }
      // yaxis: { title: "Room Type" }
    };
    var config = {responsive: true}
    // Plot the chart to a div tag with id "roomType"
    Plotly.newPlot("roomtype", roomTypeData, roomTypeLayout, config);
    });  