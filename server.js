let express = require('express');
let app = express(); // creando el express
let server = require('http').createServer(app) // creo el server y le paso el app del express
let io = require('socket.io').listen(server) // configuro el socket para que constantemente escuche al server
users = [];
connections=[];

server.listen(process.env.PORT || 3000);
console.log('server Running ... ') // NOTA PARA CORRER EL SERVIDOR EN EL TERMINAL HAGO: node server
//NOTA, cuando se cambia algo en este archivo debo restart el servidor
app.get('/', function(req, res){ // creando el endpoint para que redireccione al index.html

    res.sendFile(__dirname + '/index.html')

});

io.sockets.on('connection',function(socket){ // Opening a connection with the socket
    connections.push(socket) // al array connections
    console.log('Connected: %s sockets connected', connections.length);
    // Disconnect
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1) // busca el index de socket y lo remueve del array
        console.log('Disconnected: %s sockets connected', connections.length);
    })
    // send message
    socket.on('send message', function(data){
        console.log(data)
        io.sockets.emit('new message',{msg: data})
    })

}) 
// sudo lsof -i :3000 // VER PROCESOS EN EL PUERTO 3000
// for killing the server kill -9 {THE PID}
