
let valid = JSON.parse(localStorage.getItem("valide"));

console.log(valid);

let merci = document.querySelector('.confirmation');
 merci.innerHTML = `           
 <h2>Votre commande a bien été validé. </h2><br/>
 <p>${valid.contact.firstName+" "+valid.contact.lastName}, votre commande n°${valid.orderId} sera bientôt envoyée</p>
 <p>Un mail vous sera envoyée à votre adresse mail : ${valid.contact.email}.</p>
 <p>Nous vous remercions pour votre confiance</p>
 <p>A bientôt</p>
`;


let validation = valid.products;
total = 0;

validation.forEach(function(products){
    document.getElementById("recap").insertAdjacentHTML("beforeend",`
    <div class="produit">
        <img src=${products.imageUrl} alt="teddy.1"/>
        <h3 >${products.name}</h3>
        <p >${products.price/100}€</p>
    </div>
    `
    );
    total = total + products.price/100 ;
    document.getElementById("total").innerHTML = total+ "€";

});

