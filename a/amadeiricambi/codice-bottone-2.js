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
function createButton(content,href,onclick,css_class1,css_class2){
    let backElem = document.createElement('a'),
        backElemNode = document.createTextNode(content);
    backElem.setAttribute('href', href);
    if(onclick!=="")
    	backElem.setAttribute('onclick', onclick);
    backElem.classList.add(css_class1,css_class2, 'fa');
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
	  
    let prevPage = "Pagina Precedente", goToQuotation = "Richiedi un Preventivo", selector = "Preventivi";
    if (isEnglish) {
        prevPage = "Previous Page";
		goToQuotation = "Estimates";
		selector = "Estimates";
    }
    let backElem = createButton(prevPage,"#","window.history.back()","btn-back","fa-reply");
    document.querySelector('#page_title').appendChild(backElem);	
    let preventivoLink = document.querySelector('[title=' + selector + ']').href;
    let preventivoElem = createButton(goToQuotation,preventivoLink, "", "btn-preventivo", "fa-share");
    document.querySelector('#page_title').appendChild(preventivoElem);
  }else{
    console.log("Non ho trovato i dati 'body.ecommerce-product-page' per creare il bottone per pagina precedente");
  }
}
console.log("before setTimeout");

var prodottiSelector = ".div_product_catalog .product-item .product_info";
function ProdottiEditor() {
    var items = document.querySelectorAll(prodottiSelector);
    for (var i = 0; i < items.length; i++) {
        var item = items.item(i);
        var itemName = item.querySelector(".product-name a");
        console.log(itemName.innerHTML);
console.log(itemName.innerHTML.replace(" (SKU", "\n <span> (SKU"));
itemName.innerHTML = itemName.innerHTML.replace(" (SKU", "\n <span> (SKU").replace(")", ")</span>");
console.log(itemName.innerHTML);
    }
}

//questo alla fine
ExecuteWhenSelectorHasItems(".div_product_catalog", prodottiSelector, ProdottiEditor,0);

ExecuteWhenSelectorHasItems("body.ecommerce-product-page","body.ecommerce-product-page",modificaContenutoECreaBottoneIndietro,20);

