const urlTeddy= "http://localhost:3000/api/teddies";
const urlCam= "http://localhost:3000/api/cameras";
const urlFurn= "http://localhost:3000/api/furniture";


 //..................texte à ajouté....................//
const listeProduits = document.getElementById("list-produits");
 function produit(choix){
   for(i=0; i<choix.length; i++){
     listeProduits.innerHTML = listeProduits.innerHTML+`
     <a  href="produit.html?${choix[i]._id}">
       <figure>
           <img id="imgteddy1" src=${choix[i].imageUrl} alt="teddy"/>
           <figcaption >
               <h3 id="titleteddy1">${choix[i].name}</h3>
               <p id="descriptteddy1">${choix[i].description}</p>              
           </figcaption>
       </figure>
     </a>
     `
   };
 }
 //.....................requête.........................//
 function request(url){
  fetch(url)
  .then(async (response) =>{
    try{
      const resultat = await response.json();
      console.log(resultat)
      produit(resultat)
    }
    catch (e){
      console.log(e);
    }
  });
};

//...............click pour produit apparaisse...........//
let clickTeddy =  document.getElementById("teddyClick")
 clickTeddy.addEventListener('click', function(){
   listeProduits.innerHTML= " ";
   request(urlTeddy);
 })

 let clikCam = document.getElementById("camClick")
 clikCam.addEventListener('click', function(){
   listeProduits.innerHTML= " ";
   request(urlCam);
 });

 let clikfurn = document.getElementById("furnClick")
 clikfurn.addEventListener('click', function(){
   listeProduits.innerHTML= " ";
   request(urlFurn);
 });