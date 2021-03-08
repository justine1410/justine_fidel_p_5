//récupération de la l'id dans l'url//
const recup_id = new URLSearchParams(window.location.search).get("id");
const recup_type = new URLSearchParams(window.location.search).get("type");

//affichage de l'objet//
const url="http://localhost:3000/api/"+recup_type+"/"+recup_id;

//......................mes options....................//
function choixoptions(){
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

  //insere les options dans le code html
  const positionOption = document.querySelector("#perso")
  positionOption.innerHTML = structureOptions
};
//................texte a ajoute......................//
function carteProduit(){
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
};
//...............ou j'ajoute mes produits...............//
const carteProduits = document.getElementById("list-produits");

//.....................produit choisie..................//
function produit(){
  carteProduit();
  choixoptions();
  //.............................................récupération des donnée et envoie au panier......................//
  const option = document.querySelector("#perso");
  console.log(option)
  //séléction du btn ajouter//
  const btnEnvoi = document.querySelector("#btn_envoi")
  //ecouter le btn et envoyer le panier//
  btnEnvoi.addEventListener("click", (event)=>{
    event.preventDefault();
    //recupere les valeurs du produit//
    optionsProduit = {
        image:resultat.imageUrl,
        name:resultat.name,  
        idProduit : resultat._id,  
        perso:option.value,
        quantite: 1,
        prix:resultat.price/100,
    };
    console.log(optionsProduit)
    /*..........................Le local Storage.................
          ce qui se trouve dans mon localstorage*/
    let produitStorage = JSON.parse (localStorage.getItem("produit"));
    console.log(produitStorage);
     //fonction fenêtre popup//
    function popConfirm(){
      if(window.confirm(`${resultat.name} option :${option.value} a bien été ajouté au panier 
      Consultez le panier OK ou revenir à l'acceuil ANNULER`)){
        window.location.href = "panier.html";
      }else{
        window.location.href = "index.html";
      }
    }
    function ajoutProduitLocalStorage(){
      produitStorage.push(optionsProduit);
      localStorage.setItem("produit", JSON.stringify(produitStorage));
    };  
    //s'il y a deja de produits d'enregistré//
    if(produitStorage){
      ajoutProduitLocalStorage();
      popConfirm();
      console.log("ok")
    }
    //s'il y a pas de produit//
    else{
        produitStorage =[];
        ajoutProduitLocalStorage();
        popConfirm();
    }
  });
};

//.......................requête......................//
function request(url){
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
};
request(url);
