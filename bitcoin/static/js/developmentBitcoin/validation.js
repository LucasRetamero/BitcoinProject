
//Validation if field is not empty
function valFormOfUpdateModel(){
 var points = 3;
  
  if( getTxtDateUpdate() != ""){ points--; }
  if( getTxtPriceUpdate() != ""){ points--; }
  if( getTxtVolumeUpdate() != ""){ points--; }
  
 return (points == 0) ?  true : false;
}

//Validation if field is not empty
function valFormOfSearchDevPrice(){
 var points = 4;
  
  if( getTxtDay() != "Default"){ points--; }
  if( getTxtMonth() != "Default"){ points--; }
  if( getTxtYear() != "Default"){ points--; }
  if( getTxtQuantity() != "Default"){ points--; }
  
 return (points == 0) ?  true : false;
}
