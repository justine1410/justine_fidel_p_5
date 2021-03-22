
let valide1 = JSON.parse(localStorage.getItem("valide1"));
let valide2 = JSON.parse(localStorage.getItem("valide2"));
let valide3 = JSON.parse(localStorage.getItem("valide3"));
let contact = JSON.parse(localStorage.getItem("contact"));
let produit = JSON.parse(localStorage.getItem("produit"));

//--------------message de validation------------------//
let merci = document.querySelector('.confirmation');
 merci.innerHTML = `           
 <h2>Votre commande a bien été validée. </h2><br/>
 <p>${contact.firstName+" "+contact.lastName}, votre commande  sera bientôt envoyée</p>
 <p>Un mail vous sera envoyé à votre adresse mail : ${contact.email}.</p>
 <p>Nous vous remercions pour votre confiance</p>
 <p>À bientôt</p>
`;


//----------------recapitulation de la commande---------------//
if(valide1 !== null){
    let numCommande = document.querySelector('.num-commande');
    numCommande.innerHTML=`
    Votre commande  porte le numero de commande <br/> ${valide1.orderId} <br/>
    `;    
}
if(valide2 !== null){
    let numCommande = document.querySelector('.num-commande');
    numCommande.innerHTML=`
    Votre commande  porte le numero de commande <br/> ${valide2.orderId} <br/>
    `;    
}
if(valide3 !== null){
    let numCommande = document.querySelector('.num-commande');
    numCommande.innerHTML=`
    Votre commande d'appareil photos porte le numero de commande <br/> ${valide3.orderId} <br/>
    `;    
}



let validation = produit;
total = 0;
validation.forEach(function(e){
    document.getElementById("recap").insertAdjacentHTML("beforeend",`
    <div class="produit">
        <img src=${e.image} alt="teddy.1"/>
        <h3 >${e.name}</h3>
        <p>qte : ${e.quantite}</p>
        <p >${e.prix}€</p>
    </div>
    `
    );
    total = total + e.prix * e.quantite;
    document.getElementById("total").innerHTML = total+ "€";
});




//--------------------------camera-----------------

//retour a l'acceuil
let acceuil = document.querySelector(".acceuil")
console.log(acceuil);
acceuil.addEventListener("click", function(e){
    e.preventDefault
    localStorage.clear();

});

