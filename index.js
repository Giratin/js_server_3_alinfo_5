const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on('connection', socket => {
    console.log("client has connected", socket.id);
    socket.broadcast.emit('connected', { client_id: socket.id, message: 'new connection' })
    socket.on('typing', data => {
        socket.broadcast.emit('typingdata', {})
    })
    socket.on('message', data => {
        socket.broadcast.emit('messages', data);
    })
});



app.use(express.static(path.join(__dirname, 'public')));
app.get("/",(req,res)=>{
    res.sendFile("index.html");
})

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})