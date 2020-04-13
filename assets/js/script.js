//alert (moment().format('hA'));
var eventsArray = [];  
var eventStorageArray = [];
var timeCalender = [];
var parentId_temp = "";
var mainCalenderEl = document.querySelector(".calendar-main");

var eventObject = function(){
    return{
        id : "",
        value : "",
        day : "",
        calendarId : "",
        parentIdElement : "",
    }
};

var calender = function(){
    return{
        id : "",
        time : "",
        am_pm : "",
        timezone : "",
        kformat : ""
    }
};

function populateTime(){
    for (var i=9; i< 24;i++){
        var length = timeCalender.length;
        timeCalender.push(calender());
        timeCalender[length].id = uuidGenerator();
        if (i < 13){
            timeCalender[length].time = i;
            //console.log (i);
        } else {
            timeCalender[length].time = i - 12;
            //console.log (i-12);
        }
        if (i < 12){
            timeCalender[length].am_pm = "AM";
        } else{
            timeCalender[length].am_pm = "PM";
        }
        timeCalender[length].timezone = "";
        timeCalender[length].kformat = i;
        
    }
};



//displayTimeCalender();
function displayTimeCalender(){
    console.log("I am inside displayTIme");
    for (var i=0; i< timeCalender.length;i++){
        console.log("value of i = " + i);
        console.log(timeCalender[i].id);
        console.log(timeCalender[i].time);
        console.log(timeCalender[i].am_pm);
        console.log(timeCalender[i].timezone);
        console.log(timeCalender[i].kformat);
    }
}

//Function to decide Time Lapse.
function decideTimeLapse(kformat){
    if( parseInt(kformat) === parseInt(moment().format('k'))){
        return "bg-danger";
    } else if (parseInt(kformat) < parseInt(moment().format('k'))){
        return "bg-secondary";
    } else if (parseInt(kformat) > parseInt(moment().format('k'))){
        return "bg-success";
    }
}

//create a function to populate calender. 
function populateCalenderHtml (){
    var mainEl = document.querySelector(".calendar-main");
    for (let i=0 ; i < timeCalender.length ; i++){
        var rowEl = document.createElement("div");
        rowEl.className = "row row-" + i;
        mainEl.appendChild(rowEl);
        var firstColEl = document.createElement ("div");
        firstColEl.className = "col-sm-1 border-top border-bottom  text-sm-right  id-first-" + i;
        firstColEl.setAttribute("id","id-first-" + i);
        var middleColEl = document.createElement("div");
        middleColEl.className = "col-sm-10 border bg-success id-middle-" + i;
        middleColEl.setAttribute('id', "id-middle-" + i);
        var thirdColEl = document.createElement ("div");
        thirdColEl.className = "col-sm-1 border rounded-right bg-info align-middle id-last-" + i;
        thirdColEl.setAttribute('id', "id-last-" + i);
       
        var paraFirstEl = document.createElement("p");
        paraFirstEl.className = "para-" + i;
        paraFirstEl.textContent = timeCalender[i].time + timeCalender[i].am_pm;
    
      
        var paraThirdEl = document.createElement("p");
        paraThirdEl.className =  " align-middle text-center event-save-button-" + i;
        paraThirdEl.setAttribute("id","event-savebutton-" + i);
        paraThirdEl.textContent = "💾";

        console.log("value of decideTimeLapsefunction is=" + decideTimeLapse(timeCalender[i].kformat));
        middleColEl.className = "col-sm-10 border " + decideTimeLapse(timeCalender[i].kformat) + " id-middle-" + i;
        
        
        firstColEl.appendChild(paraFirstEl);
        thirdColEl.appendChild(paraThirdEl);
        rowEl.appendChild(firstColEl);  
        rowEl.appendChild(middleColEl);
        createEventContainer("id-middle-" + i);
        rowEl.appendChild(thirdColEl);
    }
}


//Function to populate a header date.
function updateDateInHeader() {
    $("#currentDay").text(moment().format('dddd, MMMM Do YYYY'));
}

//Function to create Calender Rows
function removeCalenderRows (){
    for (var i=1 ; i <= 24 ;i++){
        var calRow = document.querySelector ('.id-'+i);
        calRow.parentNode.removeChild(calRow);
    }
}

