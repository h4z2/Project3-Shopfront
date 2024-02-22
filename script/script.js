if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-outline-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    var cartItem = buttonClicked.closest('.cart-row');
    if (cartItem) {
        cartItem.remove();
        updateCartTotal();
    } else {
        console.error('Error removing cart item. Cart row not found.');
    }
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.closest('.shop-item')
    var titleElement = shopItem.querySelector('.shop-item-title')
    var priceElement = shopItem.querySelector('.shop-item-price')
    var quantityElement = shopItem.querySelector('.cart-quantity-input')
    var title
    if (titleElement) {
        title = titleElement.innerText
    } else {
        console.error('Title element not found.')
        return
    }
    var price = priceElement ? priceElement.innerText : 'Not found'
    var quantity = quantityElement ? quantityElement.value : 'Not found'
    addItemToCart(title, price, quantity)
    if (quantityElement) {
        quantityElement.value = 1;
    }
    updateCartTotal()
}

function addItemToCart(title, price, quantity) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')

    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')

    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }

    var cartRowContents = `
        <div class="cart-item">
            <span class="cart-item-title">${title}</span>
            <span class="cart-price">${price} x </span>
            <div class="cart-quantity col">
                <span class="cart-quantity-value">${quantity}</span>
            </div>
        </div>
        <button class="btn btn-outline-danger" type="button">
            <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
        </button>`

    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)

    var quantityInput = cartRow.querySelector('.cart-quantity-input')
    updateQuantityButtons(quantityInput)

    cartRow.getElementsByClassName('btn-outline-danger')[0].addEventListener('click', removeCartItem)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    var itemCount = 0; // Initialize item count

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.querySelector('.cart-price');
        var quantityElement = cartRow.querySelector('.cart-quantity-value');

        if (priceElement && quantityElement) {
            var price = parseFloat(priceElement.innerText.replace('$', ''));
            var quantity = parseInt(quantityElement.innerText) || 1;
            total += price * quantity;
            itemCount += quantity; // Update item count
        }
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;

    // Update badge with item count
    var badge = document.querySelector('.badge');
    if (badge) {
        badge.innerText = itemCount;
    }
}

var quantityButtons = document.querySelectorAll('.quantity-btn')
quantityButtons.forEach(function (button) {
    button.addEventListener('click', quantityButtonClicked)
})

function quantityButtonClicked(event) {
    var button = event.target
    var input = button.parentElement.querySelector('.cart-quantity-input')
    var currentValue = parseInt(input.value)

    if (button.dataset.action === 'increment') {
        input.value = currentValue + 1
    } else if (button.dataset.action === 'decrement' && currentValue > 1) {
        input.value = currentValue - 1
    }
    updateCartTotal()
}

function updateQuantityButtons(input) {
    if (input) {
        var decrementButton = input.parentElement.querySelector('[data-action="decrement"]')
        var incrementButton = input.parentElement.querySelector('[data-action="increment"]')

        decrementButton.addEventListener('click', function () {
            var currentValue = parseInt(input.value)
            if (currentValue > 1) {
                input.value = currentValue - 1
            }
        })

        incrementButton.addEventListener('click', function () {
            var currentValue = parseInt(input.value)
            input.value = currentValue + 1
        })
    }
}