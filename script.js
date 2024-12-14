document.addEventListener('DOMContentLoaded', () => {
    addingFilterItems();
    initializeMenu();
    setupFilterButton();
    applyFilters();
    const pageClass = document.body.classList;
    if(pageClass.contains('main')){                                                     //index.html listener
        localStorage.removeItem('receipt');
        localStorage.removeItem('orderData');
        setUpMenu('app');
        setUpMenu('lunch'); 
        setUpMenu('dinner'); 
        setUpMenu('dessert'); 
        setUpMenu('drink');
        headerScroll();
        hover();
        flyout();
    }
    if(pageClass.contains('cart')) setUpCart();                                         //cart.html listener
    if(pageClass.contains('appetizers')) displayMenuOnPage('app');                      //appetizers.html listener
    if(pageClass.contains('lunch')) displayMenuOnPage('lunch');                         //lunch.html listener
    if(pageClass.contains('dinner')) displayMenuOnPage('dinner');                       //dinner.html listener
    if(pageClass.contains('desserts')) displayMenuOnPage('dessert');                    //dessert.html listener
    if(pageClass.contains('beverages')) displayMenuOnPage('drink');                     //beverages.html listener
});


// ------------------------------ //
// ---- LOCAL STORAGE SET UP ---- //
// ------------------------------ //


