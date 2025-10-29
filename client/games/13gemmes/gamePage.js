
function getSpanColorClassin13Gemmes(text){
    if (text.includes("a rejoint la partie")){
        return "#087610"
    }  if (text.includes("a quitté la partie")){
        return "#760808"
    }

    return null

}
function render13GemmesGamePage(roomData) {
    let html = `
    <div class="game13gemmes">
    
        <div class="top ${roomData.gameDetails.tour === -1 ? "waiting" : ""}">
        
        <div class="icon">
            <button id="manuel"><img src="games/13gemmes/images/icons/manuel icon.png" alt=""></button>
            <button id="glossaire"><img src="games/13gemmes/images/icons/glossaire icon.png"  alt=""></button>
            <button id="params"><img src="games/13gemmes/images/icons/settings icon.png"  alt=""></button>
        </div>
        
        
          ${roomData.gameDetails.tour === -1 ?
        ` <div class="left">
                   <div class="players">
                      <h2>Joueurs</h2>
                          <div class="players-wrap">
                             ${roomData.players.map(player =>  
                                    `<span style="${ player.id === globalSocket.id ? "font-weight:bold":""}">${player.pseudo}</span>`
                                ).join('')}     
                            </div>
                    </div>
                    <div class="chat">
                     <h2>Logs</h2>
                      ${roomData.messages.map(m => `<span style="${getSpanColorClassin13Gemmes(m) ? `color:${getSpanColorClassin13Gemmes(m)}` : ""}">${m}</span>`).join('')}
                    </div>
            </div>
            <div class="right">
                ${roomData.creator === globalSocket.id ?
                     `<p>Vous seul pouvez démarer la partie et modifier les parametres</p> `
                    :`<p>Seul le créateur de la partie peut modifier les paramètres</p>  `
                }
            
                    <p>Copiez le code et invitez vos amis</p>
               
                   
                    <div class="links">
                            <div>
                                 <p>Room Id</p>
                                  <p class="toCopy">${roomData.roomId}</p>
                            </div>
                             <div>
                                   <p>Site </p>
                                   <p class="toCopy">https://game.genos-center.com</p> 
                                <!--     TODO : place url-->
                             </div>
                    </div>
                    
                     ${roomData.creator === globalSocket.id ? ` <button id="startGame">Démarrer</button>    ` : `  <p>En attente du démarrage de la partie</p> `}
            </div> `  :    ``


    }
        
        
        
        </div>  
        <div class="bottom">
                  ${roomData.gameDetails.tour >= 0 &&   roomData.gameDetails.cardDecks ?
                `<div class="card-wrapper">
                       ${(roomData.gameDetails.cardDecks[globalSocket.id] || [])
                    .map(c => `
                              <div class="card">
                                  <img class="cardImage" src="games/13gemmes/images/cartes/${c.cardImage}" alt=""/>
                                  <img class="cardHeader" src="games/13gemmes/images/cartes/${c.cardHeader}" alt=""/>
                              </div>
                          `)
                    .join('')}
                </div> `: ``}
        </div>
        
   
        
    </div> 
    `
    renderInHtml(html)
    // events appliqué à la page
    events13GemmesGamePage(roomData)
}


function controller13GemmesGamePage(roomData) {
    if (!globalSocket ) {
        showConnectionMenu("13 Gemmes")
        return render
    }
    render13GemmesGamePage(roomData)

    globalSocket.on('message', (messageList) => {
      let messagesContainer =  document.querySelector(".game13gemmes .top .chat")
        if (messagesContainer) {
            messagesContainer.innerHTML = `
              <h2>Logs</h2>
             ${messageList.map(m => `<span style="${getSpanColorClassin13Gemmes(m) ? `color:${getSpanColorClassin13Gemmes(m)}` : ""}">${m}</span>`).join("")}
            `
        }
    })
    globalSocket.on('playerJoinRoom', (players) => {
      let playerContainer =  document.querySelector(".game13gemmes .top .players-wrap")
        if (playerContainer) {
            playerContainer.innerHTML = ` 
              ${players.map(player =>
                `<span style="${ player.id === globalSocket.id ? "font-weight:bold":""}">${player.pseudo}</span>`
            ).join('')}     
            `
        }
    })
    globalSocket.on('playerLeftRoom', (players) => {
      let playerContainer =  document.querySelector(".game13gemmes .top .players-wrap")
        if (playerContainer) {
            playerContainer.innerHTML = ` 
              ${players.map(player =>
                `<span style="${ player.id === globalSocket.id ? "font-weight:bold":""}">${player.pseudo}</span>`
            ).join('')}      
            `
        }
    })

    globalSocket.on("gameDetailsChanged",(newData)=>{
        console.log(newData);
        render13GemmesGamePage(newData)
    })

}


function events13GemmesGamePage(roomData) {


    console.log("add click on ", document.querySelector('.game13gemmes .icon #manuel'))

    document.querySelector('.game13gemmes .icon #manuel').addEventListener("click", () => {
        console.log("click on manuel")
        controller13gemmesManuelPage(roomData)
    })
    document.querySelector('.game13gemmes .icon #glossaire').addEventListener("click", () => {
        console.log("click on glossaire")

    })
    document.querySelector('.game13gemmes .icon #params').addEventListener("click", () => {
        console.log("click on glossaire")
        controller13GemmesParamsPage(roomData)
    })
    let startGameButton = document.querySelector('.game13gemmes  #startGame')
    if (startGameButton) {
        startGameButton.addEventListener("click", () => {
            console.log("start game")
            changeTour13gemmes()
        })
    }


    // events
    // document.querySelectorAll('.game13gemmes').forEach(element => {

    //   rafraichissement de l'interface
    //    render13GemmesGamePage(roomData)
    //  })


}
