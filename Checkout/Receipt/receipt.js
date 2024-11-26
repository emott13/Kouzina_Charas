document.addEventListener('DOMContentLoaded', () => {

    // receipt();
});

function receipt(){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let receiptItems = document.createElement('div');
    receiptItems.classList.add(".receipt");
    const receiptContainerDisplay = document.querySelector(".receipt");

    const d = new Date();
    receiptItems.innerHTML = `
   
    <div class="receipt-title"><p>
        ---------------------------------------------<br>
        Kouzina Charas<br>
        Address <br>
        ${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} at ${time()}  <br>
        ---------------------------------------------</p></div>
    <div class="receipt-body">
    </div>
    <div class="receipt-end"><p>THANK YOU FOR DINING WITH US! <br> 
    PLEASE COME AGAIN</p></div>

    `;
    
    receiptContainerDisplay.innerHTML = '';
    receiptContainerDisplay.appendChild(receiptItems);

    if(receiptContainerDisplay){
        receiptContainerDisplay.innerHTML = ``;
        receiptContainerDisplay.appendChild(receiptItems);
    }else{
        console.error("checkoutContainer not found");
    }

    if(cart.length === 0){
        receiptContainerDisplay.innerHTML = `<p>Cart is empty</p>`;
        return;
    }

    cart.forEach(item =>{
        let itemDiv = document.createElement("div");
        itemDiv.classList.add('receipt-items');
        itemDiv.innerHTML = `
            <p>${item.quantity || 1}x</p>
            <p>${item.name}</p>
            <p>€${item.price}</p>
        `;
        receiptItems.querySelector('.receipt-body').appendChild(itemDiv);
    });

    const totalPrice = cart.reduce((sum, item) => {
        const quantity = item.quantity || 1;
        const price = parseFloat(item.price);
        if(isNaN(price)){
            console.error(`skipping invalid price for item: ${item.name}. Price value:`, item.price);
            return sum;
        }
        return sum + (price * quantity);
    }, 0);

    // let totalContainer = document.querySelector(".total-container");
    // totalContainer.innerHTML = `
    // <div class="total">
    //     <h3>Total:</h3>
    //     <h2>€${totalPrice.toFixed(2)}</h2>
    // </div>
    // `;
    console.log(cart);

}

function time(){
    var d = new Date();
    var h = String(d.getHours()).padStart(2,'0');
    var m = String(d.getMinutes()).padStart(2,'0');
    var s = String(d.getSeconds()).padStart(2,'0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12; // Convert 0 to 12 for 12-hour clock
    return `${h}:${m}:${s} ${ampm}`;
}
