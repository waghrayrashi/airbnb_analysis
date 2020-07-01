// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};
// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("top5")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

 // Load data from top5neighbourhoods_by_price.csv
 d3.csv("static/data/top5neighbourhoods_by_price.csv").then(function(d) {
    // console.log(d);
    var neighbourhoods = d.map((item) => item.Neighbourhood);
    var listings = d.map((item) => item.Listings);
    var avgPrices = d.map((item) => item.AvgPrice);
    var avgRatings = d.map((item) => item.AvgRating);
    

  var barSpacing = 10; // desired space between each bar
  var scaleY = 10; // 10x scale on rect height

  // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
  var barWidth = (chartWidth - (barSpacing * (d.length - 1))) / d.length;

  // Create code to build the bar chart for the top5 neighbourhoods.
  chartGroup.selectAll(".bar")
    .data(d)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", d => barWidth)
    .attr("height", d => d.Listings * scaleY)
    .attr("x", (d, i) => i * (barWidth + barSpacing))
    .attr("y", d => chartHeight - d.Listings * scaleY);
}).catch(function(error) {
  console.log(error);
});