let menuData = { // ---------------------------------------------------------------------- menu items information
    app: {
        names: ['Dolmades', 'Choriatiki', 'Saganaki', 'Tzatziki'],
        prices: ['6.00', '6.00', '7.00', '7.00'],
        images: ['../../Images/Appetizers/dolmades.jpg', '../../Images/Appetizers/choriatiki.jpg', '../../Images/Appetizers/saganaki.jpg', '../../Images/Appetizers/Tzatziki.jpg'],
        descriptions: [
            'Rice, herbs, and seasonings wrapped in grape leaves. Served with lemon.',
            'Refreshing mix of tomato, cucumber, peppers, onion, and olives, topped with feta.',
            'Flour-coated kasseri cheese fried to a crispy, golden brown. Served with lemon.',
            'Creamy yogurt with cucumbers, garlic, and fresh herbs.'
        ],
        identifiers: ['001', '002', '003', '004'],
        tags: [
            ['appetizer', 'light', 'vegetables'],
            ['appetizer', 'light', 'dairy'],
            ['appetizer', 'medium', 'dairy'],
            ['appetizer', 'light', 'dairy'],
        ]
    },
    lunch: {
        names: ['Spanakopita', 'Souvlaki', 'Kalamarakia Psita', 'Moussaka'],
        prices: ['12.50', '13.70', '13.50', '13.00'],
        images: ['../../Images/Lunch/spanakopita-copy.jpg', '../../Images/Lunch/souvlaki.jpeg', '../../Images/Lunch/kalamarakia.jpg', '../../Images/Lunch/moussaka.jpg'],
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
        images: ['../../Images/Dinner/gemista.jpg', '../../Images/Dinner/fava.jpg', '../../Images/Dinner/Pastitsio.jpg', '../../Images/Dinner/octopus.png', '../../Images/Dinner/psari.jpg'],
        descriptions: [
            'Juicy tomatoes and bell peppers stuffed with herbed rice and vegetables, baked for a deliciously hearty bite.',
            'Hearty and creamy, yellow split peas drizzled with olive oil and topped with onions and capers—a smooth, savory classic.',
            'Layers of pasta, seasoned ground beef, and creamy béchamel, baked to bubbly perfection—Greek lasagna with a twist.',
            'Fresh octopus, grilled over charcoal and served with olive oil and lemon.',
            'Tender baked fish in a creamy tomato and onion sauce. Topped with fresh herbs and served with lemon.'
        ],
        identifiers: ['009', '010', '011', '012', '013'],
        tags: [
            ['dinner', 'heavy', 'vegetable'],
            ['dinner', 'heavy', 'vegetable'],
            ['dinner', 'medium', 'meat'],
            ['dinner', 'heavy', 'seafood'],
            ['dinner', 'medium', 'seafood'],
        ]
    }, //changed a few dinner items^ to heavy based on what i've read about the items but feel free to change back if you want
    dessert: {
        names: ['Loukoumades', 'Baklava', 'Ekmek Kataifi'],
        prices: ['8.00', '9.00', '8.00'],
        images: ['../../Images/Dessert/loukoumades.jpg', '../../Images/Dessert/baklava.jpg', '../../Images/Dessert/ekmek.jpg'],
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
        images: ['../../Images/Beverages/pink-lemonade.jpg', '../../Images/Beverages/sour-cherry.jpg', '../../Images/Beverages/orange.jpg', '../../Images/Beverages/coffee.jpg'],
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

function setUpMenu(type){ // -------------------------------------------------------------- called from event listener, takes menu items and sets them up to be added to local storage
    const menu = menuData[type];
    if (!menu) return;
    
    menu.names.forEach((name, i) => {
        let item = {
            name: name,
            price: menu.prices[i],
            image: menu.images[i],
            description: menu.descriptions[i],
            quantity: 1,
            identifiers: menu.identifiers[i],
            tags: menu.tags[i]
        };
        addToLS(type, item);
    });
}

function addToLS(type, item){ // ---------------------------------------------------------- takes item and type, checks for items that have been removed by manager, and sets in local storage
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


// -------------------- //
// ---- HOME PAGE  ---- //
// -------------------- //


function flyout(){ // -------------------------------------------------------------------- moves side menu flyout in and out onclick
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

function headerScroll(){ // -------------------------------------------------------------- handles css changes for index page header on scroll
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

function hover(){ // --------------------------------------------------------------------- handles css changes on hover over menu selector options
    let options = document.querySelectorAll('.selections li.options');
    let arrows = document.querySelectorAll('.selections li.option-arrow');
    let selection = document.querySelectorAll('.selections .selection');
    for(let i = 0; i < options.length; i++){
        selection[i].addEventListener('mouseenter', () => {
            arrows[i].style.opacity = '1';
            arrows[i].style.display = 'flex';
            setTimeout(() => {
                arrows[i].classList.add('visible');
            }, 200);
        })
    }
    for(let i = 0; i < arrows.length; i++){
        selection[i].addEventListener('mouseleave', () => {
            options[i].style.height = '240px';
            arrows[i].style.display = 'none';
            arrows[i].style.opacity = '0';
            arrows[i].classList.remove('visible');
        });
    }
}


// ---------------------------- //
// ---- MENU PAGES DISPLAY ---- //
// ---------------------------- //


function displayMenuOnPage(type){ // ----------------------------------------------------- takes items from LS based on type and displays on appropriate menu page
    let container = document.querySelector('.holder');
    container.innerHTML = ''; 
    let storedItems = JSON.parse(localStorage.getItem(type)) || [];

    storedItems = storedItems.filter(item => !item.identifiers.endsWith('NaN'));// -------------Exclude items with identifiers ending in "NaN"

    if (storedItems.length === 0) {
        container.innerHTML = '<p>No items available in this category.</p>';
        return;
    }

    storedItems.forEach(item => {
        let menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <div class="item-image"><img src="${item.image}" alt="${item.name}"></div>
            <div class="item-info">
                <p class="name">${item.name}</p>
                <div class="add-info">
                    <p class="price">${convertPrice(item.price)}</p>
                    <button class="addItem shadow" data-type="${item.identifiers}" data-tags=${item.tags}><img src="../../Ion_Icons/add-outline.svg" alt="" class='icon-image-add'></button>
                </div>
            </div>
            <p class="description">${item.description}</p>
        `;
        container.append(menuItem);
        
    });

    addItemClick();
}


// --------------------- //
// ---- ADD TO CART ---- //
// --------------------- //


function addItemClick(){ // -------------------------------------------------------------- listener for add to bag button
    let buttons = document.querySelectorAll('.addItem');
    buttons.forEach(button => {
        button.addEventListener('click', handleAddItem);
    });
};

function handleAddItem(event){ // -------------------------------------------------------- takes price and displays in greek euro format, sets up to be added to LS
    let button = event.target.closest('.addItem');
    let menuItem = button.closest('.menu-item');
    let name = menuItem.querySelector('.name').innerText;

    let priceElement = menuItem.querySelector('.price');
    if (!priceElement) {
        console.error("Price element not found for item:", menuItem);
        return; // Exit the function early
    }
    
    let price = parseFloat(priceElement.innerText.replace('€', '').trim());
    let image = menuItem.querySelector('img').src;
    let id = button.dataset.type;
    let tags = button.dataset.tags;

    let item = {
        name: name,
        price: price,
        image: image,
        quantity: 1,
        identifiers: id,
        tags: tags
    };


    console.log("Adding item:", item);
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
        });
    
        let displayMessage = document.querySelector('.display-message');

    setTimeout(() => {
        displayMessage.classList.add('colorChange')
        console.log('classList added')
        setTimeout(() => {
            displayMessage.classList.remove('colorChange');
            console.log('class removed')
            displayMessage.classList.add('visible');
            console.log('changed')
            setTimeout(() => {
                displayMessage.classList.remove('visible');
                console.log('removed')
            }, 2700);
        }, 1700);
    }, 700);

    addToCartInLS(item);

};

function addToCartInLS(item){ // --------------------------------------------------------- takes cart item and adds to LS 
    let cart = JSON.parse(localStorage.getItem('cart')) || [];                      
    const existingItem = cart.find(cartItem => cartItem.identifiers === item.identifiers);
    if(existingItem){// ------------------------------------------------------------------ working update cart with quantity changing
        // Optionally, you can increase the quantity here if needed
        existingItem.quantity += 1;
    }else{
        cart.push(item);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}


// -------------- //
// ---- CART ---- //
// -------------- //


function setUpCart(){ // ----------------------------------------------------------------- takes cart items from LS and calls functions to set up cart display
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

function displayCartItems(cart){ // ------------------------------------------------------ displays cart items from local storage
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

function removeButtons(){ // ------------------------------------------------------------- listener for remove buttons in cart
    let removeButtons = document.querySelectorAll('.btn-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            loader();
            const itemName = event.target.closest('.bag-item').querySelector('.name').innerText;
            removeItemFromLS(itemName, event);
        });
    });
}

function removeItemFromLS(itemName, event){ // ------------------------------------------- removes cart item from LS to remove from display
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(cartItem => cartItem.name !== itemName);
    localStorage.setItem('cart', JSON.stringify(cart));
    event.target.closest('.bag-item').remove();
    if (cart.length === 0) {
        document.querySelector('.bag-items').innerHTML = '<p id="empty">Your bag is empty...</p>';
    }
    setTimeout(setUpCart, 700);
}

function quantityChange(){ // ------------------------------------------------------------ handles quantity input change to prevent nums less than one
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
            } 
            getTotal();
        });
    });
}

function getTotal(){ // ------------------------------------------------------------------ handles getting price total from cart items
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

function loader(){ // -------------------------------------------------------------------- handles display of css loader when cart item is removed
    let loader = document.querySelector('.loader');
    let cart = document.querySelector('.cart-items')
    cart.style.display = 'none';
    loader.style.opacity = 1;
    setTimeout(() => {loader.style.opacity = 0; cart.style.display = 'flex'}, 800);
}

function convertPrice(price){ // --------------------------------------------------------- changes price to display euro sign after price in greek style
    let split = String(price).split('.');
    let end = split[1] ? String(split[1]).padEnd(2, '0') : '00'
    if(split[0] == 0){return '0€'}
    return split[0] + ',' + end + '€'; 
}


// ----------------------- //
// ---- SEARCH FILTER ---- //
// ----------------------- //


function addingFilterItems(){                                               // this will add items to the filter
    const filterButton = document.querySelector('.filter-button');          // this is the filter button
    if (filterButton) {
        // console.log("Setting up filter button...");
        filterButton.addEventListener('click', () => {
            // console.log("Filter button clicked.");
            applyFilters();                                                 // this function will apply said filter
        });
    } else {
        console.error("Filter button not found!");
    }
}

function initializeMenu() {
    // console.log("Initializing menu...");
    const allItems = getAllMenuItems();     // Fetch all menu items from localStorage
    displayMenu(allItems); // Display them in the UI
}

function getAllMenuItems() {
    // console.log("Fetching all menu items dynamically...");
    const categories = ['app', 'lunch', 'dinner', 'dessert', 'drink'];
    return categories.flatMap(category => {
        const items = JSON.parse(localStorage.getItem(category)) || [];  // data set
        // console.log(`Items from ${category}:`, items);
        return items
            .filter(item => !item.identifiers.endsWith('NaN')) // Exclude removed items
            .map(item => {
                // console.log('Processing item:', item);
                const tags = Array.isArray(item.tags)
                    ? item.tags
                    : Array.isArray(item.tag)
                    ? item.tag
                    : [];
                // console.log('Tags for item:', item.name, tags); 
                return {
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    description: item.description,
                    identifiers: item.identifiers,
                    tags: tags
                };
        });
    });
    
}

function displayMenu(items) {
    // console.log("Displaying menu items:", items);
    const foodContainer = document.querySelector('.food-container');
    if (!foodContainer) {
        return;  // Exit if food-container is not found
    }

    foodContainer.innerHTML = ''; // Clear existing items

    if (items.length === 0) {
        foodContainer.innerHTML = '<p>No items match your filter</p>';
        return;
    }
    
    items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <div class="item-image"><img src="${getImagePath(item.image)}" alt="${item.name}"></div>
            <div class="item-info">
                <p class="name">${item.name}</p>
                <div class="add-info">
                    <p class="price">${convertPrice(item.price)}</p>
                    <button class="addItem shadow" data-type="${item.identifiers}"><img src="../Ion_Icons/add-outline.svg" alt="" class='icon-image-add'></button>
                </div>
            </div>
            <p class="description">${item.description}</p>
        `;
        
        foodContainer.appendChild(menuItem);
        console.log('image path:', getImagePath(item.image))
    });
    

    addItemClick();
}

function applyFilters() {
    // console.log("Applying filters...");
    const selectedFilters = getSelectedFilters();
    console.log("Selected Filters:", selectedFilters);
    
    const allItems = getAllMenuItems();
    console.log("All items:", allItems);

    const filteredItems = allItems
        .filter(item => !item.identifiers.endsWith('NaN')) // Exclude removed items
        .filter(item => {
            return Object.keys(selectedFilters).every(key =>
                selectedFilters[key].some(filterValue => {
                    if (!Array.isArray(item.tags)) {
                        console.warn(`Skipping item "${item.name}" because tags are not an array.`);
                        return false;
                    }
                    return item.tags.some(tag => typeof tag === 'string' && tag.toLowerCase() === filterValue.toLowerCase());
                })
            );
        });

    console.log("Filtered Items:", filteredItems);
    displayMenu(filteredItems);
}


function setupFilterButton() {
    const filterButton = document.querySelector('.filter-button'); // Select the filter button
    if (filterButton) {
        // console.log("Setting up filter button...");
        filterButton.addEventListener('click', () => {
            // console.log("Filter button clicked.");
            applyFilters(); // Apply filters when the button is clicked
        });
    } else {
        console.error("Filter button not found!");
    }
}


function getSelectedFilters() {
    const filters = document.querySelectorAll('.filters-container input[type="checkbox"]:checked');
    // console.log("Filters selected:", filters);

    const selectedFilters = {};
    filters.forEach(filter => {
        const group = filter.name;
        if (!selectedFilters[group]) selectedFilters[group] = [];
        selectedFilters[group].push(filter.value);
    });

    console.log("Selected filters :", selectedFilters);
    return selectedFilters;
}

function getImagePath(imagePath) {
      // Ensure the path starts from the correct base folder
      if (imagePath.startsWith('../../Images/')) {
        return imagePath.slice(3); // Remove '../../' to make it relative from the root
    }
    return imagePath; // Return path as is if no change is needed
}