
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
                
                    <h3>Pour finaliser votre commande, merci d'indiquer vos coordonnées :</h3>
                    <form class="form" >  
                        <label for="firstName">Prénom :</label>
                        <input type="text"  class="form-control" id="firstName"  required>

                        <label for="lastName">Nom :</label>
                        <input type="text" class="form-control" id="lastName"  required>

                        <label for="adress">Adresse :</label>
                        <input type="text" class="form-control" id="adress" required>

                        <label for="city">Ville :</label>
                        <input type="text" class="form-control" id="city" required>

                        <label for="email">Email :</label>
                        <input type="text" class="form-control" id="email" required>

                        <div class="chekbox">
                            <input  type="checkbox" name="info"/>
                            <label  for="info">
                                Enregistrer vos informations
                            </label>
                        </div>
                    </form
                    <div class="valid">
                        <p class="valid">
                            <button type="submit" >Validez votre commande</button>
                        </p>
                        <p class="valid" >
                            <button type="submit" >Continuez vos achat</button>
                        </p>
                    </div>  
                </div>
            `);
};
afficherFormulaire();

//----------------------------addEventListenner------------------//
//Selection du bouton envoie formulaire
const btnEnvoiForm = document.querySelector(".valid");
console.log(btnEnvoiForm)

btnEnvoiForm.addEventListener("click", function(e){
     e.preventDefault();

    //recupération des donnée du formulaire pour les mettre dans le localStrage//

    localStorage.setItem("firstName",document.querySelector("#firstName").value);
    localStorage.setItem("lastName",document.querySelector("#lastName").value);
    localStorage.setItem("adress",document.querySelector("#adress").value);
    localStorage.setItem("city",document.querySelector("#city").value);
    localStorage.setItem("email",document.querySelector("#email").value);

    
    //mettre les valeurs du form dans un objet//
    const contact = {
        prenom: localStorage.getItem("firstName"),
        nom: localStorage.getItem("lastName"),
        adresse: localStorage.getItem("adress"),
        ville: localStorage.getItem("city"),
        mail: localStorage.getItem("email"),
    }
    
    console.log(contact)
});


