//Configuration of Chart Graphic 
var GraphicConfiguration = {
  graphCanvas: null,
  cvDevGraphic: $('#DevelopmentBtc'),
   styleOfData: function(date, close, volume){
    return {
          labels: JSON.parse(date),
          datasets: [
		  {
		    label: ' Fechamento do Bitcoin',
            data: JSON.parse(close),
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#007bff',
            borderWidth: 4,
            pointBackgroundColor: '#007bff'
          },
		  {
		    label: ' Volume do Bitcoin',
            data: JSON.parse(volume),
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#ff1a1a',
            borderWidth: 4,
            pointBackgroundColor: '#ff1a1a'
          },
		  ]
        } 	
 },
  createGraphic: function(date, close, volume){
   return new Chart( this.cvDevGraphic, {
    type: 'line',
    data: this.styleOfData(date, close, volume),
    options: {
    legend: {
     display: false,
      }
     }
    });		
 },
  destroyerGraphic: function(){
   if(this.graphCanvas != null){ return this.graphCanvas.destroy(); }	 
 },
  showGraphic: function(date, close, volume){
   this.destroyerGraphic();
   this.graphCanvas = this.createGraphic(date, close, volume);		
 }
 
};

//Configuration of crud to update graphic after others crud
var CrudDevelopmentBitcoinGraphic = {
   dataToUpdateGraphAjax: function(){
    $.ajax({
        url: $("#DevelopmentBtc").data('url'),
		data: {},
        dataType: 'json',
        type: 'get',
        cache:false,
        success: function(data){
            //console.log(data);
            GraphicConfiguration.showGraphic( data.date, data.close, data.volume );
        },
        error: function(d){
            /*console.log("error");*/
            alert("404. Please wait load from api.");
        }
    });
   }
};

var CrudDevelopmentBitcoinDb = {
  txtDateUpdate: $("#txtDateUpdate"),
  txtPriceUpdate: $("#txtPriceUpdate"),
  txtVolumeUpdate: $("#txtVolumeUpdate"),
  txtOutputPriceUpdate: $("#txtOutputPriceUpdate"),
  divErrorMsg: $("#msgOutputUpdError"),
  divSuccessMsg: $("#msgOutputUpdSuccess"),
  allField: [],
  pointsField: 0,
  x:0,
   errorMsg: function(){
    this.divSuccessMsg.css({'display':'none'});
    this.divErrorMsg.css({'display':'block'});
    (this.txtPriceUpdate.val() == "") ? $(".emptyPriceField").css({'display':'block'}) : $(".emptyPriceField").css({'display':'none'}) ; 
    (this.txtVolumeUpdate.val() == "") ? $(".emptyVolumeField").css({'display':'block'}) : $(".emptyVolumeField").css({'display':'none'}) ; 
    return false;
   },
   successMsg: function(){
	this.divSuccessMsg.css({'display':'block'});
    this.divErrorMsg.css({'display':'none'});  
	return true;
   },
   validation: function(){
    this.pointsField = this.allField.length;
     for(this.x=0; this.x < this.allField.length; this.x++){ 
	  if(this.allField[this.x].val() != ""){ this.pointsField--; }
	 }
    return (this.pointsField == 0) ? this.successMsg() : this.errorMsg() ;
   },
	allDataTable: function(){
	 $.ajax({
        url: $("#tbDevBtcToPage").data('url'),
        dataType: 'json',
        type: 'get',
        cache:false,
        success: function(data){
            //console.log(data);
			CreateElement.createBodyTbDevBitDb(data);
        },
        error: function(d){
            /*console.log("error");*/
            alert("404. Please wait load from database.");
        }
     });	
	},
	removeDataTable: function(date){
	 $.ajax({
        url: $("#btnRemoveFromDB").data('url'),
		data: {
		'date' : date,
		},
        dataType: 'json',
        type: 'get',
        cache:false,
        success: function(data){
          //console.log(data);
          if(data.deleted){ InformationModel.showMsg("Operação realizada com sucesso !", "Dado removido com sucesso !"); }			
		  CrudDevelopmentBitcoinGraphic.dataToUpdateGraphAjax();
		  CrudDevelopmentBitcoinDb.allDataTable();
        },
        error: function(d){
            /*console.log("error");*/
            alert("404. Please wait load from api.");
        }
     });	
	},
	updateDataTable: function(){
	 $.ajax({
        url: $("#btnActionUpdateDevBtc").data('url'),
		data: {
          'date': CovertingValues.textToDate( this.txtDateUpdate.val(), "DD-MM-YYYY", "YYYY-MM-DD"),
		  'close': this.priceOrOutputPrice,
		  'volume': this.txtVolumeUpdate.val()
        },
        dataType: 'json',
        type: 'get',
        cache:false,
        success: function(data){
            //console.log(data);
			CrudDevelopmentBitcoinGraphic.dataToUpdateGraphAjax();
			CrudDevelopmentBitcoinDb.allDataTable();
        },
        error: function(d){
            /*console.log("error");*/
            alert("404. Please wait load from api.");
        }
     });	
	},
  
  get priceOrOutputPrice(){
   return ( this.txtOutputPriceUpdate.val() == "0.00" || this.txtOutputPriceUpdate.val() == "") ?  this.txtPriceUpdate.val() : this.txtOutputPriceUpdate.val(); 	  
  },
  
  get allField(){
   return this.allField = [
    this.txtDateUpdate,
    this.txtPriceUpdate,
    this.txtVolumeUpdate
   ];   
  }
};

