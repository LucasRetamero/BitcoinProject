
var UpdateForm = { 
  txtDateUpdate: $("#txtDateUpdate"),
  txtPriceUpdate: $("#txtPriceUpdate"),
  txtOutputPriceUpdate: $("#txtOutputPriceUpdate"),
  
  get priceOrOutputPrice(){
	return (this.txtOutputPriceUpdate.val() == "") ? this.txtPriceUpdate.val() : this.txtOutputPriceUpdate.val() ;  
  },
  
  get dateToUpdate(){
	return CovertingValues.textToDate(this.txtDateUpdate.val(), "DD-MM-YYYY", "YYYY-MM-DD");
  }
	
};

/**
* Configuation of the data to load in the page
*/
var DataToLoad = {
  txtDay: $("#txtDay"),
  txtMonth: $("#txtMonth"),
  txtYear: $("#txtYear"),
  tcount: 0,
  valueCountdown: 0,
  month: [],
  createOption: null,
  x: 0,
   getBtcData: async () => {
    fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
   .then(response => response.json())
   .then(data => {
    document.getElementById("info").innerHTML = '<b>1 BTC = ' + data.USD + ' USD</b>'
   });
   },
  updateBtcData: function(){
   this.tcount = setInterval(function(){
   DataToLoad.tcount++
    if (DataToLoad.tcount==10) { DataToLoad.getBtcData(); DataToLoad.tcount=0}{
     DataToLoad.valueCountdown = (10- DataToLoad.tcount);
     $("#infotime").text( (DataToLoad.valueCountdown < 10) ? "0"+ DataToLoad.valueCountdown : DataToLoad.valueCountdown );
   }
  },1000);
  },
  addDay: function(){
   for(this.x=1; this.x <= 31; this.x++){
	 this.createOption = document.createElement('option');
     this.addValuesCreateOption(this.x, this.x);
     this.txtDay.append(this.createOption);	
   }  
  },
  addMonth: function(){
   for(this.x=0; this.x < 12; this.x++){
	this.createOption = document.createElement('option');
	this.addValuesCreateOption(this.x+1, this.month[this.x]);
    this.txtMonth.append(this.createOption);	
   }   
  },
  addYear: function(){
   for(this.x=2009; this.x <= 3000; this.x++){
	this.createOption = document.createElement('option');
    this.addValuesCreateOption(this.x, this.x);
    this.txtYear.append(this.createOption);	
   }  
  },
  loadInsidePage: function(){
	this.addDay();  
	this.addMonth();  
	this.addYear();  
  },
  addValuesCreateOption: function(txtValue, txtInnerHtml){
   this.createOption.value = txtValue;
   this.createOption.innerHTML = txtInnerHtml;  
  },
  
  get month(){
   return this.month = [
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

/**
* Configuation of the graphic
*/
var GraphicConfiguration = {
  graphCanvas: null,
  cvPriceGraphic: $('#myChart'),
   destroyerGraphic: function(){
    if(this.graphCanvas != null){ return this.graphCanvas.destroy(); }  
   },
   styleOfData: function(date, price){
    return {
		 labels: JSON.parse(date),
         datasets: [{
		 label: ' Preço do Bitcoin',
         data: JSON.parse(price),
         lineTension: 0,
         backgroundColor: 'transparent',
            borderColor: '#007bff',
            borderWidth: 4,
            pointBackgroundColor: '#007bff'
          }]
        } 	
    },
   createGraphic: function(date, price){
	  return new Chart(this.cvPriceGraphic, {
        type: 'line',
        data: this.styleOfData(date, price),
        options: {
          legend: {
            display: false,
          },      
        }
      }); 
    },
   showGraphic: function(date, price){
    this.destroyerGraphic();
    this.graphCanvas = this.createGraphic(date, price);		
  }
};

var changeElements = {
  formSearchDevelopment: function(){
   ( $("#txtDay").val() == "Default" ) ? this.changeAllElements(5) : this.changeAllElements(6); 
   ( $("#txtMonth").val() == "Default" ) ? this.changeAllElements(3) : this.changeAllElements(4); 
   ( $("#txtYear").val() == "Default" ) ? this.changeAllElements(1) : this.changeAllElements(2); 
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
	  	  
	  case 3://Month field is empty
	   $("#colorCbMonth").css({'border': '2px solid red'});
	   $("#fullMonthImg").css({'display': 'none'}); 
	   $("#emptyMonthImg").css({'display': 'inline'});
	  break;
	  
	  case 4://Month field is full
	   $("#colorCbMonth").css({'border': '2px solid green'});
	   $("#fullMonthImg").css({'display': 'inline'}); 
	   $("#emptyMonthImg").css({'display': 'none'});
	   break;
	   
	   case 5://Day field is empty
	    $("#colorCbDay").css({'border': '2px solid red'});
	    $("#fullDayImg").css({'display': 'none'}); 
	    $("#emptyDayImg").css({'display': 'inline'}); 
	   break;
	   
	   case 6://Day field is full
	   $("#colorCbDay").css({'border': '2px solid green'});
	   $("#fullDayImg").css({'display': 'inline'}); 
	   $("#emptyDayImg").css({'display': 'none'});
	  break;
	  }
  }
  
};

var CrudTbPriceBitcoin = {
	tbPriceBitcoin: $("#bitcoinPrice"),
	 allDataTable: function(){
	   $.ajax({
        url: this.tbPriceBitcoin.data('url'),
        dataType: 'json',
        type: 'get',
        cache:false,
        success: function(data){
            //console.log(data);
            CreateElement.createBodyTbPriceBitcoin(data);
			//getDateUpdateGraph();
        },
        error: function(d){
            /*console.log("error");*/
            alert("404. Please wait load from database.");
        }
    });	
	},
	
	updateDataTable: function(){ 
		$.ajax({
            type: 'get',
            url: $(".btnActionUpdate").data('url'),
			 data: {
				'date': UpdateForm.dateToUpdate,
                'price': UpdateForm.priceOrOutputPrice
            },
			dataType: 'json',
            success: function (data) {
			  CrudTbPriceBitcoin.allDataTable();
              CrudPriceGraphic.updateDataGraphic();
            },
            error: function (data) {
                console.log(data)
            }
        })
	},
	
	removeDataTable: function(){ 
		$.ajax({
            type: 'get',
            url: $(".btnActionRemove").data('url'),
			 data: {
				'date': CovertingValues.textToDate($("#lblDateToRemove").text(), "DD-MM-YYYY", "YYYY-MM-DD")
            },
			dataType: 'json',
            success: function (data) {
			  $("#infomationModelAskRemove").modal("hide");
			  $("#exampleModalLabel").text("Operação realizada com sucesso !");
			  $("#msgOutput").text("Dados excluido com sucesso !");
			  $("#infomationModel").modal("show");
			  CrudTbPriceBitcoin.allDataTable();
              CrudPriceGraphic.updateDataGraphic();
            },
            error: function (data) {
                console.log(data)
            }
        })
	}
};

var CrudSearchPriceBitcoin = {
	btnSearching: $("#checkPrice"),
	txtDay: $("#txtDay"),
	txtMonth: $("#txtMonth"),
	txtYear: $("#txtYear"),
	btnToSave: $("#btnToSavePrice"),

   searchingPrice: function(){
	$.ajax({
            type: 'get',
            url: this.btnSearching.data('url'),
			 data: {
                'txtDay': this.txtDay.val(),
                'txtMonth': this.txtMonth.val(),
                'txtYear': this.txtYear.val()
            },
			dataType: 'json',
            success: function (data) {
			 AddInputElement.doneSearchingPrice(data);
            },
            error: function (data) {
                console.log(data)
            }
        }) 
   },
   
   savePrice: function(){
	 $.ajax({
            type: 'get',
            url: this.btnToSave.data('url'),
			 data: {
                'day': $("#daySave").val(),
                'month': $("#monthSave").val(),
                'year': $("#yearSave").val(),
                'price': $("#lblPriceBitcoin").text()
            },
			dataType: 'json',
            success: function (data) {			
			  if(data.saved){ $('#msgAfterSearchPriceSuccess').css({'display': 'block'}); }		  
              CrudTbPriceBitcoin.allDataTable();
              CrudPriceGraphic.updateDataGraphic();
            },
            error: function (data) {
                console.log(data)
            }
        })  
   }
};

var CrudPriceGraphic = {
	cvGraphic: $('#myChart'),
	 updateDataGraphic: function(){
	  $.ajax({
            type: 'get',
            url: this.cvGraphic.data('url'),
			data: {},
			dataType: 'json',
            success: function (data) {
			 GraphicConfiguration.showGraphic(data.dates, data.prices);
            },
            error: function (data) {
                console.log(data)
            }
        })
	}
};

var CreateElement = {
  event_data: "", 
  objArray: [],
  tbPriceBitcoin: $("#bitcoinPrice"),
  x:0,
	createBodyTbPriceBitcoin: function(data){
	  this.event_data = "";
	  this.event_data = '<tbody>';
	  this.objArray = JSON.parse(data.dataBtc);
	  this.tbPriceBitcoin.find('tbody').remove();
	   for(this.x = 0;this.x < this.objArray.length; this.x++){
		this.event_data += '<tr>';
        this.event_data += '<td class="dateBitcoin">'+CovertingValues.textToDate(this.objArray[this.x]["fields"]["data"], "YYYY-MM-DD", "DD-MM-YYYY")+'</td>';
        this.event_data += '<td class="priceBitcoin">'+this.objArray[this.x]["fields"]["preco"]+'</td>';
        this.event_data += '<td><button type="button" class="btn btn-warning btnToUpdatePrice"><span data-feather="edit"></span> Editar</button> ';
        this.event_data += '<button type="button" class="btn btn-danger btnToRemovePrice"><span data-feather="trash-2"></span> Remover</button></td>';
        this.event_data += '</tr>';
	   }
	  this.event_data += '</tbody>';
      this.tbPriceBitcoin.append(this.event_data);
	  feather.replace();
	}
};

var Validation = {
  txtDay: $("#txtDay"),
  txtMonth: $("#txtMonth"),
  txtYear: $("#txtYear"),
  txtDateUpdate: $("#txtDateUpdate"),
  txtPriceUpdate: $("#txtPriceUpdate"),
  txtOutputPriceUpdate: $("#OutputPrice"),
  divSearchErrorMsg: $("#msgOutputSearchPriceError"),
  divSearchSuccessMsg: $("#msgOutputSearchPriceSuccess"), 
  divUpdateErrorMsg: $("#msgOutputUpdatePriceError"),
  divUpdateSuccessMsg: $("#msgOutputUpdatePriceSuccess"),
  allField: [],
  allUpdateField: [],
  pointsField: 0,
  x:0,
	searchPriceBitcoinForm: function(){
     this.pointsField = this.allField.length;
      for(this.x=0; this.x < this.allField.length; this.x++){ 
	   if(this.allField[this.x].val() != "Default"){ this.pointsField--; }
	  }
      return (this.pointsField == 0) ? this.searchSuccessMsg() : this.searchErrorMsg() ;
	},
	
	updatePriceBitcoinForm: function(){
     this.pointsField = this.allUpdateField.length;
      for(this.x=0; this.x < this.allUpdateField.length; this.x++){ 
	   if(this.allUpdateField[this.x].val() != ""){ this.pointsField--; }
	  }
      return (this.pointsField == 0) ? this.updateSuccessMsg() : this.updateErrorMsg() ;
	},
	
	searchSuccessMsg: function(){
	 this.divSearchSuccessMsg.css({'display':'block'});
     this.divSearchErrorMsg.css({'display':'none'});  
	  return true;	
	},
	searchErrorMsg: function(){
	 changeElements.formSearchDevelopment();
     this.divSearchErrorMsg.css({'display':'block'});
     this.divSearchSuccessMsg.css({'display':'none'});
      (this.txtDay.val() == "Default") ? $(".emptyDayField").css({'display':'block'}) : $(".emptyDayField").css({'display':'none'}) ; 
      (this.txtMonth.val() == "Default") ? $(".emptyMonthField").css({'display':'block'}) : $(".emptyMonthField").css({'display':'none'}) ; 
      (this.txtYear.val() == "Default") ? $(".emptyYearField").css({'display':'block'}) : $(".emptyYearField").css({'display':'none'}) ; 
       return false;
	},
	
	updateSuccessMsg: function(){
	 this.divUpdateSuccessMsg.css({'display':'block'});
     this.divUpdateErrorMsg.css({'display':'none'});  
	  return true;	
	},
	updateErrorMsg: function(){
     this.divUpdateErrorMsg.css({'display':'block'});
     this.divUpdateSuccessMsg.css({'display':'none'});
      (this.txtDateUpdate.val() == "") ? $(".emptyDateToUpdate").css({'display':'block'}) : $(".emptyDateToUpdate").css({'display':'none'}) ; 
      (this.txtPriceUpdate.val() == "") ? $(".emptyPriceToUpdate").css({'display':'block'}) : $(".emptyPriceToUpdate").css({'display':'none'}) ; 
      return false;
	},
	
	get allField(){
	 return this.allField = [
		    this.txtDay,
		    this.txtMonth,
		    this.txtYear
	     ];	
	},
	
	get allUpdateField(){
	 return this.allUpdateField = [
		    this.txtDateUpdate,
		    this.txtPriceUpdate
	     ];	
	}
};

var AddInputElement = {
  divPriceBtc: $("#priceBtc"),
  lblPriceBitcoin: $("#lblPriceBitcoin"),
  lblDatePriceBitcoin: $("#lblDatePriceBitcoin"),
  hiddenDay: $("#daySave"),
  hiddenMonth: $("#monthSave"),
  hiddenYear: $("#yearSave"),
   doneSearchingPrice: function(data){
    this.divPriceBtc.css({'display': 'block'});
	this.lblPriceBitcoin.text( data.valuePrice.BTC.USD );
	this.lblDatePriceBitcoin.text(("0" + data.dayPrice).slice(-2)+"/"+("0" + data.monthPrice).slice(-2)+"/"+data.yearPrice);
	this.hiddenDay.val(data.dayPrice);
	this.hiddenMonth.val(data.monthPrice);
	this.hiddenYear.val(data.yearPrice);  
  }	
};

var ModelConfiguration = {
  txtDateUpdate: $("#txtDateUpdate"),
  txtPriceUpdate: $("#txtPriceUpdate"),
  txtOutputPriceUpdate: $("#txtOutputPriceUpdate"),
  updateToModal: $("#infomationModelToUpdate"),
   
    addValuesElement: function(DateValue, PriceValue){
	 this.txtDateUpdate.val(DateValue);
	 this.txtPriceUpdate.val(PriceValue);
	 this.txtOutputPriceUpdate.val("");
     this.updateToModal.modal('show');	 
    }
};

/**
* All Events
*/

$("#txtDay").on("change", function(){
 changeElements.formSearchDevelopment();
});

$("#txtMonth").on("change", function(){
 changeElements.formSearchDevelopment();
});

$("#txtYear").on("change", function(){
 changeElements.formSearchDevelopment();
});

$("#checkPrice").on("click", function(){
 if( Validation.searchPriceBitcoinForm() ){ CrudSearchPriceBitcoin.searchingPrice(); }
});

$("#btnToSavePrice").on("click", function(){
  CrudSearchPriceBitcoin.savePrice();
});

$(".btnActionUpdate").on("click", function(){
  if(Validation.updatePriceBitcoinForm()){ CrudTbPriceBitcoin.updateDataTable(); }
});

$(".btnActionRemove").on("click", function(){
  CrudTbPriceBitcoin.removeDataTable();
});

$(document).on("click",".btnToUpdatePrice", function(){
  var row = $(this).closest("tr");
  ModelConfiguration.addValuesElement(row.find(".dateBitcoin").text(), row.find(".priceBitcoin").text());
});

$(document).on("click",".btnToRemovePrice", function(){
  var row = $(this).closest("tr");
  $("#lblDateToRemove").text(row.find(".dateBitcoin").text());
  $("#infomationModelAskRemove").modal("show");  
});

$("#txtPriceUpdate").on("keyup",function() {
   $("#txtPriceUpdate").val( CovertingValues.removePointNumber( $("#txtPriceUpdate").val() ) );
   $("#txtOutputPriceUpdate").val( CovertingValues.addDecimal( $("#txtPriceUpdate").val() ) );
});