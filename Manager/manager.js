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
    initializeTags();
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

    if (classList.contains('edit-btn')) {
        console.log("Edit button clicked for:", item); // Confirm button type
        editItem(item, type);
    } else if (classList.contains('remove-btn')) {
        console.log("Remove button clicked for:", item); // Confirm button type
        removeItem(item, type);
    } else if (classList.contains('add-back')) {
        console.log("Add back button clicked for:", item); // Confirm button type
        addBack(item, type);
    }

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

/*--------------------------------------- */
/*--------------EDIT ITEM--------------- */
/*------------------------------------- */

function editItem(itemName, itemType) {
   
    const tags = JSON.parse(localStorage.getItem('tags')); //<--------------------------------------------------------Ensure tags are properly loaded from localStorage

    if (!tags || typeof tags !== 'object') {//<-----------------------------------------------------------------------Defensive check to ensure tags are an object
        console.error("Tags are not properly initialized in localStorage.");
        alert("Error: Tags are not properly initialized. Please refresh the page.");
        return; //<---------------------------------------------------------------------------------------------------Prevent further execution if tags are missing or malformed
    }

    const item = JSON.parse(localStorage.getItem(itemType)).find(i => i.name === itemName); //<-----------------------Check if item.tags is defined and ensure it defaults to an empty object if undefined

    if (!item) {
        console.error("Item not found!");
        return;
    }

   
    item.tags = item.tags || {}; //<-----------------------------------------------------------------------------------If item.tags is undefined, initialize it as an empty object

    // Generate tag selectors (dropdowns for each tag category)
    const tagSelectors = Object.entries(tags).map(([category, options]) => {
        // Use an empty array if item.tags[category] is undefined or not an array
        const selectedTags = Array.isArray(item.tags[category]) ? item.tags[category] : [];

        return `
            <label for="${category}">${capitalizeFirstLetter(category)}:</label>
            <select id="${category}">
                ${options.map(option => `
                    <option value="${option}" ${selectedTags.includes(option) ? 'selected' : ''}>
                        ${option}
                    </option>
                `).join('')}
            </select>
        `;
    }).join('<br>');

    console.log("Generated tag selectors:", tagSelectors); // Debugging line

//     <label for="newName">Name:</label>
//     <input type="text" id="newName" value="${item.name}"><br>
//     <label for="newPrice">Price:</label>
//     <input type="text" id="newPrice" value="${item.price}"><br>
//     <label for="newImage">Image URL:</label>
//     <input type="text" id="newImage" value="${item.image}"><br>

//     <!-- Add tag selectors here -->
//     <div class="tag-selectors-container">
//         ${tagSelectors}
//     </div>

//     <button id="saveChanges">Save Changes</button>
// `;

// const container = document.querySelector('.items-edit-container');
// if (container) {
//     container.innerHTML = formHtml;
// } else {
//     console.error("Items edit container not found!");
// }

    // Construct the full form HTML, including tag selectors
    let formHtml = `
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

        // Updating the tags
        const updatedTags = Object.keys(tags).reduce((acc, key) => {
            const selectedOptions = Array.from(document.getElementById(key).selectedOptions).map(option => option.value);
            acc[key] = selectedOptions;
            return acc;
        }, {});

        item.tags = updatedTags;

        const menuItems = JSON.parse(localStorage.getItem(itemType));
        const updatedMenuItems = menuItems.map(i => i.name === itemName ? item : i);
        localStorage.setItem(itemType, JSON.stringify(updatedMenuItems));

        alert('Item updated.');
        updatedMenuItems(itemType);
    });
}

/*--------------------------------------- */
/*--------------ADD ITEM---------------- */
/*------------------------------------- */

function addItem() {// -------------------------------------------------- handles add a new item btn, forces all fields filled, sets new item in LS

    const tags = JSON.parse(localStorage.getItem('tags'));

    const tagSelectors = Object.entries(tags).map(([category, options]) => `
        <label for="${category}">${capitalizeFirstLetter(category)}:</label>
        <select id="${category}">
            ${options.map(option => `<option value="${option}">${option}</option>`).join('')}
        </select>
    `).join('<br>');

    let formHtml = `
        <h3>Add New Item</h3>
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
        
        <!-- Add tag selectors here -->
        <div class="tag-selectors-container">
            ${tagSelectors}
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

        // Collect selected tags
        const selectedTags = Object.keys(tags).reduce((acc, key) => {
            const selectedOptions = Array.from(document.getElementById(key).selectedOptions).map(option => option.value);
            acc[key] = selectedOptions;
            return acc;
        }, {});

        if (!name || !price || !image || !description) {
            alert("All fields are required!");
            return;
        }

        const newItem = {
            name, 
            price, 
            image, 
            description,
            tags: selectedTags, // Attach selected tags
            identifiers: getIdentifier(), // Generate a unique identifier
            quantity: 1
        };

        let menuItems = JSON.parse(localStorage.getItem(type)) || [];
        menuItems.push(newItem);
        localStorage.setItem(type, JSON.stringify(menuItems));

        alert('New item added!');
        updateMenuItems(type);
    });
}
