import 'bulma'
import './style.scss'
import '@babel/polyfill'


const io = require('socket.io-client')

var socket = io.connect('http://localhost:8080')



const button = document.getElementById('button')

button.addEventListener('click', function (e) {
  socket.emit('click')
  console.log('hiya')
})
