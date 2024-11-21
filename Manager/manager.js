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
    let p = '1988'
    let item = {username: u, password: p}
    localStorage.setItem('item', JSON.stringify(item));
    let loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('click', login);
}

function login(){
    let u = document.getElementById('username').value;
    let p = document.getElementById('password').value;
    let message = document.getElementById('message');
    let item = JSON.parse(localStorage.getItem('item')) || [];   
    console.log(item.username)
    if(item.username == u && item.password == p){
        location.replace('../manager.html')
    }
    else{
        message.innerText = "Incorrect username or password."
    }
}
// Need to change local storage for menu items to be set in LS on index load instead of as each menu page loads
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
    menOptions.forEach( (option) => {
        option.addEventListener('change', (event) => {
            doStuff(event, value)
        })
    })
}

function doStuff(event, value) {
    let item = event.target.value;
    let menuItemsFromLS = JSON.parse(localStorage.getItem(item)) || [];

    if (menuItemsFromLS.length == 0) {
        document.querySelector('.menu-items-container').innerHTML = 
        `<p id="empty">This section is empty...</p>`;
    } else {
        displayMenuItems(menuItemsFromLS, item, value);
    }
}

function displayMenuItems(menuItems, itemType) {
    let container = document.querySelector('.menu-items-container');
    container.innerHTML = '';

    menuItems.forEach(item => {
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
        container.append(div);
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (e) => editItem(e, itemType));
    });

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => removeItem(e, itemType));
    });
}

function editItem(event, itemType) {
    let itemName = event.target.dataset.item;
    let menuItems = JSON.parse(localStorage.getItem(itemType)) || [];
    let item = menuItems.find(i => i.name === itemName);

    let formHtml = `
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

        alert('Item updated!');
        location.reload();                                                                      
    });
}