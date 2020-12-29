// from data.js
/////probably need to replace every use of "data" with "tableData"
// var data = data;
var tableData = data;

//from html_codes.js
//need to create a functiontion that uses this dictionary to clean the data in comments section
var code_dict = codes;

// defines the filter button
var filt_button = d3.select("#filter-btn");

//defines form
var form =d3.select("form");

//defines the body of the table
var tbody = d3.select("tbody");


//handles the for submission and filter button clicks
filt_button.on("click",dataload);
form.on("submit",dataload);



// creates a list of unique shapes in the data set
var uShapes=[];

/// function for unique list generation
function create_unique_list(field){
    var unique_list=[];
    for (let i=0;i<data.length;i++){    
        if(!unique_list.includes(data[i][field])){
            unique_list.push(data[i][field])
        }
    };
    return unique_list;
};

// creates unique lists for the dates, cities, and shapes
var uDates = create_unique_list("datetime");
var uCities= create_unique_list("city").sort();
var uShapes=create_unique_list("shape").sort();


/////// add  the lists of unique cities and unique shapes to the form
//defines the city portion of the form
var cityForm = d3.select("#cityform");

//adds each city as  an option on the form
uCities.forEach(newcity => {
    cityForm.append("option").text(newcity);
});


///// this code is repetative and i think I could simplify it by creating a function
//deifines the shape portion on the form
var shapeForm = d3.select("#shapeform");

//adds all the unique shapes to the form
uShapes.forEach(newshape => {
    shapeForm.append("option").text(newshape);
});








//function that will be used to append data to rows
/// loop through each record from the requested data and create table data for each column from our data set
function append_row_data(current_data){

    //removes the table's rows if they're present, resetting the  table
    tbody.html("");

    /// for each result in the data we'll be adding to the table.....
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





function noDateLoad(civ,siv){
    ////// to be used in the dataload function when no date is provided
    ///if all was selected for the shape or city......
    if(civ == "All" || siv=="All"){
        console.log("city OR shape had all selected");


        ///// if both alls were selected....
        if(civ == "All" && siv=="All"){
            ////only filter on the date
            console.log("both options were all");
            var reqdata = data;
        };


        //// if the city input was not "All"
        if (civ!="All"){
            //// only filter on the date and city
            console.log("for city, all was not selected");
            var reqdata = data.filter(record => record.city==civ);

        };
        /// if the shape input was not "all"
        if (siv!="All"){
            //filter on the date and shape
            console.log(" for city, all was selected");
            var reqdata = data.filter(record => record.shape==siv);
        };

    }
    else{
        console.log("all was not selected for either option");
        var reqdata = data.filter(record => record.city==civ && record.shape==siv);


    ///end form selection handling nested-if
    };
    append_row_data(reqdata);
};






/// main function that loads the table once the button is clicked or the form is submitted
function dataload(){

    // Prevent the page from refreshing(i think this will be needed when we implement the form)
    d3.event.preventDefault();

    //create the date input object
    var date_input = d3.select("#datetime");
    
    // grab the value from the input object
    var date_input_value=date_input.property('value');


    ///////////gettting form data for the city and state
    /// these are repetative, i could make a function to reduce
    //get the city that was selected on the form
    var city_input=document.getElementById('cityform');
    var city_input_value=city_input.options[city_input.selectedIndex].value;


    // get the state that was selected on the form
    var shape_input=document.getElementById('shapeform');
    var shape_input_value=shape_input.options[shape_input.selectedIndex].value;


    

    ////cleaning the date input
    ///////////
    //replaces leading zero from month
    date_input_value=date_input_value.replace(/\/0+/g, '/');

    //replaces leading zero in date if it starts with a zero
    if(date_input_value[0]==0){
        date_input_value=date_input_value.slice(1,date_input_value.length)
    };
    //// end cleaning the date input
    ///////////



    // if the date input is not included in our list of unique dates....
    if (!uDates.includes(date_input_value)){

        // if there was no input at all.....
        if (date_input_value==""){
            alert("input was blank");
            noDateLoad(city_input_value,shape_input_value);
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


        ////// big nested if statement to deal with all potential selections, could this be done more easily
        ///if all was selected for the shape or city......
        if(city_input_value == "All" || shape_input_value=="All"){
            console.log("city OR shape had all selected");


            ///// if both alls were selected....
            if(city_input_value == "All" && shape_input_value=="All"){
                ////only filter on the date
                console.log("both options were all");
                var reqdata = data.filter(record => record.datetime==date_input_value);
            };


            //// if the city input was not "All"
            if (city_input_value!="All"){
                //// only filter on the date and city
                console.log("for city, all was not selected");
                var reqdata = data.filter(record => record.datetime==date_input_value && record.city==city_input_value);

            };
            /// if the shape input was not "all"
            if (shape_input_value!="All"){
                //filter on the date and shape
                console.log(" for city, all was selected");
                var reqdata = data.filter(record => record.datetime==date_input_value && record.shape==shape_input_value);
            };

        }
        else{
            console.log("all was not selected for either option");
            var reqdata = data.filter(record => record.datetime==date_input_value && record.city==city_input_value && record.shape==shape_input_value);


        ///end form selection handling nested-if
        };

        /// loop through each record from the requested data and create table data for each column from our data set
        append_row_data(reqdata);
        console.log("row were appended")
    };

    //console logs for testing
    // console.log("Running dataload function");
    console.log("-------------");
// end of dataload function 
};














////// INitial draft of dataload function, rewriting it to inlude all options on form
////////////////////////////////////////////////////////////////////////////////////////////////////
// /// main function that loads the table once the button is clicked or the form is submitted
// function dataload(){

//     // Prevent the page from refreshing(i think this will be needed when we implement the form)
//     d3.event.preventDefault();

//     //create the date input object
//     var date_input = d3.select("#datetime");
    
//     // grab the value from the input object
//     var date_input_value=date_input.property('value');

//     //replaces leading zero from month
//     date_input_value=date_input_value.replace(/\/0+/g, '/');

//     //replaces leading zero in date if it starts with a zero
//     if(date_input_value[0]==0){
//         date_input_value=date_input_value.slice(1,date_input_value.length)
//     };

//     // if the input is not included in our list of unique dates....
//     if (!uDates.includes(date_input_value)){

//         // if there was no input at all.....
//         if (input_value==""){
//             alert("input was blank, returning all data");
            
//             // fill the table with all the data, no filter applied
//             append_row_data(data);
//         }
//         // ... the input entered was not blank or in the dataset
//         else{
//             ////////// this could be displayed better
//             alert(`There is no data for the date you entered. Please use one of the following dates
//             ${uDates}`)            
//         };
//     }
//     /// since the input entered was valid....
//     else{
//         // filter the data based on the input
//         var reqdata = data.filter(record => record.datetime==date_input_value);

//         /// loop through each record from the requested data and create table data for each column from our data set
//         append_row_data(reqdata);
//     };

//     //console logs for testing
//     console.log("Running dataload function");
//     console.log("-------------");
// // end of dataload function 
// };

