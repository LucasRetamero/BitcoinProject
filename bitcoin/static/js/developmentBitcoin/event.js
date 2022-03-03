
//Validation and case not empty call function to update data from database
$("#btnActionUpdateDevBtc").on("click", function(){
 if( valFormOfUpdateModel() ){ setUpdateListDevBtc( fmtChangeFormatDate(1, getTxtDateUpdate(), "DD-MM-YYYY", ), getTxtOutputOrPriceUpdate(), getTxtVolumeUpdate() ); showMsgOnInfoModel(1); } 
 else { showMsgOnInfoModel(2) }
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

