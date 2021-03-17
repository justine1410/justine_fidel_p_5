const types=["teddies","cameras","furniture"];//type des produits

 //..................texte à ajouté....................//
const listeProduits = document.getElementById("list-produits");
 function produit(choix,type){
   for(i=0; i<choix.length; i++){
     listeProduits.innerHTML = listeProduits.innerHTML+`
     <a  href="produit.html?type=${type}&id=${choix[i]._id}">
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
 function request(type){
  fetch("http://localhost:3000/api/"+type)
  .then(async (response) =>{
    try{
      const resultat = await response.json();
      console.log(resultat,type)
      produit(resultat,type)
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
   request(types[0]);
   console.log(types)//types[0] se réfere aux tableau ligne 1
 })

 let clikCam = document.getElementById("camClick")
 clikCam.addEventListener('click', function(){
   listeProduits.innerHTML= " ";
   request(types[1]);//types[0] se réfere aux tableau ligne 1
 });

 let clikfurn = document.getElementById("furnClick")
 clikfurn.addEventListener('click', function(){
   listeProduits.innerHTML= " ";
   request(types[2]);//types[0] se réfere aux tableau ligne 1
 });


