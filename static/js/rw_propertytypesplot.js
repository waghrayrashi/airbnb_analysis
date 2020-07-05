// DATA SOURCE
// Load data from listings_details.csv
  var listings = d3.csv("static/data/rw_listings_by_neighbourhood2.csv").then(function(d) {
    // Confirm that the listings data was read accurately
    console.log(d);
    // From the listings object, prepare individual arrays for: listing IDs, latitudes, longitudes, ratings, prices and property types
    var neighbourhoods = d.map((listing) => listing.neighbourhood);
    var noOfListings = d.map((listing) => listing.listings);
    var avgPrices = d.map((listing) => listing.avgprice);
    var avgRatings = d.map((listing) => listing.avgrating);

    // Confirm that the arrays have the data as expected
    console.log(neighbourhoods);
    console.log(noOfListings);
    console.log(avgPrices);
    console.log(avgRatings);
    
    // Store the values of each neighbourhood's listings in an array
    var arden28704 = Object.values(d.Arden-28704);
    var candler28715 = Object.values(d.Candler-28715);
    var fletcher28732 = Object.values(d.Fletcher-28732);
    var asheville28801 = Object.values(d.Asheville-28801);
    var asheville28803 = Object.values(d.Asheville-28803);
    var asheville28804 = Object.values(d.Asheville-28804);
    var asheville28805 = Object.values(d.Asheville-28805);
    var asheville28806 = Object.values(d.Asheville-28806);
    
    // Confirm that the neighbourhood arrays have the data as expected
    console.log(arden28704);
    console.log(candler28715);
    console.log(fletcher28732);
    console.log(asheville28801);
    console.log(asheville28803);
    console.log(asheville28804);
    console.log(asheville28805);
    console.log(asheville28806);
    
    // Create an initial plot of Property types
    // // Create a variable to hold the first neighbourhood "Asheville-28801"
    // var labels = Object.keys(d.asheville28801);
    // // Confirm that the initial plot variable has the data for neighbourhood "Asheville-28801"
    // console.log(labels);

    // Create a function for initial plot
    function init() {
    var trace = {
        values: asheville28801,
        labels: labels,
        type: "bar",
    };
    var layout = {
        title: "Streaming Services",
        height: 600,
        width: 800,
    };
    Plotly.newPlot("pie", [trace], layout);
    }
    init();

    d3.select("#selDataset").on("change", () => {
    var value = d3.event.target.value;
    //   var value = d3.select(this).property("value");
    var currentData = [];
    if (value === "us") {
        currentData = us;
    } else if (value === "uk") {
        currentData = uk;
    } else if (value === "canada") {
        currentData = canada;
    }
    Plotly.restyle("pie", "values", [currentData]);
    });














    // CREATE THE MAP USING PLOTLY
    // Create the Trace
    var trace = {
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
  