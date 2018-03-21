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
function ModificaSchedaProdotto() {
    var mainNode = document.querySelector(".ecommerce-product-page .object_content");
    //var backGroundImageNode = document.querySelector(".ecommerce-product-page .product_ttil");

    //var span = mainNode.querySelector("span");
/*
    var productTitleNode = mainNode.querySelector(".category-product>h3");
    var productTitle = productTitleNode.textContent.trim();
    span.insertBefore(createElement("h3", "product-name-top", productTitle), span.childNodes[0]);
*/
    var productCode = "";
    var productCodeNode = mainNode.querySelector(".product_info .product_code");
    if (productCodeNode != null) {
        //productCode = productCodeNode.textContent.trim().replace("Codice: ", "").replace("Code: ","");
		
        productCodeNode.textContent = productCodeNode.textContent.trim().replace("Codice: ", "").replace("Code: ","").trim();
       // span.insertBefore(createElement("div", "product-code-top", productCode), span.childNodes[0]);
    }
    /*var priceContainer = createElement("p", "price-container", "");
    var standardPriceClass = "product-price-top";
    
    var productDiscountPriceNode = mainNode.querySelector(".product_info .product_price .price-special");
    
    var productStandardPriceNode = mainNode.querySelector(".product_info .product_price .price-original");
    if(productStandardPriceNode == null)
        productStandardPriceNode = mainNode.querySelector(".product_info .product_price .price");
        
    if(productDiscountPriceNode != null){
        standardPriceClass = "product-price-old";
        var productPrice = productDiscountPriceNode.textContent;
        priceContainer.appendChild(createElement("span", "product-price-top", productPrice));
        console.log("Disc: "+productPrice);
    }
    if (productStandardPriceNode != null) {
        var productPrice = productStandardPriceNode.textContent;
        priceContainer.appendChild(createElement("span", standardPriceClass, productPrice));
        console.log("Standard: "+productPrice);
    }
    span.appendChild(priceContainer);

    var prodTagsContainer = createElementWithHtmlContent("div", "product-tags-container", "");
    var tags = ["vintage", "wood", "imperfections", "metal", "leather"];
    var tagsCaptions = ["Oggetto 100% vintage", "Interamente in legno pregiato", "Presenta imperfezioni","Metallo","Interamente in pelle"];
    var tagsCaptionsEn = ["100% vintage", "High quality wood", "Has imperfections","Metalic","Made of leather"];
    for (var i = 0, len = tags.length; i < len; i++) {
        var tag = tags[i]; 
		var caption=tagsCaptions[i];
		if(language=="en")
		caption=tagsCaptionsEn[i];
        var tagNode = createElementWithHtmlContent("div", "product-tag-image tooltip-div " + tag + "-tag-image",
"<img src=\"http://css2.sintraconsulting.it/r/rustydusty/" + tag + ".png\"/><span class=\"tooltiptext\">" + caption+ "</span>");
        prodTagsContainer.appendChild(tagNode);
    }

    span.appendChild(prodTagsContainer);
    var rentCaption = "Noleggia";
    if (language == "en")
        rentCaption = "Rent";
    var href = "../../noleggia.html";
    if (language == "en")
        href = "../../rent.html";
    var noleggiaAnchor = createElement("a", "noleggia-top-button btn-primary", rentCaption);

    var href = rootUrl + "noleggia.html";
    if (language == "en")
        href = rootUrl + "en/rent.html";
    href += "?productKey=" + productCode + "&productCaption=" + productTitle;
    noleggiaAnchor.href = href;

    var noleggiaAnchorContainer = createElement("div", "noleggia-top-button-container", "");
	noleggiaAnchorContainer.appendChild(noleggiaAnchor);
    span.appendChild(noleggiaAnchorContainer);

    var shareContainer = createElementWithHtmlContent("div", "product-share-icons", "");

    var shareCaption = "Condividi:";
    if (language == "en")
        shareCaption = "Share:";

    shareContainer.appendChild(createElement("span", "product-share-caption", shareCaption));

    var shares = ["facebook"];
    var sharesPng = ["group-13"];
    var sharesURL = ["https://www.facebook.com/sharer/sharer.php?u=#####"];

    for (var j = 0; j < shares.length; j++) {
        var a = createElementWithHtmlContent("a", "share-item", "<img class=\"share-icon\" src=\"http://css2.sintraconsulting.it/r/rustydusty/" + sharesPng[j] + ".png\"/>");
        a.href = sharesURL[j].replace("#####", window.location);
        shareContainer.appendChild(a);
    }

    span.appendChild(shareContainer);

    var imgSrc = mainNode.querySelector("img").src;
    //backGroundImageNode.style = "background-image:url('" + imgSrc + "');";
    backGroundImageNode.setAttribute("style", "background-image:url('" + imgSrc + "');");
*/
    //SpostaGalleriaNelHeader(span);
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
        toReplace = undefined;
        
    for(let i = 0; i < productName.length; i++) {
      if(productName[i].innerHTML.indexOf('-') == -1) 
		  continue;
      toReplace = productName[i].textContent.split('-').pop();
	  toReplaceWith = toReplace.replace(' (SKU', '\n <span class="sku-class"> SKU').replace(')', '</span>');
      productName[i].innerHTML = productName[i].innerHTML.replace(toReplace, `<span class="second-part">${toReplaceWith}</span>`);
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

ExecuteWhenSelectorHasItems("body.ecommerce-product-page","body.ecommerce-product-page",modificaContenutoECreaBottoneIndietro,20);

var schedaProdottoSelector = ".ecommerce-product-page .object_content .product_info";
ExecuteWhenSelectorHasItems(".ecommerce-product-page", schedaProdottoSelector, ModificaSchedaProdotto,20);
