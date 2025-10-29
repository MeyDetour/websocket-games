let mods = []
let modData = {}
let currentMod = ""
let currentModSummaryPoint = ""


async function getData(file) {
    try {
        const module = await import(`/client/games/13gemmes/manuel/${file}`);
        return module.default; // si tu as fait export default {...}
    } catch (err) {
        console.error("Erreur import manuel :", err);
        return null;
    }
}


function manuelPage13gemmesManuelRender(roomData) {

    let html = `
    <div class='manuelPage13gemmes ${currentMod}'>
        <div class="gameMod"> 
            ${mods.map(mod => `<span class="${mod === currentMod ? 'active' : ''}">${mod}</span>`)}
       </div>
        <div class="modExplication">
        ${modData[currentMod][currentModSummaryPoint]}
        </div>
        <div class="modSummary">
            ${Object.keys(modData[currentMod]).map(key => `<span class="${key === currentModSummaryPoint ? 'active' : ''}">${key}</span>`).join('')}
        </div>
        <button  class="bottomMentions" id="close">Fermer</button> 
     
    </div>
    `
    renderInHtml(html)

    manuelPage13gemmesManuelAddEvents(roomData)
}

async function controller13gemmesManuelPage(roomData) {

    if (!globalSocket ) {
        showConnectionMenu("13 Gemmes")
        return render
    }
    mods = []
    modData = {}

    currentMod = ""
    currentModSummaryPoint = ""
    const files = await getFilesNamesInFolder("13gemmes/manuel");
    if (!files) {
        alert("add mod in manuel folder");
    }
    for (let f of files) {
        if (f.endsWith(".js")) {
            const data = await getData(f);
            mods.push([f.split('.')[0]])
            modData[f.split('.')[0]] = data;
        }

    }

    currentMod = mods[0]
    currentModSummaryPoint = Object.keys(modData[currentMod])[0]

    manuelPage13gemmesManuelRender(roomData)




}

function manuelPage13gemmesManuelAddEvents(roomData){
    // events
    document.querySelectorAll(".manuelPage13gemmes .gameMod span").forEach(el => {
        el.addEventListener("click", (e) => {
            currentMod = el.textContent;
            console.log("Mod sélectionné :", currentMod);
            document.querySelectorAll(".manuelPage13gemmes .gameMod span").forEach(s => {
                s.classList.remove('active')
            });
            el.classList.add('active');

            manuelPage13gemmesManuelRender()
        });
    });

    document.querySelectorAll(".manuelPage13gemmes .modSummary span").forEach(el => {
        el.addEventListener("click", (e) => {
            console.log(el.textContent)
            currentModSummaryPoint = el.textContent;
            console.log(currentModSummaryPoint)
            document.querySelectorAll(".manuelPage13gemmes .modSummary span").forEach(s => {
                s.classList.remove('active')
            });
            el.classList.add('active');

            manuelPage13gemmesManuelRender()
        });
    });


    let button = document.querySelector(".manuelPage13gemmes #close")
    if (button ) {
        button.addEventListener("click", (e) => {
            controller13GemmesGamePage(roomData)
        })
    }
}


//todo : pour l'admin il a une icone pour ouvrir les manuel sinon il est directement sur la config
// todo : pour les autres ils sont directement sur le jeu mais avec le manuel ouvert
