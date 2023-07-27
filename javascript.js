const minusButton = document.getElementById("minus");
    const plusButton = document.getElementById("plus");
    const quantitySpan = document.getElementById("quantity");
    const addToCartButton = document.getElementById("addcart");

    let quantity = 1;

    // Function to update the quantity displayed
    function updateQuantity() {
      quantitySpan.textContent = quantity.toString();
    }

    // Function to handle minus button click
    minusButton.addEventListener("click", function () {
      if (quantity > 1) {
        quantity--;
        updateQuantity();
      }
    });

    // Function to handle plus button click
    plusButton.addEventListener("click", function () {
      quantity++;
      updateQuantity();
    });

    let cartItems = [];

    // Function to handle "Add to Cart" button click
    addToCartButton.addEventListener("click", function () {
      if (quantity > 0) {
        // Find the image source of the selected product
        const productImageSrc = document.querySelector(".image img").getAttribute("src");

        // Check if the item is already in the cart
        const existingItem = cartItems.find(item => item.imageSrc === productImageSrc);

        if (existingItem) {
          // If the item is already in the cart, update its quantity
          existingItem.quantity += quantity;
        } else {
          // If the item is not in the cart, add it
          cartItems.push({ imageSrc: productImageSrc, quantity: quantity });
        }

        // Reset the quantity to 1 after adding to the cart
        quantity = 1;
        updateQuantity();

        // For demonstration purposes, log the current cart items to the console
        console.log(cartItems);
      }
    });