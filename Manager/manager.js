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

    if(value == 'blog'){
    return `
            <h3>Create your plog post:</h3>
            <form class="blog-input" action="manager.js" method="post">
                <div class="input-options">
                    <label for="title">Enter post title:</label>
                    <input type="text" name="title" id="title">

                    <label for="photo">Enter post image url:</label>
                    <input type="text" name="photo" id="photo">

                    <label for="text">Enter post content:</label>
                    <textarea name="text" id="text"></textarea>
                </div>
                <input type="submit" id="submit"></input>
            </form>`
    }
    else if(value == 'discount'){
        return `
        <h3>Create your discount:</h3>
        <form class="discount-input" action="manager.js" method="post">
            <div class="input-options">
                <label for="code">Enter discount code:</label>
                <input type="text" name="code" id="code">

                <label for="amount">Enter discount amount:</label>
                <input type="number" name="amount" id="amount"></input>

                <div class="discount-type">
                    <input type="radio" name="discount" id="percent" value="percent"></input>
                    <label for="percent">Percent</label>
                    <input type="radio" name="discount" id="amount" value="euro"></input>
                    <label for="amount">Euro amount</label>
                </div>

                <div class="discount-menu">
                    <h5>Works for:</h5>
                    <input type="checkbox" name="app" id="app" value="app"></input>
                    <label for="app">Appetizers</label>
                    <input type="checkbox" name="lunch" id="lunch" value="lunch"></input>
                    <label for="lunch">Lunch</label>
                    <input type="checkbox" name="dinner" id="dinner" value="dinner"></input>
                    <label for="dinner">Dinner</label>
                    <input type="checkbox" name="dessert" id="dessert" value="dessert"></input>
                    <label for="dessert">Desserts</label>
                    <input type="checkbox" name="drink" id="drink" value="drink"></input>
                    <label for="drink">Beverages</label>
                </div>

                <label for="dateStart">Choose starting date: (inclusive)</label>
                <input type="date" name="dateStart" id="dateStart"></input>

                <label for="dateEnd">Choose ending date: (inclusive)</label>
                <input type="date" name="dateEnd" id="dateEnd"></input>
            </div>
            <input type="submit" id="submit-discount"></input>
        </form>`
    }
    else{
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
}

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function menuOptions(value){                    // -------------------------------------- sets listeners for menu section radio button or calls addItem
    let itemType = value;
    if(value === 'change'){
        document.querySelectorAll('.menu-sections').forEach(option => {
            option.addEventListener('change', (event) => checkLS(event, itemType));
        });
    }
    else if(value === 'add'){
        addItem();
    }
    else if(value == 'discount'){
        let form = document.querySelector('form.discount-input')
        if(form){
            form.addEventListener('submit', getDiscountData)
        }
    }
    else{
        let form = document.querySelector('form.blog-input')
        if(form){
            form.addEventListener('submit', getFormData)
        }
    }
}

