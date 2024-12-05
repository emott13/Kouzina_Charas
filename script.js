document.addEventListener('DOMContentLoaded', () => {
    addingFilterItems();
    const pageClass = document.body.classList;
    if(pageClass.contains('main')){
        setUpMenu('app');
        setUpMenu('lunch'); 
        setUpMenu('dinner'); 
        setUpMenu('dessert'); 
        setUpMenu('drink');
        headerScroll();
        hover();
        
    }
    if(pageClass.contains('cart')) setUpCart();

    if(pageClass.contains('appetizers')) displayMenuOnPage('app');
    if(pageClass.contains('lunch')) displayMenuOnPage('lunch');
    if(pageClass.contains('dinner')) displayMenuOnPage('dinner');
    if(pageClass.contains('desserts')) displayMenuOnPage('dessert');
    if(pageClass.contains('beverages')) displayMenuOnPage('drink');
    flyout();
});


// ------------------------------ //
// ---- LOCAL STORAGE SET UP ---- //
// ------------------------------ //


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
        ],
        identifiers: ['001', '002', '003', '004'],
        tags: [
            ['appetizer', 'light', 'vegetables'],
            ['appetizer', 'light', 'vegetables'],
            ['appetizer', 'medium', 'fried_cheese'],
            ['appetizer', 'light', 'yogurt'],
        ]
    },
    lunch: {
        names: ['Spanakopita', 'Souvlaki', 'Kalamarakia Psita', 'Moussaka'],
        prices: ['12.50', '13.70', '13.50', '13.00'],
        images: ['/Images/Lunch/spanakopita-copy.jpg', '/Images/Lunch/souvlaki.jpeg', '/Images/Lunch/kalamarakia.jpg', '/Images/Lunch/moussaka.jpg'],
        descriptions: [
            'Flaky, golden pastry filled with a deliciously savory blend of spinach and feta.',
            'Tender, marinated pork skewers grilled to perfection, served with warm pita and tangy tzatziki.',
            'Fresh caught thrapsalo squid, perfectly grilled and topped with fresh herbs and olive oil. Served with lemon.',
            'Rich layers of eggplant, seasoned beef, and béchamel sauce, baked until golden.'
        ],
        identifiers: ['005', '006', '007', '008'],
        tags: [
            ['lunch', 'medium', 'meat'],
            ['lunch', 'medium', 'meat'],
            ['lunch', 'medium', 'seafood'],
            ['lunch', 'medium', 'meat'],
        ]
    },
    dinner: {
        names: ['Gemista', 'Fava', 'Pastitsio', 'Chtapodi sti Schara', 'Psari plaki'],
        prices: ['14.70', '13.50', '13.50', '14.70', '14.50'],
        images: ['/Images/Dinner/gemista.jpg', '/Images/Dinner/fava.jpg', '/Images/dinner/Pastitsio.jpg', '/Images/Dinner/octopus.png', '/Images/Dinner/psari.jpg'],
        descriptions: [
            'Juicy tomatoes and bell peppers stuffed with herbed rice and vegetables, baked for a deliciously hearty bite.',
            'Hearty and creamy, yellow split peas drizzled with olive oil and topped with onions and capers—a smooth, savory classic.',
            'Layers of pasta, seasoned ground beef, and creamy béchamel, baked to bubbly perfection—Greek lasagna with a twist.',
            'Fresh octopus, grilled over charcoal and served with olive oil and lemon.',
            'Tender baked fish in a creamy tomato and onion sauce. Topped with fresh herbs and served with lemon.'
        ],
        identifiers: ['009', '010', '011', '012', '013'],
        tags: [
            ['dinner', 'medium', 'vegetable'],
            ['dinner', 'medium', 'vegetable'],
            ['dinner', 'medium', 'meat'],
            ['dinner', 'medium', 'seafood'],
            ['dinner', 'medium', 'seafood'],
        ]
    },
    dessert: {
        names: ['Loukoumades', 'Baklava', 'Ekmek Kataifi'],
        prices: ['8.00', '9.00', '8.00'],
        images: ['/Images/Dessert/loukoumades.jpg', '/Images/Dessert/baklava.jpg', '/Images/Dessert/ekmek.jpg'],
        descriptions: [
            'Light, golden doughnuts drizzled with honey and sprinkled with cinnamon and crushed nuts—a sweet, fluffy treat to satisfy every sweet tooth.',
            'Crispy, flaky layers of phyllo pastry filled with nuts and sweetened with syrup or honey—an irresistible, melt-in-your-mouth dessert.',
            'Crispy kataifi pastry layered with mastiha flavoured custard. Topped with whipped cream, chopped nuts, and cinnamon. Deliciously sweet and indulgent.'
        ],
        identifiers: ['014', '015', '016'],
        tags: [
            ['dessert', 'light'],
            ['dessert', 'heavy'],
            ['dessert', 'medium'],
            
        ]
    },
    drink: {
        names: ['Pink Lemonade', 'Cherry juice', 'Orange juice', 'Ellinikos Kafes'],
        prices: ['3.00', '3.00', '3.00', '3.50'],
        images: ['/Images/Beverages/pink-lemonade.jpg', '/Images/Beverages/sour-cherry.jpg', '/Images/Beverages/orange.jpg', '/Images/Beverages/coffee.jpg'],
        descriptions: [
            'A delightful blend of lemony zest with a hint of berry sweetness—this pink lemonade is a refreshing twist on a classic!',
            'Bold, tangy, and tart—this refreshing cherry juice bursts with vibrant flavor in every sip.',
            'Freshly squeezed, sun-ripened oranges bring a zesty and refreshing taste that is as bright as a Mediterranean morning.',
            'Traditional Greek coffee, deliciously brewed for a strong, rich flavor. Served with a glass of water.'
        ],
        identifiers: ['017', '018', '019', '020'],
        tags: [
            ['beverage', 'refresher'],
            ['beverage', 'juice'],
            ['beverage', 'juice'],
            ['beverage', 'coffee'],
        ]
        
    }
};

