var app = require('http').createServer(handler),
     io = require('socket.io').listen(app),
     fs = require('fs'),
   five = require('johnny-five');
const {Board, Servo} = require("johnny-five");
app.listen(8080)

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

let board = new five.Board();
board.on("ready", function() {


  // let led = new five.Led(11);
  //
  //
  // io.sockets.on('connection', function (socket) {
  //   socket.on('click', function () {
  //     console.log('clicked')
  //     led.stop().off()
  //   });
  //   socket.on('click2', function () {
  //     console.log('clicked')
  //     led.pulse({
  //   easing: "linear",
  //   duration: 3000,
  //   cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
  //   keyFrames: [0, 10, 0, 50, 0, 255],
  //   onstop() {
  //     console.log("Animation stopped");
  //   }
  // });
  //   });
  // })

  var servo = new five.Servo({
    id: "MyServo",     // User defined id
    pin: 10,           // Which pin is it attached to?
    type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
    range: [0,180],    // Default: 0-180
    fps: 100,          // Used to calculate rate of movement between positions
    invert: false,     // Invert all specified positions
    startAt: 90,       // Immediately move to a degree
    //center: true,      // overrides startAt if true and moves the servo to the center of the range
  });
  board.repl.inject({
   servo
 })


 io.sockets.on('connection', function (socket) {
   socket.on('click', function () {
     //console.log(servo)
     servo.step(+10)
   })

   socket.on('click2', function () {
     //console.log(servo)
     servo.step(-10)
   })
 })



})
