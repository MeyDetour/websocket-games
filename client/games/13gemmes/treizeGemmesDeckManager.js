async function create13GemmesGameManager(nbPlayers, roomData) {
    let deck = []

    // continue while deck isn't full
    while (deck.length < get13GemmesDeckSize(nbPlayers, roomData)) {

        // get all cards
        const cards = await getFilesNamesInFolder("13gemmes/images/cartes");
        const headers = await getFilesNamesInFolder("13gemmes/images/card-header");

        let deckLenght = deck.length
        //
        for (let cardIndex = 0; cardIndex < get13GemmesDeckSize(nbPlayers, roomData) - deckLenght; cardIndex++) {
            if (headers.length > 0 && cards.length > 0) {
                let headerIndex = Math.floor(Math.random() * headers.length)
                let imageIndex = Math.floor(Math.random() * cards.length)

                deck.push({
                    "cardHeader": headers[headerIndex],
                    "cardImage": cards[imageIndex],
                    "showed": false,
                })

                headers.splice(headerIndex, headerIndex)
                cards.splice(imageIndex, imageIndex)

            }
        }
    }

    return deck
}

function get13GemmesDeckSize(nbPlayers, roomData) {
    return nbPlayers * 2 * roomData.config.maxCardInHand;
}

function get13GemmesCardInDeck(deck) {
   let lastCard =  {
        "cardHeader": deck[0].cardHeader,
        "cardImage": deck[0].cardImage,
        "showed": false,
    }
    deck.splice(0, 0)
    return {deck,lastCard}
}

function distribute13GemmesDeck(deck, roomData) {
    let playerDeck = {}
    let newDeck = deck
    for (let player of roomData.players) {
        playerDeck[player.id] = {"cards":[],"knight":0,"sword":0,"blazon":0};
        for (let cardIndex = 0; cardIndex < roomData.config.maxCardInHand; cardIndex++) {
            let {deckEdited,lastCard}=get13GemmesCardInDeck(newDeck)
            playerDeck[player.id]["cards"].push(lastCard)
            newDeck = deckEdited
        }
    }
    return {newDeck, playerDeck}
}

// piocher , si pioche est vide , on melange ce qui est passsé

// changer de roi : on passe la carte actuelle en defausse
