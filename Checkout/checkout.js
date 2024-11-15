document.addEventListener("DOMContentLoaded", function () {
    // Select initial elements
    let initialButtonHolderDisplay = document.querySelector(".button-holder");
    let pickUpButton = document.querySelector(".pick-up");
    let deliveryButton = document.querySelector(".Delivery");
    let undoButton = document.querySelector(".undo");
    const paymentSection = document.querySelector(".payment");
    let isDelivery = false;
    let inCheckout = false; // checks if we are in the checkout flow

    const initialState = {//inital state is making variable that will hold the intial starting point for any of these buttons
        buttonHolderHTML: initialButtonHolderDisplay.cloneNode(true).innerHTML,
        paymentSectionHTML: paymentSection.cloneNode(true).innerHTML,
        pickUpDisplay: pickUpButton.style.display,
        deliveryDisplay: deliveryButton.style.display,
    };

    // Function to show payment options (for both pick-up and delivery)
    function showPaymentOptions(isDeliverySelected) {
        isDelivery = isDeliverySelected;
        inCheckout = true; // entering checkout flow
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

        if(!inCheckout) return;//exit if not in checkout flow
        inCheckout = false; // exit checkout flow

        pickUpButton.style.display = initialState.pickUpDisplay;
        deliveryButton.style.display = initialState.deliveryDisplay;
        initialButtonHolderDisplay.style.display = "block";
        initialButtonHolderDisplay.innerHTML = initialState.buttonHolderHTML;
        paymentSection.innerHTML = initialState.paymentSectionHTML;

        pickUpButton.addEventListener("click", () => showPaymentOptions(false));
        deliveryButton.addEventListener("click",() => showPaymentOptions(true));
    }

    undoButton.addEventListener("click", UndoAction);
   

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
            <div class="place-order-button-holder">
                <button class="place-order">Place Order</button>
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
            <div class="place-order-button-holder">
                <button class="place-order">Place Order</button>
            </div>`;
        }

        paymentSection.innerHTML = "";
        paymentSection.appendChild(cashDisplay);
    }


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
            <div class="place-order-button-holder">
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
            </div>
            <div class="place-order-button-holder">
                <button class="place-to-complete">Place Order</button>
            </div>`;
        
        paymentSection.append(userInfo);

        let CheckoutButton = userInfo.querySelector('.place-to-complete');
        CheckoutButton.addEventListener("click", function () {
            userInfo.style.display = "none";
            checkOut();
        });
    }


    function checkOut(){
        const checkOutDisplay = document.createElement("div");
        checkOutDisplay.classList.add(".payment");
        checkOutDisplay.innerHTML = ``;





    }
});
