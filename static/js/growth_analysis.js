var year = [];
var valueCount =[];

function readData(){
    d3.csv('static/data/listings_details.csv').then((data) => {
        //console.log(data);
        var hostSince = data.map(row => row.host_since);
        //console.log(hostSince);
        sorted = hostSince.sort();
        //console.log(sorted);
        // splitArray = sorted.split("-",1);
        // console.log(splitArray);
        // sorted.forEach((object) => {
        //   console.log(object.split("-",1));
        // });
        var splitArray =[];
        var yearDict = {};
        
        for(var i=0;i<sorted.length;i++)
        {
           var splitValue = sorted[i].split("-",1);
           splitArray.push(splitValue);
        }
        console.log(splitArray);

        for (var i=0; i<splitArray.length; i++)
        {
            var currentYear = splitArray[i];

            if (currentYear in yearDict)
            {
                yearDict[currentYear] += 1;
            }
            else
            {
                yearDict[currentYear] = 1;

            }

            
        }
        console.log(yearDict);
        console.log(Object.entries(yearDict));
        Object.entries(yearDict).forEach(function([key,value]){
            year.push(key);
            valueCount.push(value);
        });

        console.log(year);
        console.log(valueCount);
    

        var trace ={
            x: year,
            y: valueCount,
            //text: valueCount,
            type:'scatter'
        }

        data =[trace];

        layout = {
            title : 'Growth of Airbnb in Asheville',
                xaxis :{
                    title:'Year'
                },
                yaxis : {
                    title:'New listings'
                }
        }

        Plotly.newPlot(growth_analysis,data,layout);
    });

}

readData();
