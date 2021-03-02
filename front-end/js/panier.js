/**recuperation du local storage**/

let produitStorage = JSON.parse (localStorage.getItem("produit"));
console.log(produitStorage);
affichPanier(produitStorage);

function affichPanier(produits){
    produits.forEach(element => {
        document.getElementById("panier").insertAdjacentHTML("beforeend",`
        <div class="panier">
            <img src="${element.image}" alt="teddy.1"/>
            <div class="panier-texte">
                <h3>${element.name}</h3>
                <p>Qté :${element.quantite} </p>
                <p class="descript">${element.perso}
                <p>${element.prix}€</p>
            </div>
        </div>
        `);    
    });
};

