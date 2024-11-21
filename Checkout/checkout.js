document.addEventListener("DOMContentLoaded", function () {
    // Select initial elements
    let initialButtonHolderDisplay = document.querySelector(".button-holder");
    let pickUpButton = document.querySelector(".pick-up");
    let deliveryButton = document.querySelector(".Delivery");
    let undoButton = document.querySelector(".undo");
    const paymentSection = document.querySelector(".payment");
    let isDelivery = false;
    let inCheckout = false;                                                         //<-------------------------checks if we are in the checkout flow

    const initialState = {                                                          //inital state is making variable that will hold the intial starting point for any of these buttons
        buttonHolderHTML: initialButtonHolderDisplay.cloneNode(true).innerHTML,
        paymentSectionHTML: paymentSection.cloneNode(true).innerHTML,
        pickUpDisplay: pickUpButton.style.display,
        deliveryDisplay: deliveryButton.style.display,
    };

    // Function to show payment options (for both pick-up and delivery)
    function showPaymentOptions(isDeliverySelected) {
        isDelivery = isDeliverySelected;
        inCheckout = true;                                                          //<-------------------------entering checkout flow
        pickUpButton.style.display = "none";
        deliveryButton.style.display = "none";
        initialButtonHolderDisplay.style.display = "none";

        let buttonHolderDisplay = document.createElement("div");
        buttonHolderDisplay.classList.add("button-holder");

        // Create Credit/Debit and Cash buttons 
        let creditDebitButton = document.createElement("button");
        creditDebitButton.classList.add("credit-debit");
        creditDebitButton.textContent = "Credit/Debit";
        creditDebitButton.style.margin = "auto";

        let cashButton = document.createElement("button");
        cashButton.classList.add("cash");
        cashButton.textContent = "Cash";
        cashButton.style.margin = "auto";

        buttonHolderDisplay.appendChild(creditDebitButton);
        buttonHolderDisplay.appendChild(cashButton);
        paymentSection.appendChild(buttonHolderDisplay);

        // Add event listeners for the new buttons 
        creditDebitButton.addEventListener("click", function () {
            CreditDebitPayment(buttonHolderDisplay,creditDebitButton, cashButton);
        });

        cashButton.addEventListener("click", function () {
            cashPaymentForm();
        });
    }

    function PaymentButtonListener(){
    pickUpButton.addEventListener("click", () => showPaymentOptions(false));
    deliveryButton.addEventListener("click",() => showPaymentOptions(true));
    }

    PaymentButtonListener();
    function UndoAction(){

        if(!inCheckout) return;                                              //<-------------------------exit if not in checkout flow
        inCheckout = false;                                                  //<-------------------------exit checkout flow

        pickUpButton.style.display = initialState.pickUpDisplay;
        deliveryButton.style.display = initialState.deliveryDisplay;
        initialButtonHolderDisplay.style.display = "block";
        initialButtonHolderDisplay.innerHTML = initialState.buttonHolderHTML;
        paymentSection.innerHTML = initialState.paymentSectionHTML;

        pickUpButton.addEventListener("click", () => showPaymentOptions(false));
        deliveryButton.addEventListener("click",() => showPaymentOptions(true));
    }

    // undoButton.addEventListener("click", UndoAction);
   

    function cashPaymentForm(){
        const cashDisplay = document.createElement("div");
        cashDisplay.classList.add(".payment");

        if(isDelivery){
        cashDisplay.innerHTML =`
            <div class="person-info">
                <div class="user">
                    <label for="">Name for Order:</label>
                    <input type="text" placeholder="Ex: John Doe">
                </div>
                <div class="phone-number">
                    <label for="">Phone:</label>
                    <input type="text" placeholder="Enter phone number">
                </div>
                <div class="address">
                    <label for="">Street</label>
                    <input type="text" name="" placeholder="123 N Main St">
                    <input type="text" name="" placeholder="Apartment, suite, etc. (optional)">
                </div>
                <div class="city-state">
                    <div class="city">
                        <label for="">City:</label>
                        <input type="text" placeholder="Enter city">
                    </div>
                    <div class="state">
                        <label for="">State:</label>
                        <select name="states" id="states">
                            <option value="">-----Select State-----</option>
                            <option value="">AL</option>
                                        <option value="">AK</option>
                                        <option value="">AZ</option>
                                        <option value="">AR</option>
                                        <option value="">AS</option>
                                        <option value="">CA</option>
                                        <option value="">CO</option>
                                        <option value="">CT</option>
                                        <option value="">DE</option>
                                        <option value="">DC</option>
                                        <option value="">FL</option>
                                        <option value="">GA</option>
                                        <option value="">GU</option>
                                        <option value="">HI</option>
                                        <option value="">ID</option>
                                        <option value="">IL</option>
                                        <option value="">IN</option>
                                        <option value="">IA</option>
                                        <option value="">KS</option>
                                        <option value="">KY</option>
                                        <option value="">LA</option>
                                        <option value="">ME</option>
                                        <option value="">MD</option>
                                        <option value="">MA</option>
                                        <option value="">MI</option>
                                        <option value="">MN</option>
                                        <option value="">MS</option>
                                        <option value="">MO</option>
                                        <option value="">MT</option>
                                        <option value="">NE</option>
                                        <option value="">NV</option>
                                        <option value="">NH</option>
                                        <option value="">NJ</option>
                                        <option value="">NM</option>
                                        <option value="">NY</option>
                                        <option value="">NC</option>
                                        <option value="">ND</option>
                                        <option value="">OH</option>
                                        <option value="">OK</option>
                                        <option value="">OR</option>
                                        <option value="">PA</option>
                                        <option value="">PR</option>
                                        <option value="">RI</option>
                                        <option value="">SC</option>
                                        <option value="">SD</option>
                                        <option value="">TN</option>
                                        <option value="">TX</option>
                                        <option value="">UT</option>
                                        <option value="">VT</option>
                                        <option value="">VA</option>
                                        <option value="">VI</option>
                                        <option value="">WA</option>
                                        <option value="">WV</option>
                                        <option value="">WI</option>
                                        <option value="">WY</option>
                        </select>
                    </div>        
            </div>
                <div class="zip">
                        <label for="">ZIP code:</label>
                        <input type="text" placeholder="Enter ZIP code">
                </div>  
            </div>
            <div class="checkout-button-holder">
                <button class="place-to-complete delivery-cash">Place Order</button>
            </div>`;
        }else{
            cashDisplay.innerHTML = `
            <div class="person-info">
                <div class="user">
                    <label for="">Name for Order:</label>
                    <input type="text" placeholder="Ex: John Doe">
                </div>
                <div class="phone-number">
                    <label for="">Phone:</label>
                    <input type="text" placeholder="Enter phone number">
                </div>        
            </div>
            </div>
            <div class="checkout-button-holder">
                <button class="place-to-complete-pick-up-cash">Place Order</button>
            </div>`;
        }

        paymentSection.innerHTML = "";
        paymentSection.appendChild(cashDisplay);

        // let deliveryCashOrder = document.querySelector('.place-to-complete .delivery-cash');// change this
        // deliveryCashOrder.addEventListener('click', function(){
        //     cashDisplay.style.display = 'none';
        //     displayDeliveryCash();
        // })

        let pickUpCashOrder = document.querySelector('.place-to-complete-pick-up-cash');// change this
        pickUpCashOrder.addEventListener('click', function() {
            cashDisplay.style.display = 'none';
            displayPickUpCashOrder();
        })
        
    }//////////////////////////////<--------------------------- for cash pick-up payment give item quantitiy, item, item price, and total price
    ///////////////////////////////<------------------------ it Says go up to the register and provide name of order and pay before receving item


    function CreditDebitPayment(buttonHolderDisplay, creditDebitButton, cashButton) {
        creditDebitButton.style.display = "none";
        cashButton.style.display = "none";
        buttonHolderDisplay.style.display = "none";

        const paymentDisplay = document.createElement("div");
        paymentDisplay.classList.add(".payment");
        paymentDisplay.innerHTML = `
            <div class="credit-debit-display">
                <div class="title">
                    <label for="">CREDIT CARD PAYMENT</label>
                    <div class="card-img-holder">
                        <div class="card-img card-1">
                            <img src="" alt="">
                        </div>
                        <div class="card-img card-2"></div>
                        <div class="card-img card-3"></div>
                    </div>
                </div>
                <div class="card-number">
                    <label for="">CARD NUMBER</label>
                    <input type="text" placeholder="**** **** **** ****">
                </div>
                <div class="card-sect">
                    <div class="card-exp">
                        <label for="">CARD EXPIRY</label>
                        <input type="text" placeholder="--/--">
                    </div>
                    <div class="card-cvc">
                        <label for="">CARD CVC</label>
                        <input type="text" placeholder="***">
                    </div>
                </div>
                <div class="card-holder-name">
                    <label for="">CARD HOLDER NAME</label>
                    <input type="text">
                </div>
                <div class="zip">
                    <label for="">ZIP code:</label>
                    <input type="text" placeholder="Enter ZIP code">
                </div>    
                <button class="pay-button">Add Payment Method</button>
            </div>
            <div class="checkout-button-holder">
                <button class="place-order">NEXT</button>
            </div>`;

        paymentSection.append(paymentDisplay);

        let nextButton = paymentDisplay.querySelector(".place-order");
        nextButton.addEventListener("click", function () {
            paymentDisplay.style.display = "none";
            showUserInfo();
        });
    }

    function showUserInfo() {
        const userInfo = document.createElement("div");
        userInfo.classList.add(".payment");
        userInfo.innerHTML = `
            <div class="person-info">
                <label for="">Name for Order:</label>
                <input type="text" placeholder="Ex: John Doe">
                <div class="address">
                    <label for="">Street</label>
                    <input type="text" name="" placeholder="123 N Main St">
                    <input type="text" name="" placeholder="Apartment, suite, etc. (optional)">
                </div>
                <div class="city-state">
                    <div class="city">
                        <label for="">City:</label>
                        <input type="text" placeholder="Enter city">
                    </div>
                    <div class="state">
                        <label for="">State:</label>
                        <select name="states" id="states">
                            <option value="">-----Select State-----</option>
                            <option value="">AL</option>
                                        <option value="">AK</option>
                                        <option value="">AZ</option>
                                        <option value="">AR</option>
                                        <option value="">AS</option>
                                        <option value="">CA</option>
                                        <option value="">CO</option>
                                        <option value="">CT</option>
                                        <option value="">DE</option>
                                        <option value="">DC</option>
                                        <option value="">FL</option>
                                        <option value="">GA</option>
                                        <option value="">GU</option>
                                        <option value="">HI</option>
                                        <option value="">ID</option>
                                        <option value="">IL</option>
                                        <option value="">IN</option>
                                        <option value="">IA</option>
                                        <option value="">KS</option>
                                        <option value="">KY</option>
                                        <option value="">LA</option>
                                        <option value="">ME</option>
                                        <option value="">MD</option>
                                        <option value="">MA</option>
                                        <option value="">MI</option>
                                        <option value="">MN</option>
                                        <option value="">MS</option>
                                        <option value="">MO</option>
                                        <option value="">MT</option>
                                        <option value="">NE</option>
                                        <option value="">NV</option>
                                        <option value="">NH</option>
                                        <option value="">NJ</option>
                                        <option value="">NM</option>
                                        <option value="">NY</option>
                                        <option value="">NC</option>
                                        <option value="">ND</option>
                                        <option value="">OH</option>
                                        <option value="">OK</option>
                                        <option value="">OR</option>
                                        <option value="">PA</option>
                                        <option value="">PR</option>
                                        <option value="">RI</option>
                                        <option value="">SC</option>
                                        <option value="">SD</option>
                                        <option value="">TN</option>
                                        <option value="">TX</option>
                                        <option value="">UT</option>
                                        <option value="">VT</option>
                                        <option value="">VA</option>
                                        <option value="">VI</option>
                                        <option value="">WA</option>
                                        <option value="">WV</option>
                                        <option value="">WI</option>
                                        <option value="">WY</option>
                        </select>
                    </div>
                </div> 
                <div class="phone-number">
                    <label for="">Phone:</label>
                    <input type="text" placeholder="Enter phone number">
                </div> 
                <div class="zip">
                        <label for="">ZIP code:</label>
                        <input type="text" placeholder="Enter ZIP code">
                </div>     
            </div>
            <div class="checkout-button-holder">
                <button class="place-to-complete">Place Order</button>
            </div>`;
        
        paymentSection.append(userInfo);

        let CheckoutButton = userInfo.querySelector('.place-to-complete');
        CheckoutButton.addEventListener("click", function () {
            userInfo.style.display = "none";
            displayCheckoutItems();
            addTip();
        });
    }


    function displayCheckoutItems(){
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let checkoutItems = document.createElement('div');
        checkoutItems.classList.add(".payment");
        const checkoutContainerDisplay = document.querySelector(".payment");
        checkoutItems.innerHTML = `
        <div class="checkout">
            <h2>Items</h2>
            <div class="checkout-items">
                <div class="check-items">
                    <div class="item-cata"><h3>Quantity</h3><h3>Item</h3><h3>price</h3></div>
                    <div class="items-of-checkout">
                           
                    </div>
                     <div class="tip-service">
                         <div class="tip-row">
                            <button class="tip-percentages"><p class="no-tip">No Tip</p></button>
                            <button class="tip-percentages"><div><h3>10%</h3 class="tip-amount"><p class="amount1"></p></div></button>
                            <button class="tip-percentages"><div><h3>15%</h3 class="tip-amount"><p class="amount2"></p></div></button>
                            <button class="tip-percentages"><div><h3>20%</h3 class="tip-amount"><p class="amount3"></p></div></button>
                            <button class="tip-percentages"><p>Custom Tip</p></button>
                         </div>
                         <div class="custom-tip-display"><h3 class="tip-input"></h3></div>
                     </div> 
                    <div class="total-container">
                    </div>
                </div>
            </div>
        </div>
        <div class="checkout-button-holder complete-button-holder">
             <a href="/Checkout/Receipt/receipt.html"><button class="complete-order-button">Place Order</button></a>
        </div>`;
        
        checkoutContainerDisplay.innerHTML = '';
        checkoutContainerDisplay.appendChild(checkoutItems);

        if(checkoutContainerDisplay){
            checkoutContainerDisplay.innerHTML = ``;
            checkoutContainerDisplay.appendChild(checkoutItems);
        }else{
            console.error("checkoutContainer not found");
        }

        if(cart.length === 0){
            checkoutContainerDisplay.innerHTML = `<p>Cart is empty</p>`;
            return;
        }

        cart.forEach(item =>{
            let itemDiv = document.createElement("div");
            itemDiv.classList.add('items');
            itemDiv.innerHTML = `
                <p>${item.quantity || 1}x</p>
                <p>${item.name}</p>
                <p>${item.price}</p>
            `;
            checkoutItems.querySelector('.items-of-checkout').appendChild(itemDiv);
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

        let totalContainer = document.querySelector(".total-container");
        totalContainer.innerHTML = `
        <div class="total">
            <h3>Total:</h3>
            <h2>€${totalPrice.toFixed(2)}</h2>
        </div>
        `;
        console.log(cart);

    }

   
    function addTip() {
        let totalDisplay = document.querySelector('.total-container .total h2');
        let totalValue = parseFloat(totalDisplay.textContent.replace('€','')) || 0;
        let CustomTipDisplay = document.querySelector('.custom-tip-display .tip-input');

        let tip10 = (totalValue * 0.10).toFixed(2);
        let tip15 = (totalValue * 0.15).toFixed(2);
        let tip20 = (totalValue * 0.20).toFixed(2);

        let tipDisplay1 = document.querySelector('.amount1')
        let tipDisplay2 = document.querySelector('.amount2')
        let tipDisplay3 = document.querySelector('.amount3')

        if(tipDisplay1){ tipDisplay1.textContent = `€${tip10}`; } 
        if(tipDisplay2){ tipDisplay2.textContent = `€${tip15}`; }
        if(tipDisplay3){ tipDisplay3.textContent = `€${tip20}`; }

        const tipButtons = document.querySelectorAll('.tip-percentages');
        tipButtons.forEach(button =>{
            button.addEventListener('click', function (){
            let tipPercentage = 0;
            
                if(this.querySelector('h3')){//takes the percent symbol out of the percentage and uses the number
                    tipPercentage = parseInt(this.querySelector('h3').textContent.replace('%',''));
                    CustomTipDisplay.style.display = 'none';
                } else if(this.textContent === 'Custom Tip'){
                    let customTip = parseFloat(prompt('Enter custom tip amount:'));
                    if(!isNaN(customTip)){
                        updateTotalWithTip(customTip);
                        CustomTipDisplay.textContent = `Custom Tip: €${customTip}`
                        CustomTipDisplay.style.display = 'block';
                        return;
                    } else{
                        alert('please enter a valid number');
                        return;
                    }
                } else if(this.textContent === 'No Tip'){
                    CustomTipDisplay.style.display = 'none';
                }
                 const tipAmount = totalValue * (tipPercentage/100);
                 updateTotalWithTip(tipAmount);
            });
        });
    
    function updateTotalWithTip(tipAmount){
        const newTotal = totalValue + tipAmount;
        totalDisplay.textContent = `€${newTotal.toFixed(2)}`;
    }
}
    

    function displayDeliveryCash(){
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let checkoutItems = document.createElement('div');
        checkoutItems.classList.add(".payment");
        const checkoutContainerDisplay = document.querySelector(".payment");
        checkoutItems.innerHTML = `
        <div class="checkout">
            <h2>Items</h2>
            <div class="checkout-items">
                <div class="check-items">
                    <div class="item-cata"><h3>Quantity</h3><h3>Item</h3><h3>price</h3></div>
                    <div class="items-of-checkout">   
                    </div>
                    <div class="total-container">
                    </div>
                     <div class="instructions-pickup-cash"><div class="words-instruction"><p>Please go to the register and provide the name for your order.</p></div></div>
                </div>
            </div>
        </div>
        `;
        
        checkoutContainerDisplay.innerHTML = '';
        checkoutContainerDisplay.appendChild(checkoutItems);

        if(checkoutContainerDisplay){
            checkoutContainerDisplay.innerHTML = ``;
            checkoutContainerDisplay.appendChild(checkoutItems);
        }else{
            console.error("checkoutContainer not found");
        }

        if(cart.length === 0){
            checkoutContainerDisplay.innerHTML = `<p>Cart is empty</p>`;
            return;
        }

        cart.forEach(item =>{
            let itemDiv = document.createElement("div");
            itemDiv.classList.add('items');
            itemDiv.innerHTML = `
                <p>${item.quantity || 1}x</p>
                <p>${item.name}</p>
                <p>${item.price}</p>
            `;
            checkoutItems.querySelector('.items-of-checkout').appendChild(itemDiv);
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

        let totalContainer = document.querySelector(".total-container");
        totalContainer.innerHTML = `
        <div class="total">
            <h3>Total:</h3>
            <h2>€${totalPrice.toFixed(2)}</h2>
        </div>
        `;
        console.log(cart);
    }

    //////////////////////////////////////////////////////////////////////////////

    function displayPickUpCashOrder(){
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let checkoutItems = document.createElement('div');
        checkoutItems.classList.add(".payment");
        const checkoutContainerDisplay = document.querySelector(".payment");
        checkoutItems.innerHTML = `
        <div class="checkout">
            <h2>Items</h2>
            <div class="checkout-items">
                <div class="check-items">
                    <div class="item-cata"><h3>Quantity</h3><h3>Item</h3><h3>price</h3></div>
                    <div class="items-of-checkout">   
                    </div>
                    <div class="total-container">
                    
                    </div>
                     <div class="instructions-pickup-cash"><div class="words-instruction"><p>Please go to the register and provide the name for your order.</p></div></div>
                </div>
            </div>
        </div>
        `;
        
        checkoutContainerDisplay.innerHTML = '';
        checkoutContainerDisplay.appendChild(checkoutItems);

        if(checkoutContainerDisplay){
            checkoutContainerDisplay.innerHTML = ``;
            checkoutContainerDisplay.appendChild(checkoutItems);
        }else{
            console.error("checkoutContainer not found");
        }

        if(cart.length === 0){
            checkoutContainerDisplay.innerHTML = `<p>Cart is empty</p>`;
            return;
        }

        cart.forEach(item =>{
            let itemDiv = document.createElement("div");
            itemDiv.classList.add('items');
            itemDiv.innerHTML = `
                <p>${item.quantity || 1}x</p>
                <p>${item.name}</p>
                <p>${item.price}</p>
            `;
            checkoutItems.querySelector('.items-of-checkout').appendChild(itemDiv);
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

        let totalContainer = document.querySelector(".total-container");
        totalContainer.innerHTML = `
        <div class="total">
            <h3>Total:</h3>
            <h2>€${totalPrice.toFixed(2)}</h2>
        </div>
        `;
        console.log(cart);

    }

});
