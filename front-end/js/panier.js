
/**recuperation du local storage**/
let produitStorage = JSON.parse (localStorage.getItem("produit"));
console.log(produitStorage)

//suppression article//
function supprProduit(idSuppr){
    //supprimer du localstorage le produit dont l'id a ete cliquer//
    let newProduitStorage = [];
    produitStorage.forEach(function(element){
        if(element.idProduit != idSuppr){
            newProduitStorage.push(element);
        }
    });
    produitStorage = newProduitStorage;
    localStorage.setItem("produit",JSON.stringify(produitStorage));
    //vide le panier//
    document.getElementById("panier").innerHTML="";
    //affiche le nouveau panier//
    affichPanier(produitStorage)
}


//ajoute quantité//
function ajoute(idAjout){
    let ajoutnewProduitStorage = [];
    produitStorage.forEach(function(element){
        if(element.quantite == idAjout){
            element.quantite++
        };
    });
};

/**Affichage des article du panier**/
function affichPanier(produits) {
    let total= 0;
    produits.forEach(function(element){
            
            document.getElementById("panier").insertAdjacentHTML("beforeend",`
            <div class="panier">
                <img class="${element.idProduit}" src="${element.image}" alt="teddy.1"/>
                <div class="panier-texte">
                    <h3>${element.name}</h3>
                    <p id="qte"><span id="enleve" class="btn">-</span><span class="qte">${element.quantite}</span><span class="ajout" id="btn~${element.quantite}">+</span> </p>
                    <p class="descript">${element.perso}
                    <p>${element.prix}€</p>
                    <button id="btn~${element.idProduit}" class="vider">vider</button>
                </div>    
            </div>
            `);   

            /**Ajout de produit**/
            let ajout = document.querySelectorAll(".ajout");
            
            console.log(ajout)
            for(i=0; i<ajout.length; i++){
                ajout[i].addEventListener('click', function(event){
                    event.preventDefault();
                    console.log(event)
                    let tabQte= event.target.id.split("~")
                    let ajoutQte = tabQte[1]
                    console.log(ajoutQte)
                    ajoute(ajoutQte)
                })
            };
           

            //suppression des article avec la corbeille// 
            let suppr = document.querySelectorAll(".vider");
            for (i=0; i<suppr.length; i++){
                suppr[i].addEventListener('click',function(event){
                    event.preventDefault();
                    let tabId= event.target.id.split("~");
                    let idSuppression = tabId[1];
                    console.log(idSuppression);
                    supprProduit(idSuppression);
                });
            };
            //calcul du total//
            total=total + element.prix;
            document.getElementById("total").innerHTML= total +"€";
                    
              
    });
   

};

//affichage si le panier et vide ou si le panier et plein//
if(produitStorage === null || produitStorage ==0){
    document.getElementById("panier").insertAdjacentHTML("beforeend",`
<div class="header-présentation">
    <h2>Votre panier est vide</h2>
</div>
`)
}else{
   affichPanier(produitStorage)
};