function checkLS(event){                    // ------------------------------------------ checks LS, calls display menu items or empty message
    let dash = document.querySelector(".manager-dashboard");
    dash.style.minHeight = "50px"
    
    let item = event.target.value;
    console.log(item)
    let menuItemsFromLS = JSON.parse(localStorage.getItem(item)) || [];
    console.log(menuItemsFromLS)
    let container = document.querySelector('.menu-items-container');
    container.innerHTML = menuItemsFromLS.length > 0 ? displayMenuItems(menuItemsFromLS, item) : `<p id="empty">This section is empty...</p>`;
    console.log(displayMenuItems(menuItemsFromLS, item))
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
    let tags = item.tags || []; // Retrieve existing tags or an empty array if none exist

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

        <div class="tags-checkbox-container">
            <h3>Meal</h3>
            <div class="tags-checkbox">
                ${generateCheckbox('appetizer', 'Appetizer', tags)}
                ${generateCheckbox('lunch', 'Lunch', tags)}
                ${generateCheckbox('dinner', 'Dinner', tags)}
                ${generateCheckbox('dessert', 'Dessert', tags)}
            </div>

        <div class="tags-checkbox-container">
            <h3>Protein</h3>
            <div class="tags-checkbox">
                ${generateCheckbox('meat', 'Meat', tags)}
                ${generateCheckbox('vegetable', 'Vegetable', tags)}
                ${generateCheckbox('seafood', 'Seafood', tags)}
                ${generateCheckbox('dairy', 'Dairy', tags)}
            </div>

            <h3>Food Type</h3>
            <div class="tags-checkbox">
                ${generateCheckbox('light', 'Light', tags)}
                ${generateCheckbox('medium', 'Medium', tags)}
                ${generateCheckbox('heavy', 'Heavy', tags)}
            </div>

            <h3>Beverages</h3>
            <div class="tags-checkbox">
                ${generateCheckbox('refresher', 'Refresher', tags)}
                ${generateCheckbox('juice', 'Juice', tags)}
                ${generateCheckbox('coffee', 'Coffee', tags)}
            </div>
        </div>
        <button id="saveChanges">Save Changes</button>
    `;

    let editContainer = document.querySelector('.items-edit-container');
    editContainer.innerHTML = formHtml;
    editContainer.style.display = "grid";

    document.getElementById('saveChanges').addEventListener('click', () => {
        // Update item details
        item.name = document.getElementById('newName').value;
        item.price = document.getElementById('newPrice').value;
        item.image = document.getElementById('newImage').value;

        // Retrieve updated tags
        const tagCheckboxes = document.querySelectorAll('.tag-checkbox:checked');
        item.tags = Array.from(tagCheckboxes).map(checkbox => checkbox.value);

        // Save updated item to localStorage
        localStorage.setItem(itemType, JSON.stringify(menuItems));
        alert('Item updated.');
        updateMenuItems(itemType);
    });
}

function generateCheckbox(value, label, selectedTags) {
    const isChecked = selectedTags.includes(value) ? 'checked' : ''; // Check if the tag is already in the item
    return `<input type="checkbox" class="tag-checkbox" value="${value}" ${isChecked}><label for="${value}">${label}</label>`;
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
        <div class="tags-checkbox-container">
                <h3>Protein</h3>
                <div class="tags-checkbox">
                   <input type="checkbox" class="tag-checkbox" value="meat"><label for="meat">Meat</label>
                   <input type="checkbox" class="tag-checkbox" value="vegetable"><label for="vegetable">Vegetable</label>

                    <input type="checkbox" class="tag-checkbox" value="seafood"><label for="seafood">Seafood</label>
                    <input type="checkbox" class="tag-checkbox" value="dairy"><label for="dairy">Dairy</label>
                </div>

                <h3>Food Type</h3>
                <div class="tags-checkbox">
                   <input type="checkbox" class="tag-checkbox" value="light"><label for="light">Light</label>
                   <input type="checkbox" class="tag-checkbox" value="medium"><label for="medium">Medium</label>
                   <input type="checkbox" class="tag-checkbox" value="heavy"><label for="heavy">Heavy</label>   
                </div>

                <h3>Beverages</h3>
                <div class="tags-checkbox">
                   <input type="checkbox" class="tag-checkbox" value="refresher"><label for="refresher">Refresher</label>
                   <input type="checkbox" class="tag-checkbox" value="juice"><label for="juice">Juice</label>
                   <input type="checkbox" class="tag-checkbox" value="coffee"><label for="coffee">Coffee</label>   
                </div>
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

        const categoryTag = {
            app: 'appetizer',
            lunch: 'lunch',
            dinner: 'dinner',
            dessert: 'dessert',
            drink: 'beverage'
        }[type]

        const tagCheckboxes = document.querySelectorAll('.tag-checkbox:checked');
        const tags = Array.from(tagCheckboxes).map(checkbox => checkbox.value);

        if(categoryTag){
            tags.push(categoryTag);
        }

        if(!name || !price || !image || !description || tags.length === 0){
            alert("All fields are required, and at least one tag must be selected!");
            return;
        }

        const newItem = {
            name, price, image, description,
            identifiers: getIdentifier() || '000', // Ensure a default value if `getIdentifier()` returns `undefined`
            quantity: 1,
            tags: tags// -----------------------------------------------------------------assign the slected tags
        };

        let menuItems = JSON.parse(localStorage.getItem(type)) || [];
        menuItems.push(newItem);
        localStorage.setItem(type, JSON.stringify(menuItems));

        console.log('New item being saved:', newItem);
        console.log('Saving item:', newItem);
        console.log('Items in localStorage:', JSON.parse(localStorage.getItem(type)));
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
 String(largest).padStart(3, '0');
}

function getFormData(event){
    event.preventDefault();
    let form = document.querySelector('form.blog-input');
    let formData = new FormData(form); // -------------------------------------------------------------- sets up key/value pairs with the data
    let date = getDate();
    let item = {
        title: formData.get('title'),
        image: formData.get('photo'),
        date: date,
        content: formData.get('text')
    };
    console.log(item)
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(item);
    localStorage.setItem('posts', JSON.stringify(posts));
    console.log('end')
}

function getDate(){
    let today = new Date();
    let date = { year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = today.toLocaleDateString('en-US', date);
    return formattedDate;
}

function getDiscountData(event){
    event.preventDefault();

    let form = document.querySelector('form.discount-input');
    let formData = new FormData(form);

    let app = formData.has('app');
    let lunch = formData.has('lunch');
    let dinner = formData.has('dinner');
    let dessert = formData.has('dessert');
    let drink = formData.has('drink');

    let item = {
        code: formData.get('code'),
        amount: formData.get('amount'),
        type: formData.get('discount'),
        start: formData.get('dateStart'),
        end: formData.get('dateEnd'),
        app: app,
        lunch: lunch,
        dinner: dinner,
        dessert: dessert,
        drink: drink
    };

    let discounts = JSON.parse(localStorage.getItem('discount')) || [];
    let existingDiscount = discounts.find(discount => discount.code === item.code);

    if (existingDiscount) {
        alert(`A discount with the code "${item.code}" already exists.`);
        return;
    }
    discounts.push(item);
    localStorage.setItem('discount', JSON.stringify(discounts));
}