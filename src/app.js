import 'bulma'
import './style.scss'
import '@babel/polyfill'


const io = require('socket.io-client')

var socket = io.connect('http://localhost:8080')



const button = document.getElementById('button')
const button2 = document.getElementById('button2')

button.addEventListener('click', function (e) {
  socket.emit('click')
  console.log('click')
})

button2.addEventListener('click', function (e) {
  socket.emit('click2')
  console.log('hiya')
})
