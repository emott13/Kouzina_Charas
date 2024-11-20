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

function doStuff(event, value){
    let item = event.target.value;
    switch(value){
        case 'edit': console.log(item); break;
        case 'add': console.log(item); break;
        case 'remove': console.log(item); break;
        default: console.log("something's wrong");
    }

    let menuItemsFromLS = JSON.parse(localStorage.getItem(`${item}`)) || [];

    if(menuItemsFromLS.length == 0){
        document.querySelector('.menu-items-container').innerHTML = 
        `<p id="empty">This section is empty...</p>`
    }
    else{
        let container = document.querySelector('.menu-items-container')
        container.innerHTML = '';
        menuItemsFromLS.forEach( (item) => {
            let div = document.createElement('div');
            div.classList.add('op');
            div.innerHTML = 
                `
                    <input type="radio" class="menuItems" name="menuItems" id="${item.name}">
                    <label for="${item.name}"><strong>NAME:</strong> ${item.name}</label>

                    <input type="radio" class="menuItems" name="menuItems" id="${item.price}">
                    <label for="${item.price}"><strong>PRICE:</strong> ${item.price}</label>

                    <input type="radio" class="menuItems" name="menuItems" id="image">
                    <label for="image"><strong>IMAGE:</strong> <img src="${item.image}" alt="${item.name}"></label>
                `
            container.append(div)
        })
    }
    doOtherStuff();
}

function doOtherStuff(){

}