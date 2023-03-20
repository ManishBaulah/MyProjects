let cartIcon = document.querySelector(".cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
};  

closeCart.onclick = () => {
    cart.classList.remove("active");
};  

if(document.readyState == 'loading')
{
    document.addEventListener("DOMContentLoaded", ready); 
                                          
//DOMContentLoaded: fires when the initial HTML document has been completely loaded and parsed,  
//without waiting for stylesheets, images, and subframes to finish loading
}

else{
    ready();
}


function ready()
{
    // Removing an item from cart
    var removeCartButton = document.getElementsByClassName("cart-remove" );
    console.log(removeCartButton);

    for(var i = 0 ; i < removeCartButton.length; i++)
    {
        var button = removeCartButton[i];
        button.addEventListener("click", removeCartItem);
    }

    // getting the quantity of a product
    var quantityInputs = document.getElementsByClassName("cartQuantity");

    for(var i = 0 ; i < quantityInputs.length; i++)
    {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    //Adding to cart functionality
    var addToCart = document.getElementsByClassName("buy");
    for(var i = 0; i < addToCart.length; i++)
    {
        var button = addToCart[i];
        button.addEventListener("click", addedToCart);
    } 

}

//Buy button
/*function buttonClicked()
{
    alert('Your order has been placed!');
}  */


//Removing items from cart
function removeCartItem(event)
{
    var buttonClicked = event.target; 
    buttonClicked.parentElement.remove();
    updateTotal();
}

//restricting the user from selecting a negative value in the cart
function quantityChanged(event)
{
    var inputNumber = event.target;
    if( isNaN(inputNumber.value) || inputNumber.value <= 0)
    {
        inputNumber.value = 1;
    }

    else
    {
    updateTotal();
    }
}

//Adding items to cart
function addedToCart(event){
    var cartButton = event.target;
    var cartContents = cartButton.parentElement;
    var title = cartContents.getElementsByTagName("h3")[0].innerText;
    var price = cartContents.getElementsByTagName("h6")[0].innerText;
    var image = cartContents.getElementsByTagName("img")[0].src;
    addProductToCart(title, price, image);
    updateTotal();
}

function addProductToCart(title, price, image)
{
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cartTitle");

    for(var i = 0; i < cartItemsNames.length; i++)
    {
        if(cartItemsNames[i].innerText == title){
        alert("You have already added this item to the cart");
        return;
        }
    }

var cartBoxContent = `
                      <img class="cartImage" src="${image}" alt="">
    
                        <div class="detail-box"> 
                            <div class="cartTitle">${title}</div> 
                            <div class="cartPrice">${price}</div>
                            <input type="number" value="1" class="cartQuantity">
                        </div>

                     <i class="fa-solid fa-trash cart-remove"></i>  `;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName("cartQuantity")[0].addEventListener("change", quantityChanged);
}

//updating the total price

function updateTotal()
{
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");

    var total = 0;

    for(var i = 0; i < cartBoxes.length; i++) 
    {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cartPrice")[0]; //accessing the cart price
        var quantityElement = cartBox.getElementsByClassName("cartQuantity")[0]; //accessing the cart Quantity
        var price = parseFloat(priceElement.innerText.replace("$", "")); //converting string to floating number
        var Quantity = quantityElement.value;

        total = total + (price*Quantity);
    }
        document.getElementsByClassName("total-price")[0].innerText = "$" + total;

}

