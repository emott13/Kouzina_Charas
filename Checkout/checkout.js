document.addEventListener("DOMContentLoaded", () => {
    initializePage();
    setupOptionSelectionListeners();
    setupFormEvent(forms.pickup, validatePickupForm);
    setupFormEvent(forms.delivery, validateDeliveryForm);
    handlePaymentOptionSelection();
    setupCardFormSubmission();
    setupCompleteOrderButtons();
    document.querySelector('#discount').addEventListener('blur', validateDiscount)
});

const state = {
    isDelivery: false,                                                      // Determines if the user chose delivery or pickup
    selectedPayment: null,                                                  // 'cash' or 'card'
    orderType: null,                                                        // 'Pickup' or 'Delivery'
};

let tipAmount = 0;

const forms = {
    pickup: document.getElementById("pickup-form"),
    delivery: document.getElementById("delivery-form"),
    card: document.getElementById("card-form"),
    cash: document.getElementById("cash-form")
};

const sections = {
    paymentOptions: document.getElementById("payment-options"),
    summary: document.getElementById("summary"),
};

function initializePage() {                                                 // starts with payment information hidden
    sections.paymentOptions.hidden = true;
    sections.summary.hidden = true;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    let container = document.querySelector('.order-info-basic');

    cart.forEach(item => {                                                  // displays each item in cart
        let items = document.createElement('div');
        items.classList.add('item');
        let tag = item.tags ? item.tags.split(",") : [];
        items.innerHTML = 
        `
                <span>${item.name}</span>
                <span>${item.quantity}</span>
                <span>${convertPrice(item.price)}</span>
                <span class="itemsTotal ${tag[0]}">${itemTotal(item.price, item.quantity)}</span>
        `;
    container.append(items);
    }); 
}

function convertPrice(price){                                               // changes price to display euro sign after price in greek style
    let split = String(price).split('.');
    let end = split[1] ? String(split[1]).padEnd(2, '0') : '00'
    if(split[0] == 0){return '0€'}
    return split[0] + ',' + end + '€'; 
}

function itemTotal(price, quantity){                                        // calculates price
    total = parseFloat(price * quantity);
    return convertPrice(total);
}


function toggleVisibility(visibleElements, hiddenElements) {                // handles visibility of input forms
    visibleElements.forEach((element) => (element.hidden = false));         // toggle visibility of elements by setting the hidden attribute
    hiddenElements.forEach((element) => (element.hidden = true));

    if(sections.paymentOptions.hidden){                                     // resets styles if paymentOptions hidden
        sections.paymentOptions.style.display = '';
        sections.paymentOptions.style.justifyContent = '';
        sections.paymentOptions.style.gap = '';
    }
    if(sections.summary.hidden){                                            // resets styles if summary paymentOptions hidden
        sections.summary.style.display = '';
        sections.summary.style.flexDirection = '';
        sections.summary.style.alignItems = '';
        sections.summary.style.width = '';
        sections.summary.style.minHeight = '';
    }
    if(!sections.summary.hidden){
        sections.summary.style.display = 'flex';
        sections.summary.style.flexDirection = 'column';
        sections.summary.style.alignItems = 'start';
        sections.summary.style.width = '500px';
        sections.summary.style.minHeight = '100px'; 
    }
}

function populateSummary(form) {
    const summaryContainer = document.getElementById("form-summary");
    const orderTypeElement = document.getElementById("summary-order-type");
    const paymentMethodElement = document.getElementById("summary-payment-method");

    summaryContainer.innerHTML = "";                                                        // clears existing content
    state.orderType = state.isDelivery ? "Delivery" : "Pickup";                             // sets order type
    orderTypeElement.textContent = `Order Type: ${state.orderType}`;

    const paymentMethod = state.selectedPayment === "cash" ? "Cash" : "Card";               // Set payment method
    paymentMethodElement.textContent = `Payment Method: ${paymentMethod}`;

    Array.from(form.elements).forEach((input) => {                                          // Extracts and displays input values from the selected form
        if (input.tagName === "INPUT" && input.type !== "submit") {
            const item = document.createElement("p");
            item.textContent = `${input.previousElementSibling.textContent} ${input.value}`;
            summaryContainer.appendChild(item);
        }
    });
}


function validatePickupForm(){                                                              // Validates nae and phone inputs
    let name = document.getElementById("pickup-name").value.trim();
    let phone = document.getElementById("pickup-phone").value.trim();
    return name && phone;
}

function validateDeliveryForm(){                                                            // Validates the delivery form
    let name = document.getElementById("delivery-name").value.trim();
    let address = document.getElementById("delivery-street").value.trim();
    let city = document.getElementById("delivery-city").value.trim();
    let phone = document.getElementById("delivery-phone").value.trim();
    return name && address && city && phone;
}

