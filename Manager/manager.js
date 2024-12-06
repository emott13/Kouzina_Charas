document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('login')) {
        setItem();
    }
    if (document.body.classList.contains('manager')) {
        let editContainer = document.querySelector('.items-edit-container');
        editContainer.style.display = 'none';

        let options = document.querySelectorAll('.options')
        options.forEach(option => {
            option.addEventListener('change', showOptions);
        });
        
        let menuContainer = document.querySelector('.menu-items-container');
        if(menuContainer){
            menuContainer.addEventListener('click', handleMenuAction);
        }
    }
});

function setItem(){                 // --------------------------------------------------- sets manager username/password in local storage
    let u = 'manager1988';
    let p = '1988';
    let item = { username: u, password: p };
    localStorage.setItem('login', JSON.stringify(item));         

    let loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('click', login);
}

function login(){                   // --------------------------------------------------- checks user input against local storage 'login' data        
    let u = document.getElementById('username').value;
    let p = document.getElementById('password').value;
    let message = document.getElementById('message');
    let login = JSON.parse(localStorage.getItem('login')) || [];
    
    if(login.username === u && login.password === p){         
        location.replace('../manager.html');
    }
    else{
        message.innerText = "Incorrect username or password.";
    }
}

function showOptions(event){                    // --------------------------------------- sets innerHTML options
    let dash = document.querySelector(".manager-dashboard");
    dash.style.minHeight = "700px"

    let value = event.target.value;
    let editOptions = document.querySelector('.edit-container');
    editOptions.innerHTML = generateOptionsHtml(value);
    menuOptions(value);
}

function generateOptionsHtml(value){
    let otherContainer = document.querySelector('.items-edit-container');
    otherContainer.style.display = "none";
    return `
        <h3>What would you like to ${value}?</h3>
        ${['app', 'lunch', 'dinner', 'dessert', 'drink'].map(type => `
            <div class="op">
                <input type="radio" name="menu-sections" class="menu-sections" value="${type}" id="${type}">
                <label for="${type}">${capitalizeFirstLetter(type)}</label>
            </div>
        `).join('')}
    `;
}

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function menuOptions(value){                    // -------------------------------------- sets listeners for menu section radio button or calls addItem
    let itemType = value;
    if (value === 'change'){
        document.querySelectorAll('.menu-sections').forEach(option => {
            option.addEventListener('change', (event) => checkLS(event, itemType));
        });
    }
    else{
        addItem();
    }
}

function checkLS(event){                    // ------------------------------------------ checks LS, calls display menu items or empty message
    let dash = document.querySelector(".manager-dashboard");
    dash.style.minHeight = "50px"
    
    let item = event.target.value;
    let menuItemsFromLS = JSON.parse(localStorage.getItem(item)) || [];
    let container = document.querySelector('.menu-items-container');
    container.innerHTML = menuItemsFromLS.length ? displayMenuItems(menuItemsFromLS, item) : `<p id="empty">This section is empty...</p>`;
}

function displayMenuItems(menuItems, itemType){                 // ---------------------- shows menu items when menu type is selected
    return menuItems.map(item => {
        return `
            <div class="op">
                <div class="item-edit-wrapper">
                    <div class="item-edit-info">
                        <strong>Name:</strong> ${item.name} <br>
                        <strong>Price:</strong> ${item.price} <br>
                        <strong>Image:</strong> <img src="${getImagePath(item.image)}" alt="${item.name}" width="180"/>
                    </div>
                    <div class="item-edit-buttons">
                        <button class="edit-btn" data-item="${item.name}" data-type="${itemType}">Edit</button>
                        <button class="remove-btn" data-item="${item.name}" data-type="${itemType}">Remove</button>
                    </div>
                </div>
                ${item.identifiers.length > 3 ? `                   
                    <div class="extra">
                        <p>This item is not being displayed.</p>
                        <button class="add-back" data-item="${item.name}" data-type="${itemType}">Add back to menu</button>
                    </div>` : `
                    <div class="extra">
                        <p>This item is being displayed.</p>
                    </div>`
                }
            </div>
        `;
    }).join('');
}

function getImagePath(imagePath){
    return imagePath.startsWith('../../') ? imagePath.slice(3) : imagePath;
}

function handleMenuAction(event){                   // ---------------------------------- sorts call from listener and calls function
    let {dataset: {item, type}, classList } = event.target;

    if(classList.contains('edit-btn')){
        editItem(item, type);
    }
    else if(classList.contains('remove-btn')){
        removeItem(item, type);
    }
    else if(classList.contains('add-back')){
        addBack(item, type);
    }
}

