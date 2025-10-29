function hideAll() {
    document.querySelector("#app").innerHTML = ``
}
function renderInHtml(html) {
    document.querySelector("#app").innerHTML = html
}

function render(page, game) {
    hideAll()
    let html = ``
    if (page === "menu") {

        html = showMenu()
    }
    if (page === "connectionMenu" && game) {
        html = showConnectionMenu(game)
    }
    renderInHtml(html)
    addEvents(page)
}


function addEvents(page) {
    if (page === "menu") {
        document.querySelector("#treizeGemmes").addEventListener("click", () => render('connectionMenu', "13 Gemmes"))
    }
    if (page === "connectionMenu") {
        let button = document.querySelector('#createRoom')
        button.addEventListener("click", () => {
            let game = button.getAttribute("data-game")
            let pseudo = document.querySelector("#pseudoName").value
            if (!pseudo) {
                alert("Please enter pseudo")
            } else {

                let gameParamsObject = null;
                let gameParamsGame = null;
                switch (game) {
                    case "13 Gemmes":
                        gameParamsObject = basic13GemmesConfig;
                        gameParamsGame = basic13GemmesGame;
                        break;
                    default:
                        gameParamsObject = basic13GemmesConfig;
                        gameParamsGame = basic13GemmesGame;
                        break;
                }

                createRoom(game, pseudo, gameParamsObject, gameParamsGame)
            }
        })

        const form = document.querySelector('#joinForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Empêche le rechargement de la page

            const pseudo = document.getElementById('pseudoName').value.trim();
            const roomId = document.getElementById('roomId').value.trim();
            const game = document.getElementById('gameType').value;

            if (!pseudo || !roomId) {
                alert("Merci de remplir tous les champs !");
                return;
            }


            joinRoom(game, pseudo, roomId);
        });

    }
}
