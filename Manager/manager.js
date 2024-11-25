document.addEventListener('DOMContentLoaded', () => {
    if(document.body.classList.contains('login')){
        setItem();
    }
    if(document.body.classList.contains('manager')){
        let buttons = document.querySelectorAll('.options');
        buttons.forEach(button => {
            button.addEventListener('change', showOptions);
        });
    }
});

function setItem(){
    let u = 'manager1988';
    let p = '1988';
    let item = {username: u, password: p};
    localStorage.setItem('item', JSON.stringify(item));
    let loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('click', login);
}

function login(){
    let u = document.getElementById('username').value;
    let p = document.getElementById('password').value;
    let message = document.getElementById('message');
    let item = JSON.parse(localStorage.getItem('item')) || [];   
    if(item.username == u && item.password == p){
        location.replace('../manager.html');
    }
    else{
        message.innerText = "Incorrect username or password.";
    }
}

function showOptions(event){
    let value = event.target.value;
    let editOptions = document.querySelector('.edit-container');
    editOptions.innerHTML = 
    `
        <h3>What would you like to ${value}?</h3>
        <div class="op">
            <input type="radio" name="menu-sections" class="menu-sections" value="app" id="app">
            <label for="app">Appetizers</label>
        </div>
        <div class="op">
            <input type="radio" name="menu-sections" class="menu-sections" value="lunch" id="lunch">
            <label for="lunch">Lunch</label>
        </div>
        <div class="op">
            <input type="radio" name="menu-sections" class="menu-sections" value="dinner" id="dinner">
            <label for="dinner">Dinner</label>
        </div>
        <div class="op">
            <input type="radio" name="menu-sections" class="menu-sections" value="dessert" id="dessert">
            <label for="desserts">Desserts</label>
        </div>
        <div class="op">
            <input type="radio" name="menu-sections" class="menu-sections" value="drink" id="drink">
            <label for="drinks">Beverages</label>
        </div>
    `
    menuOptions(value);
}

function menuOptions(value){
    let menOptions = document.querySelectorAll('.menu-sections');
    menOptions.forEach(option => {
        option.addEventListener('change', (event) => {
            checkLS(event, value)
        })
    })
}

function checkLS(event){
    let item = event.target.value;
    let menuItemsFromLS = JSON.parse(localStorage.getItem(item)) || [];

    if(menuItemsFromLS.length == 0){
        document.querySelector('.menu-items-container').innerHTML = 
        `<p id="empty">This section is empty...</p>`;
    } 
    else{
        displayMenuItems(menuItemsFromLS, item);
    }
}

function displayMenuItems(menuItems, itemType){
    let container = document.querySelector('.menu-items-container');
    container.innerHTML = '';

    menuItems.forEach(item => {         // --------------------------------------------------------------------------------- displays each item
        let div = document.createElement('div');
        div.classList.add('op');
        div.innerHTML = `
            <div>
                <strong>Name:</strong> ${item.name} <br>
                <strong>Price:</strong> ${item.price} <br>
                <strong>Image:</strong> <img src="${item.image}" alt="${item.name}" width="50" />
            </div>
            <button class="edit-btn" data-item="${item.name}" data-type="${itemType}">Edit</button>
            <button class="remove-btn" data-item="${item.name}" data-type="${itemType}">Remove</button>
        `;

        if (item.identifiers.length > 3){           // --------------------------------------------------------------------- check if identifier is longer than 3. if so, it has been removed from the menu
            div.innerHTML += 
            `
                <div class="extra">
                    <p>This item is not being displayed.</p>
                    <button class="add-back" data-item="${item.name}" data-type="${itemType}">Add back to menu</button>
                </div>
            `
        }
        container.append(div);
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', event => editItem(event, itemType));
    });

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', event => removeItem(event, itemType));
    });

    document.querySelectorAll('.add-back').forEach(button => {
        button.addEventListener('click', event => {
            addBack(event, itemType);
        });
    });
    
}

function editItem(event, itemType){
    let itemName = event.target.dataset.item;
    let menuItems = JSON.parse(localStorage.getItem(itemType)) || [];
    let item = menuItems.find(i => i.name === itemName);

    let formHtml = 
    `
        <h3>Edit Item: ${item.name}</h3>
        <label for="newName">Name:</label>
        <input type="text" id="newName" value="${item.name}"><br>
        <label for="newPrice">Price:</label>
        <input type="text" id="newPrice" value="${item.price}"><br>
        <label for="newImage">Image URL:</label>
        <input type="text" id="newImage" value="${item.image}"><br>
        <button id="saveChanges">Save Changes</button>
    `;
    document.querySelector('.items-edit-container').innerHTML = formHtml;

    document.getElementById('saveChanges').addEventListener('click', () => {
        let newName = document.getElementById('newName').value;
        let newPrice = document.getElementById('newPrice').value;
        let newImage = document.getElementById('newImage').value;

        item.name = newName;
        item.price = newPrice;
        item.image = newImage;

        localStorage.setItem(itemType, JSON.stringify(menuItems));

        alert('Item updated.');
        location.reload();                                                                      
    });
}

function removeItem(event, itemType){
    let itemName = event.target.dataset.item;
    let menuItems = JSON.parse(localStorage.getItem(itemType)) || [];

    let itemChange = menuItems.find(item => item.name === itemName);

    if(itemChange){
        let newId = `${itemChange.identifiers}NaN`;         // --------------------------------------- change item's identifier to 3 digits + 'NaN'
        itemChange.identifiers = newId;         // --------------------------------------------------- this allows us to prevent it from being displayed and allow it to be added back if desired
                                                                                                
        localStorage.setItem(itemType, JSON.stringify(menuItems));

        alert('Item removed from menu.');
    } 
    else{
        alert('Item not found!');
    }
    location.reload();
}

function addBack(event, itemType){
    let itemName = event.target.dataset.item;
    let menuItems = JSON.parse(localStorage.getItem(itemType)) || [];

    let itemChange = menuItems.find(item => item.name == itemName);
    if (itemChange){
        let id = itemChange.identifiers;

        if (id && id.length > 3) {          // -------------------------------------------------------- checks if identifier has 'NaN'
            let baseId = id.substring(0, 3);            // -------------------------------------------- defines baseId as 3 digit num

            if(!menuItems.some(item => item.identifiers === baseId)) {         // -------------------- check if baseId already exists without 'NaN' attached
                itemChange.identifiers = baseId;            // ---------------------------------------- if yes, remove NaN
                localStorage.setItem(itemType, JSON.stringify(menuItems));
                alert('Item restored.');
            } 
            else{
                alert('This item has already been restored.');
            }
        } 
        else{
            alert('Invalid identifier format!');
        }
    }
    location.reload();
}