//Function to clean up the calender Row.  
function removeDayRow(id) {
    var calRowEl = document.querySelector ("."+id);
    calRowEl.parentNode.removeChild(calRowEl);
};

//Function to add Event. 
function addEvent(event){
    console.log(event.target.id);
    if (event.target.id === 'id-middle-8-row'){
        var parentElement = document.getElementById(event.target.id);
        for (var i=0; i < 2; i++){
            var eventDivColumn = document.createElement("div");
            eventDivColumn.className = "col-1 " + event.target.id + "-column" ;
            parentElement.appendChild(eventDivColumn);

        }
    }
};

//Function to ceate Event Container.
function createEventContainer (id){
    var parentElement = document.getElementById(id);
    var eventEl = document.createElement("div");
    eventEl.className = "event-container " + id + "-eventcontainer";
    eventEl.style.display = "flex";

    eventEl.style.flexWrap = "no-wrap";
    eventEl.style.flexDirection = "column";
    eventEl.style.justifyContent = "space-evenly";
    eventEl.style.alignContent = "flex-start";

    parentElement.appendChild(eventEl);
}


//Function for creating an Event. 
var createEvent = function(eventArrayId) {
    // create elements that make up a task item
    var eventCol = $("<div>").addClass( eventsArray[eventArrayId].parentIdElement + "-column");
    eventCol.css("width","100px");

    eventCol.attr("id",eventsArray[eventArrayId].parentIdElement + "-column")
  
    var eventP = $("<p>").addClass("event event-primary text-white").text(eventsArray[eventArrayId].value);
    eventP.attr("id","id-event");
  
    eventCol.append(eventP);
    
    console.log(eventsArray[eventArrayId].parentIdElement);
    console.dir(eventCol);

    var temp_value = "#" + eventsArray[eventArrayId].parentIdElement;
    $(temp_value).append(eventCol);
    console.dir(eventsArray[eventArrayId].parentIdElement);
  };

//Function to save task to local storage. 
var saveTasks = function(parentElementId) {
    var fetchRowId = parentElementId.split("-");
    var middleRowID = "id-middle-" + fetchRowId[2];
    var tempstorage_value;
    for (var i =0; i < eventsArray.length; i++){
        if (eventsArray[i].parentIdElement == middleRowID){
            if (eventStorageArray.length != 0){
                var result_match = 0;
                for (var j=0; j < eventStorageArray.length ;j++){
                    if (eventStorageArray[j].id == eventsArray[i].id){
                        eventStorageArray[j].id = eventsArray[i].id;
                        eventStorageArray[j].value = eventsArray[i].value;
                        eventStorageArray[j].day = eventsArray[i].day;
                        eventStorageArray[j].calendarId = eventsArray[i].calendarId;
                        eventStorageArray[j].parentIdElement = eventsArray[i].parentIdElement;
                        result_match ++;
                    } 
                }
                if (result_match == 0){
                    var storageLength = eventStorageArray.length;
                    eventStorageArray.push(eventObject());
                    eventStorageArray[storageLength].id = eventsArray[i].id;
                    eventStorageArray[storageLength].value = eventsArray[i].value;
                    eventStorageArray[storageLength].day = eventsArray[i].day;
                    eventStorageArray[storageLength].calendarId = eventsArray[i].calendarId;
                    eventStorageArray[storageLength].parentIdElement = eventsArray[i].parentIdElement;
                }
            }else {
                    var storageLength = eventStorageArray.length;
                    eventStorageArray.push(eventObject());
                    eventStorageArray[storageLength].id = eventsArray[i].id;
                    eventStorageArray[storageLength].value = eventsArray[i].value;
                    eventStorageArray[storageLength].day = eventsArray[i].day;
                    eventStorageArray[storageLength].calendarId = eventsArray[i].calendarId;
                    eventStorageArray[storageLength].parentIdElement = eventsArray[i].parentIdElement;
            }
        }
    }
    if (eventStorageArray != null){
        for (var i =0; i < eventStorageArray.length; i++){
            console.log(eventStorageArray[i]);
        }
        storeObjectToLocalStorage("CalenderKey", eventStorageArray);
    }
    else {
        console.log ("eventStorageArray Array is null hence not storing anything in local storage. ")
    }
  };


 
  function populateEventsArrayfromLocalStorage (){
      if (readLocalStorageKeyConvertToObject("CalenderKey") != null){
        eventStorageArray = readLocalStorageKeyConvertToObject("CalenderKey");
      }

        if (eventStorageArray.length !=0){
            for (var i=0; i < eventStorageArray.length;i++){
                var eventLength = eventsArray.length;
                eventsArray.push(eventObject());
                eventsArray[eventLength].id = eventStorageArray[i].id;
                eventsArray[eventLength].value = eventStorageArray[i].value;
                eventsArray[eventLength].day = eventStorageArray[i].day;
                eventsArray[eventLength].calendarId = eventStorageArray[i].calendarId;
                eventsArray[eventLength].parentIdElement = eventStorageArray[i].parentIdElement;
                if (eventsArray[eventLength].day == moment().format('dddd, MMMM Do YYYY')){
                    createEvent(eventLength);
                }
                
            }
        }

}

