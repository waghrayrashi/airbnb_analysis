
// DATA SOURCE
// Load data from listings_details.csv
var listings = d3.csv("static/data/rw_listings.csv").then(function(d) {
    // Confirm that the listings data was read accurately
    console.log(d);
    // From the listings object, prepare individual arrays for: listing IDs, latitudes, longitudes, ratings, prices and property types
    var listingIds = d.map((listing) => listing.id);
    var listingLatitudes = d.map((listing) => listing.latitude);
    var listingLongitudes = d.map((listing) => listing.longitude);
    var listingRatings = d.map((listing) => listing.review_scores_rating);
    var listingPropertyTypes = d.map((listing) => listing.property_type);
    var listingPrices = d.map((listing) => listing.price);
    // Confirm that the arrays have the data as expected
    console.log(listingIds);
    console.log(listingRatings);

    // Initially set filterData equal to dataSet
var filterData = data;

// Define the table body
var tbody = d3.select("tbody");

//Code for what happens when filter button is clicked
var filterEntries = d3.select("#filter-btn");
filterEntries.on("click", function() {
    
  // Prevent the page from refreshing
  d3.event.preventDefault();
    
  // Select the input element and get the raw HTML node
  var datetimeElement = d3.select("#datetime");
  var citynameElement = d3.select("#cityname");
  var statenameElement = d3.select("#statename");
  var countrynameElement = d3.select("#countryname");
  var shapenameElement = d3.select("#shapename");
    
  // Get the value property of the input elements
  var datetimeValue = datetimeElement.property("value");
  var citynameValue = citynameElement.property("value").toLowerCase().trim();
  var statenameValue = statenameElement.property("value").toLowerCase().trim();
  var countrynameValue = countrynameElement.property("value").toLowerCase().trim();    
  var shapenameValue = shapenameElement.property("value").toLowerCase().trim();

//  Create if statements for multiple filters
  if (datetimeValue != "") {
      filterData = filterData.filter(entry => entry.datetime === datetimeValue);
  }
  if (citynameValue != "") {
       filterData = filterData.filter(entry => entry.city === citynameValue);     
  }
  if (statenameValue != "") {
       filterData = filterData.filter(entry => entry.state === statenameValue);     
  }
  if (countrynameValue != "") {
       filterData = filterData.filter(entry => entry.country === countrynameValue);     
  }
  if (shapenameValue != "") {
       filterData = filterData.filter(entry => entry.shape === shapenameValue);     
  }  
  console.log(filterData);    
  renderTable();
});

//Make it so that the clear button refreshes the page to reset everything
var clearEntries = d3.select("#clear-btn");
clearEntries.on("click", function() {
  location.reload();
});

// Run renderTable function so that the table initially shows up
renderTable();

//Create loop through all data to show everything in the filtered dataset
function renderTable(){
    $("#tbodyid").empty();
    console.log(filterData);
    filterData.forEach(function(ufoSightings) {
        console.log(ufoSightings);
        var row = tbody.append("tr");
        Object.entries(ufoSightings).forEach(function([key,value]) {
            console.log(key,value);
            var cell = tbody.append("td");
            cell.text(value);
        });
    });
}