const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app)

const io = socketio(server, {
    cors: {origin: "*"}
});

const connectedUsers = {}

io.on('connection', socket => {
    console.log('Usuario conectado', socket.id);
    //enviar - emit
    // socket.emit('message', 'hello word');

    // ouvir On 
    //   socket.on('mensagem', data =>{
    //     console.log(data);
    //   })
    // console.log(socket.handshake.query)
   const { user_id } = socket.handshake.query; 
   connectedUsers[user_id] = socket.id
    
})
//deixar disponivel para toda aplicação
//use = adicionar uma funcionalidade em todas as rotas
// mindleware
app.use((req, res, next) => {

    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})


const routes = require('./routes');


mongoose.connect('mongodb+srv://celsoarn251:celsobr119@uc9apirest.gofdjls.mongodb.net/uc9apirest?retryWrites=true&w=majority')

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333, () => {
    console.log(`Server is listening on Port 3333`);
})

// GET, POST, PUT e DELETE
// JSON
// {
//     "chave":"valor",
// }

// query params = Acessa query params (para filtros) => parametros na URL
// route params = req.params, são usados para (edição e delete)
// req.body = acessar o corpo da requisição (para criação e edição)

