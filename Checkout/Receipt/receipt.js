document.addEventListener('DOMContentLoaded', () => {
    receipt();
});

function receipt() {
    let cart = JSON.parse(localStorage.getItem('receipt')) || [];
    const orderData = getOrderData(); // Retrieve order details from local storage
    const customTip = orderData?.get("tip") || "0";
    const receiptItems = document.createElement('div');
    receiptItems.classList.add("receipt-holder");
    const receiptContainerDisplay = document.querySelector(".receipt");

    const d = new Date();
    let subtotal = Number(cart.reduce((sum, item) => sum + (item.quantity || 1) * parseFloat(item.price || 0), 0).toFixed(2));
    let tip = Number((customTip * 0.01).toFixed(2))
    receiptItems.innerHTML = `
        <div class="receipt-title"><p>
            ---------------------------------------------<br>
            Kouzina Charas<br>
            Thiseos 367, Kallithea 176 74 <br>
            ${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} at ${time()}<br>
            ---------------------------------------------</p>
        </div>
        <div class="receipt-order-details">
            <p>Order Type: ${orderData?.get("orderType") || "N/A"}</p>
            <p>Payment Method: ${orderData?.get("paymentMethod") || "N/A"}</p>
            ${orderData?.get("orderType") === "Delivery" ? `
            <p>Delivery Address: ${orderData?.get("delivery-street") || ""}, ${orderData?.get("delivery-city") || ""}</p>` : ""}
            ${orderData?.get("paymentMethod") === "Card" ? `
            <p>Card Ending In: ****${orderData?.get("cardNumber").slice(-4) || "N/A"}</p>` : ""}
            <p>Phone Number: ${orderData?.get("pickup-phone") || orderData?.get("delivery-phone") || "N/A"}</p>
        </div>
        <div class="receipt-item-cata">
            <p>Qt</p><p>Item</p><p>AMT(€)</p>
        </div>
        <div class="receipt-item-cata" style="height: 1vh;">
            <p style="line-height: 3px;">----------------------------------------------------------</p>
        </div>
        <div class="receipt-body"></div>
        <div class="receipt-total">
            <div class="subtotal"><p>Subtotal:</p><p>${convertPrice(subtotal)} €</p></div>
            <div class="subtotal"><p>Tip:</p><p>${convertPrice(tip)}€</p></div>
            <div class="receipt-total-after-sub">
                <h3>Total:</h3><h3>${convertPrice(subtotal + tip)} €</h3>
            </div>

            <div class="dash">------------------------------------------------------</div>
            <div class="wait-time">
                <h2>${orderData?.get("orderType") || "N/A"} Time:<br> ${waitTime()}</h2>
            </div>
            <div class="dash">------------------------------------------------------</div>
        </div>
        <div class="receipt-end">
            <p>THANK YOU FOR DINING WITH US!<br>PLEASE COME AGAIN</p>
        </div>
    `;

    receiptContainerDisplay.innerHTML = '';
    receiptContainerDisplay.appendChild(receiptItems);

    if (cart.length === 0) {
        receiptContainerDisplay.innerHTML = `<p>Cart is empty</p>`;
        return;
    }

    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add('receipt-items');
        itemDiv.innerHTML = `
            <p>${item.quantity || 1}x</p>
            <p>${item.name}</p>
            <p>${convertPrice(item.price)}</p>
        `;
        receiptItems.querySelector('.receipt-body').appendChild(itemDiv);
    });
}

function getOrderData() {
    const serializedOrderData = localStorage.getItem("orderData");
    if (serializedOrderData) {
        return new Map(Object.entries(JSON.parse(serializedOrderData)));
    }
    return null;
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

function waitTime(){                                                          //<------------------------------------will be used for all the checkout diplay function delivery and pickup times
    const startTime = new Date();

    startTime.setMinutes(startTime.getMinutes() + getMinuteAmount());

    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + 5);

    function formatTime(date){
        let h = date.getHours();
        var m = String(date.getMinutes()).padStart(2,'0');
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12; // Convert 0 to 12 for 12-hour clock
        return `${h}:${m} ${ampm}`;
    }

    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);

    return `${formattedStartTime} - ${formattedEndTime}`
}

function convertPrice(price){
    let split = String(price).split('.');
    let end = split[1] ? String(split[1]).padEnd(2, '0') : '00'
    if(split[0] == 0){return '0'}
    return split[0] + ',' + end; 
}

function getMinuteAmount() {
    const cart = JSON.parse(localStorage.getItem('receipt')) || [];
    
    // if (!Array.isArray(cart)) {
    //     console.error("Cart data is not in the expected format.");
    //     return 0; // Fallback if cart is not an array
    // }

    let appCount = 0, lunCount = 0, dinCount = 0, desCount = 0, driCount = 0;

    cart.forEach(item => {
        if (!item.tags) return; // Skip items without tags
        let getTags = Array.isArray(item.tags) ? item.tags : item.tags.split(',');

        const quantity = item.quantity || 1; // Default to 1 if quantity is missing
        if (getTags.includes('appetizer')) appCount += quantity;
        if (getTags.includes('lunch')) lunCount += quantity;
        if (getTags.includes('dinner')) dinCount += quantity;
        if (getTags.includes('dessert')) desCount += quantity;
        if (getTags.includes('drink')) driCount += quantity;
    });

    let total = 0;
    total += appCount * 2;
    total += lunCount * 3;
    total += dinCount * 4;
    total += desCount * 2;
    total += driCount * 1;

    console.log(`Total wait time (minutes): ${total}`);
    return total;
}

