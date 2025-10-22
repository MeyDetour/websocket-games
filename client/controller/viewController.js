function showMenu() {
    return `<div class="menu page center">
    <button id="treizeGemmes">
        <img src="./games/13gemmes/images/imageForMenu.jpg">
        <span>13 Gemmes</span>
    </button>
</div>`
}

function showConnectionMenu(game) {
    return ` 
    <div class="showConnection page center">
         <input id="pseudoName" type="text" placeholder="Your pseudo">
              <form id="joinForm">
                <h2>Join room</h2>
                <span class="error"></span>
                <input id="roomId" name="roomId" type="text" placeholder="Room name">
                <input type="hidden" id="gameType" value="${game}">
                <button type="submit" id="joinRoom">Join</button>
              </form>
         <span> Or </span>
         <button id="createRoom" data-game="${game}">Create room</button>
    </div>
     `
}

