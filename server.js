const http = require('http');
const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/index.html');
});
const server = http.createServer(app);
server.listen(port,()=>{
    console.log("port : "+ port + " connected...");
});

//socket
const io = require('socket.io')(server);
io.on('connection',(socket)=>{
    console.log('connected');
    socket.on('message',(data)=>{
    socket.broadcast.emit('message',data);
});
});