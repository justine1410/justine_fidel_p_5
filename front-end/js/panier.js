
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

//rafraichit les produits//
function rafraichProduit(){
    document.getElementById("panier").innerHTML="";
    //affiche le nouveau panier//
    affichPanier(produitStorage)
}

/**Affichage des article du panier**/
function affichPanier(produits) {
    produitStorage=produits;
    let total= 0;
    produitStorage.forEach(function(element){
            document.getElementById("panier").insertAdjacentHTML("beforeend",`
            <div class="panier" >
                <img class="${element.idProduit}" src="${element.image}" alt="teddy.1"/>
                <div class="panier-texte">
                    <h3>${element.name}</h3>
                    <p id="qte"><span id="suppr${element.idProduit}"  class="btn">-</span> <span class="qte">${element.quantite}</span> <span id="ajout${element.idProduit}" class="btn" id="btn">+</span> </p>
                    <p class="descript">${element.perso}
                    <p class="prix">${element.prix*element.quantite}€</p>
                    <button id="btn~${element.idProduit}" class="vider">vider</button>
                </div>    
            </div>
            `);  
    
            /**Ajout de produit**/
            let ajout = document.querySelector("#ajout"+element.idProduit);
                ajout.addEventListener('click', function(e){               
                    element.quantite++
                    rafraichProduit()
                });
           
            //Suppression de produit
            let supp= document.querySelector("#suppr"+element.idProduit);
                supp.addEventListener('click', function(e){              
                    element.quantite--
                    rafraichProduit()
                    if(element.quantite < 1){
                        if(window.confirm("Vous allez retirez cet article!")){
                          supprProduit(element.idProduit)
                          document.location.reload();
                        }
                    }
                });  
            
            //suppression des article avec la corbeille// 
            let suppr = document.querySelectorAll(".vider");
            for (i=0; i<suppr.length; i++){
                suppr[i].addEventListener('click',function(event){
                    event.preventDefault();
                    let tabId= event.target.id.split("~");
                    let idSuppression = tabId[1];
                    supprProduit(idSuppression);
                    if( produitStorage ==0){
                        if(window.confirm("Vous allez retiez le dernier article!")){
                        document.getElementById("panier").insertAdjacentHTML("beforeend",`
                        <div class="header-presentation">
                            <h2>Votre panier est vide</h2>
                        </div>
                        `,
                        document.getElementById("total").innerHTML= "0 €"
                        )};
                    };                           
                });
            };

            //calcul du total//
            total=total + element.prix * element.quantite;
            document.getElementById("total").innerHTML= total +"€";
            if(produitStorage === null || produitStorage ==0){
                total = 0;
            };  
    });
};

//affichage si le panier et vide ou si le panier et plein//
if(produitStorage == null || produitStorage == 0){
    document.getElementById("panier").insertAdjacentHTML("beforeend",`
<div class="header-presentation">
    <h2>Votre panier est vide</h2>
</div>
`)
}else{
   affichPanier(produitStorage)
};




//----------------------------Validation du formulaire------------------//

//les différentes regex
const regfirstName = new RegExp('^[A-Za-z-éèê]+$');
const reglastName = new RegExp('^[A-Za-z-éèê]+$');
const regAdress = new RegExp('^[A-Za-z-éèê0-9 ]+$');
const regEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
const regCity = new RegExp('^[A-Za-z-éèê ]+$');

//une fonction qui teste la valeur des regex
function isValid(regex, valeur){
    return regex.test(valeur);
};

//récuperation du formulaire
const form = document.querySelector("#form");
const input = document.querySelectorAll("input");
const p = document.querySelectorAll(".message")


