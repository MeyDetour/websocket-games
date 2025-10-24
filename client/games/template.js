function render13GemmesGamePage(){
    let html = `
    <div class="game13gemmes"></div> 
    `
    renderInHtml(html)
}


function controller13GemmesGamePage(roomData){
    // affichage de la page
    render13GemmesGamePage()

    // events appliqué à la page
    events13GemmesGamePage(roomData)
}


function events13GemmesGamePage(roomData){


    // events
    document.querySelectorAll('.game13gemmes').forEach(element => {

        //   rafraichissement de l'interface
        render13GemmesGamePage()
    })


}
