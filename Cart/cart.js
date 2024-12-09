const ready = () => {
    let quantityInputs = document.getElementsByClassName('quantity-input'); // Update with correct class
    Array.from(quantityInputs).forEach(input => {
        input.addEventListener('change', quantityChange);
    });

    let addItemButtons = document.getElementsByClassName('add-item-button'); // Update with correct class
    Array.from(addItemButtons).forEach(button => {
        button.addEventListener('click', addToCartClick);
    });

    let removeItemButtons = document.getElementsByClassName('remove-item-button'); // Update with correct class
    Array.from(removeItemButtons).forEach(button => {
        button.addEventListener('click', removeItem);
    });
};

const updateLocalStorage = (cartItems) => {
    console.log("Updating Local Storage with cart items:", cartItems);
    localStorage.setItem('cart', JSON.stringify(cartItems));
};

const getCartItems = () => {
    const cartData = localStorage.getItem('cart');
    console.log("Retrieved cart data from Local Storage:", cartData);
    return JSON.parse(localStorage.getItem('cart')) || [];
};

const updateCartTotal = () => {
    let cartRows = document.getElementsByClassName('cart-row'); // Update with correct class
    let cartItems = [];
    let total = 0;

    Array.from(cartRows).forEach(cartRow => {
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]; // Update with correct class
        let quantityElement = cartRow.getElementsByClassName('quantity-input')[0]; // Update with correct class
        let nameElement = cartRow.getElementsByClassName('item-name')[0]; // Update with correct class

        if (!quantityElement) {
            console.log("Missing quantity input in cart row:", cartRow);
            return; // Skip this row if quantity input is missing
        }

        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = parseInt(quantityElement.value);
        let name = nameElement.innerText;

        cartItems.push({ name, price, quantity });
        total += price * quantity;
    });


    console.log("Computed Total:", total)
    document.querySelector('.cart-total-price').innerText = '$' + total.toFixed(2); // Update with correct class
    updateLocalStorage(cartItems);
};

const quantityChange = (event) => {
    let input = event.target;
    console.log("Quantity input changed:", input.value);
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
        console.log("Invalid quantity detected. Resetting to 1");
    }
    updateCartTotal();
};

const addToCartClick = (event) => {
    let button = event.target;
    let menuItem = button.parentElement.parentElement;

    let name = menuItem.getElementsByClassName('item-name')[0].innerText; // Update with correct class
    let price = menuItem.getElementsByClassName('item-price')[0].innerText; // Update with correct class

    let cartItems = getCartItems();
    let existingItem = cartItems.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ name, price: parseFloat(price.replace('$', '')), quantity: 1 });
    }
    
    updateLocalStorage(cartItems);
    updateCartTotal();
};

const removeItem = (event) => {
    let button = event.target;
    let cartRow = button.parentElement.parentElement;
    let name = cartRow.getElementsByClassName('item-name')[0].innerText; // Update with correct class

    let cartItems = getCartItems();
    cartItems = cartItems.filter(item => item.name !== name);

    updateLocalStorage(cartItems);
    cartRow.remove();
    updateCartTotal();
};

document.addEventListener('DOMContentLoaded', ready);