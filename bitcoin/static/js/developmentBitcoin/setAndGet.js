let graphCanvas; // Variable to instance chart graphic
let month = []; // Month to search development
let cbDay = $("#txtDay"); // Field to search development
let cbMonth = $("#txtMonth"); // Field to search development
let cbYear = $("#txtYear"); // Field to search development
let cbQuantity = $("#txtQtty"); // Field to search development
let cvDevGraphic  = $("#DevelopmentBtc"); // Field to show graphic

//Set value in field
function setTxtPriceUpdate(txtValue) {
 return $("#txtPriceUpdate").val( txtValue );
}

//Set value in field
function setTxtOutputPriceUpdate(txtValue) {
 return $("#txtOutputPriceUpdate").val( insertDecimal( txtValue ) );
}

//Set value in field
function setTxtDateUpdate(txtValue) {
 return $("#txtDateUpdate").val(txtValue);
}

//Set value in field
function setTxtVolumeUpdate(txtValue) {
 return $("#txtVolumeUpdate").val(txtValue);
}

//Set value in field
function getTxtPriceUpdate() {
 return $("#txtPriceUpdate").val();
}

//Set value in field
function getTxtOutputPriceUpdate() {
 return $("#txtOutputPriceUpdate").val();
}

//Set value in field
function getTxtDateUpdate() {
 return $("#txtDateUpdate").val();
}

//Set value in field
function getTxtVolumeUpdate() {
 return $("#txtVolumeUpdate").val();
}

//Get value of field
function getTxtDay(){
 return $("#txtDay").val();
}

//Get value of field
function getTxtMonth(){
 return $("#txtMonth").val();
}

//Get value of field
function getTxtYear(){
 return $("#txtYear").val();
}

//Get value of field
function getTxtQuantity(){
 return $("#txtQtty").val();
}

//Get value of field
function getTxtOutputOrPriceUpdate(){
 return ( getTxtOutputPriceUpdate() == "0.00") ?  getTxtPriceUpdate() : getTxtOutputPriceUpdate() ; 
}

//Get month
function getMonth(){
return month = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro" 
 ];
}