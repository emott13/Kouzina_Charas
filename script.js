document.addEventListener('DOMContentLoaded', () => {
    if(document.body.classList.contains('menu')){
        setUpAppetizers();
    }
    if(document.body.classList.contains('cart')){
        setUpCart();
    }
});


// -------------------- //
// ---- APPETIZERS ---- //
// -------------------- //

function setUpAppetizers(){
    let buttons = document.getElementsByClassName('addItem');
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', handleAddItem)
    };
};

function handleAddItem(event){
    let button = event.target;
    let menuItem = button.closest('.menu-item');
    let name = menuItem.querySelector('.name').innerText;
    let price = menuItem.querySelector('.price').innerText;
    let image = menuItem.querySelector('img').src;

    let item = {
        name: name,
        price: price,
        image: image
    };
    
    addToCartInLS(item);
};

    
function addToCartInLS(item){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];                      //JSON.parse -----------
    const existingItem = cart.find(cartItem => cartItem.name === item.name)
    if(existingItem){
        alert('This item already exists in your bag. Please increase the quantity in your bag to add more.')
        return;
    }
    let add = document.querySelector('#add')
    add.style.opacity = 1;
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart))                              //JSON.stringify -------
    setTimeout(fadeOut, 3000)
}

function fadeOut(){
    add.style.opacity = 0;
}


// -------------- //
// ---- CART ---- //
// -------------- //

function setUpCart(){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if(cart.length == 0){
        document.querySelector('.bag-items').innerHTML = 
        `<p id="empty">Your bag is empty...</p>`
    }
    else{
        displayCartItems(cart);
        quantityChange();
        getTotal();
        removeButtons();
    }
}

function displayCartItems(cart){
    let container = document.querySelector('.bag-items');
    container.innerHTML = '';

    cart.forEach(item => {
        let cartItem = document.createElement('div');
        cartItem.classList.add('bag-item');
        cartItem.innerHTML = 
            `
                <div class="item column">
                    <img src="${item.image}" alt="${item.name}" class="bag-image">
                    <span class="name">${item.name}</span>
                </div>
                <span class="price column">${item.price}</span>
                <div class="quantity column"> 
                    <input type="number" name="quantity" class="quantityInput" value="1">
                    <button class="btn-remove">Remove</button>
                </div>
                
            `;
    container.append(cartItem);
    });
}

function removeButtons(){
    let removeButtons = document.querySelectorAll('.btn-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const itemName = event.target.closest('.bag-item').querySelector('.name').innerText;
            removeItemFromLS(itemName, event);
        });
    });
    // setUpCart();
}

function removeItemFromLS(itemName, event){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(cartItem => cartItem.name !== itemName);
    localStorage.setItem('cart', JSON.stringify(cart));

    event.target.closest('.cart-items').remove();
    let load = document.querySelector('.loader');
    setTimeout(() => {
        load.style.opacity = 1;
        setTimeout(() => {
            location.reload();
        }, 1000);
    }, 200);
    load.style.opacity = 0;
}



function quantityChange(){
    let quantities = document.querySelectorAll('.quantityInput');
    quantities = Array.from(quantities);
    quantities.forEach(input => {
        input.addEventListener('change', (event) => {
            let change = event.target;
            if(change.value <= 0 || isNaN(change.value)){
                change.value = 1;
            }
            else{
                change.value = parseInt(change.value);
            }
            getTotal();
        })
    });
}

function getTotal(){
    let bagItems = document.getElementsByClassName('bag-item');
    let total = 0;
    for(let i = 0; i < bagItems.length; i++){
        let count = bagItems[i];
        let bagPrice = count.getElementsByClassName('price')[0];
        let price = Number(bagPrice.innerText.replace('€', ''));

        let quantities = count.getElementsByClassName('quantityInput')[0];
        let quantity = quantities.value

        total = total + (price * quantity);
    };
    total = Math.round(total * 100) / 100;
    document.querySelector('.bag-total-price').innerText = '€' + total;
}




// function removeItemFromLS(event) {
//     const removeButtons = document.querySelectorAll('.remove-btn');
//         removeButtons.forEach(button => {
//         button.addEventListener('click', (event) => {
//             const itemName = event.target.closest('.cart-item').querySelector('.name').innerText;
//             let cart = JSON.parse(localStorage.getItem('cart')) || [];
//             cart = cart.filter(cartItem => cartItem.name !== itemName);
//             localStorage.setItem('cart', JSON.stringify(cart));
//             event.target.closest('.cart-item').remove();
//             alert(`${itemName} removed from cart.`);

//         })})
// }