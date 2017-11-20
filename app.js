// app.js
var express = require('express');
var path = require('path')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://iot.eclipse.org')

client.on('connect', function () {
  client.subscribe('techo_climate')
  client.subscribe('techo_rotation')
  client.publish('techo_presence', 'Server Running')
})

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/js'));

app.use(express.static(__dirname + '/node_modules'));

app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/index', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/imu', function(req, res,next) {
    res.sendFile(__dirname + '/imu.html');
});

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   console.log('A user connected');
  client.on('message', function (topic, message) {
    console.log(topic);
    if (topic == "techo_climate") {
      var data1 = message.toString()
      var temp1 = data1.replace(/\s/g, "")
      var array1 = temp1.split(',');
      console.log(array1);
      socket.emit('techo_climate',array1);
    }else {
    var data = message.toString()
    var temp = data.replace(/\s/g, "")
    var array = temp.split(',');
    console.log(array);
    socket.emit('techo_vib',array);
}

//  console.log(message.toString())
})

   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
//
// var sendToFront = function(data){
// var data = JSON.stringify(data);
// var data1 = JSON.parse(data);
//   console.log(data1.temp);
//
// }


});


server.listen(3000, function() {
   console.log('listening on *:3000');
});
