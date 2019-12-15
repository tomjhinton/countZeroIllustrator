import 'bulma'
import './style.scss'
import '@babel/polyfill'


const io = require('socket.io-client')

var socket = io.connect('http://localhost:8080')



const button = document.getElementById('button')
const button2 = document.getElementById('button2')
const button3 = document.getElementById('button3')
const button4 = document.getElementById('button4')
const button5 = document.getElementById('button5')
const button6 = document.getElementById('button6')


button.addEventListener('click', function () {
  socket.emit('click')
  console.log('click')
})

button2.addEventListener('click', function () {
  socket.emit('click2')
  console.log('hiya')
})

button3.addEventListener('click', function () {
  socket.emit('click3')
  console.log('click')
})

button4.addEventListener('click', function () {
  socket.emit('click4')
  console.log('hiya')
})

button5.addEventListener('click', function () {
  socket.emit('click5')
  console.log('hiya')
})

button6.addEventListener('click', function () {
  socket.emit('click6')
  console.log('stop')
})

document.addEventListener('keydown', function (e) {
  if (e.keyCode === 38  ) {

      // up arrow
    socket.emit('click')


    }if (e.keyCode === 40 ) {
    // down arrow

        socket.emit('click2')

    }
    if (e.keyCode === 39 ) {
            // right arrow
    socket.emit('click3')
    }

    if (e.keyCode === 37 ) {
      // left arrow
    socket.emit('click4')
    }
});

//up + right = down
//down + left = up
