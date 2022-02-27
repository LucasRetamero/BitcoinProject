//Change output date
function fmtChangeFormatDate(option, txtValue, formatValue){
  var dateConvert = moment(txtValue, formatValue).toDate();
  var d = new Date(dateConvert);
  var dateFormatOutput;
  
   switch(option){
    case 1: // YYYY-MM-DD
	 dateFormatOutput =  d.getFullYear()+"-"+("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
    break;
	}  
	 
  return dateFormatOutput;
}

//Validation: replace and remove point of input
function fmtRemovePoint(txtValue){
 return txtValue.replace(/[^0-9.]/g, '').replaceAll('.','').slice(0,12); 
}

//Validation: Replace to only 2 number after point
function insertDecimal(num) {
   return (num / 100).toFixed(2);
}

//Format: Convert text to date and return the date 
function fmtTextToFormatDate(txtDate, formatTxtDate, outFormatedDate){
 var d = new Date( moment( txtDate, formatTxtDate ).toDate() );
 var formatedDate;
 
  switch(outFormatedDate){
   case 1: //YYYY-MM-DD
    formatedDate = d.getFullYear()+"-"+("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
   break;
  }
 return formatedDate;
}

//Remove an element
function rmElement(idElement){
 if(document.getElementById(idElement) != null){ return document.getElementById(idElement).remove(); }
}


//Convert timestamp to date and  return the date
function convertTimestampToDate(ts, option){
 let tsToConvert = new Date(ts * 1000);
 let dateToShow = "";
  
  switch(option){
   case 1: // DD/MM/YYYY
    dateToShow = ("0" + tsToConvert.getDate()).slice(-2)+"/"+("0" + (tsToConvert.getMonth() + 1)).slice(-2) + "/" + tsToConvert.getFullYear();
   break;
  }
 
  return dateToShow;
}