/*var updateEvent = function(eventArrayId, event) {
    $(".modal").modal('show');
    $("#modalEventDescription").trigger("focus");
    // create elements that make up a task item
    var eventCol = $("<div>").addClass( eventsArray[eventArrayId].parentIdElement + "-column");
    eventCol.css("width","100px");
    //eventCol.css("display","inline");
    eventCol.attr("id",eventsArray[eventArrayId].parentIdElement + "-column")
  
    var eventP = $("<p>").addClass("event event-primary text-white").text(eventsArray[eventArrayId].value);
    eventP.attr("id","id-event");
  
    //var taskP = $("<p>").addClass("m-1").text(taskText);
  
    // append span and p element to parent li
    eventCol.append(eventP);
    
    console.log(eventsArray[eventArrayId].parentIdElement);
    console.dir(eventCol);
    // append to row list on the page
    //$(parentid).append(eventCol);
    var temp_value = "#" + eventsArray[eventArrayId].parentIdElement;
    $(temp_value).append(eventCol);
    console.dir(eventsArray[eventArrayId].parentIdElement);
  };*/

populateTime();
populateCalenderHtml();
updateDateInHeader();
populateEventsArrayfromLocalStorage();


$("main").on("click",function(event){
    //alert( "Handler for .click() called" );
    console.log(event.target.id);
    parentId_temp = event.target.id;
    var splitString = parentId_temp.split("-");

    console.log(timeCalender[splitString[2]].kformat);
    if (timeCalender[splitString[2]].kformat < parseInt(moment().format('k'))){
        window.alert(" Time has elapsed to create new event for this hour.");
    } else{
        if (parentId_temp.includes("id-middle"))
        {
            $(".modal").modal('show');
            $("#modalEventDescription").trigger("focus");
        } 
    }
    if (parentId_temp.includes("id-last") || parentId_temp.includes("event-savebutton")){
            saveTasks(parentId_temp);
    } 
    
    /*if (parentId_temp.includes("id-event")){
        console.log("I am inside Id-event");   
    }*/
});



$("#task-form-modal .btn-close").click(function(event) {
    // get form values
    $("#modalEventDescription").val("");
    $("#task-form-modal").modal("hide");
  });

// save button in modal was clicked
$("#task-form-modal .btn-save").click(function(event) {
    // get form values
    var eventText = $("#modalEventDescription").val().trim();
    var rowId = parentId_temp.split("-");
    var eventLength = eventsArray.length;
    eventsArray.push(eventObject());
    eventsArray[eventLength].id = uuidGenerator();
    eventsArray[eventLength].value = eventText;
    eventsArray[eventLength].day = moment().format('dddd, MMMM Do YYYY');
    eventsArray[eventLength].calendarId = timeCalender[parseInt(rowId[rowId.length-1])].id;
    eventsArray[eventLength].parentIdElement = parentId_temp;

    if (eventsArray.length !== 0 ) {
        createEvent(eventLength);
  
      $("#modalEventDescription").val("");
      $("#task-form-modal").modal("hide");
    }
  });