function setUpMenu(type){
    const menu = menuData[type];
    if (!menu) return;
    
    menu.names.forEach((name, i) => {
        let item = {
            name: name,
            price: menu.prices[i],
            image: menu.images[i],
            description: menu.descriptions[i],
            quantity: 1,
            identifiers: menu.identifiers[i]
        };
        addToLS(type, item);
    });
}

function addToLS(type, item){
    let data = JSON.parse(localStorage.getItem(type)) || [];
    
    const baseIdentifier = item.identifiers.substring(0, 3);
    const nanKey = baseIdentifier + 'NaN';

    const existingItem = data.find(existing => existing.identifiers === item.identifiers || existing.identifiers === nanKey);
    if(existingItem){
        return; 
    }

    data.push(item);
    localStorage.setItem(type, JSON.stringify(data));
}


// -------------------------- //
// ---- HOME PAGE FLYOUT ---- //
// -------------------------- //


function flyout(){
    let navBtn = document.querySelector('.nav');
    let flyout = document.querySelector('.header');
    if(navBtn && flyout){
        navBtn.addEventListener('click', () => {
            flyout.style.left = '0';
        });
    }
    let closeBtn = document.querySelector('.close');
    if(closeBtn){
        closeBtn.addEventListener('click', () => {
            flyout.style.left = '-100%';
        })
    }
}


// ---------------------------- //
// ---- MENU PAGES DISPLAY ---- //
// ---------------------------- //


function displayMenuOnPage(type){
    let container = document.querySelector('.holder');
    container.innerHTML = ''; 
    let storedItems = JSON.parse(localStorage.getItem(type)) || [];

    let validIdentifiers = new Set(); 

    storedItems.forEach(item => {
        let id = item.identifiers;
        if(!isNaN(id) && id.length === 3){
            let baseId = id.substring(0, 3); 
            let counterpartExists = storedItems.some(otherItem => 
                otherItem.identifiers === baseId + 'NaN'
            );

            if(!counterpartExists){
                validIdentifiers.add(baseId);
                validIdentifiers.add(baseId + 'NaN');
            }
        }
    });

    storedItems.forEach(item => {
        let id = item.identifiers;

        if(validIdentifiers.has(id)){
            let menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.innerHTML = `
                <div class="item-image"><img src="${item.image}" alt="${item.name}"></div>
                <div class="item-info">
                    <p class="name">${item.name}</p>
                    <div class="add-info">
                        <p class="price">${convertPrice(item.price)}</p>
                        <button class="addItem shadow" data-type="${item.identifiers}"><img src="/Ion_Icons/add-outline.svg" alt="" class='icon-image-add'></button>
                    </div>
                </div>
                <p class="description">${item.description}</p>
            `;
            container.append(menuItem);
        }
    });

    addItemClick();
}


