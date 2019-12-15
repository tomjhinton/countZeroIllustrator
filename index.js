const app = require('http').createServer(handler),
     io = require('socket.io').listen(app),
     fs = require('fs'),
   five = require('johnny-five');
const {Board, Servo, Animation, Servos} = require("johnny-five");
app.listen(8080)
const controller = 'PCA9685'
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

const board = new five.Board();
board.on("ready", function() {

console.log('ready')

  const servo = new five.Servo({
    controller,
    id: "MyServo",
    address: 0x40,
        // User defined id
    pin: 0,           // Which pin is it attached to?
    type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
    range: [0,180],    // Default: 0-180
    fps: 100,          // Used to calculate rate of movement between positions
    invert: false,     // Invert all specified positions
    startAt: 90,       // Immediately move to a degree
    center: true,      // overrides startAt if true and moves the servo to the center of the range
  });
 //  board.repl.inject({
 //   servo
 // })

 const servo2 = new five.Servo({
   controller,
   id: "MyServo",
   address: 0x40,
       // User defined id
   pin: 11,           // Which pin is it attached to?
   type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
   range: [0,180],    // Default: 0-180
   fps: 100,          // Used to calculate rate of movement between positions
   invert: false,     // Invert all specified positions
   startAt: 90,       // Immediately move to a degree
   center: true,      // overrides startAt if true and moves the servo to the center of the range
 });
 const both = new Servos([servo, servo2])
 const animation = new Animation(servo);
 const animation2 = new Animation(servo2);

 const animation3 = new Animation(both);

   // Enqueue an animation segment with options param
   // See Animation example and docs for details



 io.sockets.on('connection', function (socket) {
   socket.on('click', function () {
     // console.log('+10')
     // animation.enqueue({
     //   cuePoints: [0, 0.25, 0.75, 1],
     //   keyFrames: [10,10,-10,20,10],
     //   duration: 5000
     // });
     servo.step(+10)

     // animation2.enqueue({
     //   cuePoints: [0, 0.25, 0.75, 1],
     //   keyFrames: [10,10,-10,20,10],
     //   duration: 5000
     // });
   })

   socket.on('click2', function () {
     //console.log(servo)
     servo.step(-10)
   })
 })

 io.sockets.on('connection', function (socket) {
   socket.on('click3', function () {
     console.log('+10')
     servo2.step(+10)
   })

   socket.on('click4', function () {
     //console.log(servo)
     servo2.step(-10)
   })

   socket.on('click5', function () {
     //console.log(servo)
     animation3.enqueue({
    duration: 2000,
     cuePoints: [0, 0.25, 0.5, 0.75, 1.0],
    keyFrames: [
       [ {degrees: 0}, {degrees: 135}, {degrees: 45}, {degrees: 180}, {degrees: 0}],
       [ {degrees: 0}, {degrees: 135}, {degrees: 45}, {degrees: 180}, {degrees: 0}]

    ]

  })

   })

   socket.on('click5', function () {
     //console.log(servo)
     animation3.stop()

   })



 })





})
