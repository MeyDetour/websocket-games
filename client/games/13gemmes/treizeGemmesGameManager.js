

async function join13gemmesGame() {
    listenSocketIn13gemmes()
    try {
        const roomData = await getRoomData();

        // si la partie n'a pas commencé les invités vont dans le manuel
        if (roomData.creator !== globalSocket.id && roomData.gameDetails.tour === -1) {
            await controller13gemmesManuelPage(roomData)
        } else {
            controller13GemmesGamePage(roomData)
        }
    } catch (err) {
        console.error(err);
    }
}

function listenSocketIn13gemmes() {
    globalSocket.on("tourChanged", (roomData) => {
        if (roomData.gameDetails.tour === 0) {
            start13gemmesGame(roomData)
        }
        controller13GemmesGamePage(roomData)
    })



}


function changeTour13gemmes() {
    console.log("change tour")
    globalSocket.emit("changeTour");
}
function getCard(){

}

function replaceKing(){
    //TODO : quand le roi est changé tous les cartes montré reviennent à nul
}

async function start13gemmesGame(roomData) {

    let deck = create13GemmesGameManager(roomData.players.length,roomData)
    let {newDeck,playersDeck } = distribute13GemmesDeck(deck,roomData)


    roomData.gameDetails.playersDecks = playersDeck
    roomData.gameDetails.discard = []

    let {deckEdited , lastCard } = get13GemmesCardInDeck(newDeck)
    roomData.gameDetails.middleCard = {
        "hasKnight" : false,
        "author" : roomData.creator,
        lastCard
    }
    roomData.gameDetails.deck = deckEdited
    in13GemmesChangeGameDetails(roomData.gameDetails)
}


function in13GemmesChangeGameDetails(gameDetails){
    console.log("send data to server ", gameDetails)
    globalSocket.emit("changeGameDetails", gameDetails)
}
