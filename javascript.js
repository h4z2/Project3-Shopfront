const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const quantityDiv = document.getElementById("quantity");
const addToCartButton = document.getElementById("addcart");

let quantity = 1;

function updateQuantity() {quantityDiv.textContent = quantity.toString(); }

minusButton.addEventListener("click", function () {
if (quantity > 1) {
quantity--;
updateQuantity(); }
});

plusButton.addEventListener("click", function () {
quantity++;
updateQuantity();
});

let cartItems = [];

addToCartButton.addEventListener("click", function (){
if (quantity > 0) {
const productImageSrc = document.querySelector(".image img").getAttribute("src");
const existingItem = cartItems.find(item => item.imageSrc === productImageSrc);

if (existingItem) {existingItem.quantity += quantity; }
else {cartItems.push({ imageSrc: productImageSrc, quantity: quantity }); }
quantity = 1;
updateQuantity();
console.log(cartItems); }
});

