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
        inCheckout = true;                                                       //<-------------------------entering checkout flow
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

        let checkoutHolder = document.querySelector(".checkout-holder-back-select")
        checkoutHolder.appendChild(buttonHolderDisplay);
        paymentSection.appendChild(checkoutHolder);

        // Add event listeners for the new buttons 
        creditDebitButton.addEventListener("click", function () {
            CreditDebitPayment(buttonHolderDisplay,creditDebitButton, cashButton);
        });

        cashButton.addEventListener("click", function () {
            cashPaymentForm();
        });
    }
    PaymentButtonListener();

    function PaymentButtonListener(){
    pickUpButton.addEventListener("click", () => showPaymentOptions(false));
    deliveryButton.addEventListener("click",() => showPaymentOptions(true));
    }

  
    function UndoAction(){
        if(!inCheckout) return;                                              //<-------------------------exit if not in checkout flow
        inCheckout = false;                                                  //<-------------------------exit checkout flow

        //intial display states
        pickUpButton.style.display = initialState.pickUpDisplay;
        deliveryButton.style.display = initialState.deliveryDisplay;

        //restores the payment section and button  holder
        paymentSection.innerHTML = initialState.paymentSectionHTML;

        initialButtonHolderDisplay = document.querySelector(".button-holder");
        pickUpButton = document.querySelector(".pick-up");
        deliveryButton = document.querySelector(".Delivery");

        PaymentButtonListener();

        undoButton = document.querySelector('.undo');
        undoButton.addEventListener("click", UndoAction);
    }

    undoButton.addEventListener("click", UndoAction);
   

    function cashPaymentForm(){
        const cashDisplay = document.createElement("div");
        cashDisplay.classList.add(".payment");

        if(isDelivery){
        cashDisplay.innerHTML =`
        <div class="back-arrow-and-tip-holder"><button class="undo"><ion-icon name="arrow-back-outline"></ion-icon></button></div>
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
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="AS">American Samoa</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="GU">Guam</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="PR">Puerto Rico</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="VI">Virgin Islands</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
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
        <div class="back-arrow-and-tip-holder"><button class="undo"><ion-icon name="arrow-back-outline"></ion-icon></button></div>
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
        
        validatePersonalInfo(paymentSection)

        let newUndoButton = cashDisplay.querySelector('.undo');
        newUndoButton.addEventListener('click', UndoAction);
       
        let pickUpCashOrder = cashDisplay.querySelector('.place-to-complete-pick-up-cash');// change this
        if(pickUpCashOrder){
            pickUpCashOrder.addEventListener('click', function() {
                cashDisplay.style.display = 'none';
                displayPickUpCashOrder();
            });
        }
        
        
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
            </div>
            <div class="checkout-button-holder">
                <button class="place-order">NEXT</button>
            </div>`;

        paymentSection.append(paymentDisplay);

        // validation for card inputs
        validateCardInput(paymentDisplay);

        let nextButton = paymentDisplay.querySelector(".place-order");
        nextButton.addEventListener("click", function () {
            paymentDisplay.style.display = "none";
            showUserInfo();
        });
    }

    function validateCardInput(PaymentDisplay){
        const cardNumber = PaymentDisplay.querySelector(".card-number input");
        const cardExpiry = PaymentDisplay.querySelector(".card-exp input");
        const cardCVC = PaymentDisplay.querySelector(".card-cvc input");
        const zipCode = PaymentDisplay.querySelector(".zip input");
        const nextButton = PaymentDisplay.querySelector(".place-order");

        function updateNextButtonState(){
            const isCardNumberValid = cardNumber.value.length >= 13 && cardNumber.value.length <= 19;
            const isCardExpiryValid = /^(\d{2}\/\d{2})$/.test(cardExpiry.value); // validate MM/YY format
            const isCardCVCValid = cardCVC.value.length >= 3 && cardCVC.value.length <= 4;
            const isZipCodeValid = zipCode.value.length >= 5;

            console.log("Validation State:");
            console.log("Card Number Valid:", isCardNumberValid, `(${cardNumber.value})`);
            console.log("Card Expiry Valid:", isCardExpiryValid, `(${cardExpiry.value})`);
            console.log("Card CVC Valid:", isCardCVCValid, `(${cardCVC.value})`);
            console.log("ZIP Code Valid:", isZipCodeValid, `(${zipCode.value})`);
            
            if (isCardNumberValid && isCardExpiryValid && isCardCVCValid && isZipCodeValid) {
                nextButton.disabled = false;
                console.log("All fields valid. NEXT button enabled.");
            } else {
                nextButton.disabled = true;
                console.log("Validation failed. NEXT button disabled.");
            }
        }

        //card number Validation
        cardNumber.addEventListener("input", function(){
            this.value = this.value.replace(/\D/g, '');// Allow only numbers
            if(this.value.length > 19){this.value = this.value.slice(0, 19);}
            updateNextButtonState();
        });

        //Card Expiry Validation
        cardExpiry.addEventListener("input", function(){
            this.value = this.value.replace(/[^0-9/]/g, '');// Allow numbers and "/"
            if(this.value.length > 5){this.value = this.value.slice(0, 5);}
            updateNextButtonState();
        });

        //Card CVC Validation
        cardCVC.addEventListener("input", function(){
            this.value = this.value.replace(/\D/g, '');// Allow only numbers
            if(this.value.length > 4){this.value = this.value.slice(0, 4);}
            updateNextButtonState();
        });

        zipCode.addEventListener("input", function(){
            this.value = this.value.replace(/[^A-Za-z0-9]/g, '');// Allows alphanumberic
            if(this.value.length > 10){this.value = this.value.slice(0, 10);}
            updateNextButtonState();
        });

    }

    function validatePersonalInfo(PaymentDisplay){
        const phoneNumber = PaymentDisplay.querySelector(".phone-number input");//phone
        const streetAdress = PaymentDisplay.querySelector(".address input");//street  
        const city = PaymentDisplay.querySelector(".city input");//city 
        const state = PaymentDisplay.querySelector(".state select");//state
        const zipCode = PaymentDisplay.querySelector(".zip input");//zip code
        const placeOrder = PaymentDisplay.querySelector(".place-to-complete");

        console.log({
            phoneNumber,
            streetAdress,
            city,
            state,
            zipCode,
            placeOrder,
        });

        if(!phoneNumber || !streetAdress || !city || !state || !zipCode || !placeOrder){
            console.error("One or more elements for validation are missing.");
            return;
        }

        function updatePlaceOrderButtonState(){// comeback and attach correct validation inputs
            const isPhoneNumberValid = /^\d{10}$/.test(phoneNumber.value);//ensures 10 digits
            const isAddressValid = streetAdress.value.trim().length > 0;//not empty
            const isCityValid = city.value.trim().length > 0;//not empty
            const isStateValid = state ? state.value.trim().length > 0 && state.value !== "" : true;// make sure state is selected
            const isZipCodeValid = /^\d{5}$/.test(zipCode.value); // 5-digit-zipCode

            console.log("Validation State of :");
            console.log("Address Valid:", isAddressValid, `(${streetAdress.value})`);
            console.log("City Valid:", isCityValid, `(${city.value})`);
            console.log("State Valid:", isStateValid, `(${state.value})`);
            console.log("Phone Number Valid:", isPhoneNumberValid, `(${phoneNumber.value})`);
            console.log("ZIP Code Valid:", isZipCodeValid, `(${zipCode.value})`);
            
            if (isPhoneNumberValid && isAddressValid && isCityValid && isStateValid && isZipCodeValid) {
                placeOrder.disabled = false;
                console.log("All fields valid. PLACEORDER button enabled.");
            } else {
                placeOrder.disabled = true;
                console.log("Validation failed. PLACEORDER button disabled.");
            }
        }

        //phone number Validation
        phoneNumber.addEventListener("input", function(){
            this.value = this.value.replace(/\D/g, '');// Allow only numbers
            if(this.value.length > 10){this.value = this.value.slice(0, 10);}
            updatePlaceOrderButtonState();
        });

        //address Validation
        streetAdress.addEventListener("input", updatePlaceOrderButtonState());

        //city Validation
        city.addEventListener("input", updatePlaceOrderButtonState());
        //state Validation
        if(state){
            state.addEventListener("change", function(){
                console.log("State changed:", state.value)
                updatePlaceOrderButtonState();
            });
        }
        //zipCode Validation
        zipCode.addEventListener("input", function(){
            this.value = this.value.replace(/[^A-Za-z0-9]/g, '');// Allows alphanumberic
            if(this.value.length > 5){this.value = this.value.slice(0, 5);}
            updatePlaceOrderButtonState();
        });
        //inital state update
        updatePlaceOrderButtonState();
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
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="AS">American Samoa</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="GU">Guam</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="PR">Puerto Rico</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="VI">Virgin Islands</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
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

        validatePersonalInfo(userInfo)

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
