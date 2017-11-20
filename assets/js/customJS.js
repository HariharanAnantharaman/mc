// function donutdata(){
//   Morris.Donut({
//       element: 'dashboard-donut-1',
//       data: [
//           {label: "Normal", value: 2500},
//           {label: "Warning", value: 100},
//           {label: "Alert", value: 5}
//       ],
//       colors: ['#33414E', '#1caf9a', '#FEA223'],
//       resize: true
//   });
// }
var vibX = [0, 0, 0, 0, 0, 0, 0];
var vibY = [0, 0, 0, 0, 0, 0, 0];
var vibZ= [0, 0, 0, 0, 0, 0, 0];

var temp = [0, 0, 0, 0, 0, 0, 0];
var humid = [0, 0, 0, 0, 0, 0, 0];
var air = [0, 0, 0, 0, 0, 0, 0];

var timeY = ['00:00', '00:00', '00:00', '00:00', '00:00', '00:00', '00:00'];
var vibCtx = document.getElementById('vibChart').getContext('2d');
var tempCtx = document.getElementById('tempChart').getContext('2d');
var humidCtx = document.getElementById('humidChart').getContext('2d');
var airCtx = document.getElementById('airChart').getContext('2d');
var pieCtx = document.getElementById('pieChart').getContext('2d');

var vibChart
var tempChart
var humidChart


function vibData(update, data,time){

    var config = {
    responsive : true,
    type: 'line',
    data: {
      labels: timeY,
      datasets: [{
        label: 'X',
        fill : false,
        data: vibX,
        backgroundColor: "rgba(0, 143, 151, 1)",
        borderColor:"rgba(0, 143, 151, 1)"
      }, {
        label: 'Y',
        fill : false,
        data: vibY,
        backgroundColor: "rgba(92, 92, 92, 1)",
        borderColor:"rgba(92, 92, 92, 1)"
      },{
        label: 'Z',
        fill : false,
        data: vibZ,
        backgroundColor: "rgba(235, 60, 60, 1)",
        borderColor:"rgba(235, 60, 60, 1)"
      }]
    },
    options: {
    scales: {
        yAxes: [{
            ticks: {
                suggestedMin: 0,
                suggestedMax: 1.2
            }
        }]
    }
}
  }

  if (update == 'new') {

  vibChart.data.labels.shift();
  vibChart.data.labels.push(time);

  vibChart.data.datasets[0].data.push(data[0])
  vibChart.data.datasets[0].data.shift(data[0]);

  vibChart.data.datasets[1].data.push(data[1]);
  vibChart.data.datasets[1].data.shift();

  vibChart.data.datasets[2].data.push(data[2]);
  vibChart.data.datasets[2].data.shift();

  vibChart.update();
}else {
   vibChart = new Chart(vibCtx, config);
}

}


function tempData(update, data1,time){
  console.log(data1);

    var config = {
    responsive : true,
    type: 'line',
    data: {
      labels: timeY,
      scaleStartValue : 0 ,
      datasets: [{
        label: 'Temperature',
        data: temp,
        backgroundColor: "rgba(0, 143, 151, 1)",
        borderColor:"rgba(0, 143, 151, 1)",
        fillColor : "rgba(39, 197, 205, 1)"
      }]
    },
    options: {
    scales: {
        yAxes: [{
            ticks: {
                suggestedMin: 0,
                suggestedMax: 40
            }
        }]
    }
}
  }

  if (update == 'new') {

  tempChart.data.labels.shift();
  tempChart.data.labels.push(time);

  tempChart.data.datasets[0].data.push(data1)
  tempChart.data.datasets[0].data.shift(data1[0]);


  tempChart.update();
}else {
   tempChart = new Chart(tempCtx, config);
}

}

function humidData(update, data2,time){

    var config = {
    responsive : true,
    type: 'line',
    data: {
      labels: timeY,
      datasets: [{
        label: 'Humidity',
        data: humid,
        backgroundColor: "rgba(92, 92, 92, 1)",
        borderColor:"rgba(92, 92, 92, 1)",
        fillColor : "rgba(155, 155, 155, 1)"
      }]
    },
    options: {
    scales: {
        yAxes: [{
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        }]
    }
}
  }

  if (update == 'new') {

  humidChart.data.labels.shift();
  humidChart.data.labels.push(time);

  humidChart.data.datasets[0].data.push(data2)
  humidChart.data.datasets[0].data.shift(data2[0]);


  humidChart.update();
}else {
   humidChart = new Chart(humidCtx, config);
}

}

function airData(update, data3,time){

    var config = {
    responsive : true,
    type: 'line',
    data: {
      labels: timeY,
      datasets: [{
        label: 'Air Quality',
        data: air,
        backgroundColor: "rgba(0, 143, 151, 1)",
        borderColor:"rgba(0, 143, 151, 1)",
        fillColor : "rgba(39, 197, 205, 1)"
      }]
    },
    options: {
    scales: {
        yAxes: [{
            ticks: {
                suggestedMin: 0,
                suggestedMax: 500
            }
        }]
    }
}
  }

  if (update == 'new') {

  airChart.data.labels.shift();
  airChart.data.labels.push(time);

  airChart.data.datasets[0].data.push(data3)
  airChart.data.datasets[0].data.shift(data3[0]);


  airChart.update();
}else {
   airChart = new Chart(airCtx, config);
}

}

function pieData(update, data4){
data = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [
                    30,10,5
                ],
                backgroundColor: [
                    "rgb(75, 192, 192)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 99, 132)"
                ],
                label: 'Dataset 1'
            }],
            labels: [
                "Normal",
                "Warning",
                "Alert"
            ]
        },
        options: {
            responsive: true
        }
    };
if (update == 'new') {

pieChart.update();
}else {
 pieChart = new Chart(pieCtx, data);
}

}
