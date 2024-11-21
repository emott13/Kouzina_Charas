document.addEventListener('DOMContentLoaded', () => {
    const pageClass = document.body.classList;
    if(pageClass.contains('appetizers')) setUpMenu('app');
    if(pageClass.contains('lunch')) setUpMenu('lunch');
    if(pageClass.contains('dinner')) setUpMenu('dinner');
    if(pageClass.contains('desserts')) setUpMenu('dessert');
    if(pageClass.contains('beverages')) setUpMenu('drink');
    if(pageClass.contains('cart')) setUpCart();
    addItemClick();
});

// -------------------- //
// ---- MENU ITEMS ---- //
// -------------------- //

const menuData = {
    app: {
        names: ['Dolmades', 'Choriatiki', 'Saganaki', 'Tzatziki'],
        prices: ['6.00', '6.00', '7.00', '7.00'],
        images: ['/Images/Appetizers/dolmades.jpg', '/Images/Appetizers/choriatiki.jpg', '/Images/Appetizers/saganaki.jpg', '/Images/Appetizers/Tzatziki.jpg'],
        descriptions: [
            'Rice, herbs, and seasonings wrapped in grape leaves. Served with lemon.',
            'Refreshing mix of tomato, cucumber, peppers, onion, and olives, topped with feta.',
            'Flour-coated kasseri cheese fried to a crispy, golden brown. Served with lemon.',
            'Creamy yogurt with cucumbers, garlic, and fresh herbs.'
        ]
    },
    lunch: {
        names: ['Spanakopita', 'Souvlaki', 'Kalamarakia Psita', 'Moussaka'],
        prices: ['12.50', '13.70', '13.50', '13.00'],
        images: ['/Images/Lunch/spanakopita-copy.jpg', '/Images/Lunch/souvlaki.jpeg', '/Images/Lunch/kalamarakia.jpg', '/Images/Lunch/moussaka.jpg'],
        descriptions: [
            'Flaky, golden pastry filled with a deliciously savory blend of spinach and feta.',
            'Tender, marinated meat skewers grilled to perfection, served with warm pita and tangy tzatziki.',
            'Fresh caught thrapsalo squid, perfectly grilled and topped with fresh herbs and olive oil. Served with lemon.',
            'Rich layers of eggplant, seasoned meat, and béchamel sauce, baked until golden.'
        ]
    },
    dinner: {
        names: ['Gemista', 'Fava', 'Pastitsio', 'Chtapodi sti Schara', 'Psari plaki'],
        prices: ['14.70', '13.50', '13.50', '14.70', '14.50'],
        images: ['/Images/Dinner/gemista.jpg', '/Images/Dinner/fava.jpg', '/Images/dinner/Pastitsio.jpg', '/Images/Dinner/octopus.png', '/Images/Dinner/psari.jpg'],
        descriptions: [
            'Juicy tomatoes and bell peppers stuffed with herbed rice and vegetables, baked for a deliciously hearty bite.',
            'Hearty and creamy, yellow split peas drizzled with olive oil and topped with onions and capers—a smooth, savory classic.',
            'Layers of pasta, seasoned ground meat, and creamy béchamel, baked to bubbly perfection—Greek lasagna with a twist.',
            'Fresh octopus, grilled over charcoal and served with olive oil and lemon.',
            'Tender baked fish in a creamy tomato and onion sauce. Topped with fresh herbs and served with lemon.'
        ]
    },
    dessert: {
        names: ['Loukoumades', 'Baklava'],
        prices: ['8.00', '9.00'],
        images: ['/Images/Dessert/loukoumades.jpg', '/Images/Dessert/baklava.jpg'],
        descriptions: [
            'Light, golden doughnuts drizzled with honey and sprinkled with cinnamon and crushed nuts—a sweet, fluffy treat that melts in your mouth.',
            'Crispy, flaky layers of phyllo pastry filled with nuts and sweetened with syrup or honey—an irresistible, melt-in-your-mouth dessert.'
        ]
    },
    drink: {
        names: ['Pink Lemonade', 'Cherry juice', 'Orange juice'],
        prices: ['3.00', '3.00', '3.00'],
        images: ['/Images/Beverages/pink-lemonade.jpg', '/Images/Beverages/sour-cherry.jpg', '/Images/Beverages/orange.jpg'],
        descriptions: [
            'A delightful blend of lemony zest with a hint of berry sweetness—this pink lemonade is a refreshing twist on a classic!',
            'Bold, tangy, and tart—this refreshing cherry juice bursts with vibrant flavor in every sip.',
            'Freshly squeezed, sun-ripened oranges bring a zesty and refreshing taste that is as bright as a Mediterranean morning.'
        ]
    }
};

