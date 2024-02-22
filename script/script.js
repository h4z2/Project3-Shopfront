if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

const checkoutButton = document.getElementsByClassName("")

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
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
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
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
    console.log('Title:', title)
    console.log('Price:', price)
    console.log('Quantity:', quantity)
    addItemToCart(title, price, quantity)
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
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
            <span class="cart-price">${price}</span>
            <div class="cart-quantity">
                <span class="cart-quantity-value">${quantity}</span>
                <button class="btn btn-danger" type="button"><img scr="images\icon-delete.svg"></button>
            </div>
        </div>`

    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)

    var quantityInput = cartRow.querySelector('.cart-quantity-input')
    updateQuantityButtons(quantityInput)

    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.querySelector('.cart-quantity .cart-quantity-value')

        if (priceElement && quantityElement) {
            var price = parseFloat(priceElement.innerText.replace('$', ''))
            var quantity = parseInt(quantityElement.innerText) || 1
            total += price * quantity
        }
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
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