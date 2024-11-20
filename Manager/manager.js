document.addEventListener('DOMContentLoaded', () => {
    if(document.body.classList.contains('login')){
        setItem();
    }
    if(document.body.classList.contains('manager')){
        let editBtn = document.getElementById('edit-bt'),
        addBtn = document.getElementById('add-btn'),
        removeBtn = document.getElementById('remove-btn');

        editBtn.addEventListener('select', showEdit);
        addBtn.addEventListener('select', showAdd);
        removeBtn.addEventListener('select', showRemove);
    }
});

function setItem(){
    let u = 'manager1988';
    let p = '1988'
    let item = {username: u, password: p}
    localStorage.setItem(item)
}

function login(){
    let u = document.getElementById('username').value;
    let p = document.getElementById('password').value;
    let message = document.getElementById('message');

    if(localStorage.getItem(u)){
        if(p === localStorage.getItem(u)){
            location.replace('../manager.html')
        }
        else{
            message.innerText = "Incorrect username or password."
        }
    }
};

function showEdit(){
    
}
