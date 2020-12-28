// from data.js
/////probably need to replace every use of "data" with tableData
// var data = data;
var tableData = data;

//from html_codes.js
//need to create a functiontion that uses this dictionary to clean the data 
var code_dict = codes;


// defines the filter button
var filt_button = d3.select("#filter-btn");

//defines form

var form =d3.select("form");


//defines the body of the table
var tbody = d3.select("tbody");


//handles the for submission and filter button clicks
filt_button.on("click",dateload);
form.on("submit",dateload);


//creates a list of the unique dates in the data set
var uDates=[];

for (let i=0;i<data.length;i++){    
    if(!uDates.includes(data[i].datetime)){
        uDates.push(data[i].datetime)
    }
};


//function that will be used to append data to rows
/// loop through each record from the requested data and create table data for each column from our data set
function append_row_data(current_data){
    current_data.forEach(result => {

        //creates a new row
        var row = tbody.append("tr");
    
        // adds a row for each property in the data
        row.append("td").text(result.datetime);
        row.append("td").text(result.city);
        row.append("td").text(result.state);
        row.append("td").text(result.country);
        row.append("td").text(result.shape);
        row.append("td").text(result.durationMinutes);
        row.append("td").text(result.comments);
    });

};


//// create a function that cleans the data using the html code dictionary




/// create a function that accepts input and loads the data based on that date
function dateload(){

    // Prevent the page from refreshing(i think this will be needed when we implement the form)
    d3.event.preventDefault();

    //create the input object
    var input = d3.select("#datetime");
    
    // grab the value from the input object
    var input_value=input.property('value');

    //replaces leading zero from month
    input_value=input_value.replace(/\/0+/g, '/');

    //replaces leading zero in date if it starts with a zero
    if(input_value[0]==0){
        input_value=input_value.slice(1,input_value.length)
    };

    // if the input is not included in our list of unique dates....
    if (!uDates.includes(input_value)){

        // if there was no input at all.....
        if (input_value==""){
            alert("input was blank, returning all data");
            
            // fill the table with all the data, no filter applied
            append_row_data(data);
        }
        // ... the input entered was not blank or in the dataset
        else{
            ////////// this could be displayed better
            alert(`There is no data for the date you entered. Please use one of the following dates
            ${uDates}`)            
        };
    }
    /// since the input entered was valid....
    else{
        // filter the data based on the input
        var reqdata = data.filter(record => record.datetime==input_value);

        /// loop through each record from the requested data and create table data for each column from our data set
        append_row_data(reqdata);
    };

    //console logs for testing
    console.log("Running dateload function");
    console.log("-------------");
// end of dateload function 
};






////////////////////////////////////////////////////////////////////////////////////////////////////

// console.log(Object.keys(data[0]));

// ///this just prints out each key
// Object.keys(data[0]).forEach(x => {
//     console.log(x);
// });
