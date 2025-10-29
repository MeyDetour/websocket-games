function renderGamePagenamePage(){
    let html = `
    <div class="game13gemmes"></div> 
    `
    renderInHtml(html)

    // events appliqué à la page
    events13GemmesGamePage(roomData)
}


function controllerGamePagenamePage(roomData){
    // affichage de la page
    render13GemmesGamePage()

}


function eventGamePagenamePage(roomData){


    // events
    document.querySelectorAll('.game13gemmes').forEach(element => {

        //   rafraichissement de l'interface
        render13GemmesGamePage()
    })


}
