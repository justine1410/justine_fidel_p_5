
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
            let ajoutQte = document.querySelectorAll(".qte")
            ajoutQte = element.quantite++
            newProduitStorage.push(element);
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
                    <p id="qte"><span class="suppr" class=".suppr" id="btn~${element.name+element.perso}">-</span> <span class="qte">${element.quantite}</span> <span class="ajout" id="btn~${element.name+element.perso}" id="btn">+</span> </p>
                    <p class="descript">${element.perso}
                    <p class="prix">${element.prix*element.quantite}€</p>
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
                    let idajout = tabId[1];
                    //let ajoutQte = document.querySelectorAll(".qte")
                    //ajoutQte = element.quantite++
                    ajoutProduit(idajout)
                });
            };
           
            
            /**Suppression de produit**/
            let supp= document.querySelectorAll(".suppr");
            for(i=0; i<supp.length; i++){
                supp[i].addEventListener('click', function(event){
                    event.preventDefault();
                    let suppQte = document.querySelectorAll(".qte")               
                    suppQte = element.quantite--
                    enleveProduit(suppQte)
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
            total=total + element.prix * element.quantite;
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



//afficher formulaire du panier//
function afficherFormulaire(){
    const affichForm=
            document.getElementById("formulaire").insertAdjacentHTML("beforeend",`
                <div id="formulaire">
                    <h3>Pour finaliser votre commande, merci d'indiquer vos coordonnées :</h3>
                    <form method="post" class="form" >  
                        <label for="prenom">Prénom :</label>
                        <input type="text"  class="form-control" id="prenom"  required>

                        <label for="Nom">Nom :</label>
                        <input type="text" class="form-control" id="nom"  required>

                        <label for="Adresse">Adresse :</label>
                        <input type="text" class="form-control" id="description" required>

                        <label for="ville">Ville :</label>
                        <input  type="text" class="form-control" id="Ville" required>

                        <label for="email">Email :</label>
                        <input type="text" class="form-control" id="Email" required>

                        <div class="chekbox">
                            <input  type="checkbox" name="info"/>
                            <label  for="info">
                                Enregistrer vos informations
                            </label>
                        </div>
                    </form> 
                    <div class="valid">
                        <a class="valid" href="confirm.html">
                            <button type="submit" >Validez votre commande</button>
                        </a>
                        <a class="valid" href="">
                            <button type="submit" >Continuez vos achat</button>
                        </a>
                    </div>  
                </div>
            `);
};

