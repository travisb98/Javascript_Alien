// from data.js
/////probably need to replace every use of "data" with tableData
var tableData = data;

//from html_codes.js
var htmlcodes = codes;

console.log(htmlcodes);

// defines button
var button = d3.select("#filter-btn");

//defines form

var form =d3.select("form");


//defines the body of the table
var tbody = d3.select("tbody");


//handles the for submission and filter button clicks
button.on("click",dataload);
form.on("submit",dataload);




//creates a list of the unique dates in the data set
var uDates=[]

for (let i=0;i<data.length;i++){    
    if(!uDates.includes(data[i].datetime)){
        uDates.push(data[i].datetime)
    }
};
// console.log(uDates)


//// create a function that cleans the data




/// create a function that accepts input and loads the data based on that date
function dataload(){


    // Prevent the page from refreshing(i think this will be needed when we implement the form)
    d3.event.preventDefault();


    //create the input object
    var input = d3.select("#datetime");
    
    // grab the value from the input object
    var input_value=input.property('value');



    // create if statement to deal with blank input
    //create if statement to deal with dates out of range
    ////// find the oldest and youngest date in data, if the input is out of this range, return an alert message and exit the function
    ///// just realized the data for "durationMinutes" and "comments" is inconsistent and contains encoding issues, need to clean



    ////// replacing leading zeros from the month and day so the input is consistent
    //replaces leading zero from month
    input_value=input_value.replace(/\/0+/g, '/');

    //replaces leading zero in date if it starts with a zero
    if(input_value[0]==0){
        input_value=input_value.slice(1,input_value.length)
    };


    // filter the data based on the input
    var reqdata = data.filter(record => record.datetime==input_value);


    /// loop through each record from the requested data

    reqdata.forEach(result => {

        //creates a new row
        var row = tbody.append("tr");


        row.append("td").text(result.datetime);
        row.append("td").text(result.city);
        row.append("td").text(result.state);
        row.append("td").text(result.country);
        row.append("td").text(result.shape);
        row.append("td").text(result.durationMinutes);
        row.append("td").text(result.comments);

    });

    //console logs for testing
    console.log("Running dataload function")
    console.log(reqdata);
    console.log("-------------");
    console.log(input_value);
    console.log(input_value[0])

    // console.log(input);
};

