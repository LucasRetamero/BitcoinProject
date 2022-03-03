// DAO javascript page
//DAO: Search development of bitcoin 

function getListDevBtc(limit, date){
    $.ajax({
        url: $("#btnCheckDevPrice").data('url'),
		data: {
          'toLimit': limit,
		  'toTs': date
        },
        dataType: 'json',
        type: 'get',
        cache:false,
        success: function(data){
            //console.log(data);
            setInfoTableFromApi(convertTimestampToDate(data.devPrice.Data.TimeFrom, 1), convertTimestampToDate(data.devPrice.Data.TimeTo, 1), data.devPrice.Data.Data.length);
			createBodyFromListDevBtc(data.devPrice.Data.Data);			
			if(!$("#listDevBtc").is(":visible")){ $("#listDevBtc").css({'display': 'block'}); }
			showMsgOnSearchDevPrice(1);
			getDateUpdateGraphDevBtc();
			getAllDevelopmentBitcoin();
        },
        error: function(d){
            /*console.log("error");*/
            alert("404. Please wait load from api.");
        }
    });
}