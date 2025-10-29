// YOU MUST  ADD SCRIPT BALISE IN INDEX.HTML

// import you css dans index.html

// la div superieur aura la classe avec le nom que le fichier
// <div class="normal manuelPage13gemmes"></div>



export default {
    "Materiel": `  
 
         <h2>Matériel de jeu</h2>
        
        <div class="materiel-roi">
            <div>
                <h2>Cartes Rois</h2>
                <p>Plus de 50 cartes classées par catégorie. Elles constituent votre main de jeu, peuvent être défaussées ou piochées, et peuvent être volées par d'autres joueurs. <br></btr> Chaque carte Roi présente un encadré divisé : la partie gauche indique la ou les <b>conditions (lois)</b> à remplir pour obtenir la <b>récompense</b> située à droite.</p>
            </div>
            <img src="games/13gemmes/images/manuel/normal/materielCard.png" alt="">
        </div>
        
        <div class="materiel-gem">
              <div>
               <h2>Gemmes</h2>
                  <p>L'objectif principal du jeu. Elles doivent être accumulées et conservées avec soin (peuvent être volées).</p>
            </div>   
           <img src="games/13gemmes/images/manuel/normal/materiel-gem.png" alt="">  
       </div>
    
        <div class="materiel-jeton-blason">
                <img src="games/13gemmes/images/manuel/normal/materiel-blason.png" alt="">
                <div>
                      <h2>Jeton Blason</h2>
                        <p>Permet de remplacer une carte de la couleur correspondante pour remplir une condition de loi. <b>Ne peuvent pas</b> être utilisés pour empêcher le vol d'une carte par un autre joueur.</p>
                </div>
        </div>
         <div class="materiel-jeton-garde">
                 <div>
                      <h2>Jeton Garde</h2>
                        <p>Permet de protéger le Roi actuellement en jeu. Le jeton reste actif jusqu'à ce que le Roi qu'il protège soit remplacé.</p>
                </div>
                  <img src="games/13gemmes/images/manuel/normal/materiel-garde.png" alt="">
        </div>
        <div class="materiel-jeton-sword">
                <img src="games/13gemmes/images/manuel/normal/materiel-sword.png" alt="">
                <div>
                      <h2>Jeton Épée (Coup d'État)</h2>
                        <p>Permet de prendre un tour immédiat. L'utilisation du Jeton Épée oblige l'utilisateur à remplacer le Roi actuel. <b>Coût supplémentaire en cas de Garde</b> : si le Roi actuel est protégé par un Jeton Garde, l'utilisateur du Jeton Épée doit défausser 3 cartes de sa main pour retirer ce Garde.</p>
                </div>
        </div>            
`,

    "Objectifs": ` <h2>Objectifs du jeu</h2>
    <p>Le premier joueur à accumuler <b>13 Gemmes</b> gagne immédiatement la partie.</p>
    <p><em>En cas de fin de partie anticipée ou pour l'établissement d'un classement, les joueurs sont classés selon le nombre de Gemmes possédées.</em></p>
 
  `,

    "Déroulement": ` <h2>Déroulement</h2>
    <ol>
        <li>Une carte Roi est placée au centre de la table. Les icônes en haut de cette carte définissent la loi applicable.</li>
        <li>Chaque joueur reçoit <b>6 cartes</b> de départ.</li>
        <li>L'ordre de passage est déterminé par l'ordre d'arrivée (ou une méthode à définir).
            <ul>
                <li>Le 1<sup>er</sup> joueur ne reçoit rien.</li>
                <li>Le 2<sup>e</sup> joueur reçoit 1 Gemme.</li>
                <li>Le 3<sup>e</sup> joueur reçoit 2 Gemmes.</li>
                <li>Le 4<sup>e</sup> joueur reçoit 3 Gemmes, etc.</li>
            </ul>
        </li>
        <li>À chaque tour, le joueur doit effectuer <b>une seule action principale</b> parmi les trois suivantes :
            <ul>
                <li>Appliquer la loi</li>
                <li>Changer le Roi au pouvoir</li>
                <li>Refaire sa main</li>
            </ul>
        </li>
    </ol>`,

    "Actions": ` <h2>Les actions principales</h2>
    <ul>
        <li>
            <h3>Appliquer la loi</h3>
            <p>Regardez la loi (condition et récompense) indiquée sur la carte Roi actuellement au centre. Si vous souhaitez l'appliquer (la "respecter") :</p>
            <ul>
                <li>Vous devez remplir la <b>condition</b> indiquée à gauche (en montrant ou défaussant les cartes demandées).</li>
                <li>Si la condition est remplie, vous obtenez immédiatement la <b>récompense</b> (Gemmes, Blasons, Gardes, Jeton Épée ou vol de Gemmes/Cartes).</li>
                <li><b>Note :</b> Certaines lois de Rois peuvent être appliquées plusieurs fois dans le même tour, à condition de défausser/révéler des cartes différentes à chaque application. Certaines récompenses ne sont réalisables qu'une seule fois.</li>
                <li><b>Contrainte :</b> Si vous ne pouvez pas remplir la condition, l'action sera inaccessible.</li>
            </ul>
        </li>
        <li>
            <h3>Changer le Roi au Pouvoir</h3>
            <p>Jouez une carte Roi de votre main pour recouvrir et rendre inactive la carte Roi précédente. Si vous le souhaitez, vous pouvez ensuite appliquer immédiatement la loi du nouveau Roi.</p>
            <p><b>Exception : Jetons Garde</b></p>
            <p>Si le Roi actuel est protégé par un Jeton Garde, vous devez obligatoirement :</p>
            <ol>
                <li>Donner <b>deux cartes</b> de votre main au joueur qui a posé ce Jeton Garde.</li>
                <li>Retirer le Jeton Garde et le remettre à la Réserve.</li>
                <li>Remplacer le Roi et appliquer sa loi si souhaité.</li>
            </ol>
            <p>Si vous effectuez cette action suite à un Coup d'État (Jeton Épée), vous devez défausser <b>3 cartes</b> pour retirer le Jeton Garde, au lieu d'en donner 2.</p>
        </li>
        <li>
            <h3>Refaire sa main</h3>
            <p>Vous pouvez choisir de défausser de votre main autant de cartes que vous le souhaitez, ou simplement de piocher. Dans tous les cas, vous piochez ensuite des cartes jusqu'à ce que vous ayez à nouveau <b>6 cartes</b> en main.</p>
        </li>
    </ul>`,

    "Actions secondaires": `
             <h2>Les actions secondaires (Jetons)</h2>
    <p>Ces actions peuvent être effectuées en complément de votre action principale, ou pour remplacer certaines conditions.</p>
    <ul>
        <li>
            <h3>Utiliser un Jeton Blason</h3>
            <p>Un Jeton Blason de la couleur correspondante peut être défaussé à la place d'une carte pour remplir une condition de loi. Le Blason est ensuite remis à la Réserve. Exemple : si une loi exige de défausser une carte Rose, un Jeton Blason Rose la remplace.</p>
        </li>
        <li>
            <h3>Utiliser un Jeton Garde</h3>
            <p>Le Jeton Garde peut être placé sur le Roi actuellement en jeu (même s'il n'a pas été posé par vous). Il force l'adversaire qui souhaite remplacer ce Roi à sacrifier des cartes (voir "Changer le Roi au Pouvoir"). Vous pouvez poser un Garde à tout moment après avoir appliqué une loi ou après avoir changé de Roi.</p>
        </li>
        <li>
            <h3>Utiliser le Jeton Épée (Coup d'État)</h3>
            <p>Ce jeton est utilisé pendant le tour d'un autre joueur. Après la fin de son tour, le vôtre commence immédiatement. Tous les joueurs se trouvant entre lui et vous dans l'ordre de jeu initial passent leur tour automatiquement.</p>
        </li>
    </ul>            `,

    "Limite du joueurs": `
    <h2>Limites du joueur</h2>
    <ul>
        <li><b>Cartes en main</b> : Vous ne pouvez jamais avoir plus de <b>6 cartes</b> en main (si un vol vous fait dépasser cette limite, vous devez revenir à 6 cartes au début de votre prochain tour).</li>
        <li><b>Jetons</b> : Vous ne pouvez jamais posséder plus de <b>2 jetons, tous types confondus</b> (Gemmes exclues).</li>
    </ul>

    <h2>Fin de partie</h2>
    <p>La partie prend fin immédiatement dès qu'un joueur atteint ou dépasse un total de <b>13 Gemmes</b>. Ce joueur est déclaré le vainqueur.</p>

    <h2>Paramètres de jeu modifiables</h2>
    <p>Les paramètres suivants peuvent être ajustés pour varier l'expérience de jeu :</p>
    <ul>
        <li>Le nombre de Gemmes à atteindre pour gagner (par défaut : 13)</li>
        <li>Le nombre maximum de cartes reçues au départ et en main (par défaut : 6, maximum suggéré : 10)</li>
        <li>La limite de jetons que chaque joueur peut posséder (par défaut : 2, maximum suggéré : 8)</li>
        <li>L'autorisation du vol de Gemmes.</li>
        <li>L'autorisation du vol de cartes.</li>
    </ul>`


}



