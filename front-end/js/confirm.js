
let valid = JSON.parse(localStorage.getItem("valide"));
let produit = JSON.parse(localStorage.getItem("produitcommande"));

console.log(valid);
//--------------message de validation------------------//
let merci = document.querySelector('.confirmation');
 merci.innerHTML = `           
 <h2>Votre commande a bien été validé. </h2><br/>
 <p>${valid.contact.firstName+" "+valid.contact.lastName}, votre commande n°${valid.orderId} sera bientôt envoyée</p>
 <p>Un mail vous sera envoyée à votre adresse mail : ${valid.contact.email}.</p>
 <p>Nous vous remercions pour votre confiance</p>
 <p>A bientôt</p>
`;


//----------------recapitulation de la commande---------------//
let numCommande = document.querySelector('.num-commande');
numCommande.innerHTML=`
Commande n° ${valid.orderId}
`;


let validation = produit;
total = 0;

validation.forEach(function(produit){
    document.getElementById("recap").insertAdjacentHTML("beforeend",`
    <div class="produit">
        <img src=${produit.image} alt="teddy.1"/>
        <h3 >${produit.name}</h3>
        <p>qte : ${produit.quantite}</p>
        <p >${produit.prix}€</p>
    </div>
    `
    );
    total = total + produit.prix * produit.quantite;
    document.getElementById("total").innerHTML = total+ "€";
});

//--------------------------camera------------------







//retour a l'acceuil
let acceuil = document.querySelector(".acceuil")
console.log(acceuil);
acceuil.addEventListener("click", function(e){
    e.preventDefault
    localStorage.clear();

});

