
let valid = JSON.parse(localStorage.getItem("valide"));
let article = JSON.parse(localStorage.getItem("valide","products"))
console.log(article);

let merci = document.querySelector('.confirmation');
 merci.innerHTML = `           
 <h2>Votre commande a bien été validé. </h2><br/>
 <p>${valid.contact.firstName+" "+valid.contact.lastName}, votre commande n°${valid.orderId} sera bientôt envoyée</p>
 <p>Un mail vous sera envoyée à votre adresse mail : ${valid.contact.email}.</p>
 <p>Nous vous remercions pour votre confiance</p>
 <p>A bientôt</p>
`;

for(i=0; i<valid.products.length; i++ ){
    let recap = document.querySelector('.recap');
    recap.innerHTML=recap.innerHTML+`
    <div class="produit">
        <img src=${valid.products[i].imageUrl} alt="teddy.1"/>
        <h3 >${valid.products[i].name}</h3>
        <p >${valid.products[i].price/100}€</p>
    </div>
    `
    total=0;
    total= valid.products[i].price/100 + valid.products[i].price/100;
    document.getElementById("total").innerHTML = total + "€";
    
}

let commande = document.querySelector(".num-commande");
commande.innerHTML=`Commande n° : ${valid.orderId}`;
console.log(commande);



