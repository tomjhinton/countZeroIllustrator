var app = require('http').createServer(handler),
     io = require('socket.io').listen(app),
     fs = require('fs'),
   five = require('johnny-five');
const {Board, Servo, Animation} = require("johnny-five");
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

 var servo2 = new five.Servo({
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

 const animation = new Animation(servo);
 const animation2 = new Animation(servo2);

   // Enqueue an animation segment with options param
   // See Animation example and docs for details



 io.sockets.on('connection', function (socket) {
   socket.on('click', function () {
     console.log('+10')
     animation.enqueue({
       cuePoints: [0, 0.25, 0.75, 1],
       keyFrames: [10,5,-5,20,10],
       duration: 5000
     });
     // servo.step(+10)

     animation2.enqueue({
       cuePoints: [0, 0.25, 0.75, 1],
       keyFrames: [10,5,-5,20,10],
       duration: 5000
     });
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
 })


})


// const {Board, Servo} = require("johnny-five");
// const board = new Board();
// const controller = 'PCA9685'
// const five = require("johnny-five");
//
// board.on("ready", () => {
//   console.log("Connected");
//   const  expander  =new five.Expander({
//     controller: "PCA9685"
//   });
//   // Initialize the servo instance
//
//   var virtual = new five.Board.Virtual({
//     io: expander
//   });
//
//   var led = new five.Servo({
//     pin: 0,
//     board: virtual
//   });
//
//   const servo = new Servo({
//     controller,
//     pin: 3
//   })
//
//   led.center()
//   servo.to(0)
//
// });
