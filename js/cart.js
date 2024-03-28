const cartCountChannel = new BroadcastChannel("cartCount");
let quantityStep = 1;

function getCurrentCartCount() {
    let currentCartCount = localStorage.getItem('cartCount');

    if (isNaN(currentCartCount)) {
        currentCartCount = 0;
    }

    return Number(currentCartCount);
}

function setCurrentCartCount(count) {
    localStorage.setItem('cartCount', count);
    cartCountChannel.postMessage(count);
}

function setQuantityStep(stepCount) {
    quantityStep = stepCount;
}

function incrementCartCount() {
    const cartCount = getCurrentCartCount();
    const newCount = cartCount + quantityStep;
    setCurrentCartCount(newCount);
    return newCount;
}

function decrementCartCount() {
    const cartCount = getCurrentCartCount();
    const newCount = cartCount - quantityStep;
    setCurrentCartCount(newCount);
    return newCount;
}

(function() {
    const addToCartButton = document.querySelector('button.add-to-cart');
    const proceedToCheckoutButton = document.querySelector('button.checkout');

    const cartCounter = document.querySelector('.cart-actions .counter');
    const productQuantityIncrement = document.querySelector('.cart-actions img.increment');
    const productQuantityDecrement = document.querySelector('.cart-actions img.decrement');
    const productQuantity = document.querySelector('.cart-actions input');
    const headerCartQuantity = document.querySelector('header .shopping-cart .item-count');

    const cartCount = getCurrentCartCount();

    if (cartCount > 0) {
        addToCartButton.classList.add('hidden');
        proceedToCheckoutButton.classList.remove('hidden');
        cartCounter.classList.remove('hidden');
        productQuantity.value = cartCount;
        headerCartQuantity.textContent = cartCount;
    }    

    function handleCartIncrement() {
        const cartCount = incrementCartCount();

        productQuantity.value = cartCount;
        headerCartQuantity.textContent = cartCount;

        addToCartButton.classList.add('hidden');
        proceedToCheckoutButton.classList.remove('hidden');
        cartCounter.classList.remove('hidden');
    }

    function handleCartDecrement() {
        const cartCount = decrementCartCount();

        productQuantity.value = cartCount;
        headerCartQuantity.textContent = cartCount;

        if (cartCount === 0) {
            addToCartButton.classList.remove('hidden');
            proceedToCheckoutButton.classList.add('hidden');
            cartCounter.classList.add('hidden');
        }
    }
    
    addToCartButton.addEventListener('click', handleCartIncrement);
    productQuantityIncrement.addEventListener('click', handleCartIncrement);
    productQuantityDecrement.addEventListener('click', handleCartDecrement);

    cartCountChannel.onmessage = (event) => {

        const cartCount = Number(event.data);

        productQuantity.value = cartCount;
        headerCartQuantity.textContent = cartCount;

        if (cartCount === 0) {
            addToCartButton.classList.remove('hidden');
            proceedToCheckoutButton.classList.add('hidden');
            cartCounter.classList.add('hidden');
        }

    }
}());
