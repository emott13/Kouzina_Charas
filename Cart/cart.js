if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}
else{
    ready;
}

const ready = () => {
    let removeItemButtons = document.getElementsByClassName('********');
    removeItemButtons.forEach(button => {
        button.addEventListener('click', removeItem);
    });

    let quantityInputs = document.getElementsByClassName('*********');
    quantityInputs.forEach(input => {
        input.addEventListener('change', quantityChange);
    });

    let addItemButtons = document.getElementsByClassName('********');
    addItemButtons.forEach(button => {
        button.addEventListener('click', addToCartClick);
    })
};

const removeItem = (event) => {
    let clicked = event.target;
    clicked.parentElement.parentElement.remove();
    updateCartTotal;
};

const quantityChange = (event) => {
    let input = event.target;
    if(isNaN(input.value) || input.value < 0){
        input.value = 1;
    }
    updateCartTotal;
};

const updateCartTotal = () => {
    let cartItemContainer = document.getElemenetsByClassName('********')[0];
    let cartRows = cartItemContainer.getElementsByClassName('********');
    let total = 0;
    cartRows.forEach(cartRow => {
        let priceElement = cartRow.getElemenetsByClassName('*********')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));

        let quantityElement = cartRow.getElemenetsByClassName('********')[0];
        let quantity = quantityElement.value;

        total += (price * quantity);
    });
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('********').innerText = '$' + total;
};

const addToCartClick = (event) => {
    button = event.target;
    let menuItem = button.parentElement.parentElement;
    let title = menuItem.getElemenetsByClassName('********')[0].innerText;
    let price = menuItem.getElemenetsByClassName('********')[0].innerText;
    let image = menuItem.getElemenetsByClassName('*******')[0].src;
    addToCart(title, price, image);
}

const addToCart = (title, price, image) => {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItems = document.getElemenetsByClassName('********')[0];
    let cartItemNames = document.getElementsByClassName('********');
    cartItemNames.forEach(name => {
        if(name.innerText == title){
            alert('This item already exists in the cart. Please increase the quantity in cart.')
        }
    })
    let contents = `` //get contents from menu
    cartRow.innerHTML = contents;
    cartItems.append(cartRow);
}