//récupération de la chaîne de requête ans l'url

const queryString_url_id = window.location.search;
console.log(queryString_url_id)

const id = queryString_url_id.slice(1);
console.log(id)


//affichage de l'objet  
const urlTeddy="http://localhost:3000/api/teddies/"+id;
const urlCam="http://localhost:3000/api/cameras/"+id;
const urlFurn="http://localhost:3000/api/furniture/"+id;

//promesse teddy
    fetch(urlTeddy)
    .then(async (response)=>{
        try{
            resultat= await response.json();
            console.log(resultat)
            
            const listeProduits = document.getElementById("list-produits");
            const produit=
            `
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
            `

            //formulaire s'adapte au nombre d'option
            const optionQuantite =resultat.colors;
            
            let structureOptions = [];
            
            for (i=0; i<optionQuantite.length; i++){
                structureOptions =structureOptions+ `
                <option value=${i+1}>${optionQuantite[i]}</option>
                `
            }
        
            //injection html produit et option
            listeProduits.innerHTML= produit

            const positionOption = document.querySelector("#perso")
            positionOption.innerHTML = structureOptions

    //......récupération des donnée et envoie au panier......................//
            const idForm = document.querySelector("#perso");
            
                //séléction du btn ajouter
            const btnEnvoi = document.querySelector("#btn_envoi")
            
                //ecouter le btn et envoyer le panier
            btnEnvoi.addEventListener("click", (event)=>{
                event.preventDefault();

                const choixForm = idForm.value;
            console.log(choixForm)
        
                            //recuperation des valeurs du formulaire
                let optionsProduit = {
                    name:resultat.name,  
                    idProduit : resultat._id,  
                    perso:choixForm,
                    quantite: 1,
                    prix:resultat.price/100,
                }
                //console.log(optionsProduit)
            });
        } 
        catch(err){
            console.log(err)
            
        }
    });

//promesse camera
fetch(urlCam)
.then(async (response)=>{
    try{
        resultat= await response.json();
        console.log(resultat)
        const listeProduits = document.getElementById("list-produits");
        const produit=
        `
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
        `
        //formulaire s'adapte au nombre d'option
        const optionQuantite =resultat.lenses;
        
        let structureOptions = [];
        
        for (i=0; i<optionQuantite.length; i++){
            structureOptions =structureOptions+ `
            <option value=${i+1}>${optionQuantite[i]}</option>
            `
        }
    
        //injection html produit et option
        listeProduits.innerHTML= produit

        const positionOption = document.querySelector("#perso")
        positionOption.innerHTML = structureOptions

 //......récupération des donnée et envoie au panier......................//
        const idForm = document.querySelector("#perso");
        
            //séléction du btn ajouter
        const btnEnvoi = document.querySelector("#btn_envoi")
        
            //ecouter le btn et envoyer le panier
        btnEnvoi.addEventListener("click", (event)=>{
            event.preventDefault();

            const choixForm = idForm.value;
            console.log(choixForm)
    
                        //recuperation des valeurs du formulaire
            let optionsProduit = {
                    name:resultat.name,  
                    idProduit : resultat._id,  
                    perso:choixForm,
                    quantite: 1,
                    prix:resultat.price/100,
                }
            console.log(optionsProduit)
        });
    } 
    catch(err){
        console.log(err)
        
    }
});


//promesse meuble
fetch(urlFurn)
.then(async (response)=>{
    try{
        resultat= await response.json();
        console.log(resultat)
        const listeProduits = document.getElementById("list-produits");
        const produit=
        `
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
        `
        //formulaire s'adapte au nombre d'option
        const optionQuantite =resultat.varnish;

        let structureOptions = [];
        
        for (i=0; i<optionQuantite.length; i++){
            structureOptions =structureOptions+ `
            <option value=${i+1}>${optionQuantite[i]}</option>
            `
        }
    
        //injection html produit et option
        listeProduits.innerHTML= produit

        const positionOption = document.querySelector("#perso")
        positionOption.innerHTML = structureOptions
        

 //......récupération des donnée et envoie au panier......................//
        const idForm = document.querySelector("#perso");
        
            //séléction du btn ajouter
        const btnEnvoi = document.querySelector("#btn_envoi")
        
            //ecouter le btn et envoyer le panier
        btnEnvoi.addEventListener("click", (event)=>{
            event.preventDefault();

            const choixForm = idForm.value;
            console.log(choixForm)
    
                        //recuperation des valeurs du formulaire
            let optionsProduit = {
                name:resultat.name,  
                idProduit : resultat._id,  
                perso:choixForm,
                quantite: 1,
                prix:resultat.price/100,
            }
            console.log(optionsProduit)
        });
    } 
    catch(err){
        console.log(err)
        
    }
});