function editItem(itemName, itemType){                  // ------------------------------ handles edit btn click to display edit inputs and allow to be saved + set in LS
    let menuItems = JSON.parse(localStorage.getItem(itemType)) || [];
    let item = menuItems.find(i => i.name === itemName);
    let formHtml = 
    `
        <h3>Edit Item: ${item.name}</h3>
        <div class="edit-inputs">
            <label for="newName">Name:</label>
            <input type="text" id="newName" value="${item.name}"><br>
            <label for="newPrice">Price:</label>
            <input type="text" id="newPrice" value="${item.price}"><br>
            <label for="newImage">Image URL:</label>
            <input type="text" id="newImage" value="${item.image}"><br>
        </div>
        <button id="saveChanges">Save Changes</button>
    `;
    let editContainer = document.querySelector('.items-edit-container');
    editContainer.innerHTML = formHtml;
    editContainer.style.display = "grid"

    document.getElementById('saveChanges').addEventListener('click', () => {
        item.name = document.getElementById('newName').value;
        item.price = document.getElementById('newPrice').value;
        item.image = document.getElementById('newImage').value;

        localStorage.setItem(itemType, JSON.stringify(menuItems));
        alert('Item updated.');
        updateMenuItems(itemType);
    });
}

function removeItem(itemName, itemType){                    // -------------------------- handles remove btn click to remove item from menu display. stil shows in manager display with label that it is not being displayed.
    let menuItems = JSON.parse(localStorage.getItem(itemType)) || [];
    let itemIndex = menuItems.findIndex(item => item.name === itemName);  

    if(itemIndex !== -1){  
        menuItems[itemIndex].identifiers += 'NaN';
        localStorage.setItem(itemType, JSON.stringify(menuItems));
        alert('Item removed from menu.');
        updateMenuItems(itemType);  
    }
    else{
        alert('Item not found!');  
    }
}

function addBack(itemName, itemType) {                  // ------------------------------ handles addBack btn click to add back removed items that still exist in LS
    const menuItems = JSON.parse(localStorage.getItem(itemType)) || [];
    const item = menuItems.find(item => item.name === itemName);

    if (item && item.identifiers.endsWith('NaN')) {
        item.identifiers = item.identifiers.slice(0, 3);
        localStorage.setItem(itemType, JSON.stringify(menuItems));
        alert('Item restored.');
        updateMenuItems(itemType);
    }
    else{
        alert('This item has already been restored.');
    }
}

function updateMenuItems(itemType){                 // ---------------------------------- takes itemType and displays corresponding menu items
    let itemContainer = document.querySelector('.menu-items-container');
    let menuItems = JSON.parse(localStorage.getItem(itemType)) || [];
    itemContainer.innerHTML = displayMenuItems(menuItems, itemType); 
}

function addItem(){                 // -------------------------------------------------- handles add a new item btn, forces all fields filled, sets new item in LS
    let dash = document.querySelector(".manager-dashboard");
    dash.style.minHeight = "50px"

    let formHtml = 
    `
    <div class="add-wrapper">
        <h3>Add New Item</h3> <br>
        <label for="type">Choose a menu type:</label>
        <select name="type" id="type">
            <option value="app">Appetizer</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Beverage</option>
        </select> <br>
        <label for="itemName">Name:</label>
        <input type="text" id="itemName"><br>
        <label for="itemPrice">Price:</label>
        <input type="text" id="itemPrice"><br>
        <label for="itemImage">Image URL:</label>
        <input type="text" id="itemImage"><br>
        <label for="itemDesc">Description:</label>
        <input type="text" id="itemDesc"><br>
        <div class="tags-checkbox">
            <input type="checkbox" name="dairy"></input>
            <label for="dairy">Dairy</label>
            <input type="checkbox" name="meat"></input>
            <label for="meat">Meat</label>
            <input type="checkbox" name="vegetarian"></input>
            <label for="vegetarian">Vegetarian</label>
            <input type="checkbox" name="seafood"></input>
            <label for="seafood">Seafood</label>
            <input type="checkbox" name="light"></input>
            <label for="light">Light</label>
            <input type="checkbox" name="medium"></input>
            <label for="medium">Medium</label>
            <input type="checkbox" name="heavy"></input>
            <label for="heavy">Heavy</label>
        </div>
        <button id="addNewItem">Add Item</button>
    </div>
    `;
    document.querySelector('.edit-container').innerHTML = formHtml;
    document.querySelector('.menu-items-container').innerHTML = '';

    document.getElementById('addNewItem').addEventListener('click', () => {
        let name = document.querySelector('#itemName').value;
        let price = document.querySelector('#itemPrice').value;
        let image = document.querySelector('#itemImage').value;
        let description = document.querySelector('#itemDesc').value;
        let type = document.querySelector('#type').value;

        if(!name || !price || !image || !description){
            alert("All fields are required!");
            return;
        }

        const newItem = {
            name, price, image, description,
            identifiers: getIdentifier(),
            quantity: 1
        };

        let menuItems = JSON.parse(localStorage.getItem(type)) || [];
        menuItems.push(newItem);
        localStorage.setItem(type, JSON.stringify(menuItems));

        alert('New item added!');
        updateMenuItems(type);
    });
}

function getIdentifier(){                   // ----------------------------------------- compares existing number part identifiers and sets new unique id for new menu item, pads the beginning with extra 0s like preexisting items.
    const allItems = ['app', 'lunch', 'dinner', 'dessert', 'drink']
        .map(type => JSON.parse(localStorage.getItem(type)) || [])
        .flat();
    const currentId = new Set(allItems.map(item => item.identifiers));
    let largest = Math.max(...[...currentId].map(id => parseInt(id, 10) || 0)) + 1;
    return String(largest).padStart(3, '0');
}
