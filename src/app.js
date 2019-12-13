import 'bulma'
import './style.scss'
import '@babel/polyfill'


const io = require('socket.io-client')

var socket = io.connect('http://localhost:8080')



const button = document.getElementById('button')
const button2 = document.getElementById('button2')
const button3 = document.getElementById('button3')
const button4 = document.getElementById('button4')

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