//Configuration of crud to search development of bitcoin
var CrudSearchDevelopmentBitcoin = {
  cbDay: $("#txtDay"),
  cbMonth: $("#txtMonth"),
  cbYear: $("#txtYear"),
  cbQuantity: $("#txtQtty"),
  divErrorMsg: $("#msgOutputSearchDevError"),
  divSuccessMsg: $("#msgOutputSearchDevSuccess"),
  x: 0,
  allField: [],
  pointsField: 0,
   errorMsg: function(){
    this.divSuccessMsg.css({'display':'none'});
    this.divErrorMsg.css({'display':'block'});
    (this.cbDay.val() == "Default") ? $(".emptyDayField").css({'display':'block'}) : $(".emptyDayField").css({'display':'none'}) ; 
    (this.cbMonth.val() == "Default") ? $(".emptyMonthField").css({'display':'block'}) : $(".emptyMonthField").css({'display':'none'}) ; 
    (this.cbYear.val() == "Default") ? $(".emptyYearField").css({'display':'block'}) : $(".emptyYearField").css({'display':'none'}) ; 
    (this.cbQuantity.val() == "Default") ? $(".emptyQuantyField").css({'display':'block'}) : $(".emptyQuantyField").css({'display':'none'}) ; 
    return false;
   },
   successMsg: function(){
	this.divSuccessMsg.css({'display':'block'});
    this.divErrorMsg.css({'display':'none'});  
	return true;
   },
   validation: function(){
    this.pointsField = this.allField.length;
     for(this.x=0; this.x < this.allField.length; this.x++){ 
	  if(this.allField[this.x].val() != "Default"){ this.pointsField--; }
	 }
    return (this.pointsField == 0) ? this.successMsg() : this.errorMsg() ;
   },
   developmentBitcoinView: function(data){
    $('#txtTimeFrom').text( CovertingValues.timeStampToDate(data.devPrice.Data.TimeFrom, "DD/MM/YYYY") );
    $('#txtTimeTo').text( CovertingValues.timeStampToDate(data.devPrice.Data.TimeTo, "DD/MM/YYYY") );
    $('#txtQuantity').text( data.devPrice.Data.Data.length );	
    CreateElement.createBodyTbSearchDev(data.devPrice.Data.Data);
	if(!$("#listDevBtc").is(":visible")){ $("#listDevBtc").css({'display': 'block'}); }
   },
   developmentBitcoinAjax: function(){
	  $.ajax({
        url: $("#btnCheckDevPrice").data('url'),
		data: {
          'toLimit': this.cbQuantity.val(),
		  'toTs': this.cbDay.val()+"/"+this.cbMonth.val()+"/"+this.cbYear.val()
        },
        dataType: 'json',
        type: 'get',
        cache:false,
        success: function(data){
            //console.log(data);
            CrudSearchDevelopmentBitcoin.developmentBitcoinView(data);
			CrudDevelopmentBitcoinGraphic.dataToUpdateGraphAjax();
			CrudDevelopmentBitcoinDb.allDataTable();
        },
        error: function(d){
            /*console.log("error");*/
            alert("404. Please wait load from api.");
        }
    });
   },
   saveAllResultSearchingAjax: function(){
    $.ajax({
        url: $("#btnSaveAllDataToDB").data('url'),
		data: {
          'toLimit': this.cbQuantity.val(),
		  'toTs': this.cbDay.val()+"/"+this.cbMonth.val()+"/"+this.cbYear.val()
        },
        dataType: 'json',
        type: 'get',
        cache:false,
        success: function(data){
         //console.log(data);
         if(data.saved){ InformationModel.showMsg("Operação realizada com successo !", "Todos os dados foram salvos com sucesso !"); }
	     CrudDevelopmentBitcoinGraphic.dataToUpdateGraphAjax();
		 CrudDevelopmentBitcoinDb.allDataTable();
        },
        error: function(d){
            /*console.log("error");*/
            alert("404. Please wait load from api.");
        }
    });	  
  },
  saveOneResultSearchingAjax: function(date, close, volume){
    $.ajax({
        url: $("#tbListDevPrice").data('url'),
		data: {
          'date': date,
		  'close': close,
		  'volume': volume
        },
        dataType: 'json',
        type: 'get',
        cache:false,
        success: function(data){
         //console.log(data);
         if(data.saved){ InformationModel.showMsg("Operação realizada com successo !", "Todos os dados foram salvos com sucesso !"); }
	     CrudDevelopmentBitcoinGraphic.dataToUpdateGraphAjax();
	     CrudDevelopmentBitcoinDb.allDataTable();
        },
        error: function(d){
            /*console.log("error");*/
            alert("404. Please wait load from api.");
        }
    }); 
  },
  
  get allField(){
   return this.allField = [
    this.cbDay,
	this.cbMonth,
	this.cbYear,
	this.cbQuantity
   ];   
  }
	
};

