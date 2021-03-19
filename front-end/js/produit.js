//récupération de la l'id dans l'url//
const recup_id = new URLSearchParams(window.location.search).get("id"); //va chercher l'id dans l'url
const recup_type = new URLSearchParams(window.location.search).get("type"); //va chercher le type dans l'url
console.log(recup_id)

//affichage de l'objet//
const url="http://localhost:3000/api/"+recup_type+"/"+recup_id; 


//.......................requête......................//
  fetch(url)
  .then(async (response) =>{
    try{
      resultat = await response.json();
      console.log(resultat)
      produit(resultat)
    }
    catch (e){
      console.log(e);
    }
  });

//------------------affichage produit---------------------//
//endoirt ou j' ajoute mes produits//
const carteProduits = document.getElementById("list-produits");

//.....................produit choisie..................//
function produit(){
  //J'ajoute mon texte//
  carteProduits.innerHTML = carteProduits.innerHTML+`
  <div id="produit">
    <img src=${resultat.imageUrl} alt="tedy.1"/>
    <div class="produit-texte">
    <h3 >${resultat.name}</h3>
    <p >${resultat.price/100}€</p>
    <p class="descript">${resultat.description}</p>
    <div class=" perso">
        <label for="perso">Choix de votre&nbsp<span id="choix"></span></label><br/>
        <select name="perso" id="perso">
        </select>
    </div>
    <a class="commande" href="panier.html">
        <button id="btn_envoi" type="submit"> Ajouter au panier</button>
    </a>
    </div>
  </div>
  ` ;
  //je met les options du produit par rapport a son type//
  let choix= document.getElementById("choix");
  let structureOptions = [];  
  if(recup_type === "teddies"){
    let option = resultat.colors;
    choix.innerHTML="couleur";
    for (i=0; i<option.length; i++){
      structureOptions =structureOptions+ `
      <option value=${option[i]}>${option[i]}</option>
      `
    };  
  }
  else if(recup_type === "cameras"){
    let option = resultat.lenses;
    choix.innerHTML="lentille";
    for (i=0; i<option.length; i++){
      structureOptions =structureOptions+ `
      <option value=${option[i]}>${option[i]}</option>
      `
    };  
  }  else if(recup_type === "furniture"){
    let option = resultat.varnish;
    choix.innerHTML="vernis";
    for (i=0; i<option.length; i++){
      structureOptions =structureOptions+ `
      <option value=${option[i]}>${option[i]}</option>
      `
    };  
  }

  const option = document.querySelector("#perso")
  option.innerHTML = structureOptions

  //.............................................récupération des donnée et envoie au panier......................//

  //séléction du btn ajouter//
  const btnEnvoi = document.querySelector("#btn_envoi")

  //ecouter le btn et envoyer le panier//
  btnEnvoi.addEventListener("click", (event)=>{
    event.preventDefault();
    //recupere les valeurs du produit dans un objet//
    produitCommande = {
        image:resultat.imageUrl,
        name:resultat.name,  
        idProduit : resultat._id,  
        perso:option.value,
        quantite: 1,
        prix:resultat.price/100,
    };

    //..........................Le local Storage.................//
    //Je crée un clé dans le localStorage//
    let produit = JSON.parse(localStorage.getItem("produit"));
    
    //fonction fenêtre popup//
    function popConfirm(){
      if(confirm(`${resultat.name} option :${option.value} a bien été ajouté au panier 
      Consultez le panier OK ou revenir à l'acceuil ANNULER`)){
        window.location.href = "panier.html";
      }else{
        window.location.href = "index.html";
      }
    }  
    //je regarde sir produit existe dans le local
    if(produit){
      //je fais une boucle pour verifiez si le produit existe deja
      let existe = false;
      produit.forEach(function(produit){
        if(produit.name == produit.name || produit.perso == produit.perso){
          produit.quantite++;
          existe = true;
          console.log(existe);
        }
      });
      
      if(!existe){
        console.log(existe);
        produit.push(produitCommande);
      }
      localStorage.setItem("produit", JSON.stringify(produit)); 
    }else{
      produit =[];//je crée un tableau vide
      produit.push(produitCommande);
      localStorage.setItem("produit", JSON.stringify(produit)); 
    }
    popConfirm()
  });
};