// --------------------- //
// ---- ADD TO CART ---- //
// --------------------- //


function addItemClick(){
    let buttons = document.querySelectorAll('.addItem');
    buttons.forEach(button => {
        console.log('button clicked')
        button.addEventListener('click', handleAddItem);
    });
};

function handleAddItem(event){
    let button = event.target.closest('.addItem');
    let menuItem = button.closest('.menu-item');
    let name = menuItem.querySelector('.name').innerText;
    let price = parseFloat(menuItem.querySelector('.price').innerText.replace('€', '').trim());
    let image = menuItem.querySelector('img').src;
    let id = button.dataset.type; 
    console.log({name, price, image, id})

    let item = {
        name: name,
        price: price,
        image: image,
        quantity: 1,
        identifiers: id
    };
    
    addToCartInLS(item);
};
 
function addToCartInLS(item){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];                      
    const existingItem = cart.find(cartItem => cartItem.identifiers === item.identifiers);
    if(existingItem){
        alert('This item already exists in your bag. Please increase the quantity in your bag to add more.')
        return;
    }
    let add = document.querySelector('#add');
    console.log('Add Element', add)
    if (!add) {
        console.warn('Element with ID "add" not found. Creating one dynamically.');
        add = document.createElement('div');
        add.id = 'add';
        add.style.opacity = '0';
        add.textContent = 'Item added to cart!';
        document.body.appendChild(add);
    }

    add.style.opacity = 1; // Make the element visible
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));

    
    setTimeout(() => fadeOut(add), 3000);
}

function fadeOut(add){
    add.style.opacity = 0;
}


// -------------- //
// ---- CART ---- //
// -------------- //


