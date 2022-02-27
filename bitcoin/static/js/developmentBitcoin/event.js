//Show modal asking to save all data and create button to save
$("#btnSaveAllDevelopment").on("click", function(){
 $('#askSaveAllModel').modal('show');
});

//Call function to check development bitcoin from api
$("#btnCheckDevPrice").on("click", function(){
 if( valFormOfSearchDevPrice() ){ getListDevBtc(getTxtQuantity(), getTxtDay()+"/"+getTxtMonth()+"/"+getTxtYear()); }
 else{ showMsgOnSearchDevPrice(2); }
});

//Validation and case not empty call function to update data from database
$("#btnActionUpdateDevBtc").on("click", function(){
 if( valFormOfUpdateModel() ){ setUpdateListDevBtc( fmtChangeFormatDate(1, getTxtDateUpdate(), "DD-MM-YYYY", ), getTxtOutputOrPriceUpdate(), getTxtVolumeUpdate() ); showMsgOnInfoModel(1); } 
 else { showMsgOnInfoModel(2) }
});

//Call function to save one data from api
$(document).on('click', '.btnSaveOneDevelopment', function(){
 var row = $(this).closest("tr");    // Find the row
 setSaveListDevBtc( fmtTextToFormatDate( row.find(".getDateToSave").text(), "DD/MM/YYYY", 1 ), row.find(".getCloseToSave").text(), row.find(".getVolumeToSave").text() );
});

//Call function asking to remove data from database
$(document).on('click', '.btnRemoveDevBtc', function(){
 $("#askRemoveAllModel").modal("show");
 var row = $(this).closest("tr");    // Find the row
 $("#lblDataToRemove").text(row.find(".txtDateToUpdate").text());
});

//Call function to remove from database
$("#btnRemoveFromDB").on("click", function(){
  setRemoveDateDevBtc( fmtTextToFormatDate( $("#lblDataToRemove").text(), "DD-MM-YYYY", 1 ) );
});

//Call function to save all data from api
$(document).on('click', '#btnSaveAllDataToDB',function(){
  setSaveAllListDevBtc(getTxtQuantity(), getTxtDay()+"/"+getTxtMonth()+"/"+getTxtYear());
});

//Add values on form from modal to update data
$(document).on('click', '.btnUpdateDevBtc', function(){ 
  var row = $(this).closest("tr");
   setTxtDateUpdate(row.find(".txtDateToUpdate").text());
   setTxtPriceUpdate(row.find(".txtCloseToUpdate").text());
   setTxtVolumeUpdate(row.find(".txtVolumeToUpdate").text());  
   setTxtOutputPriceUpdate("");
 $("#msgOutputUpdSuccess").css({'display':'none'});
 $("#msgOutputUpdError").css({'display':'none'});   
 $('#infomationModelToUpdate').modal('show');
 
});

//Format input in txtPriceUpdate and send to txtOutputPriceUpdate
$("#txtPriceUpdate").on("keyup",function() {
    setTxtPriceUpdate( fmtRemovePoint( getTxtPriceUpdate() ) );
    setTxtOutputPriceUpdate( getTxtPriceUpdate() );
});

//Load functions after done page
$(document).ready(function(){
setValuesToSearchDev(1);
});