//Configuration to create element
var CreateElement = {
  event_data: "",
  tbSearchList: $("#tbListDevPrice"),
  tbDevelopmentBitcoin: $('#tbDevBtcToPage'),
  newDate: "",
  arrayFromJson: [],
  x:1,
  createBodyTbSearchDev: function(objArray){
   this.event_data = "";
   this.event_data = '<tbody>';
   this.tbSearchList.find('tbody').remove();
    for(this.x = 0; this.x < objArray.length; this.x++){
	 this.event_data += '<tr>';
     this.event_data += '<td class="getDateToSave">'+CovertingValues.timeStampToDate( objArray[this.x]["time"], "DD/MM/YYYY")+'</td>';
     this.event_data += '<td class="getCloseToSave">'+objArray[this.x]["close"]+'</td>';
     this.event_data += '<td class="getVolumeToSave">'+objArray[this.x]["volumefrom"]+'</td>';
     this.event_data += '<td><button type="button" class="btn btn-primary text-white btnSaveOneDevelopment"><span data-feather="plus-square"></span> Salvar</button></td>';
     this.event_data += '</tr>';
    }
   this.event_data += '</tbody>';
   this.tbSearchList.append(this.event_data);
   feather.replace();
  },
  createBodyTbDevBitDb: function(data){
	 this.event_data = null;
	 this.event_data = '<tbody>';
	 this.arrayFromJson = JSON.parse(data.dataBtc);
	 this.tbDevelopmentBitcoin.find('tbody').remove();
	  for(this.x = 0; this.x < this.arrayFromJson.length; this.x++){
	   this.newDate = new Date(this.arrayFromJson[this.x]["fields"]["data"]);
	   this.event_data += '<tr>';
       this.event_data += '<td class="txtDateToUpdate">'+("0" + (this.newDate.getDate() + 1)).slice(-2)+"-"+("0" + (this.newDate.getMonth() + 1)).slice(-2) + "-" + this.newDate.getFullYear()+'</td>';
       this.event_data += '<td class="txtCloseToUpdate">'+this.arrayFromJson[this.x]["fields"]["ultimo"]+'</td>';
       this.event_data += '<td class="txtVolumeToUpdate">'+this.arrayFromJson[this.x]["fields"]["volume"]+'</td>';
       this.event_data += '<td><button type="button" class="btn btn-warning btnUpdateDevBtc"><span data-feather="edit"></span> Atualizar</button> ';
       this.event_data += '<button type="button" class="btn btn-danger btnRemoveDevBtc"><span data-feather="trash-2"></span> Remover</button></td>';
       this.event_data += '</tr>';
	 }
	  this.event_data += '</tbody>';
      this.tbDevelopmentBitcoin.append(this.event_data);
	  feather.replace();  
  }
};

