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
app.get('/api/getfiles', (req, res) => {

    const params = req.query;
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

    socket.on('createRoom', ({roomId, pseudo, gameName, gameParamsObject, gameParamsGame}) => {

        rooms[roomId] = {
            roomId: roomId,
            game: gameName,
            players: [{pseudo : pseudo,id:socket.id}],
            config: gameParamsObject,
            gameDetails: gameParamsGame,
            creator: socket.id,
            messages: [`${pseudo} a créer la partie.`]
        }
        socket.data.roomId = roomId;
        socket.data.game = gameName;
        socket.data.pseudo = pseudo;


        players.set(socket.id, {pseudo, roomId, gameName});

        socket.join(roomId);
        socket.emit('roomCreated', rooms[roomId]);


        updateAdmins();
    })


    socket.on('joinRoom', ({roomId, pseudo, game}) => {

        if (!rooms[roomId]) {
            socket.emit("error", "La room n'existe pas");
            return;
        }

        socket.join(roomId);
        socket.data.roomId = roomId;
        socket.data.game = game;
        socket.data.pseudo = pseudo;


        rooms[roomId].players.push({pseudo :pseudo,id:socket.id});
        rooms[roomId].messages.push(`${pseudo} a rejoint la partie`);
        players.set(socket.id, {pseudo, roomId, gameName: game}); // ✅ Map
        updateAdmins();
        socket.emit('joinRoomValidation', rooms[roomId]);
        io.to(roomId).emit('message',  rooms[roomId].messages);
        io.to(roomId).emit('playerJoinRoom',  rooms[roomId].players);

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
        const {roomId, pseudo} = socket.data;
        admins.delete(socket);
        players.delete(socket.id);
        if (roomId && rooms[roomId]) {
            rooms[roomId].players = rooms[roomId].players.filter(p => p.id !== socket.id);

               // S’il n’y a plus personne, on peut supprimer la roomId
            if (rooms[roomId].players.length === 0) {
                delete rooms[roomId];
            } else {
                if (rooms[roomId].creator === socket.id ) {
                    rooms[roomId].creator =   rooms[roomId].players[0].id
                }

                rooms[roomId].messages.push(`${pseudo} a quitté la partie`);
                io.to(roomId).emit('message',  rooms[roomId].messages);
                io.to(roomId).emit('playerLeftRoom',  rooms[roomId].players);


            }
        }

        updateAdmins();
        // todo : delete room if last user left
        // tODO : si l'admin de la game part le premier joueur apres lui est admin
    });


    socket.on("getRoomData", ({roomId}) => {
        const roomData = rooms[roomId];
        socket.emit("roomDataResponse", roomData);
    });

    socket.on("changeTour", () => {
        const {roomId} = socket.data;
        if (!roomId || !rooms[roomId]) return;

        const detail = rooms[roomId].gameDetails;
        detail.tour = (detail.tour || 0) + 1;
        rooms[roomId].gameDetails = detail;
        io.to(roomId).emit("tourChanged", rooms[roomId]);
    })

    socket.on("changeGameDetails", (gameDetails) => {
        const {roomId} = socket.data;
        if (!roomId || !rooms[roomId]) return;

        rooms[roomId].gameDetails = gameDetails;
        console.log(rooms[roomId] )
        io.to(roomId).emit("gameDetailsChanged", rooms[roomId]);
    })


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

