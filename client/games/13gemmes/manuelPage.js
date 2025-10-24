let mods = []
const modData = {}
let currentMod = ""
let currentModSummaryPoint = ""

async function fetchManuelFiles(path) {
    try {
        const res = await fetch('http://localhost:3000/api/manuel?path=' + encodeURIComponent(path));
        const files = await res.json();
        console.log("Fichiers disponibles :", files);
        return files;
    } catch (err) {
        console.error("Erreur fetch manuel :", err);
        return [];
    }
}

async function getData(file) {
    try {
        const module = await import(`/client/games/13gemmes/manuel/${file}`);
        return module.default; // si tu as fait export default {...}
    } catch (err) {
        console.error("Erreur import manuel :", err);
        return null;
    }
}


function manuelPage13gemmesManuelRender(isOwner) {
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
         ${isOwner ? `<button  class="bottomMentions" id="startGame">Démarer la partie</button>` : `<span class="bottomMentions">En attente du démarrage de la partie ...</span>`}
     
    </div>
    `
    renderInHtml(html)
}

async function manuelPage13gemmesManuelPage(isOwner) {

    const files = await fetchManuelFiles("13gemmes/manuel");
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

    manuelPage13gemmesManuelRender(isOwner)


    manuelPage13gemmesManuelAddEvents(isOwner)


}

function manuelPage13gemmesManuelAddEvents(isOwner){
    // events
    document.querySelectorAll(".manuelPage13gemmes .gameMod span").forEach(el => {
        el.addEventListener("click", (e) => {
            currentMod = e.currentTarget.textContent;
            manuelPage13gemmesManuelRender(isOwner)
            console.log("Mod sélectionné :", currentMod);
            document.querySelectorAll(".manuelPage13gemmes .gameMod span").forEach(s => s.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });

    document.querySelectorAll(".manuelPage13gemmes .modSummary span").forEach(el => {
        el.addEventListener("click", (e) => {
            currentModSummaryPoint = e.currentTarget.textContent;
            manuelPage13gemmesManuelRender(isOwner)
            document.querySelectorAll(".manuelPage13gemmes .modSummary span").forEach(s => s.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });


    let button = document.querySelector(".manuelPage13gemmes #startGame")
    if (button && isOwner) {
        button.addEventListener("click", (e) => {
            changeTour13gemmes()
        })
    }
}


//todo : pour l'admin il a une icone pour ouvrir les manuel sinon il est directement sur la config
// todo : pour les autres ils sont directement sur le jeu mais avec le manuel ouvert