//document.addEventListener('DOMContentLoaded', () => {

    //     receipt();
    // });
    
    // function receipt(){
    //     const cart = JSON.parse(localStorage.getItem('cart')) || [];
    //     const customTip = parseFloat(localStorage.getItem('customTip')) || 0;
    //     let receiptItems = document.createElement('div');
    //     receiptItems.classList.add(".receipt");
    //     const receiptContainerDisplay = document.querySelector(".receipt");
    
    //     const d = new Date();
    //     receiptItems.innerHTML = `
    
    //     <div class="receipt-title"><p>
    //         ---------------------------------------------<br>
    //         Kouzina Charas<br>
    //         Address <br>
    //         ${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} at ${time()}  <br>
    //         ---------------------------------------------</p></div>
    //     <div class="receipt-item-cata"><p>Qt</p><p>item</p><p>AMT.(€)</p></div>
    //      <div class="receipt-item-cata" style="height: 1vh;"><p style="line-height: 3px;">----------------------------------------------------------</p></div>
    //     <div class="receipt-body">
    //     </div>
    //     <div class="receipt-total">
    //            <div class="subtotal"><p>Subtotal:</p><p>${convertPrice(cart.reduce((sum, item) => sum + (item.quantity || 1) * parseFloat(item.price || 0), 0).toFixed(2))}</p></div>
    //            <div class="subtotal"><p>Tip:</p><p>${convertPrice(customTip.toFixed(2))}</p></div>
    //            <div class="receipt-total-after-sub"><h3>Total:</h3><h3>${convertPrice((cart.reduce((sum, item) => sum + (item.quantity || 1) * parseFloat(item.price || 0), 0) + customTip).toFixed(2))}</h3></div>
    //            <div class="dash">------------------------------------------------------</div>
               
    //            <div class="wait-time"><h2>Pick Up/Delivery Time:<br> ${waitTime()}</h2></div>
    //             <div class="dash">------------------------------------------------------</div>
    
    //     </div>
    //     <div class="receipt-end"><p>THANK YOU FOR DINING WITH US! <br> 
    //     PLEASE COME AGAIN</p></div>
    
    //     `;
        
    //     receiptContainerDisplay.innerHTML = '';
    //     receiptContainerDisplay.appendChild(receiptItems);
    
    //     if(cart.length === 0){
    //         receiptContainerDisplay.innerHTML = `<p>Cart is empty</p>`;
    //         return;
    //     }
    
    //     cart.forEach(item =>{
    //         let itemDiv = document.createElement("div");
    //         itemDiv.classList.add('receipt-items');
    //         itemDiv.innerHTML = `
    //             <p>${item.quantity || 1}x</p>
    //             <p>${item.name}</p>
    //             <p>${convertPrice(item.price)}</p>
    //         `;
    //         receiptItems.querySelector('.receipt-body').appendChild(itemDiv);
    //     });
    // }
    
    // function time(){
    //     var d = new Date();
    //     var h = String(d.getHours()).padStart(2,'0');
    //     var m = String(d.getMinutes()).padStart(2,'0');
    //     var s = String(d.getSeconds()).padStart(2,'0');
    //     const ampm = h >= 12 ? 'PM' : 'AM';
    //     h = h % 12 || 12; // Convert 0 to 12 for 12-hour clock
    //     return `${h}:${m}:${s} ${ampm}`;
    // }
    
    // function waitTime(){                                                          //<------------------------------------will be used for all the checkout diplay function delivery and pickup times
    //     const startTime = new Date();
    //     startTime.setMinutes(startTime.getMinutes() + 35);
    
    //     const endTime = new Date(startTime);
    //     endTime.setMinutes(endTime.getMinutes() + 5);
    
    //     function formatTime(date){
    //         let h = date.getHours();
    //         var m = String(date.getMinutes()).padStart(2,'0');
    //         const ampm = h >= 12 ? 'PM' : 'AM';
    //         h = h % 12 || 12; // Convert 0 to 12 for 12-hour clock
    //         return `${h}:${m} ${ampm}`;
    //     }
    
    //     const formattedStartTime = formatTime(startTime);
    //     const formattedEndTime = formatTime(endTime);
    
    //     return `${formattedStartTime} - ${formattedEndTime}`
    // }
    
    // function convertPrice(price){
    //     let split = String(price).split('.');
    //     let end = split[1] ? String(split[1]).padEnd(2, '0') : '00'
    //     if(split[0] == 0){return '0€'}
    //     return split[0] + ',' + end + '€'; 
    // }