function setupFormEvent(form, validationFn){                                                // Sets up form
    form.addEventListener("submit", function (event){
        console.log('called')
        event.preventDefault();
        if(validationFn()){
            toggleVisibility([sections.paymentOptions], [forms.pickup, forms.delivery]);
            sections.paymentOptions.style.display = 'flex';
            sections.paymentOptions.style.justifyContent = 'space-evenly';
            sections.paymentOptions.style.gap = '4rem';
        }
        else console.log('error')
    });
}

function handlePaymentOptionSelection() {
    document.getElementById("card-payment").addEventListener("click", () => {
        state.selectedPayment = "card";
        toggleVisibility([forms.card], [sections.summary, sections.paymentOptions]);

        let ten = (getTotal() * 0.1).toFixed(2);
        let fifteen = (getTotal() * 0.15).toFixed(2);
        let twenty = (getTotal() * 0.2).toFixed(2);
        document.querySelector('.tip').innerHTML = `
            <input type="radio" name="tip" class="tipPercent" value="0">No tip</input>
            <input type="radio" name="tip" class="tipPercent" value="${ten}">10%: ${ten}</input>
            <input type="radio" name="tip" class="tipPercent" value="${fifteen}">15%: ${fifteen}</input>
            <input type="radio" name="tip" class="tipPercent" value="${twenty}">20%: ${twenty}</input>
            <div>
                <label for="custom-tip">Custom tip:</label>
                <input type="number" name="custom-tip">
            </div>`;

        const tipPercentInputs = document.querySelectorAll('.tipPercent');
        tipPercentInputs.forEach(input => {
            input.addEventListener('change', () => {
                console.log(input)
                if (input.checked){
                    console.log(input.value)
                    tipAmount = Math.floor(input.value * 100) || 0;                               // Use the selected tip percent
                    console.log(tipAmount)
                }
            });
        });

        const customTipInput = document.querySelector('[name="custom-tip"]');
        customTipInput.addEventListener('input', () => {                                        // Handle custom tip input
            const customTipValue = customTipInput.value * 100 || 0;
            if (customTipValue > 0) {
                tipAmount = customTipValue;                                                     // Prioritize custom tip over selected tip
                console.log("Custom Tip Amount:", tipAmount);
            }
        });
    });
    document.getElementById("cash-payment").addEventListener("click", () =>{
        state.selectedPayment = 'cash';
        // toggleVisibility([forms.cash], [sections.summary, sections.paymentOptions]);
        let activeForm = state.isDelivery ? forms.delivery : forms.pickup;
        // let nameInput = document.getElementById()
        populateSummary(activeForm);
        console.log(activeForm);
        saveOrderData(activeForm);
        toggleVisibility([sections.summary], [forms.card, sections.paymentOptions]);
    })
}

function setupCardFormSubmission(){
    forms.card.addEventListener("submit", event => {
        event.preventDefault();
        let expiryDate = document.getElementById("expiry-date").value.trim();
        let cvc = document.getElementById("cvc").value.trim();
        let cardHolder = document.getElementById("card-holder").value.trim();
        let tip = tipAmount || 0;
        let cardNumber = document.getElementById("card-number").value.trim();

        if(cardNumber && expiryDate && cvc && cardHolder) {
            let activeForm = state.isDelivery ? forms.delivery : forms.pickup;
            populateSummary(activeForm);
            saveOrderData(activeForm, cardNumber, tip);
            toggleVisibility([sections.summary], [forms.card, sections.paymentOptions]);
        }
        else{
            alert("Please fill out all fields correctly.");
        }
    });

    forms.cash.addEventListener("submit", event => {
        event.preventDefault();
        let activeForm = state.isDelivery ? forms.delivery : forms.pickup;
        populateSummary(activeForm);
        toggleVisibility([sections.summary], [forms.cash, sections.paymentOptions])
    })
}

function validateCardInput(){
    let cardNumInput = document.getElementById("card-number");
    let cardNumber = cardNumInput.value.replace(/\s+/, '');               
    console.log(cardNumber)
    if(cardNumber.length == 16){
        cardNumInput.value = cardNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
    }
    else if(cardNumber.length == 15){
        cardNumInput.value  = cardNumber.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
    }
    else{
        console.log('card number info')
    }
}

