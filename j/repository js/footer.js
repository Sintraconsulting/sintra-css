var language = "it";
var rootUrl = "http://www.rustydustyfurnitures.com/";
var selectNode = undefined;

//Finds y value of given object
function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return [curtop];
    }
}

function createElement(tag, className, content) {
    var newItem2 = document.createElement(tag);
    newItem2.className = className;
    var textnode2 = document.createTextNode(content);
    newItem2.appendChild(textnode2);
    return newItem2;
}
function createElementWithHtmlContent(tag, className, htmlContent) {
    var newItem2 = document.createElement(tag);
    newItem2.className = className;
    newItem2.innerHTML = htmlContent;
    return newItem2;
}
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

var contattaciSelector = ".page_url_contattaci .bform .input_row,.page_url_contact_us  .bform .input_row";

function MoveAddressInMapRow() {
    var isInEdit = document.querySelectorAll(".oms-edit");
    if (isInEdit.length > 0) {
        return;
    }
    var mapContainer = document.querySelector(".page_url_contattaci .div_google_map,.page_url_contact_us .div_google_map");
    var mapParent = mapContainer.querySelector(".row");
    var addressContainer = document.querySelector(".page_url_contattaci #ttil_1,.page_url_contact_us #ttil_2");
    var addressNode = addressContainer.querySelector(".ttil-content");
    var addressHTML = addressNode.innerHTML;
    var node = createElementWithHtmlContent("div", "ttil-content", addressHTML);
    mapParent.appendChild(node);
	mapParent.classList.add("contattaci-content-container");
    addressContainer.parentElement.removeChild(addressContainer);
}
function EditContattaciTags() {
    var inputs = document.querySelectorAll(contattaciSelector);
    for (var i = 0; i < inputs.length; i++) {
        var plHolder = inputs.item(i).querySelector(".input_label").textContent;
        var inpItem = inputs.item(i).querySelector("input,textarea,select");
        if (inpItem !== undefined) {
            inpItem.setAttribute("placeholder", plHolder);
            inputs.item(i).querySelector(".input_label").className = "input_label_hide";
        }
    }
    MoveAddressInMapRow();

}
function InsertProductsInSelectList() {
    var items = document.querySelectorAll(".page_url_noleggia .div_product_catalog .product-item,.page_url_rent .div_product_catalog .product-item");
    while (selectNode.firstChild) {
        selectNode.removeChild(selectNode.firstChild);
    }
    var defaultOption = document.createElement("option");
    defaultOption.setAttribute("value", "");
    var selectCaption = "Seleziona un prodotto...";
    if (language == "en")
        selectCaption = "Select a product...";
    var defaultOptionContent = document.createTextNode(selectCaption);
    defaultOption.appendChild(defaultOptionContent);
    defaultOption.setAttribute("disabled", "");

    if (window.location.search.indexOf("productKey=") < 0)
        defaultOption.setAttribute("selected", "");
    defaultOption.setAttribute("hidden", "");
    selectNode.appendChild(defaultOption);

    var focusForm = false;
    for (var i = 0; i < items.length; i++) {
        var mainNode = items.item(i).querySelector(".product-name a");
        var productCodeNode = mainNode.querySelector("span");
        var productCode = "";
        var productName = mainNode.textContent;
        if (productCodeNode !== null) {
            productCode = productCodeNode.textContent.replace(" (","").replace(")","");
            productName = mainNode.textContent.replace(productCodeNode.outerHTML, "");
        }
        if (productName !== undefined) {
            var newOption = document.createElement("option");
            newOption.setAttribute("value", productCode);
            var newOptionContent = document.createTextNode(productName);
            newOption.appendChild(newOptionContent);
			var searchTxt=window.location.search;
			var productKeyIndex=searchTxt.indexOf("productKey=")+11;
			
			searchTxt=searchTxt.substring(productKeyIndex,searchTxt.indexOf("&product"));
			searchTxt=searchTxt.replace("%20"," ").replace("%20"," ").replace("%20"," ").replace("%20"," ")
							   .replace("%20"," ").replace("%20"," ");
            console.log(" Searching:"+searchTxt+" prodcode:"+productCode);
            if (searchTxt==productCode) {
                newOption.setAttribute("selected", "");
                focusForm = true;
				console.log(newOption);
            }
            selectNode.appendChild(newOption);
        }
    }
	if(focusForm){
		setTimeout(focusElement,1500);
	}
}
function focusElement(){
	selectNode.focus()
}
var noleggiaSelector = ".page_url_noleggia .object_content .input_row,.page_url_rent .object_content .input_row";
function EditNoleggiaTags() {
    $(".object_content").attr("id", "object_content_noleggia");
    var inputs = document.querySelectorAll(noleggiaSelector);
    var parentItem = inputs.item(0).parentNode;
    selectNode = inputs.item(0).querySelector("select");
    inputs.item(5).className += " clear-both";
    inputs.item(6).className += " clear-both";
    inputs.item(12).className += " full-width-input-row";

    InsertProductsInSelectList();

    var sendRequestCaption = "Invia la richiesta";
    var datiProdottoCaption = "Dati del Prodotto";
    var datiPersonaliCaption = "Dati Personali";
    var datiSpedizioneCaption = "Dati di Spedizione";

    if (language == "en") {
        datiProdottoCaption = "Product info";
        datiPersonaliCaption = "Personal info";
        datiSpedizioneCaption = "Shipping info";
        sendRequestCaption = "Send request";
    }

    var btnInvia = document.querySelector(".btn-primary");
    btnInvia.textContent = sendRequestCaption;

    var newItem = document.createElement("p");
    newItem.className = "noleggia-group noleggia-group-1";
    var textnode = document.createTextNode(datiProdottoCaption);
    newItem.appendChild(textnode);

    var newItem1 = document.createElement("p");
    newItem1.className = "noleggia-group noleggia-group-2";
    var textnode1 = document.createTextNode(datiPersonaliCaption);
    newItem1.appendChild(textnode1);

    var newItem2 = document.createElement("p");
    newItem2.className = "noleggia-group noleggia-group-3";
    var textnode2 = document.createTextNode(datiSpedizioneCaption);
    newItem2.appendChild(textnode2);

    parentItem.insertBefore(newItem, inputs.item(0));
    parentItem.insertBefore(newItem1, inputs.item(3));
    parentItem.insertBefore(newItem2, inputs.item(9));

    for (var i = 0; i < inputs.length; i++) {
        var plHolder = inputs.item(i).querySelector(".input_label").textContent;
        var inpItem = inputs.item(i).querySelector("input,textarea,select");
        if (inpItem != undefined) {
            inpItem.setAttribute("placeholder", plHolder);
            inputs.item(i).querySelector(".input_label").className = "input_label_hide";
        }
    }
}

