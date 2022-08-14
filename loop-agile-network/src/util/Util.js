//Util File for all common Utility Functions required

//Check the given date is a past or a future date
function isFutureDate(date){
    const today = new Date();
    date = Date.parse(date);
    return date > today;
}

//Return Today's date in "DD/MM/YYYY" format as a String
function getDateToday(){
    return  new Date(Date.now()).toLocaleString().split(',')[0];
}


// Export functions as can be used in other pages.
export {
    isFutureDate,
    getDateToday
}