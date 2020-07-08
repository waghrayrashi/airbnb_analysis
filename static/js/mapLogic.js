//creating basic leaflet map
var mymap = L.map('map').setView([35.5951, -82.5515], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(mymap)

var layerGroup = L.layerGroup().addTo(mymap);

function createMarker(neighbour){
  d3.csv("static/data/map_details.csv").then((data)=>{
    // Loop through the data array and create one marker for each listing, bind a popup containing its name and review add it to the map
    console.log(data);
    //console.log(`Hello`)
    
    for (var i = 0; i < data.length; i++) {
      if(neighbour===data[i].zipcode){
        var listing = data[i];

        if((listing.review_scores_rating/20)==5){
          color = "green"
        }else{
          color = "red"
        }

        L.circle([listing.latitude,listing.longitude],{
          radius: 100,
          color: color
        }).bindPopup("<h5>" + listing.name + "</h5><hr><h6>Review: "+listing.review_scores_rating/20+ "<hr><h6>Host: "+listing.host_name +"</h6>"+"<hr><h6>Price/Night: "+listing.price +"</h6>"+ "<hr><h6>Available: " + listing.room_type + "</h6>"+"<hr><h6>Location: " + listing.city + "</h6>")
        .addTo(layerGroup);
      }
    }
  });
}
  
// Creating function for change in the event
function optionChanged(neighbour){
  layerGroup.clearLayers();
  createMarker(neighbour);
}

// Creating function for initial data rendering via dropdown
function init(){
  
  // select dropdown menu
  var dropdown =  d3.select('#zipCode');
  
  //read the data
  d3.csv("static/data/zipcode.csv").then((data1)=>{
    console.log(data1)
    //get the zip data to the dropdown menu
    
    for(j=0;j<data1.length;j++){
      var area = data1[j].neighbourhood
      dropdown.append("option").text(area).property("value");
    };  
  });
};
init()