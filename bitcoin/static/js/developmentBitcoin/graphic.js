//Data to graphic
function dataToGraphic(date, close, volume){
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
}


function showGraph(date, close, volume){
	if(graphCanvas != null){ graphCanvas.destroy(); }
     graphCanvas = new Chart(cvDevGraphic, {
        type: 'line',
        data: dataToGraphic(date, close, volume),
        options: {
          legend: {
            display: false,
          }
        }
      }); 
}