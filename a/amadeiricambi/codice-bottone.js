/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function(){
	console.log("Ho iniziato a processare il contenuto");
  // Divide product name
  if(document.querySelector('.product-name a')) {
    let productName = document.querySelectorAll('.product-name a'),
        secondPart = undefined;
        
    for(let i = 0; i < productName.length; i++) {
      if(productName[i].innerHTML.indexOf('-') == -1) continue;
      secondPart = productName[i].textContent.split('-').pop();
      productName[i].innerHTML = productName[i].innerHTML.replace(secondPart, `<span class="second-part">${secondPart}</span>`);
    }
  }
  
  if(document.querySelector('.category-product')) {
    let heading = document.querySelector('.category-product h3'),
        modifiedPart = heading.textContent.split('-').pop();
    
    heading.innerHTML = heading.innerHTML.replace(modifiedPart, `<span class="second-part">${modifiedPart}</span>`);
  }
  
  //Set target attribute
  if(document.querySelector('.product-item a')) {
    let productHrefs = document.querySelectorAll('.product-item a');

    for(var i = 0; i < productHrefs.length; i++) {
      //ho comentato questa riga sotto
      //productHrefs[i].setAttribute('target', '_blank'); 
    }
  }
  
  //Add back button on product page
  if(document.querySelector('body.ecommerce-product-page')) {
	  console.log("Sto creando il bottone per pagina precedente");
    let paginaPrec="Pagina Precedente";
    
    var isEnglish = document.querySelector(".lan_en.active");
    var isItalian = document.querySelector(".lan_it.active");
    if (isEnglish) 
        paginaPrec= "Previous Page";
    else if (isItalian)
        paginaPrec= "Pagina Precedente";

    let backElem = document.createElement('a'),
        backElemNode = document.createTextNode(paginaPrec);
/* ho commentato questa roba
,
        currentSite = window.location.href,
        backToReplace = currentSite.split('/').pop(),
        backReplaced = currentSite.replace(`/${backToReplace}`, '.html');
*/

    //ho commentato questo
    //backElem.setAttribute('href', backReplaced);
    //ho aggiunto/modificato queste:
    backElem.setAttribute('href', "#");
    backElem.setAttribute('onclick', "window.history.back()");


    backElem.classList.add('btn-back', 'fa', 'fa-reply');
    backElem.appendChild(backElemNode);
    document.querySelector('#page_title').appendChild(backElem);
  }else{
	  console.log("Non ho trovato i dati 'body.ecommerce-product-page' per creare il bottone per pagina precedente");
  }
  
})()