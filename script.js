document.addEventListener('DOMContentLoaded', () => {
    if(document.body.classList.contains('appetizers')){
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
    let image = getImage(name);

    let item = {
        name: name,
        price: price,
        image: image
    };
    
    addToCartInLS(item);
};

function getImage(title){
    switch(title){
        case 'Dolmades':
            return '/Images/Appetizers/Delmades.jpeg'
        case 'Choriatiki':
            return '/Images/Appetizers/Przepis-na-Choriatiki.jpg';
        case 'Saganaki':
            return '/Images/Appetizers/saganaki.avif';
        case 'Tzatziki':
            return '/Images/Appetizers/Tzatziki-fit.jpg';
    }
};
    
function addToCartInLS(item){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];                      //JSON.parse -----------
    const existingItem = cart.find(cartItem => cartItem.name === item.name)
    if(existingItem){
        alert('This item already exists in your bag. Please increase the quantity in your bag to add more.')
    }
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart))                              //JSON.stringify -------
}


// -------------- //
// ---- CART ---- //
// -------------- //

function setUpCart(){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if(cart.length == 0){
        document.querySelector('.bag-items').innerHTML = 
        `<p>Your car is empty</p>`
    }
    else{
        displayCartItems(cart);
    }
}

function displayCartItems(cart){
    let container = document.querySelector('.bag-items');
    container.innerHTML = '';

    cart.forEach(item => {
        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = 
            `
                <div class="item column">
                    <img src="${item.image}" alt="${item.name}">
                    <span class="name">${item.name}</span>
                </div>
                <span class="price column">${item.price}</p>
                <div class="quantity column"> 
                    <input type="number" name="quantity" class="quantity" value="1">
                    <button class="btn-remove">Remove</button>
                </div>
                
            `;
    container.append(cartItem);
    });
}




// if(document.readyState == 'loading'){
//     document.addEventListener('DOMContentLoaded', ready)
// }
// else{
//     ready();
// }

// function ready(){
//     let buttons = document.getElementsByClassName('addItem');
//     for(let i = 0; i < buttons.length; i++){
//         buttons[i].addEventListener('click', handleAddItem);
//     }
//     // buttons.forEach(button => {
//     //     button.addEventListener('click', handleAddItem);
//     // });
// }

// function handleAddItem(event){
//     let button = event.target
//     let menuItem = button.closest('.menu-item');
//     let title = menuItem.getElementsByClassName('name')[0].innerText;
//     let price = menuItem.getElementsByClassName('price')[0].innerText;
//     let image = getImage(title);
//     image = image.replace("'", "")
//     addToCart(title, price, image);
// }

// function getImage(title){
//     switch(title){
//         case 'Dolmades':
//             return '/Images/Appetizers/Delmades.jpeg'
//         case 'Choriatiki':
//             return '/Images/Appetizers/Przepis-na-Choriatiki.jpg';
//         case 'Saganaki':
//             return '/Images/Appetizers/saganaki.avif';
//         case 'Tzatziki':
//             return '/Images/Appetizers/Tzatziki-fit.jpg';
//     }
// }

// function addToCart(title, price, image){
//     let newItem = document.createElement('div');
//     newItem.classList.add('bag-item');
//     let bagItemsContainer = document.querySelector('.bag-items');
//     console.log('Bag Items Container:', bagItemsContainer);
//     let bagItemsNames = document.getElementsByClassName('bag-item');
//     for(let i = 0; i < bagItemsNames.length; i++){
//         if(title == bagItemsNames[i]){
//             alert('This item is already in your bag. Please increase the quantity in the bag.');
//             return;
//         }
//     }
//     // bagItemsNames.forEach(name => {
//     //     alert('This item is already in your bag. Please increase the quantity in the bag.')
//     // });
//     let contents = 
//         `
//             <div class="menu-item">
//                 <div class="img"><img src="${image}" alt=""></div>
//                 <p class="name">${title}</p>
//                 <p class="price">${price}</p>
//             </div>
//         `
//     newItem.innerHTML = contents;
//     bagItemsContainer.append(newItem)
// }

// // const fs = require('fs');
// // function fileSearch(dir, fileName){
// //     fs.readdir(dir, (err, files)) => {

// //     }
// // }