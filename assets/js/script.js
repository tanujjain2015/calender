

console.log (moment());

//Function to populate a header date.
function updateDateInHeader() {
    $("#currentDay").text(moment());
}

//create a function to populate calender. 
function dayrows (){
    var mainEl = document.querySelector(".calendar-main");
    let j = 9;
    for (var i=1 ; i <= 9 ;i++){
        var rowEl = document.createElement("div");
        rowEl.className = "row row-" + i;
        mainEl.appendChild(rowEl);
        var firstColEl = document.createElement ("div");
        firstColEl.className = "col-sm-1 border-top border-bottom  text-sm-right  id-first-" + i;
        var middleColEl = document.createElement("div");
        middleColEl.className = "col-sm-10 border bg-success id-middle-" + i;
        var thirdColEl = document.createElement ("div");
        thirdColEl.className = "col-sm-1 border rounded-right bg-info align-content-center id-last-" + i;
        var paraFirstEl = document.createElement("p");
        paraFirstEl.className = "para-" + i;
    
        var paraThirdEl = document.createElement("span");
        paraThirdEl.className = "oi oi-file button-" + i

        //var paraThirdSpanEl = document.createElement("span");
        //paraThparaThirdSpanElirdEl.className = "oi oi-file";
        //paraThirdEl.appendChild(paraThparaThirdSpanElirdEl);
        if (i < 4){
            paraFirstEl.textContent = j + "AM";
            j++;
        } else {
            if (i == 4){
                paraFirstEl.textContent = j + "PM";
            }else {
                paraFirstEl.textContent = (i -4) + "PM";
            }
        }
        //paraSecondEl.textContent = "Dummy Content";
        //paraThirdEl.textContent = "Sa";
        firstColEl.appendChild(paraFirstEl);
        //middleColEl.appendChild(paraSecondEl);
        thirdColEl.appendChild(paraThirdEl);
        rowEl.append(firstColEl);
        rowEl.append(middleColEl);
        rowEl.append(thirdColEl);
    }
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

dayrows();
updateDateInHeader();
//removeDayRow("id-1");
//removeCalenderRows();