function addToLS(type, item) {
    let data = JSON.parse(localStorage.getItem(type)) || [];
    const existingItem = data.find(existing => existing.name === item.name);

    console.log('Local Storage before adding item:', localStorage);//debugging log

    if (existingItem){
        console.log(`Item ${item.name} already exists in ${type}`);//debugging log
        return;
    } 
    
    let add = document.querySelector('#add');
    add.style.opacity = 1;
    data.push(item);

    console.log('Adding to Local Storage',type,item);  //debugging log

    localStorage.setItem(type, JSON.stringify(data));
    setTimeout(fadeOut, 3000);
}

function setUpMenu(type) {
    const menu = menuData[type];
    if (!menu) return;
    
    menu.names.forEach((name, i) => {
        let item = {
            name: name,
            price: menu.prices[i],
            image: menu.images[i],
            description: menu.descriptions[i],
            quantity: 1
        };
        addToLS(type, item);
    });
    
    let container = document.querySelector('.holder');
    container.innerHTML = '';
    let storedItems = JSON.parse(localStorage.getItem(type)) || [];
    
    storedItems.forEach(item => {
        let menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <div class="item-image"><img src="${item.image}" alt="${item.name}"></div>
            <div class="item-info">
                <p class="name">${item.name}</p>
                <div class="add-info">
                    <p class="price">€ ${item.price}</p>
                    <button class="addItem shadow"><img src="/Ion_Icons/add-outline.svg" alt=""></button>
                </div>
            </div>
            <p class="description">${item.description}</p>
        `;
        container.append(menuItem);
    });
}


// --------------------- //
// ---- ADD TO CART ---- //
// --------------------- //

function addItemClick(){
    let buttons = document.getElementsByClassName('addItem');
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', handleAddItem)
    };
};

function handleAddItem(event){
    let button = event.target;
    let menuItem = button.closest('.menu-item');
    let name = menuItem.querySelector('.name').innerText;
    let price = parseFloat(menuItem.querySelector('.price').innerText.replace('€', '').trim());
    let image = menuItem.querySelector('img').src;

    let item = {
        name: name,
        price: price,
        image: image,
        quantity: 1
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
    let add = document.querySelector('#add');
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
    
    // key change
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
                    <input type="number" name="quantity" class="quantityInput" value="${item.quantity}">
                    <button class="btn-remove">Remove</button>
                </div>
                
            `;
    container.append(cartItem);
    removeButtons();
    });
}

function removeButtons(){
    let removeButtons = document.querySelectorAll('.btn-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            loader();
            const itemName = event.target.closest('.bag-item').querySelector('.name').innerText;
            removeItemFromLS(itemName, event);
        });
    });
}

function removeItemFromLS(itemName, event){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(cartItem => cartItem.name !== itemName);
    localStorage.setItem('cart', JSON.stringify(cart));
    event.target.closest('.bag-item').remove();
    if (cart.length === 0) {
        document.querySelector('.bag-items').innerHTML = '<p id="empty">Your bag is empty...</p>';
    }
    setTimeout(setUpCart, 900);
    // setUpCart();
}

function quantityChange(){
    let quantities = document.querySelectorAll('.quantityInput');
    quantities = Array.from(quantities);

    quantities.forEach(input => {
        input.addEventListener('change', (event) => {
            let change = event.target;
            let itemName = change.closest('.bag-item').querySelector('.name').innerText;

            let newQuantity = parseInt(change.value);
            if(isNaN(newQuantity) || newQuantity <= 0){
                newQuantity = 1;
                change.value = newQuantity;
                console.log(`Invalid quantity for ${itemName}, resetting to 1.`);
            }
            
            //updates the local storage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let cartItem = cart.find(item => item.name.trim() === itemName);

            if(cartItem){
                cartItem.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                console.log(`Updating quantity for ${itemName} to ${newQuantity}.`);
            } else {
                console.error(`Item ${itemName} not found in Local Storage`)
            }

            getTotal();
        });
    });
}


function getTotal(){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cart.forEach(cartItem =>{

        let price = parseFloat(// short hand if statement since                                                      // typeof price === 'string' ? true : false checks what type price is
            typeof cartItem.price === 'string' ? cartItem.price.replace('$', '') : cartItem.price                   //<---------------typeof ensures that cartItem.price is a string before calling .replace
        );
        let quantity = cartItem.quantity;
        total = total + (price * quantity);
    });
    // total = Math.round(total * 100) / 100;
    document.querySelector('.bag-total-price').innerText = '€' + total;
}

function loader() {
    let loader = document.querySelector('.loader');
    let cart = document.querySelector('.cart-items')
    cart.style.display = 'none';
    loader.style.opacity = 1;
    setTimeout(() => {loader.style.opacity = 0; cart.style.display = 'flex'}, 900);
}