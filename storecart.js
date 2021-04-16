if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
} else{
    ready();

}

function ready(){
    var removeCartitems=document.getElementsByClassName('btn-danger');
console.log(removeCartitems);
for(var i=0;i<removeCartitems.length;i++){

    var button=removeCartitems[i];
    button.addEventListener('click', removecartitem)
       // console.log('Clicked');     
    }
    var quantityinput=document.getElementsByClassName('cart-quantity-input');
    for(var i=0;i<quantityinput.length;i++){
        var input=quantityinput[i];
        input.addEventListener('change',quantitychanged);

    }
    var addtocart=document.getElementsByClassName('shop-item-button');
    for(var i=0;i<addtocart.length;i++){
        var incart=addtocart[i];
        incart.addEventListener('click',addedtocart);
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseclicked);
}

//Remove items after puchased
function purchaseclicked(){
    alert('thanks for shopping');
    var pcartitems=document.getElementsByClassName('cart-items')[0];
    while(pcartitems.hasChildNodes()){
        pcartitems.removeChild(pcartitems.firstChild);
    }

    updateTotal();

}

//if negetive or zero amount is selected
function quantitychanged(event){
    var input=event.target;
    if(isNaN(input.value)|| input.value<=0){
        input.value=1;
    }
    updateTotal();
}
//remove cart items
function removecartitem( event){
    var buttonclicked=event.target;
       buttonclicked.parentElement.parentElement.remove();
       updateTotal();


}

//Function for Add to cart button
function addedtocart(event){
    var incart=event.target;
    var shopitem=incart.parentElement.parentElement;
    var title=shopitem.getElementsByClassName('shop-item-title')[0].innerText;
    var price=shopitem.getElementsByClassName('shop-item-price')[0].innerText;
    var imagesrc=shopitem.getElementsByClassName('shop-item-image')[0].src;

    console.log(title,price,imagesrc);
    
    addItemtoCart(title,price,imagesrc);
    updateTotal();
}
//Add to card items clicking cart button
function addItemtoCart(title,price,imagesrc){
    var cartrow=document.createElement('div');
    cartrow.classList.add('cart-row')
    //cartrow.innerText=title;
    var cartItems=document.getElementsByClassName('cart-items')[0]
    var cartitemName=cartItems.getElementsByClassName('cart-item-title');
    for(var i=0;i<cartitemName.length;i++){
        if(cartitemName[i].innerText==title){
            alert('This item alredy been added to the cart');
            return;
        }
        

    }

    var cartrowcontents=`<div class="cart-item cart-column">
                    <img class="cart-item-image" src="${imagesrc}" width="100" height="100">
                    <span class="cart-item-title">${title}</span>
                </div>
                <span class="cart-price cart-column">${price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>`
    cartrow.innerHTML=cartrowcontents;            
    cartItems.append(cartrow);
    cartrow.getElementsByClassName('btn-danger')[0].addEventListener('click',removecartitem);
    cartrow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantitychanged);






}
//Change the price according to the selcted numbers of element.
function updateTotal(){
    var cartitemcontainer=document.getElementsByClassName('cart-items')[0];
    var cartrows=cartitemcontainer.getElementsByClassName('cart-row');
    var total=0;
    for(var i=0;i<cartrows.length;i++){
        var cartrow=cartrows[i];
        var priceElement=cartrow.getElementsByClassName('cart-price')[0];
        var quantityElement=cartrow.getElementsByClassName('cart-quantity-input')[0];
        //console.log(priceElement,quantityElement);
        var price= parseFloat( priceElement.innerText.replace('$',''));
        var quanity=quantityElement.value;
        //console.log(price * quanity);
        total+=(price*quanity);
    }
    total=Math.round(total*100)/100;

    document.getElementsByClassName('cart-total-price')[0].innerText='$'+total;



}