var prodottiSelector = ".div_product_catalog .product-item .product_info";
function ProdottiEditor() {
    var items = document.querySelectorAll(prodottiSelector);
    for (var i = 0; i < items.length; i++) {
        var item = items.item(i);
        var itemPrice = item.querySelector(".product-price");
        itemPrice.textContent = "Scoprili ora";
        var itemName = item.querySelector(".product-name a");
        itemName.innerHTML = itemName.innerHTML.replace(" (SKU", "\n <span> (SKU").replace(")", ")</span>");
    }
}

var schedaProdottoSelector = ".ecommerce-product-page .object_content .product_info";
function SpostaGalleriaNelHeader(span) {
    var images = document.querySelectorAll(".ecommerce-product-page .gallery-images-container a");
    var container = createElementWithHtmlContent("div", "product-header-thumbnail-container", "");
    var mainNode = document.querySelector(".ecommerce-product-page .object_content");
    for (var i = 0; i < Math.min(3, images.length) ; i++) {
        var image = images.item(i);
        var thumb = image.getAttribute("data-oms-thumb");
        var imgUrl = image.getAttribute("data-oms-src");
        var img = createElementWithHtmlContent("img", "product-header-thumbnail", "");
        img.setAttribute("src", thumb);
        img.setAttribute("data-oms-src", imgUrl);
        img.addEventListener("click", function(mEv) {
            var img = mEv.srcElement;
            var backGroundImageNode = document.querySelector(".ecommerce-product-page .product_ttil");
            var imgs = document.querySelector(".product-header-thumbnail-container").querySelectorAll("img");
            for (var i = 0; i < imgs.length; i++) {
                imgs.item(i).setAttribute("data-oms-selectedimg", "0");
                imgs.item(i).classList.remove("product-header-selected");
            } 
            img.classList.add("product-header-selected");
            img.setAttribute("data-oms-selectedimg", "1");
            var imgSrc = img.getAttribute("data-oms-src");
			console.log(backGroundImageNode.style);
            backGroundImageNode.setAttribute("style", "background-image:url('" + imgSrc + "');");
			console.log(backGroundImageNode.style);
        });
        container.appendChild(img);
    }
    mainNode.insertBefore(container, mainNode.querySelector("span"));
    var node = document.querySelector(".ecommerce-product-page #productGallery,.ecommerce-product-page .div_product_gallery");
	node.innerHTML=span.innerHTML;
	
    node.classList.add("product-detail-hide-gallery");
    // var nodeToRemove = document.querySelector(".ecommerce-product-page .gallery-images-container");
    //nodeToRemove.outerHTML = span.outerHTML;
}
function ModificaSchedaProdotto() {
    var mainNode = document.querySelector(".ecommerce-product-page .object_content");
    var backGroundImageNode = document.querySelector(".ecommerce-product-page .product_ttil");

    var span = mainNode.querySelector("span");

    var productTitleNode = mainNode.querySelector(".category-product>h3");
    var productTitle = productTitleNode.textContent.trim();
    span.insertBefore(createElement("h3", "product-name-top", productTitle), span.childNodes[0]);

    var productCode = "";
    var productCodeNode = mainNode.querySelector(".product_info .product_code");
    if (productCodeNode != null) {
        productCode = productCodeNode.textContent.trim().replace("Codice: ", "").replace("Code: ","");
        span.insertBefore(createElement("div", "product-code-top", productCode), span.childNodes[0]);
    }
    var priceContainer = createElement("p", "price-container", "");
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

    SpostaGalleriaNelHeader(span);
}
var footerLinksSelector = "ul.nav.navbar-nav.navbar-right li";
function FooterLinkUpdater() {
    var ulHeaderNode = document.querySelector("ul.nav.navbar-nav.navbar-right");
    var ulFooterNode = document.querySelector(".footer .row>div>ul");
    ulFooterNode.innerHTML = ulHeaderNode.innerHTML;

    if (language == "en") {
        var footerLinksTitle = document.querySelector(".footer .row .footer-shop-name");
        footerLinksTitle.textContent = "SITEMAP";
        var paymentMethodNode = document.querySelector(".footer-payments-accepted");//">MODALITÀ DI PAGAMENTO</div>
        paymentMethodNode.textContent = "ACCEPTED PAYMENTS";
        var followUs = document.querySelector(".footer-follow-us");//>SEGUICI SU</div>		
        followUs.textContent = "FOLLOW US";
    }
}
var languageSetterSelector = ".lan_en.active,.lan_it.active";
function LanguageSetter() {
    var isEnglish = document.querySelector(".lan_en.active");
    var isItalian = document.querySelector(".lan_it.active");
    if (isEnglish) 
        language = "en";
    else if (isItalian)
        language = "it";
}
var headerTranslator = ".page_url_index .header-home-container";
function HeaderTranslator() {
    var mainNode = document.querySelector(headerTranslator);
    if (language == "en") {
        var arrdaConStyleNode = mainNode.querySelector(".header-home-title-2");
        arrdaConStyleNode.textContent = "DECORATE WITH STYLE";//</h3>

        var scopriINostriProdotti = document.querySelector(".header-home-button-1 a");
        scopriINostriProdotti.setAttribute("href", "our_products.html");
        scopriINostriProdotti.textContent = "DISCOVER OUR PRODUCTS";//>SCOPRI I NOSTRI PRODOTTI</a></div>
    }
}
var homeCarousel = "#top-image-carousel .item";
function HomeCarousel(){
	var carouselItems=document.querySelectorAll(homeCarousel);
	for(var i=0;i<carouselItems.length;i++)
	{
		carouselItems[i].setAttribute("style","background-image: url(http://css2.sintraconsulting.it/r/rustydusty/slide"+i+".jpg);");
		carouselItems[i].innerHTML="";
	}
}
function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}
var setPageIdContents=".call-to-action-container, .full-width-row-child";
function SetPageIdClassOnBody(){
	var callToActionDiv = document.querySelectorAll(".call-to-action-container");
	for(var j=0;j<callToActionDiv.length;j++)
	{
		var row = findAncestor(callToActionDiv[j],"row");
		row.classList.add("full-width-row");
		var row = findAncestor(callToActionDiv[j],"div_central");
		row.classList.add("no-bottom-padding");
	}  
	var callToActionDiv = document.querySelectorAll(" .full-width-row-child");
	for(var j=0;j<callToActionDiv.length;j++)
	{
		var row = findAncestor(callToActionDiv[j],"row");
		row.classList.add("full-width-row");
	} 
}
ExecuteWhenSelectorHasItems(setPageIdContents,setPageIdContents,SetPageIdClassOnBody,5);
ExecuteWhenSelectorHasItems(homeCarousel,homeCarousel,HomeCarousel,0);
ExecuteWhenSelectorHasItems(languageSetterSelector, languageSetterSelector, LanguageSetter,0);

ExecuteWhenSelectorHasItems(headerTranslator, headerTranslator, HeaderTranslator,0);
ExecuteWhenSelectorHasItems(footerLinksSelector, footerLinksSelector, FooterLinkUpdater,0);
ExecuteWhenSelectorHasItems(".page_url_contattaci,.page_url_contact_us", contattaciSelector, EditContattaciTags,0);
ExecuteWhenSelectorHasItems(".page_url_noleggia,.page_url_rent", noleggiaSelector, EditNoleggiaTags,0);
ExecuteWhenSelectorHasItems(".div_product_catalog", prodottiSelector, ProdottiEditor,0);
ExecuteWhenSelectorHasItems(".ecommerce-product-page", schedaProdottoSelector, ModificaSchedaProdotto,0);