//je vérifie les champ du formulaire
for(let i=0; i<input.length; i++){
    input[i].addEventListener("input", function(e){
        //fonction pour le message d'erreur
        function message(boolean, ok, erreur){
            if(boolean == true){
                p[i].innerHTML = ok;
            }else{
                p[i].innerHTML = erreur;
            }
        }
        //verification des champs
        if(input[i].id =="firstName"){
            const test = isValid(regfirstName, input[i].value);
            message(test,"champ valide", "champ invalide");
        }else if(input[i].id =="lastName"){
            const test = isValid(reglastName, input[i].value);
            message(test, "champ valide", "champ invalide");    
        }else if(input[i].id == "adress"){
            const test = isValid(regAdress, input[i].value);
            message(test, "champ valide", "champ invalide");
        }else if(input[i].id == "city"){
            const test = isValid(regCity, input[i].value);
            message(test, "champ valide", "champ invalide");
        }else{
            const test = isValid(regEmail, input[i].value);
            message(test, "champ valide", "champ invalide");
        };
    });
};

//envoie du formulaire
form.addEventListener("submit", function(e){
    e.preventDefault();
    let testPassed = 0;
    for(let i=0; i<input.length; i++){
        if(input[i].id =="firstName"){
            if(isValid(regfirstName, input[i].value)){
                testPassed++
            }
        }else if(input[i].id =="lastName"){
            if(isValid(reglastName, input[i].value)){
                testPassed++
            }
        }else if(input[i].id == "adress"){
            if(isValid(regAdress, input[i].value)){
                testPassed++
            }
        }else if(input[i].id == "city"){
            if(isValid(regCity, input[i].value)){
                testPassed++
            }
        }else{
            if(isValid(regEmail, input[i].value)){
                testPassed++
            }
        }
    }
    if ( testPassed == input.length){
            //----------------------------envoie du formulaire dans le localStorage------------------//
    //recuperation des valeur du formulaire dans un objet//
     const contact ={
        firstName :document.querySelector("#firstName").value,
        lastName : document.querySelector("#lastName").value,
        address : document.querySelector("#adress").value,
        city : document.querySelector("#city").value,
        email : document.querySelector("#email").value,
     };

    //selon type
    const types=["teddies","cameras","furniture"];//type des produits
    
    produitStorage.forEach(element =>{
        if(element.type === types[0]){
            //recuperation de l'idproduit//
            let  products= [];
            produitStorage.forEach(element=>{
                if(element.type === types[0]){
                    products.push(element.idProduit);
                }
            });
            //Envoie vers le serveur//
            fetch("http://localhost:3000/api/teddies/order",{
                method:"POST",
                headers:{'Content-type':'application/json'},
                body : JSON.stringify({contact,products}),
                })
            .then(async (response) =>{
                try{
                    const resultat = await response.json();
                    console.log(resultat)
                    localStorage.setItem("valide", JSON.stringify(resultat));
                }
                catch (e){
                    console.log(err);
                }
            });
        }else if(element.type === types[1]){
            //recuperation de l'idproduit//
            let  products= [];
            produitStorage.forEach(element =>{
                if(element.type === types[1]){
                    products.push(element.idProduit);
                }
            });
            fetch("http://localhost:3000/api/cameras/order",{
                method:"POST",
                headers:{'Content-type':'application/json'},
                body : JSON.stringify({contact,products}),
                })
            .then(async (response) =>{
                try{
                    const resultat = await response.json();
                    console.log(resultat)
                    localStorage.setItem("valide", JSON.stringify(resultat));
                }
                catch (e){
                    console.log(err);
                }
            });
        }else{
            //recuperation de l'idproduit//
            let  products= [];
            produitStorage.forEach(element =>{
                if(element.type === types[2]){
                    products.push(element.idProduit);
                }
            });
            fetch("http://localhost:3000/api/furniture/order",{
                method:"POST",
                headers:{'Content-type':'application/json'},
                body : JSON.stringify({contact,products}),
                })
            .then(async (response) =>{
                try{
                    const resultat = await response.json();
                    console.log(resultat)
                    localStorage.setItem("valide", JSON.stringify(resultat));
                }
                catch (e){
                    console.log(err);
                }
            });
        };  
    })
    alert(`Votre commande a bien été envoyée  `)
    window.location.href = "confirm.html";
    }else{
    alert(`Tous les champs ne sont pas renseigné correctement `)
    window.location.href = "";
    };
    
});

