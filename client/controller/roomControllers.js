//user connected with id and name
let globalSocket = null;
let globalRoomId = null;

function connectSocket(){
    if (globalSocket) return;

    const socket = io('ws://localhost:8008');
    globalSocket = socket;



    socket.on("error", (error) => {
        document.querySelector(".error").textContent = error;
    });

    socket.on("roomDataResponse", (data) => {
        console.log("Room data reçue :", data);
    });

    socket.on('roomCreated', async (roomData) => {
        if (roomData.game === "13 Gemmes") {
            await join13gemmesGame();
        }

    });
    socket.on('joinRoomValidation', async (roomData) => {
        if (roomData.game === "13 Gemmes") {
            await join13gemmesGame();
        }
    });
}

function createRoom(gameName, pseudo, gameParamsObject, gameParamsGame) {
    connectSocket();

    const roomId = "room-" + generateRoomId();
    globalRoomId = roomId;

    globalSocket.emit('createRoom', {roomId, pseudo, gameName, gameParamsObject , gameParamsGame});
}

const joinRoom = (game, pseudo, roomId) => {
    connectSocket()
    globalRoomId = roomId;

    globalSocket.emit('joinRoom', {roomId, pseudo, game,});
}


function generateRoomId() {
    return Math.random().toString(36).substring(2, 8); // ex: "a9f3x1"
}

function getRoomData() {

    if (!globalSocket) return Promise.reject("Pas connecté");

    return new Promise((resolve) => {
        // On écoute une seule fois la réponse
        globalSocket.once("roomDataResponse", (data) => {
            resolve(data);
        });

        globalSocket.emit('getRoomData', { roomId: globalRoomId });
    });

}

//
// const tryTosendMessage = () => {
//     let messageToSend = document.querySelector('.messagerie input').value
//     //save in data base and then render locally
//     sendMessage(messageToSend, userObject.id).then((message) => {
//         socket.emit('message', {
//             content: messageToSend, id: message._id, userObject: userObject
//         })
//     })
//     //empty input texte
//     document.querySelector('.messagerie').value = ""
// }
//
//
// function messagerieController() {
//
//     if (userObject != null) {
//         renderMessagerie()
//
//         getMessages().then((data) => {
//             // to empty content before regenerate
//             messagerie.querySelector('ul').innerHTML = '';
//
//             //add message
//             for (let message of data) {
//                 if (message.userObject.name != null) {
//                     messagerie.querySelector('.messagerie ul').innerHTML += messageTemplate(message.content, message.id, message.userObject.id, message.userObject.name);
//                 }
//             }
//
//         })
//
//     }
// }
//
//
// function tryToRemoveMessage(id) {
//     removeMessage(id).then(r => {
//         if (r.message == 'ok') {
//             const element = document.querySelector(`[data-id='${id}']`);
//             if (element) {
//                 console.log(element);
//                 element.remove();
//             } else {
//                 console.warn('Element not found for id:', id);
//             }
//         }
//     })
// }
//
// const tryToLogin = () => {
//   let  username = document.querySelector('.loginform input[name="username"]').value
//     if (username.trim().length > 0) {
//         login(document.querySelector('.loginform input[name="username"]').value).then(res => {
//             if (res.userObject != null) {
//                 userObject = res.userObject;
//                 messagerieController()
//             }
//         })
//     }
// }
// const tryToRegister = () => {
//    let  username = document.querySelector('.registerform input[name="username"]').value
//
//     if (username.trim().length > 0) {
//         register(username).then(res => {
//             if (res.userObject != null) {
//                 userObject = res.userObject;
//                 messagerieController()
//             }
//         })
//     }
// }
//
//


// Client -> server
// socket.emit('joinRoom', { roomId: '123', pseudo: 'MeïMeï' });
