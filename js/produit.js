//récupération de la chaîne de requête ans l'url

const queryString_url_id = window.location.search;
console.log(queryString_url_id)

const id = queryString_url_id.slice(1);
console.log(id)


//affichage de l'objet  
const urlTeddy="http://localhost:3000/api/teddies/"+id;
const urlCam="http://localhost:3000/api/cameras/"+id;
const urlFurn="http://localhost:3000/api/furniture/"+id;



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
 request(urlTeddy)


 //texte à ajouté
const choixProduits = document.getElementById("list-produits");

 function produit(){
     choixProduits.innerHTML = choixProduits.innerHTML+`
     <div id="produit">
        <img src=${resultat.imageUrl} alt="tedy.1"/>
        <div class="produit-texte">
        <h3 >${resultat.name}</h3>
        <p >${resultat.price/100}€</p>
        <p >${resultat.description}</p>
        <div class=" perso">
            <label for="perso">Choix de votre couleur:</label><br/>
            <select name="perso" id="perso">
            </select>
        </div>
        <a class="commande" href="panier.html">
            <button id="btn_envoi" type="submit"> Ajouter au panier</button>
        </a>
        </div>
    </div>
  ` ;
   //les options
  const optionQuantite =resultat.colors;     
  let structureOptions = [];
  
  for (i=0; i<optionQuantite.length; i++){
      structureOptions =structureOptions+ `
      <option value=${i}>${optionQuantite[i]}</option>
      `
  };

    //injection html option des produits
  const positionOption = document.querySelector("#perso")
  positionOption.innerHTML = structureOptions

  //......récupération des donnée et envoie au panier......................//
  const idForm = document.querySelector("#perso");
  //séléction du btn ajouter
  const btnEnvoi = document.querySelector("#btn_envoi")
  
  //ecouter le btn et envoyer le panier
  btnEnvoi.addEventListener("click", (event)=>{
    event.preventDefault();
    const choixForm =idForm.value;
    console.log(choixForm)
      //recuperation des valeurs du formulaire
    optionsProduit = {
        name:resultat.name,  
        idProduit : resultat._id,  
        perso:choixForm,
        quantite: 1,
        prix:resultat.price/100,
    };
    console.log(btnEnvoi)
            //..........................Le local Storage.................

            //JSON.parse convertit les données au foramt JSON en objet JAVASCRIPT
            //variable on on va mettre les key et les values qui sont dans le local storage
    let produitStorage = JSON.parse (localStorage.getItem("produit"));
    console.log(produitStorage);

              //fonction fenêtre popup
    const popConfirm =() =>{
      if(window.confirm(`${resultat.name} option :${choixForm} a bien été ajouté au panier 
      Consultez le panier OK ou revenir à l'acceuil ANNULER`)){
        window.location.href = "panier.html";

      }else{
        window.location.href = "/index.html";
      }
    }

    const ajoutProduitLocalStorage=()=>{
      produitStorage.push(optionsProduit);
      localStorage.setItem("produit", JSON.stringify(produitStorage));
    };

              //s'il y a deja de produits d'enregistré
    if(produitStorage){
      ajoutProduitLocalStorage();
      popConfirm();
      console.log("ok")
    }
      //s'il y a pas de produit
    else{
        produitStorage =[];
        ajoutProduitLocalStorage();
        popConfirm();
    }
  });
 };