function setUpCart(){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if(cart.length === 0){
        getTotal();
        document.querySelector('.bag-items').innerHTML = `<p id="empty">Your bag is empty...</p>`;
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
        <span class="price column">${convertPrice(item.price)}</span>
        <div class="quantity column"> 
            <input type="number" name="quantity" class="quantityInput" value="${item.quantity}">
            <button class="btn-remove">Remove</button>
        </div>
    `;
    container.append(cartItem);
    }); 
       
    removeButtons();
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
    setTimeout(setUpCart, 700);
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
            
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let cartItem = cart.find(item => item.name.trim() === itemName);

            if(cartItem){
                cartItem.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                console.log(`Updating quantity for ${itemName} to ${newQuantity}.`);
            } 
            else{
                console.error(`Item ${itemName} not found in Local Storage`)
            }
            getTotal();
        });
    });
}

function getTotal(){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    let totalContainer = document.querySelector('.bag-total-price');
    cart.forEach(cartItem => {
        let price = parseFloat(cartItem.price);
        let quantity = cartItem.quantity;
        total += (price * quantity);
    });
    totalContainer.innerText = convertPrice(total);
}

function loader(){
    let loader = document.querySelector('.loader');
    let cart = document.querySelector('.cart-items')
    cart.style.display = 'none';
    loader.style.opacity = 1;
    setTimeout(() => {loader.style.opacity = 0; cart.style.display = 'flex'}, 800);
}

function convertPrice(price){
    let split = String(price).split('.');
    let end = split[1] ? String(split[1]).padEnd(2, '0') : '00'
    if(split[0] == 0){return '0€'}
    return split[0] + ',' + end + '€'; 
}

function headerScroll(){
    let header = document.querySelector('.image-section h2');
    let menu = document.querySelector('.nav');
    let login = document.querySelector('.admin-login');
    let menuSelectionsContainer = document.querySelector('.menu-selections-container');
    let icons = document.querySelector('.iconImgHeader');

    window.addEventListener('scroll', () => {
        let menuTop = menuSelectionsContainer.getBoundingClientRect().top;
        if(menuTop <= 50){
            header.style.height = '50px';
            header.style.backgroundImage = 'linear-gradient(to bottom, #fff, #fff)';
            header.style.fontSize = '40px';
            header.style.color = '#000';
            menu.style.color = '#000';
            icons.style.height = '25px'
            menu.style.top = '0.7%'
            login.style.color = '#000';
            login.style.top = '0'
        }
        else{
            header.style.height = '100px';
            header.style.backgroundImage = 'linear-gradient(to bottom, #000, #00000000)';
            header.style.fontSize = '80px';
            header.style.color = '#fff';
            menu.style.color = '#fff';
            icons.style.height = '30px'
            menu.style.top = '2.5%';
            login.style.color = '#fff';
            login.style.top = '2.5%';
        }
    });
}

function hover(){
    let options = document.querySelectorAll('.selections li.options');
    let arrows = document.querySelectorAll('.selections li.option-arrow');
    let selection = document.querySelectorAll('.selections .selection');
    for(let i = 0; i < options.length; i++){
        selection[i].addEventListener('mouseover', () => {
            arrows[i].style.opacity = '1';
            arrows[i].style.display = 'flex';
            setTimeout(() => {
                arrows[i].classList.add('visible');
            }, 250);
        })
    }
    for(let i = 0; i < arrows.length; i++){
        selection[i].addEventListener('mouseout', () => {
            options[i].style.height = '240px';
            arrows[i].style.display = 'none';
            arrows[i].style.opacity = '0';
            arrows[i].classList.remove('visible');
        });
    }
}

function addingFilterItems(){
    const filterButton = document.querySelector('.filter-button');
    const filters = document.querySelectorAll('.filters-container input[type="checkbox"]');
    const foodContainer = document.querySelector('.food-container');

    if(!filterButton|| !foodContainer){
        return;
    }

    console.log('Filter button initialized');
    filterButton.addEventListener('click', () => {
        console.log("hello")
        const selectedFilters = getSelectedFilters();
        console.log('Selected Filters:',selectedFilters);

        const filteredData = filterMenuData(selectedFilters);
        console.log('Filtered Data:', filteredData);

        displayFilteredData(filteredData);
        
    })

    function getSelectedFilters(){
        const selectedFilters = {};
        filters.forEach(filter => {
            if(filter.checked){
                const group = filter.name; // group name ('meal', 'foodtype')
                if(!selectedFilters[group]){ selectedFilters[group] = []}
                    selectedFilters[group].push(filter.value); // add value to corresponding group
            }
        });
        return selectedFilters;
    }

    function displayFilteredData(data){
        foodContainer.innerHTML = ''; // clear existing items
        if(data.length === 0){
            foodContainer.innerHTML = '<p>No items match your filter</p>';
            return;
        }
        data.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.innerHTML = `
            <div class="item-image"><img src="${item.image}" alt="${item.name}"></div>
                <div class="item-info">
                    <p class="name">${item.name}</p>
                    <div class="add-info">
                        <p class="price">${convertPrice(item.price)}</p>
                        <button class="addItem shadow" data-type="${item.identifiers}"><img src="/Ion_Icons/add-outline.svg" alt="" class='icon-image-add'></button>
                    </div>
                </div>
                <p class="description">${item.description}</p>
            `;
            foodContainer.appendChild(menuItem);
        });

        addItemClick();
    }

    function filterMenuData(filters){
        const allData = Object.values(menuData).flatMap(category => 
            category.names.map((name, i) => ({
                name,
                price: category.prices[i],
                description: category.descriptions[i],
                image: category.images[i],
                identifiers: category.identifiers[i],
                tags: category.tags ? category.tags[i] : []
            }))
        );
    
        return allData.filter(item =>
            Object.entries(filters).every(([filterCategory, filterValues]) => {
                // console.log(`Checking filter category: ${filterCategory} with values: ${filterValues}`);
                return filterValues.some(value => item.tags.includes(value));
            })
        );
    }
}


