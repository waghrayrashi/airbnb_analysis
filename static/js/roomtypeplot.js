  // PLOT LISTINGS BY ROOM TYPE
  // Load Room type counts from the csv file
  d3.csv("static/data/listings_by_roomtype.csv").then(function(d) {
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
        title: "Listings categorized by Room Type"
      // xaxis: { title: "Room Type" }
      // yaxis: { title: "Room Type" }
    };
    
    // Plot the chart to a div tag with id "roomType"
    Plotly.newPlot("roomType", roomTypeData, roomTypeLayout);
    });  
  

// PLOT LISTINGS BY PROPERTY TYPE
  // Load data from listings_details.csv
  d3.csv("static/data/property_types.csv").then(function(d) {
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
  Plotly.newPlot("propertyType", propertyTypeData, propertyTypeLayout);
    });