//Validation: show message(Search Development Bitcoin):
//--Error: case have one or more empty field
//--Success: case have no empty field
function showMsgOnSearchDevPrice(option){
  switch(option){
   case 1: //success
    $("#msgOutputSearchDevSuccess").css({'display':'block'});
    $("#msgOutputSearchDevError").css({'display':'none'});
   break;
   
   case 2: //error
    $("#msgOutputSearchDevSuccess").css({'display':'none'});
    $("#msgOutputSearchDevError").css({'display':'block'});
	(getTxtDay() == "Default") ? $(".emptyDayField").css({'display':'block'}) : $(".emptyDayField").css({'display':'none'}) ; 
	(getTxtMonth() == "Default") ? $(".emptyMonthField").css({'display':'block'}) : $(".emptyMonthField").css({'display':'none'}) ; 
	(getTxtYear() == "Default") ? $(".emptyYearField").css({'display':'block'}) : $(".emptyYearField").css({'display':'none'}) ; 
	(getTxtQuantity() == "Default") ? $(".emptyQuantyField").css({'display':'block'}) : $(".emptyQuantyField").css({'display':'none'}) ; 
   break;
  }
}

//Set title and message after done operation(crud)
function setTitleAndMsgInformationModel(title, msg){
 $("#exampleModalLabel").text(title);
 $("#msgOutput").text(msg);
 $('#infomationModel').modal('show');
}

//Show and hide an element
function showAndHide(divActiom, changeLabel){
($(changeLabel).text() == "-") ? $(changeLabel).text("+") : $(changeLabel).text("-");
 $(divActiom).toggle();
}

//Validation: show message(Update data from db):
//--Error: case have one or more empty field
//--Success: case have no empty field
function showMsgOnInfoModel(option){
  switch(option){
   case 1: //success
    $("#msgOutputUpdSuccess").css({'display':'block'});
    $("#msgOutputUpdError").css({'display':'none'});
   break;
   
   case 2: //error
    $("#msgOutputUpdSuccess").css({'display':'none'});
    $("#msgOutputUpdError").css({'display':'block'});
	(getTxtPriceUpdate() == "") ? $(".emptyPriceField").css({'display':'block'}) : $(".emptyPriceField").css({'display':'none'}) ; 
	(getTxtVolumeUpdate() == "") ? $(".emptyVolumeField").css({'display':'block'}) : $(".emptyVolumeField").css({'display':'none'}) ; 
   break;
  }
}

//Add values inside select to search development bitcoin
function setValuesToSearchDev(option){
	let objOption;
	
	switch(option){
	 
	 case 1: //Day
      for(let x= 1; x<=31; x++){
	   objOption = document.createElement('option');
       objOption.value = x;
       objOption.innerHTML = x;
       cbDay.append(objOption);
	  }
	   return setValuesToSearchDev(2);
     break;
	 
	 case 2: //Month
      for(let x= 0; x < 12; x++){
	   objOption = document.createElement('option');
       objOption.value = x+1;
       objOption.innerHTML = getMonth()[x];
       cbMonth.append(objOption);
	  }
	   return setValuesToSearchDev(3);
     break;
	 
	 case 3: //Year
      for(let x= 2015; x<=3000; x++){
	   objOption = document.createElement('option');
       objOption.value = x;
       objOption.innerHTML = x;
       cbYear.append(objOption);
	  }
	   return setValuesToSearchDev(4);
     break;
	 
	 case 4: //Quantity
      for(let x= 1; x<=2000; x++){
	   objOption = document.createElement('option');
       objOption.value = x;
       objOption.innerHTML = x;
       cbQuantity.append(objOption);
	  }
     break;    	 
	}
}

//Add extra info in table of development bitcoin from api
function setInfoTableFromApi(tsFrom, tsTo, quatityData){
 $('#txtTimeFrom').text(tsFrom);
 $('#txtTimeTo').text(tsTo);
 $('#txtQuantity').text(quatityData);	
}

//Create body from table with data from api of development bitcoin
function createBodyFromListDevBtc(objArray){
  let event_data = '<tbody>';
  $('#tbListDevPrice').find('tbody').remove();
   for(let i = 0; i < objArray.length; i++){
	  event_data += '<tr>';
      event_data += '<td class="getDateToSave">'+convertTimestampToDate(objArray[i]["time"], 1)+'</td>';
      event_data += '<td class="getCloseToSave">'+objArray[i]["close"]+'</td>';
      event_data += '<td class="getVolumeToSave">'+objArray[i]["volumefrom"]+'</td>';
      event_data += '<td><button type="button" class="btn btn-primary text-white btnSaveOneDevelopment"><span data-feather="plus-square"></span> Salvar</button></td>';
      event_data += '</tr>';
    }
   event_data += '</tbody>';
   $("#tbListDevPrice").append(event_data);
   feather.replace();
}