//Configuration of the data when load the page
var DataToLoad = {
   cbDay: $("#txtDay"),
   cbMonth: $("#txtMonth"),
   cbYear: $("#txtYear"),
   cbQuantity: $("#txtQtty"),
   optionElement: null,
   months: [],
   x: 1,
   addDay: function(){
	this.optionElement = null;
	 for(this.x= 1; this.x<=31; this.x++){
	   this.optionElement = document.createElement('option');
       this.optionElement.value = this.x;
       this.optionElement.innerHTML = this.x;
       this.cbDay.append( this.optionElement );
	 }
   },
   addMonths: function(){
    this.optionElement = null;
	 for(this.x= 0; this.x < 12; this.x++){
	   this.optionElement = document.createElement('option');
       this.optionElement.value = this.x+1;
       this.optionElement.innerHTML = this.months[this.x];
       this.cbMonth.append( this.optionElement );
	 }  
   },
   addYear: function(){
	this.optionElement = null;
	 for(this.x= 2015; this.x<=3000; this.x++){
	   this.optionElement = document.createElement('option');
       this.optionElement.value = this.x;
       this.optionElement.innerHTML = this.x;
       this.cbYear.append(this.optionElement);
	 }  
   },
   addQuantity: function(){
	this.optionElement = null;
	 for(this.x= 1; this.x<=2000; this.x++){
	   this.optionElement = document.createElement('option');
       this.optionElement.value = this.x;
       this.optionElement.innerHTML = this.x;
       this.cbQuantity.append(this.optionElement);
	 }  
   },
   addValuesInsideElement: function(){
	this.addDay();
    this.addMonths();
    this.addYear();  	 
    this.addQuantity();  	 
   },
   
   get months(){
	return this.months = [
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
};

//Configuration of all information model
var InformationModel = {
  lblTitle: $("#exampleModalLabel"),
  lblMsg: $("#msgOutput"),
  objInfomationModel: $('#infomationModel'),
   showMsg: function(title, msg){
    this.lblTitle.text(title);
    this.lblMsg.text(msg);
    this.objInfomationModel.modal('show'); 
  }
};

var changeElements = {
  formSearchDevelopment: function(){
  ( $("#txtDay").val() == "Default" ) ? this.changeAllElements(7) : this.changeAllElements(8); 
  ( $("#txtMonth").val() == "Default" ) ? this.changeAllElements(5) : this.changeAllElements(6); 
  ( $("#txtYear").val() == "Default" ) ? this.changeAllElements(1) : this.changeAllElements(2); 
  ( $("#txtQtty").val() == "Default" ) ?  this.changeAllElements(3) : this.changeAllElements(4); 
  },
  changeAllElements: function(option){
	switch(option){
		
	  case 1://Year field is empty
	   $("#colorCbYear").css({'border': '2px solid red'});
       $("#fullYearImg").css({'display': 'none'}); 
       $("#emptyYearImg").css({'display': 'inline'});  
	  break; 
	  
	  case 2://Year field is full
	   $("#colorCbYear").css({'border': '2px solid green'});	  
       $("#fullYearImg").css({'display': 'inline'}); 
	   $("#emptyYearImg").css({'display': 'none'});  
	  break;
	  
	  case 3://Quantity field is empty
	   $("#colorCbQuantity").css({'border': '2px solid red'});
	   $("#fullQuantityImg").css({'display': 'none'}); 
	   $("#emptyQuantityImg").css({'display': 'inline'});
	  break;
	  
	  case 4://Quantity field is full
	   $("#colorCbQuantity").css({'border': '2px solid green'});
	   $("#fullQuantityImg").css({'display': 'inline'}); 
	   $("#emptyQuantityImg").css({'display': 'none'});
	  break; 
	  
	  case 5://Month field is empty
	   $("#colorCbMonth").css({'border': '2px solid red'});
	   $("#fullMonthImg").css({'display': 'none'}); 
	   $("#emptyMonthImg").css({'display': 'inline'});
	  break;
	  
	  case 6://Month field is full
	   $("#colorCbMonth").css({'border': '2px solid green'});
	   $("#fullMonthImg").css({'display': 'inline'}); 
	   $("#emptyMonthImg").css({'display': 'none'});
	   break;
	   
	   case 7://Day field is empty
	    $("#colorCbDay").css({'border': '2px solid red'});
	    $("#fullDayImg").css({'display': 'none'}); 
	    $("#emptyDayImg").css({'display': 'inline'}); 
	   break;
	   
	   case 8://Day field is full
	   $("#colorCbDay").css({'border': '2px solid green'});
	   $("#fullDayImg").css({'display': 'inline'}); 
	   $("#emptyDayImg").css({'display': 'none'});
	  break;
	  }
  }
};


//Events ----------------------

 //Call function to check development bitcoin from api
 $("#btnCheckDevPrice").on("click", function(){
  changeElements.formSearchDevelopment();
  if( CrudSearchDevelopmentBitcoin.validation() ){ CrudSearchDevelopmentBitcoin.developmentBitcoinAjax(); }
 });
 
 //Call function to save all data from api
$(document).on('click', '#btnSaveAllDataToDB',function(){
  if( CrudSearchDevelopmentBitcoin.validation() ){ CrudSearchDevelopmentBitcoin.saveAllResultSearchingAjax(); }
});

 //Call function to ask if save all data from api
$(document).on('click', '#btnSaveAllDevelopment',function(){
  $("#askSaveAllModel").modal('show');
});

//Call function to save one data from api
$(document).on('click', '.btnSaveOneDevelopment', function(){
 var row = $(this).closest("tr");    // Find the row
  CrudSearchDevelopmentBitcoin.saveOneResultSearchingAjax( CovertingValues.textToDate( row.find(".getDateToSave").text(), "DD/MM/YYYY", "YYYY-MM-DD"), row.find(".getCloseToSave").text(), row.find(".getVolumeToSave").text());
});

$("#btnActionUpdateDevBtc").on("click", function(){
 if( CrudDevelopmentBitcoinDb.validation() ){ CrudDevelopmentBitcoinDb.updateDataTable() }
});

//Add values on form from modal to update data
$(document).on('click', '.btnUpdateDevBtc', function(){ 
 var row = $(this).closest("tr");
  $("#txtDateUpdate").val(row.find(".txtDateToUpdate").text());
  $("#txtPriceUpdate").val(row.find(".txtCloseToUpdate").text());
  $("#txtVolumeUpdate").val(row.find(".txtVolumeToUpdate").text());  
  $("#txtOutputPriceUpdate").val("");
  $("#msgOutputUpdSuccess").css({'display':'none'});
  $("#msgOutputUpdError").css({'display':'none'});   
  $('#infomationModelToUpdate').modal('show');
});

//Format input in txtPriceUpdate and send to txtOutputPriceUpdate
$("#txtPriceUpdate").on("keyup",function() {
  $("#txtPriceUpdate").val( CovertingValues.removePointNumber( $("#txtPriceUpdate").val() ) );
  $("#txtOutputPriceUpdate").val( CovertingValues.addDecimal( $("#txtPriceUpdate").val() ) );
});

//Call function asking to remove data from database
$(document).on('click', '.btnRemoveDevBtc', function(){
 $("#askRemoveAllModel").modal("show");
 var row = $(this).closest("tr");    // Find the row
 $("#lblDataToRemove").text(row.find(".txtDateToUpdate").text());
});

//Call function to remove from database
$("#btnRemoveFromDB").on("click", function(){
  CrudDevelopmentBitcoinDb.removeDataTable( CovertingValues.textToDate( $("#lblDataToRemove").text(), "DD-MM-YYYY", "YYYY-MM-DD") );
});

//Change txtDay option
$("#txtDay").on("change", function(){
 changeElements.formSearchDevelopment();
 });

//Change txtMonth option
$("#txtMonth").on("change", function(){
 changeElements.formSearchDevelopment();
});

//Change txtYear option
$("#txtYear").on("change", function(){
 changeElements.formSearchDevelopment();
 });

//Change txtQuantity option
$("#txtQtty").on("change", function(){
  changeElements.formSearchDevelopment();
});