function validateExpiration(){
    let ex = document.getElementById('expiry-date')
    let check = ex.value.replace(/\s+/, '');
    console.log(check)
    console.log(check.slice(0, 2))
    if(!check || check.length < 4 || isNaN(check)){
        console.log('invalid expiry')
        document.getElementById('expiry-date').value = '';
    }
    else if(check.slice(0, 2) > 12 || check < 1224 || check > 1300){
        console.log('invalid expiry')
        document.getElementById('expiry-date').value = '';
    }
    else{
        console.log('reach')
        document.getElementById('expiry-date').value = document.getElementById('expiry-date').value.replace(/(\d{2})(\d{2})/, '$1/$2');
    }
}


function setupCompleteOrderButtons(){                                                       // Loads receipt
    document.querySelectorAll('.complete').forEach(function (button) {
        button.addEventListener('click', function () {
            renameCartToReceipt()
            window.location.href = "Receipt/receipt.html";
        });
    });
}

function setupOptionSelectionListeners(){
    document.getElementById("pick-up").addEventListener("click", () => {
        localStorage.removeItem('orderData');
        state.isDelivery = false;
        toggleVisibility([forms.pickup], [forms.delivery, sections.paymentOptions, forms.card, sections.summary]);
    });

    document.getElementById("delivery").addEventListener("click", () => {
        localStorage.removeItem('orderData');
        state.isDelivery = true;
        toggleVisibility([forms.delivery], [forms.pickup, sections.paymentOptions, forms.card, sections.summary]);
    });
}

function saveOrderData(form, cardNumber, tip) {
    const orderData = new Map();

    let name = '';
    if(state.isDelivery){
        name = document.getElementById('delivery-name').value
    }
    else{
        name = document.getElementById('pickup-name').value
    }
    orderData.set("name", name ? name : '');

    orderData.set("orderType", state.isDelivery ? "Delivery" : "Pickup");
    orderData.set("paymentMethod", state.selectedPayment === "cash" ? "Cash" : "Card");
    orderData.set("cardNumber", cardNumber ? cardNumber : '');
    orderData.set('tip', tip ? tip : '0');

    Array.from(form.elements).forEach((input) => {
        if (input.tagName === "INPUT" && input.type !== "submit") {
            const key = input.name || input.id; // Use 'name' or 'id' as the key
            const value = input.value.trim();
            console.log(value)
            if(key === "cardNumber") {
                console.log(key)
                orderData.set(key, value.slice(-4)); // Store only the last 4 digits
            }
            else{
                orderData.set(key, value);
                console.log(key)
            }
        }
    });

    const serializedOrderData = JSON.stringify(Object.fromEntries(orderData));   //this will convert object/array to a JSON string // JSON string "name" : "darlin" "age" : 23
    localStorage.setItem("orderData", serializedOrderData);

    console.log("Order data saved to local storage:", orderData);
}

function getTotal(){ // ------------------------------------------------------------------ handles getting price total from cart items
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    cart.forEach(cartItem => {
        let price = parseFloat(cartItem.price);
        let quantity = cartItem.quantity;
        total += (price * quantity);
    });
    return total;
}

function renameCartToReceipt(){
    // Retrieve the current cart data from local storage
    const cartData = localStorage.getItem('cart');
    
    if (cartData !== null) {
        // Save the data under the new key 'receipt'
        localStorage.setItem('receipt', cartData);
        
        // Remove the old key 'cart'
        localStorage.removeItem('cart');
        
        console.log("Renamed 'cart' to 'receipt' in local storage.");
    } else {
        console.log("No 'cart' key found in local storage.");
    }
}

function validateDiscount(event) {
    const inputValue = event.target.value.trim().toUpperCase(); 
    event.target.value = inputValue; 

    const discounts = JSON.parse(localStorage.getItem('discount')) || [];
    let isValidCode = false;

    
 // Get the current date
    discounts.forEach(discount => {
        const currentDate = normalizeDate(new Date());
        const startDate = discount.start;
        const endDate = discount.end;
        
        if(inputValue === discount.code){
            console.log('Valid code:', discount.code);
            console.log(startDate, endDate, currentDate)
            if (currentDate >= startDate && currentDate <= endDate) {
                console.log('Valid date range.');
                isValidCode = true;
                console.log('Valid discount within date range.');

                const validDiscount = {
                    code: discount.code,
                    amount: discount.amount,
                    start: discount.start,
                    end: discount.end
                };

                localStorage.setItem('validDiscount', JSON.stringify(validDiscount));
                console.log('Stored valid discount:', validDiscount);
                document.querySelector('#discountTrue').hidden = false;
                setTimeout(() => {
                    document.querySelector('#discountTrue').hidden = true;
                }, 1500);
            }
        }
        else{
            console.log('Invalid discount code.');
            document.querySelector('#discountError').hidden = false;
            setTimeout(() => {
                document.querySelector('#discountError').hidden = true;
            }, 1500);
        }
    });
}

function normalizeDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
