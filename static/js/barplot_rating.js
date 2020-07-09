//READ THE CSV FILE THAT HAS THE REVIEW RATING INFO

function barplot() {
    d3.json('/listing_rating_count').then((data) => {
        
        console.log(data);   

        var filteredArray = data.filter(row => row.review_score_group === "4-5 star");
        console.log(filteredArray);
        // //console.log(Object.entries(filteredArray));
        var sortedArray = sortobject(filteredArray);
        console.log(sortedArray);
        var reversedArray = sortedArray.reverse();
        console.log(reversedArray);


        
        // Store the x axis values, y axis values, text labels needed for the bar plot

        x_bar = reversedArray.map((row) => row[1]['review_scores_rating']);
        y_bar = reversedArray.map((row) => 'z' + row[1]['zipcode']);
        // //text_labels = reversedArray.map((row) => row[1]['review_scores_rating']);

        var trace ={
            x: x_bar,
            y: y_bar,
            //text: text_labels,
            type:"bar",
            orientation:'h'
            
            
        }
    
        var data =[trace];
    
        var layout = {
            title : 'Top Rated Neighbourhoods based on Ratings',
            xaxis :{
                title:'Listings'
            },
            yaxis : {
                title:'Neighbourhood'
            }
        }
        
        Plotly.newPlot("bar_rating",data,layout);
        
    });

}

barplot()


function sortobject(object)
{
    return Object.entries(object).sort((a,b) => b[1]['review_scores_rating'] - a[1]['review_scores_rating'])
}
        
        
        


        

    

