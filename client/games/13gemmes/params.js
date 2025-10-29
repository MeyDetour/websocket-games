function render13GemmesParamsPage(roomData) {
    let html = `
    <div class="params13gemmes">
     
        ${
         roomData.creator === globalSocket.id ? 
             `<span>Vous pouvez modifier les params</span>`
             :
             `<span>Vous ne pouvez pas modifer</span>`
         }       
 
         <button  class="bottomMentions" id="close">Fermer</button> 
     
    </div> 
    `
    renderInHtml(html)
    // events appliqué à la page
    events13GemmesParamsPage(roomData)
}


function controller13GemmesParamsPage(roomData){
    if (!globalSocket ) {
        showConnectionMenu("13 Gemmes")
        return
    }
    // affichage de la page
    render13GemmesParamsPage(roomData)

}


function events13GemmesParamsPage(roomData){

    let button = document.querySelector(".params13gemmes #close")
    if (button ) {
        button.addEventListener("click", (e) => {
            controller13GemmesGamePage(roomData)
        })
    }


}
