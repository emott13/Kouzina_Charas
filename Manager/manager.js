if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', setItem)
}
else{
    setItem();
}

function setItem(){
    let u = 'manager1988';
    let p = '1988'
    localStorage.setItem(u, p)
}


function login(){
    let u = document.getElementById('username').value;
    let p = document.getElementById('password').value;
    let message = document.getElementById('message');

    if(localStorage.getItem(u)){
        if(p === localStorage.getItem(u)){
            location.replace('/index.html')
        }
        else{
            message.innerText = "Incorrect username or password."
        }
    }
};
