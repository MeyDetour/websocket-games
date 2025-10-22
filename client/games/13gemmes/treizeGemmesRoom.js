function game13gemmesGetParamsObject() {
    return  basic13GemmesConfig
}

async function join13gemmesGame() {
    listenSocketIn13gemmes()
    tourSocketController13gemmes()
    try {
        const roomData = await getRoomData();

       if (roomData.config.tour ===-1) {
           manuelPage13gemmesManuelPage(globalSocket.id === roomData.creator)
       }
    } catch (err) {
        console.error(err);
    }
}

function listenSocketIn13gemmes(){

}

function tourSocketController13gemmes(){
    globalSocket.on("tourHasChanged", ()=>{

    })

}
function changeTour13gemmes(){
    globalSocket.emit("changeTour");
}
