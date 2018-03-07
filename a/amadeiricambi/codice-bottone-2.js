/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function ExecuteWhenSelectorHasItems(baseSelector, selector, action,limit) {

    var baseItem = document.querySelectorAll(baseSelector);

    console.log("Before check right page:" + baseSelector + " with count:" + baseItem.length);
    if (baseItem.length < 1&&limit===0) return;
    var counter = 0;
    var check = function () {
        var inputs = document.querySelectorAll(selector);
        console.log("Items:" + inputs.length + " for selector:\n" + selector);
        if (inputs.length > 0||(limit>0&&counter>limit)) {
            console.log("Before action run");
            action();
            //console.log("After action run");
        }
        else {
            counter++;
            setTimeout(check, 50); // check again in a second
        }
    }
    check();
}
function createButton(content,href,onclick,css_class){
    let backElem = document.createElement('a'),
        backElemNode = document.createTextNode(content);
    backElem.setAttribute('href', href);
    if(onclick!=="")
    	backElem.setAttribute('onclick', onclick);
    backElem.classList.add(css_class, 'fa', 'fa-reply');
    backElem.appendChild(backElemNode);
    return backElem;
}
function modificaContenutoECreaBottoneIndietro(){
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
   
    var isEnglish = document.querySelector(".lan_en.active");
    var isItalian = document.querySelector(".lan_it.active");
	  
    let prevPage="Pagina Precedente",goToQuotation="Preventivi";
    if (isEnglish) {
        prevPage= "Previous Page";
	goToQuotation = "Estimates";
    }
    let backElem = createButton(prevPage,"#","window.history.back()","btn-back");
    document.querySelector('#page_title').appendChild(backElem);	
    let preventivoLink=document.querySelector('[title=Preventivi]').href;
    if(isEnglish)
	preventivoLink=document.querySelector('[title=Estimates]').href;
    let preventivoElem=createButton(goToQuotation,preventivoLink,"","btn-preventivo");
    document.querySelector('#page_title').appendChild(preventivoElem);
  }else{
    console.log("Non ho trovato i dati 'body.ecommerce-product-page' per creare il bottone per pagina precedente");
  }
}
console.log("before setTimeout")

ExecuteWhenSelectorHasItems("body.ecommerce-product-page","body.ecommerce-product-page",modificaContenutoECreaBottoneIndietro,20);
