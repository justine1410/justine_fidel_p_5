const apiUrl="http://localhost:3000/api";

function getProduits(uri){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl+uri);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      var resultat = JSON.parse(xhr.responseText); 
      console.log(resultat);
      afficheProduits(resultat);
    }
  };
  xhr.send();
}

function afficheProduits(produits){
  for(i=0; i<produits.length; i++){
    document.getElementById("list-produits").innerHTML=document.getElementById("list-produits").innerHTML+`
    <a class="produits" href="produit.html?id=${produits[i]._id}">
      <figure>
          <img id="imgteddy1" src=${produits[i].imageUrl} alt="teddy"/>
          <figcaption >
              <h3 id="titleteddy1">${produits[i].name}</h3>
              <p id="descriptteddy1">${produits[i].description}</p>              
          </figcaption>
      </figure>
    </a>
    `;
  }
}

function getDetailProduit(){
  var t = window.location.href.split('?id=');

  var id = t[1];
 
};