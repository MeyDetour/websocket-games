// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const cors = require('cors');
const app = express();
const PORT = 3000;


app.use(express.static('public'));

app.use(cors({
    origin: '*' // ou '*' pour tout le monde
}));


const BASE_DIR = path.join(__dirname, '../client/games/');
 app.get('/api/manuel', (req, res) => {

    const params = req.query;
    console.log("call api")
    const safePath = path.normalize(path.join(BASE_DIR, params.path || ''));
    console.log(safePath);


// Vérifie que safePath reste dans BASE_DIR
    if (!safePath.startsWith(BASE_DIR)) {
        return res.status(400).json({error: 'Chemin non autorisé'});
    }

    fs.readdir(safePath, (err, files) => {
        if (err) return res.status(500).json({error: 'Impossible de lire le dossier'});
        res.json(files);
    });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});


const http = require('http');
const {Server} = require('socket.io');

// Création du serveur HTTP de base
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Serveur Socket.io en fonctionnement');
});

// Initialisation de Socket.io
const io = new Server(server, {
    transports: ['websocket', 'polling'],
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});
let rooms = {}
const admins = new Set(); // liste des sockets admin
const players = new Map();
// Gestion des connexions clients
io.on('connection', (socket) => {

    socket.on('createRoom', ({roomId, pseudo, gameName, gameParamsObject}) => {

        rooms[roomId] = {
            roomId: roomId,
            game: gameName,
            players: [pseudo],
            config: gameParamsObject,
            creator: socket.id,
        }
        socket.data.room = roomId;
        socket.data.game = gameName;
        socket.data.pseudo = pseudo;

        console.log(socket.data)

        players.set(socket.id, {pseudo, roomId, gameName});
        socket.join(roomId);
        console.log(`${pseudo} a créé la room ${roomId} pour le jeu ${gameName}`);
        console.log("config :" + JSON.stringify(gameParamsObject))
        // Confirme au créateur
        socket.emit('roomCreated', {roomId});

        // Diffuse un message d’annonce dans la room
        io.to(roomId).emit('message', {
            userObject: {pseudo},
            content: `${pseudo} a créé une partie de ${gameName}`,
            id: Date.now() + pseudo,
        });
        updateAdmins();
    })

    socket.on('message', (data) => {
        const room = socket.data.room;
        if (!room) return;
        io.to(room).emit('message', data);
    });


    socket.on('joinRoom', ({roomId, pseudo, game}) => {

        if (!rooms[roomId]) {
            socket.emit("error", "La room n'existe pas");
            return;
        }

        socket.join(roomId);

        rooms[roomId].players.push(pseudo);
        players.set(socket.id, {pseudo, roomId, gameName: game}); // ✅ Map

        console.log(`${pseudo} a rejoint la room ${roomId}`);
        updateAdmins();

        io.to(roomId).emit('message', {
            userObject: {pseudo},
            content: `${pseudo} a rejoint la partie`,
            id: Date.now() + pseudo,
        });


        socket.emit('joinRoomValidation', {roomId});

    });


    socket.on('adminConnected', () => {
        console.log(`[ADMIN CONNECTÉ] `);
        admins.add(socket)
        updateAdmins()
    });


    // Envoi d’un message de bienvenue
    socket.emit('connectionValidation', 'Welcome!');


    // === Quand un joueur quitte ===
    socket.on('disconnect', () => {
        admins.delete(socket);
        players.delete(socket.id);
        updateAdmins();

        // tODO : si l'admin de la game part le premier joueur apres lui est admin
    });


    socket.on("getRoomData", ({roomId}) => {
        console.log("Demande de données pour room :");
        console.log("Demande de données pour room :", roomId);
        const roomData = rooms[roomId];
        console.log(roomData)
        socket.emit("roomDataResponse", roomData);
    });

});


function updateAdmins() {
    const roomList = Object.values(rooms);
    const playersArray = Array.from(players);

    for (const admin of admins) {
        admin.emit('roomsList', {roomList, adminsSize: admins.size, players: playersArray});
    }
}

// Lancement du serveur

server.listen(8008, () => {
    console.log(`Serveur WebSocket en écoute sur le port 8008`);
});


// server -> client du socket
// socket.emit('welcome', 'Bienvenue dans la room !');

// SERVEUR → TOUS LES CLIENTS
// io.emit('message', { author: 'Serveur', content: 'Une nouvelle partie commence !' });


// Serveur envoie à tous sauf à l'experiditeur
// socket.on('message', (msg) => {
//     // renvoie à tout le monde SAUF l’émetteur
//     socket.broadcast.emit('message', { author: socket.id, content: msg });
// });

// Server -> Room
// io.to('room-123').emit('message', { content: 'Bienvenue dans la room 123 !' });

// Server -> client de la room sauf experidteur de playerMove
// socket.on('playerMove', (data) => {
//     socket.to(data.roomId).emit('playerMove', data);
// });


// server to client
// io.to(targetSocketId).emit('privateMessage', "Salut, c'est un message privé !");

