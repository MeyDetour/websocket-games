function render13GemmesGamePage(roomData) {
     let html = `
    <div class="game13gemmes">
    
        <div class="top">
        
        </div>  
        <div class="bottom">
        
        </div>
    </div> 
    `
    renderInHtml(html)
}


function controller13GemmesGamePage(roomData){
    // affichage de la page
    render13GemmesGamePage(roomData)

    // events appliqué à la page
    events13GemmesGamePage(roomData)
}


function events13GemmesGamePage(roomData){


    // events
   // document.querySelectorAll('.game13gemmes').forEach(element => {

        //   rafraichissement de l'interface
    //    render13GemmesGamePage(roomData)
  //  })


}
