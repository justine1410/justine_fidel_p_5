
/**recuperation du local storage**/
let produitStorage = JSON.parse (localStorage.getItem("produit"));
console.log(produitStorage)

//suppression article//
function supprProduit(idSuppr){
    //supprimer du localstorage le produit dont l'id a ete cliquer//
    let newProduitStorage = [];
    produitStorage.forEach(function(element){
        if(element.name+element.perso != idSuppr){
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
function ajoutProduit(ajout){
    let newProduitStorage = [];
    produitStorage.forEach(function(element){
        if(element.quantite != ajout){
            element.quantite++
        };
    });
    
    localStorage.setItem("produit",JSON.stringify(produitStorage));
    document.getElementById("panier").innerHTML="";
    //affiche le nouveau panier//
    affichPanier(produitStorage)
};

//suppression des produits//
function enleveProduit(enleve){
    let newProduitStorage = [];
    produitStorage.forEach(function(element){
        if(element.quantite != enleve){
            newProduitStorage.push(element)
        };
    });
    produitStorage = newProduitStorage;
    localStorage.setItem("produit",JSON.stringify(produitStorage));
    document.getElementById("panier").innerHTML="";
    //affiche le nouveau panier//
    affichPanier(produitStorage)

}

/**Affichage des article du panier**/
function affichPanier(produits) {
    let total= 0;
    produits.forEach(function(element){

            document.getElementById("panier").insertAdjacentHTML("beforeend",`
            <div class="panier">
                <img class="${element.idProduit}" src="${element.image}" alt="teddy.1"/>
                <div class="panier-texte">
                    <h3>${element.name}</h3>
                    <p id="qte"><span class="suppr" id="btn~${element.idProduit} class="btn">-</span> <span id="qte">${element.quantite}</span> <span class="ajout" id="btn~${element.name+element.perso}">+</span> </p>
                    <p class="descript">${element.perso}
                    <p>${element.prix}€</p>
                    <button id="btn~${element.name+element.perso}" class="vider">vider</button>
                </div>    
            </div>
            `);  
            
        
            /**Ajout de produit**/
            let ajout = document.querySelectorAll(".ajout");
            for(i=0; i<ajout.length; i++){
                ajout[i].addEventListener('click', function(event){
                    event.preventDefault();
                    let tabId= event.target.id.split("~");
                    let idAjout=tabId[1];
                    console.log(idAjout)
                    idAjout = element.quantite
                    let ajoutQte = document.querySelectorAll("#qte")               
                    ajoutProduit(ajoutQte)
                });
            };
            
            /**Suppression de produit**/
            let supp= document.querySelectorAll(".suppr");
            for(i=0; i<supp.length; i++){
                supp[i].addEventListener('click', function(event){
                    event.preventDefault();
                    let tabId= event.target.id.split("~");
                    let idSupp=tabId[1];
                    let suppQte = document.querySelectorAll(".qte")               
                    suppQte = element.quantite--
                    enleveProduit(idSupp)
                });
                
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
            if(produitStorage === null || produitStorage ==0){
                total = 0;
            }    
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


