//Change output date
var CovertingValues = {
  dateConvert: "",
  newDate: "",
  dateFormatOutput: "",
   textToDate: function(txtValue, formatValue, option){
	this.dateConvert = moment(txtValue, formatValue).toDate();
    this.newDate = new Date(this.dateConvert);
     return this.output(option); 
   },
   timeStampToDate: function(ts, option){
     this.newDate = new Date(ts * 1000);
      return this.output(option);
	},
   addDecimal: function(txtValue){
	 return (txtValue / 100).toFixed(2);	
    },
   removePointNumber: function(txtValue){
	return txtValue.replace(/[^0-9.]/g, '').replaceAll('.','').slice(0,12);
   },
   output: function(option){
	 switch(option){
		 
	  case "YYYY-MM-DD": //
       this.dateFormatOutput =  this.newDate.getFullYear()+"-"+("0" + (this.newDate.getMonth() + 1)).slice(-2) + "-" + ("0" + this.newDate.getDate()).slice(-2);
      break;
  
      case "DD/MM/YYYY":
       this.dateFormatOutput = ("0" + this.newDate.getDate()).slice(-2)+"/"+("0" + (this.newDate.getMonth() + 1)).slice(-2) + "/" + this.newDate.getFullYear();
      break;
	  
	  case "DD-MM-YYYY":
       this.dateFormatOutput = ("0" + this.newDate.getDate()).slice(-2)+"-"+("0" + (this.newDate.getMonth() + 1)).slice(-2) + "-" + this.newDate.getFullYear();
      break;	  
	 }
    return this.dateFormatOutput;	 
   }   
};

var ChangeView = {
  showAndHide: function(divActiom, changeLabel){
   ($(changeLabel).text() == "-") ? $(changeLabel).text("+") : $(changeLabel).text("-");
   $(divActiom).toggle();	
  }
};