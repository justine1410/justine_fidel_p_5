
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
            newProduitStorage.push(element);
        };
    });
    produitStorage = newProduitStorage;
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
                    console.log(idajout);
                    element.quantite++
                    ajoutProduit(idajout)

                });

            };
           
            //Suppression de produit
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
            };  
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
const affichForm=
        document.getElementById("formulaire").insertAdjacentHTML("beforeend",`
            
                <h3>Pour finaliser votre commande, merci d'indiquer vos coordonnées :</h3>
                <form id="form" action=""  method="POST">  
                    <label for="firstName"  >Prénom :</label>
                    <input type="text"  name="firstName" placeholder="corinne" class="form-control" id="firstName" >
                    <small></small><br/>

                    <label for="lastName" >Nom :</label>
                    <input type="text" name="lastName"  placeholder="dupont" class="form-control" id="lastName">
                    <small></small><br/>

                    <label for="adress">Adresse :</label>
                    <input type="text" name="adress"  placeholder="5 rue des oiseaux"  class="form-control" id="adress">
                    <small></small><br/>

                    <label for="city" >Ville :</label>
                    <input type="text" name="ville"  placeholder="toulon" class="form-control" id="city">
                    <small></small><br/>

                    <label for="email"  >Email :</label>
                    <input type="text" name="email" placeholder="ju11@live.Fr" class="form-control" id="email">
                    <small></small><br/>

                    <div class="valid">
                    <p class="valid">
                        <button type="submit" >Validez votre commande</button>
                    </p>
                </div>  
                </form
               
            </div>
        `);

//validation du formulaire
let form = document.querySelector('#form');//j'attrappe mon formulaire
//ecouter la modification 
form.firstName.addEventListener('input', function(){
    validfirstName(this)
});
form.lastName.addEventListener('input', function(){
    validlastName(this)
});
form.adress.addEventListener('input', function(){
    validadress(this)
});
form.city.addEventListener('input', function(){
    validcity(this)
});
form.email.addEventListener('input', function(){
    validEmail(this)
});
// *************************Validation firstName************************
const validfirstName = function(inputfirstName){
    //création de la regexp
    let firstNameRegExp = new RegExp(
        '^[A-Za-z-éèê]+$','g'
    );
   ///recuperation de la balise small
    let small = inputfirstName.nextElementSibling
    //test de l'expression régulière
    if(firstNameRegExp.test(inputfirstName.value)){
        small.innerHTML = "prénom valide"
        small.classList.remove('text-danger')
        small.classList.add('text-success')
    }else{
        small.innerHTML = "prénom non valide"
        small.classList.remove('text-success')
        small.classList.add('text-danger')
    }
}
// *************************Validation lastName************************
const validlastName = function(inputlastName){
    //création de la regexp
    let lastNameRegExp = new RegExp(
        '^[A-Za-z-éèê]+$','g'
    );
    let small = inputlastName.nextElementSibling
    if(lastNameRegExp.test(inputlastName.value)){
        small.innerHTML = "prénom valide"
        small.classList.remove('text-danger')
        small.classList.add('text-success')
    }else{
        small.innerHTML = "prénom non valide"
        small.classList.remove('text-success')
        small.classList.add('text-danger')
    }
}
// *************************Validation adress************************
const validadress=function(inputadress){
    let adressRegExp = new RegExp(
        '^[A-Za-z-éèê ]+$','g'
        );
    let small = inputadress.nextElementSibling
    if(adressRegExp.test(inputadress.value)){
        small.innerHTML = "Adresse valide"
        small.classList.remove('text-danger')
        small.classList.add('text-success')
    }else{
        small.innerHTML="Adresse non valide"
        small.classList.remove('text-success')
        small.classList.add('text-danger')
    };
};
// *************************Validation city************************
const validcity=function(inputcity){
    let cityRegExp = new RegExp(
        '^[A-Za-z-éèê ]+$','g'
        );
    let small = inputcity.nextElementSibling
    if(cityRegExp.test(inputcity.value)){
        small.innerHTML = "ville valide"
        small.classList.remove('text-danger')
        small.classList.add('text-success')
    }else{
        small.innerHTML="ville non valide"
        small.classList.remove('text-success')
        small.classList.add('text-danger')
    };
};
// **********************Validation Email********************************
const validEmail = function(inputEmail){
    let emailRegExp = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$','g'
    );
    let small = inputEmail.nextElementSibling
    if(emailRegExp.test(inputEmail.value)){
        small.innerHTML = "Adresse valide"
        small.classList.remove('text-danger')
        small.classList.add('text-success')

    }else{
        small.innerHTML="Adresse non valide"
        small.classList.remove('text-success')
        small.classList.add('text-danger')
    }
};


//----------------------------addEventListenner------------------//
//Selection du bouton envoie formulaire
const btnEnvoiForm = document.querySelector(".valid");
console.log(btnEnvoiForm)

btnEnvoiForm.addEventListener("click", function(e){
     e.preventDefault();

     //recuperation des valeur du formulaire dans un objet//
     const contact ={
        firstName :document.querySelector("#firstName").value,
        lastName : document.querySelector("#lastName").value,
        adress : document.querySelector("#lastName").value,
        city : document.querySelector("#city").value,
        email : document.querySelector("#email").value,
     }
     //mettre l'objet dans le localstorage//
    localStorage.setItem("contact",JSON.stringify(contact))

    //recuperation de l'idproduit//
    

    //mettre les valeur du formulaire et les produits sélectionné dans un objet a envoyer au serveur//
    const aEnvoyer={
    produitStorage,
    contact
    };
    console.log(aEnvoyer)

    //Envoie vers le serveur//
   
    fetch("http://localhost:3000/api/teddies/order",{
        method:"POST",
        body : aEnvoyer,
    })
    .then(async (response) =>{
      try{
        const resultat = await response.json();
        console.log(resultat)
      }
      catch (e){
        console.log(err);
      }
    });

});


