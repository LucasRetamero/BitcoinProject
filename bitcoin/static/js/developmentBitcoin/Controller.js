var graphCanvas =  null;
var cvDevGraphic = $("#DevelopmentBtc");
var month = []; // Month to search development
var cbDay = $("#txtDay"); // Field to search development
var cbMonth = $("#txtMonth"); // Field to search development
var cbYear = $("#txtYear"); // Field to search development
var cbQuantity = $("#txtQtty"); // Field to search development

//Set and Get: cbDay
 function getCbDay(){
   return this.cbDay;
 }
 
//Set and Get: GraphCanvas
 function setGraphCanvas(newValue){
  this.graphCanvas = newValue;	
 }

 function getGraphCanvas(){
  return this.graphCanvas;	
 }
 
 //Destoyer graphic to build other new graphic
 function destoyerGraphCanvas(){
  if(getGraphCanvas() != null){ return getGraphCanvas().destroy(); }
 }      
	
 //Set and Get: CvDevGraphic	
 function getCvDevGraphic(){
  return this.cvDevGraphic;
 }
 
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
