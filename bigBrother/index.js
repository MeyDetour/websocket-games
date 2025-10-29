const socket = io('ws://localhost:8008');

socket.emit("adminConnected",null);
socket.on("roomsList",({roomList,adminsSize,players})=>{
    console.log(roomList,adminsSize,players)
    let html  =""


    //Rooms
    for (let elt of  roomList){
       html += ` <div class="room">
        <span>Room ${elt.roomId}</span>
        <div class="players">
        `
        for (let player of  elt.players){
            html  += `<span class="player">${player}</span>`
        }
        html+="</div></div>"
    }
    document.querySelector("#appContainer").innerHTML = html


    // Admin
    document.querySelector("#adminsContainer").innerHTML = ` <span class="admin"> 
          Admins :  ${adminsSize}
       </span> `


    //Players
     html  =""
    for (let elt of  players){
        html += ` <span class="player"> 
            ${elt[1].pseudo}
       </span> `
    }
    document.querySelector("#playersContainer").innerHTML = html

})
