// document.addEventListener("DOMContentLoaded", function () {
//     // Select initial elements
//     let initialButtonHolderDisplay = document.querySelector(".button-holder");
//     let pickUpButton = document.querySelector(".pick-up");
//     let deliveryButton = document.querySelector(".Delivery");
//     let undoButton = document.querySelector(".undo");
//     const paymentSection = document.querySelector(".payment");
//     let isDelivery = false;
//     let inCheckout = false;                                                         //<-------------------------checks if we are in the checkout flow

//     const initialState = {                                                          //inital state is making variable that will hold the intial starting point for any of these buttons
//         buttonHolderHTML: initialButtonHolderDisplay.cloneNode(true).innerHTML,
//         paymentSectionHTML: paymentSection.cloneNode(true).innerHTML,
//         pickUpDisplay: pickUpButton.style.display,
//         deliveryDisplay: deliveryButton.style.display,
//     };

//     // Function to show payment options (for both pick-up and delivery)
//     function showPaymentOptions(isDeliverySelected) {
//         isDelivery = isDeliverySelected;
//         inCheckout = true;                                                       //<-------------------------entering checkout flow
//         pickUpButton.style.display = "none";
//         deliveryButton.style.display = "none";
//         initialButtonHolderDisplay.style.display = "none";
        
//         let buttonHolderDisplay = document.createElement("div");
//         buttonHolderDisplay.classList.add("button-holder");

//         // Create Credit/Debit and Cash buttons 
//         let creditDebitButton = document.createElement("button");
//         creditDebitButton.classList.add("credit-debit");
//         creditDebitButton.textContent = "Credit/Debit";
//         creditDebitButton.style.margin = "auto";

//         let cashButton = document.createElement("button");
//         cashButton.classList.add("cash");
//         cashButton.textContent = "Cash";
//         cashButton.style.margin = "auto";

//         buttonHolderDisplay.appendChild(creditDebitButton);
//         buttonHolderDisplay.appendChild(cashButton);

//         let checkoutHolder = document.querySelector(".checkout-holder-back-select")
//         checkoutHolder.appendChild(buttonHolderDisplay);
//         paymentSection.appendChild(checkoutHolder);

//         // Add event listeners for the new buttons 
//         creditDebitButton.addEventListener("click", function () {
//             CreditDebitPayment(buttonHolderDisplay,creditDebitButton, cashButton);
//         });

//         cashButton.addEventListener("click", function () {
//             cashPaymentForm();
//         });
//     }
//     PaymentButtonListener();

//     function PaymentButtonListener(){
//     pickUpButton.addEventListener("click", () => showPaymentOptions(false));
//     deliveryButton.addEventListener("click",() => showPaymentOptions(true));
//     }

  
//     function UndoAction(){
//         if(!inCheckout) return;                                              //<-------------------------exit if not in checkout flow
//         inCheckout = false;                                                  //<-------------------------exit checkout flow

//        //restores the payment section and button  holder
//         paymentSection.innerHTML = initialState.paymentSectionHTML;

//          //intial display states
//         pickUpButton.style.display = initialState.pickUpDisplay;
//         deliveryButton.style.display = initialState.deliveryDisplay;


//         initialButtonHolderDisplay = document.querySelector(".button-holder");
//         pickUpButton = document.querySelector(".pick-up");
//         deliveryButton = document.querySelector(".Delivery");
//         undoButton = document.querySelector('.undo');

//         PaymentButtonListener();
//         undoButton.addEventListener("click", UndoAction);
//     }

//     undoButton.addEventListener("click", UndoAction);
   

//     function cashPaymentForm(){
//         const cashDisplay = document.createElement("div");
//         cashDisplay.classList.add(".payment");

//         if(isDelivery){
//         cashDisplay.innerHTML =`
//          <div class="back-arrow-and-tip-holder"><button class="undo"><ion-icon name="arrow-back-outline"></ion-icon></button></div>
//             <div class="person-info">
//                 <div class="name-of-order">
//                 <label for="">Name for Order:</label>
//                 <input type="text" placeholder="Ex: John Doe">
//                 <div class="error-message-container name-of-order-error"></div>
//                 </div>
                
//                 <div class="address">
//                     <label for="">Street</label>
//                     <input type="text" name="" placeholder="123 N Main St">
//                     <input type="text" name="" placeholder="Apartment, suite, etc. (optional)">
//                     <div class="error-message-container street-address-error"></div>
//                 </div>
//                 <div class="city-state">
//                     <div class="city">
//                         <label for="">City:</label>
//                         <input type="text" placeholder="Enter city">
//                         <div class="error-message-container city-error"></div>
//                     </div>
//                     <div class="state">
//                         <label for="">State:</label>
//                         <select name="states" id="states">
//                             <option value="">-----Select State-----</option>
//                             <option value="AL">Alabama</option>
//                             <option value="AK">Alaska</option>
//                             <option value="AZ">Arizona</option>
//                             <option value="AR">Arkansas</option>
//                             <option value="CA">California</option>
//                             <option value="CO">Colorado</option>
//                             <option value="CT">Connecticut</option>
//                             <option value="DE">Delaware</option>
//                             <option value="FL">Florida</option>
//                             <option value="GA">Georgia</option>
//                             <option value="GU">Guam</option>
//                             <option value="HI">Hawaii</option>
//                             <option value="ID">Idaho</option>
//                             <option value="IL">Illinois</option>
//                             <option value="IN">Indiana</option>
//                             <option value="IA">Iowa</option>
//                             <option value="KS">Kansas</option>
//                             <option value="KY">Kentucky</option>
//                             <option value="LA">Louisiana</option>
//                             <option value="ME">Maine</option>
//                             <option value="MD">Maryland</option>
//                             <option value="MA">Massachusetts</option>
//                             <option value="MI">Michigan</option>
//                             <option value="MN">Minnesota</option>
//                             <option value="MS">Mississippi</option>
//                             <option value="MO">Missouri</option>
//                             <option value="MT">Montana</option>
//                             <option value="NE">Nebraska</option>
//                             <option value="NV">Nevada</option>
//                             <option value="NH">New Hampshire</option>
//                             <option value="NJ">New Jersey</option>
//                             <option value="NM">New Mexico</option>
//                             <option value="NY">New York</option>
//                             <option value="NC">North Carolina</option>
//                             <option value="ND">North Dakota</option>
//                             <option value="OH">Ohio</option>
//                             <option value="OK">Oklahoma</option>
//                             <option value="OR">Oregon</option>
//                             <option value="PA">Pennsylvania</option>
//                             <option value="PR">Puerto Rico</option>
//                             <option value="RI">Rhode Island</option>
//                             <option value="SC">South Carolina</option>
//                             <option value="SD">South Dakota</option>
//                             <option value="TN">Tennessee</option>
//                             <option value="TX">Texas</option>
//                             <option value="UT">Utah</option>
//                             <option value="VT">Vermont</option>
//                             <option value="VA">Virginia</option>
//                             <option value="VI">Virgin Islands</option>
//                             <option value="WA">Washington</option>
//                             <option value="WV">West Virginia</option>
//                             <option value="WI">Wisconsin</option>
//                             <option value="WY">Wyoming</option>
//                         </select>
//                         <div class="error-message-container state-error"></div>
//                     </div> 
//                 </div> 
//                 <div class="phone-number">
//                     <label for="">Phone:</label>
//                     <input type="text" placeholder="Enter phone number">
//                     <div class="error-message-container phone-number-error"></div>
//                 </div> 
//                 <div class="zip">
//                     <label for="">ZIP code:</label>
//                     <input type="text" placeholder="Enter ZIP code">
//                     <div class="error-message-container zip-error"></div>
//                 </div>     
//             </div>
//             <div class="checkout-button-holder">
//                 <button class="place-to-complete">Place Order</button>
//             </div>`;
//         }else{
//             cashDisplay.innerHTML = `
//             <div class="back-arrow-and-tip-holder"><button class="undo"><ion-icon name="arrow-back-outline"></ion-icon></button></div>
//             <div class="person-info">
//                 <div class="name-of-order">
//                     <label for="">Name for Order:</label>
//                     <input type="text" placeholder="Ex: John Doe">
//                     <div class="error-message-container name-of-order-error"></div>
//                 </div>
//                 <div class="phone-number">
//                     <label for="">Phone:</label>
//                     <input type="text" placeholder="Enter phone number">
//                     <div class="error-message-container phone-number-error"></div>
//                 </div>      
//             </div>
//             </div>
//             <div class="checkout-button-holder">
//                 <button class="place-to-complete-pick-up-cash">Place Order</button>
//             </div>`;
//         }

//         paymentSection.innerHTML = "";
//         paymentSection.appendChild(cashDisplay);
        
//         enforceInputLimitsPersonalInformation(cashDisplay);

//         let newUndoButton = cashDisplay.querySelector('.undo');
//         if (newUndoButton) {
//             newUndoButton.addEventListener('click', UndoAction);
//         }else {
//             console.error("Undo button not found");
//         }
        
//         const placeOrderButton = cashDisplay.querySelector('.place-to-complete');
//         const cashOrderButton = cashDisplay.querySelector('.place-to-complete-pick-up-cash');
//         if (placeOrderButton) {
//             placeOrderButton.addEventListener('click', function () {
//                 const isValid = validatePersonalInfo(paymentSection);
//                 if (isValid) {
//                     cashDisplay.style.display = 'none';
//                     displayDeliveryCash()
//                 }
//             });
//         }else if(cashOrderButton) {
//             cashOrderButton.addEventListener('click', function () {
//                 const isValid = validatePersonalInfo(paymentSection);
//                 if (isValid) {
//                     cashDisplay.style.display = 'none';
//                     displayPickUpCashOrder()
//                 }
//             }); 
//         }
//     }
   


//     function CreditDebitPayment(buttonHolderDisplay, creditDebitButton, cashButton) {
//         creditDebitButton.style.display = "none";
//         cashButton.style.display = "none";
//         buttonHolderDisplay.style.display = "none";

//         const paymentDisplay = document.createElement("div");
//         paymentDisplay.classList.add(".payment");
//         paymentDisplay.innerHTML = `
//             <div class="credit-debit-display">
//                 <div class="title">
//                     <label for="">CREDIT CARD PAYMENT</label>
//                     <div class="card-img-holder">
//                         <div class="card-img card-1"></div>
//                         <div class="card-img card-2"></div>
//                         <div class="card-img card-3"></div>
//                     </div>
//                 </div>
                
//                 <div class="card-number">
//                     <label for="">CARD NUMBER</label>
//                     <input type="text" placeholder="XXXX XXXX XXXX XXXX">
//                     <div class="error-message-container card-number-error"></div>
//                 </div>  
                
//                 <div class="card-sect">
//                     <div class="card-exp">
//                         <label for="">CARD EXPIRY</label>
//                         <input type="text" placeholder="--/--">
//                         <div class="error-message-container card-exp-error"></div>
//                     </div>
                    
//                     <div class="card-cvc">
//                         <label for="">CARD CVC</label>
//                         <input type="text" placeholder="***">
//                         <div class="error-message-container card-cvc-error"></div>
//                     </div>
                    
//                 </div>
//                 <div class="card-holder-name">
//                     <label for="">CARD HOLDER NAME</label>
//                     <input type="text">
//                     <div class="error-message-container card-holder-name-error"></div>
//                 </div>
//                 <div class="zip">
//                     <label for="">ZIP code:</label>
//                     <input type="text" placeholder="Enter ZIP code">
//                     <div class="error-message-container zip-error"></div>
//                 </div>
                
//             </div>
//             <div class="checkout-button-holder">
//                 <button class="place-order">NEXT</button>
//             </div>`;

//         paymentSection.append(paymentDisplay);

//         enforceInputLimits(paymentDisplay);

//         let nextButton = paymentDisplay.querySelector(".place-order");
//         if(!nextButton){
//             console.error("Next button not found")
//         } else{
//                 nextButton.addEventListener("click", function () {
//                     const isValid = validateCardInput(paymentDisplay)
//                     if(isValid){
//                         paymentDisplay.style.display = "none";
//                         showUserInfo();
//                     }
//                 });
//             }
//     }

//     function validateCardInput(PaymentDisplay){
//         const cardNumber = PaymentDisplay.querySelector(".card-number input");
//         const cardExpiry = PaymentDisplay.querySelector(".card-exp input");
//         const cardCVC = PaymentDisplay.querySelector(".card-cvc input");
//         const cardHolderName = PaymentDisplay.querySelector(".card-holder-name input");
//         const zipCode = PaymentDisplay.querySelector(".zip input");

//         const cardNumberError = PaymentDisplay.querySelector(".card-number-error");
//         const cardExpiryError = PaymentDisplay.querySelector(".card-exp-error");
//         const cardCVCError = PaymentDisplay.querySelector(".card-cvc-error");
//         const cardHolderNameError = PaymentDisplay.querySelector(".card-holder-name-error");
//         const zipCodeError = PaymentDisplay.querySelector(".zip-error");

//         let isValid = true;

//         function displayError(errorContainer,message){
//             errorContainer.textContent = message;
//             errorContainer.style.display = "block";
//         }

//         function clearError(errorContainer){
//            errorContainer.textContent = "";
//            errorContainer.style.display = "none";
//         }

//         if(cardNumber.value.length < 13 || cardNumber.value.length > 19){
//             displayError(cardNumberError, "Card number must be 13-19 digits.");
//             isValid = false;
//         }
//         else{
//             clearError(cardNumberError);
//         }
        
//         if (!/^(\d{2}\/\d{2})$/.test(cardExpiry.value)) {
//             displayError(cardExpiryError, "Expiry MM/YY format.");
//             isValid = false;
//         }
//         else{
//             clearError(cardExpiryError);
//         }
        
//         if(cardCVC.value.length < 3 || cardCVC.value.length > 4){
//             displayError(cardCVCError, "CVC must be 3-4 digits.");
//             isValid = false;
//         }else{
//             clearError(cardCVCError);
//         }

//         if(cardHolderName.value.trim() === ""){
//             displayError(cardHolderNameError, "Please enter cardholder name");
//             isValid = false;
//         }else{
//             clearError(cardHolderNameError);
//         }

//         if(zipCode.value.length < 5){
//             displayError(zipCodeError, "ZIP code must be at least 5 digits.");
//             isValid = false;
//         }else{
//             clearError(zipCodeError);
//         }
        
//         return isValid;
//     }

//     function enforceInputLimits(paymentDisplay){
//         const cardNumber = paymentDisplay.querySelector(".card-number input");
//         const cardExpiry = paymentDisplay.querySelector(".card-exp input");
//         const cardCVC = paymentDisplay.querySelector(".card-cvc input");
//         const cardHolderName = paymentDisplay.querySelector(".card-holder-name input");
//         const zipCode = paymentDisplay.querySelector(".zip input"); 

//         const cardNumberError = paymentDisplay.querySelector(".card-number-error");
//         const cardExpiryError = paymentDisplay.querySelector(".card-exp-error");
//         const cardCVCError = paymentDisplay.querySelector(".card-cvc-error");
//         const cardHolderNameError = paymentDisplay.querySelector(".card-holder-name-error");
//         const zipCodeError = paymentDisplay.querySelector(".zip-error");
        
//     function limitInput(event, maxLength) {
//         const input = event.target;
//         input.value = input.value.slice(0, maxLength); // restrict length
//     }

//     function enforceNumberInput(event) {
//         const input = event.target;
//         input.value = input.value.replace(/\D/g, ''); // remove non-numeric characters
//     }

//    function validateAndClearError(input, errorContainer, validationFn) {
//         if (!input) { // Check if input is null
//             console.error("Input element not found for validation");
//             return;
//         }
//         input.addEventListener('input', (e) => {
//             validationFn(e);
//             if(validationFn(e)){
//                 errorContainer.textContent = '';
//                 errorContainer.style.display = 'none';
//             }
//         });
//    }

//     function validateCardHolderName(){
//         return /^[a-zA-Z\s'-]+$/.test(cardHolderName.value.trim());;
//     }

//    function validateCardNumber() {
//         return cardNumber.value.length >= 13 && cardNumber.value.length <= 19;
//     }

//     function validateCardExpiry() {
//         return /^(\d{2}\/\d{2})$/.test(cardExpiry.value);
//     }

//     function validateCardCVC() {
//         return cardCVC.value.length >= 3 && cardCVC.value.length <= 4;
//     }

//     function validateZipCode() {
//         return zipCode.value.length >= 5;
//     }

//     // Real-time validation with error display
//     validateAndClearError(cardNumber, cardNumberError, validateCardNumber);
//     validateAndClearError(cardExpiry, cardExpiryError, validateCardExpiry);
//     validateAndClearError(cardCVC, cardCVCError, validateCardCVC);
//     validateAndClearError(cardHolderName, cardHolderNameError, validateCardHolderName);
//     validateAndClearError(zipCode, zipCodeError, validateZipCode);

//     // Add input restrictions
//     cardNumber.addEventListener("input", (e) => {
//         enforceNumberInput(e);
//         limitInput(e, 19);
//     });

//     cardExpiry.addEventListener("input", (e) => {
//         limitInput(e, 5);
//     });

//     cardCVC.addEventListener("input", (e) => {
//         enforceNumberInput(e);
//         limitInput(e, 4);
//     });

//     cardHolderName.addEventListener("input", (e) => {
//         limitInput(e, 50);
//     })

//     zipCode.addEventListener("input", (e) => {
//         enforceNumberInput(e);
//         limitInput(e, 5);
//     });
//     }

//     function showUserInfo() {
//         const userInfo = document.createElement("div");
//         userInfo.classList.add(".payment");
//         userInfo.innerHTML = `
//             <div class="person-info">
//                 <div class="name-of-order">
//                 <label for="">Name for Order:</label>
//                 <input type="text" placeholder="Ex: John Doe">
//                 <div class="error-message-container name-of-order-error"></div>
//                 </div>
                
//                 <div class="address">
//                     <label for="">Street</label>
//                     <input type="text" name="" placeholder="123 N Main St">
//                     <input type="text" name="" placeholder="Apartment, suite, etc. (optional)">
//                     <div class="error-message-container street-address-error"></div>
//                 </div>
//                 <div class="city-state">
//                     <div class="city">
//                         <label for="">City:</label>
//                         <input type="text" placeholder="Enter city">
//                         <div class="error-message-container city-error"></div>
//                     </div>
//                     <div class="state">
//                         <label for="">State:</label>
//                         <select name="states" id="states">
//                             <option value="">-----Select State-----</option>
//                             <option value="AL">Alabama</option>
//                             <option value="AK">Alaska</option>
//                             <option value="AZ">Arizona</option>
//                             <option value="AR">Arkansas</option>
//                             <option value="CA">California</option>
//                             <option value="CO">Colorado</option>
//                             <option value="CT">Connecticut</option>
//                             <option value="DE">Delaware</option>
//                             <option value="FL">Florida</option>
//                             <option value="GA">Georgia</option>
//                             <option value="GU">Guam</option>
//                             <option value="HI">Hawaii</option>
//                             <option value="ID">Idaho</option>
//                             <option value="IL">Illinois</option>
//                             <option value="IN">Indiana</option>
//                             <option value="IA">Iowa</option>
//                             <option value="KS">Kansas</option>
//                             <option value="KY">Kentucky</option>
//                             <option value="LA">Louisiana</option>
//                             <option value="ME">Maine</option>
//                             <option value="MD">Maryland</option>
//                             <option value="MA">Massachusetts</option>
//                             <option value="MI">Michigan</option>
//                             <option value="MN">Minnesota</option>
//                             <option value="MS">Mississippi</option>
//                             <option value="MO">Missouri</option>
//                             <option value="MT">Montana</option>
//                             <option value="NE">Nebraska</option>
//                             <option value="NV">Nevada</option>
//                             <option value="NH">New Hampshire</option>
//                             <option value="NJ">New Jersey</option>
//                             <option value="NM">New Mexico</option>
//                             <option value="NY">New York</option>
//                             <option value="NC">North Carolina</option>
//                             <option value="ND">North Dakota</option>
//                             <option value="OH">Ohio</option>
//                             <option value="OK">Oklahoma</option>
//                             <option value="OR">Oregon</option>
//                             <option value="PA">Pennsylvania</option>
//                             <option value="PR">Puerto Rico</option>
//                             <option value="RI">Rhode Island</option>
//                             <option value="SC">South Carolina</option>
//                             <option value="SD">South Dakota</option>
//                             <option value="TN">Tennessee</option>
//                             <option value="TX">Texas</option>
//                             <option value="UT">Utah</option>
//                             <option value="VT">Vermont</option>
//                             <option value="VA">Virginia</option>
//                             <option value="VI">Virgin Islands</option>
//                             <option value="WA">Washington</option>
//                             <option value="WV">West Virginia</option>
//                             <option value="WI">Wisconsin</option>
//                             <option value="WY">Wyoming</option>
//                         </select>
//                         <div class="error-message-container state-error"></div>
//                     </div> 
//                 </div> 
//                 <div class="phone-number">
//                     <label for="">Phone:</label>
//                     <input type="text" placeholder="Enter phone number">
//                     <div class="error-message-container phone-number-error"></div>
//                 </div> 
//                 <div class="zip">
//                     <label for="">ZIP code:</label>
//                     <input type="text" placeholder="Enter ZIP code">
//                     <div class="error-message-container zip-error"></div>
//                 </div>     
//             </div>
//             <div class="checkout-button-holder">
//                 <button class="place-to-complete">Place Order</button>
//             </div>`;
    
//         paymentSection.innerHTML = ""; // Clear existing content
//         paymentSection.append(userInfo);

//         enforceInputLimitsPersonalInformation(userInfo);

//         const placeOrderButton = userInfo.querySelector(".place-to-complete");
//         placeOrderButton.addEventListener("click", function () {
//             const isValid = validatePersonalInfo(userInfo)
//             if(isValid){
//                 userInfo.style.display = "none";
//                 displayCheckoutItems();
//                 addTip();
//             }
            
//         });
//     }

//     function validatePersonalInfo(PaymentDisplay) {
//         const NameOfOrder = PaymentDisplay.querySelector(".name-of-order input");
//         const phoneNumber = PaymentDisplay.querySelector(".phone-number input");
//         const streetAddress = PaymentDisplay.querySelector(".address input");
//         const city = PaymentDisplay.querySelector(".city input");
//         const state = PaymentDisplay.querySelector(".state select");
//         const zipCode = PaymentDisplay.querySelector(".zip input");
    
//         const NameOfOrderError = PaymentDisplay.querySelector(".name-of-order-error");
//         const phoneNumberError = PaymentDisplay.querySelector(".phone-number-error");
//         const streetAddressError = PaymentDisplay.querySelector(".street-address-error");
//         const cityError = PaymentDisplay.querySelector(".city-error");
//         const stateError = PaymentDisplay.querySelector(".state-error");
//         const zipCodeError = PaymentDisplay.querySelector(".zip-error");
    
//         let isValid = true;
    
//         // Helper to display errors
//         const displayError = (errorContainer, message) => {
//             if (errorContainer) {
//                 errorContainer.textContent = message;
//                 errorContainer.style.display = "block";
//             }
//             isValid = false;
//         };

//         const hideError = (errorContainer) =>{
//             if (errorContainer) {
//                 errorContainer.style.display = "none";
//             }
//         }
    
//         const validateField = (field, errorContainer, condition, errorMessage) => {
//             if (field && !condition(field.value.trim())) {
//                 displayError(errorContainer, errorMessage);
//             }else{
//                 hideError(errorContainer);
//             }
//         };
    
//         // Validate only fields that exist
//         if (NameOfOrder) validateField(NameOfOrder, NameOfOrderError, (value) => value !== "", "Please enter name of order");
//         if (phoneNumber) validateField(phoneNumber, phoneNumberError, (value) => /^\d{10}$/.test(value), "Phone number must be 10 digits");
//         if (streetAddress) validateField(streetAddress, streetAddressError, (value) => value !== "", "Street address cannot be empty");
//         if (city) validateField(city, cityError, (value) => value !== "", "City cannot be empty");
//         if (state) validateField(state, stateError, (value) => value !== "", "Please select a state");
//         if (zipCode) validateField(zipCode, zipCodeError, (value) => /^\d{5}$/.test(value), "ZIP code must be 5 digits");
    
//         console.log("Validation Result: ", isValid);
//         return isValid;
//     }
    

//     function enforceInputLimitsPersonalInformation(userInformation){
//         const inputConfig = {
//             ".name-of-order input": {limit : 50},
//             ".phone-number input": {limit : 10, enforceNumbers : true},
//             ".address input": {limit : 100},
//             ".city input": {limit : 50},
//             ".state select": {isDropdown : true},
//             ".zip input": {limit : 5, enforceNumbers : true}
//         }

//         for(const [selector, config] of Object.entries(inputConfig)){
//             const input = userInformation.querySelector(selector);

//             if(input){
//                 if(config.isDropdown){
//                     input.addEventListener("change", (e) =>{
//                         console.log(`${selector} changed:`, e.target.value);
//                         validatePersonalInfo(userInformation); 
//                     })
//                 }else{
//                     input.addEventListener("input", (e) =>{
//                         if(config.enforceNumbers){enforceNumberInput(e)}
//                         if(config.limit){limitInput(e, config.limit)};
//                         validatePersonalInfo(userInformation); 
//                     })
//                 }
//             }else{
//                 console.warn(`input not found for selector: ${selector}`)
//             }
//         }

//         function limitInput(event, maxLength){
//             const input = event.target;
//             input.value = input.value.slice(0, maxLength); //restrict length
//         }

//         function enforceNumberInput(event){
//             const input = event.target;
//             input.value = input.value.replace(/\D/g, ''); //removing non-numeric characters
//         }

//     }
    

//     function displayCheckoutItems(){
//         const cart = JSON.parse(localStorage.getItem('cart')) || [];
//         let checkoutItems = document.createElement('div');
//         checkoutItems.classList.add(".payment");
//         const checkoutContainerDisplay = document.querySelector(".payment");
//         checkoutItems.innerHTML = `
//         <div class="checkout">
//             <h2>Items</h2>
//             <div class="checkout-items">
//                 <div class="check-items">
//                     <div class="item-cata"><h3>Quantity</h3><h3>Item</h3><h3>price</h3></div>
//                     <div class="items-of-checkout">
                           
//                     </div>
//                      <div class="tip-service">
//                          <div class="tip-row">
//                             <button class="tip-percentages"><p class="no-tip">No Tip</p></button>
//                             <button class="tip-percentages"><div><h3>10%</h3 class="tip-amount"><p class="amount1"></p></div></button>
//                             <button class="tip-percentages"><div><h3>15%</h3 class="tip-amount"><p class="amount2"></p></div></button>
//                             <button class="tip-percentages"><div><h3>20%</h3 class="tip-amount"><p class="amount3"></p></div></button>
//                             <button class="tip-percentages"><p>Custom Tip</p></button>
//                          </div>
//                          <div class="custom-tip-display"><h3 class="tip-input"></h3></div>
//                      </div> 
//                     <div class="total-container">
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div class="checkout-button-holder complete-button-holder">
//              <a href="/Checkout/Receipt/receipt.html"><button class="complete-order-button">Place Order</button></a>
//         </div>`;
        
//         checkoutContainerDisplay.innerHTML = '';
//         checkoutContainerDisplay.appendChild(checkoutItems);

//         if(checkoutContainerDisplay){
//             checkoutContainerDisplay.innerHTML = ``;
//             checkoutContainerDisplay.appendChild(checkoutItems);
//         }else{
//             console.error("checkoutContainer not found");
//         }

//         if(cart.length === 0){
//             checkoutContainerDisplay.innerHTML = `<p>Cart is empty</p>`;
//             return;
//         }

//         cart.forEach(item =>{
//             let itemDiv = document.createElement("div");
//             itemDiv.classList.add('items');
//             itemDiv.innerHTML = `
//                 <p>${item.quantity || 1}x</p>
//                 <p>${item.name}</p>
//                 <p>${convertPrice(item.price)}</p>
//             `;
//             checkoutItems.querySelector('.items-of-checkout').appendChild(itemDiv);
//         });

//         const totalPrice = cart.reduce((sum, item) => {
//             const quantity = item.quantity || 1;
//             const price = parseFloat(item.price);
//             if(isNaN(price)){
//                 console.error(`skipping invalid price for item: ${item.name}. Price value:`, item.price);
//                 return sum;
//             }
//             return sum + (price * quantity);
//         }, 0);

//         let totalContainer = document.querySelector(".total-container");
//         totalContainer.innerHTML = `
//         <div class="total">
//             <h3>Total:</h3>
//             <h2>${convertPrice(totalPrice.toFixed(2))}</h2>
//         </div>
//         `;
//         console.log(cart);

//     }

   
//     function addTip() {
//         let totalDisplay = document.querySelector('.total-container .total h2');
//         let totalValue = parseFloat(totalDisplay.textContent.replace('€','')) || 0;
//         let CustomTipDisplay = document.querySelector('.custom-tip-display .tip-input');

//         let tip10 = (totalValue * 0.10).toFixed(2);
//         let tip15 = (totalValue * 0.15).toFixed(2);
//         let tip20 = (totalValue * 0.20).toFixed(2);

//         let tipDisplay1 = document.querySelector('.amount1')
//         let tipDisplay2 = document.querySelector('.amount2')
//         let tipDisplay3 = document.querySelector('.amount3')

//         if(tipDisplay1){ tipDisplay1.textContent = `${convertPrice(tip10)}`; } 
//         if(tipDisplay2){ tipDisplay2.textContent = `${convertPrice(tip15)}`; }
//         if(tipDisplay3){ tipDisplay3.textContent = `${convertPrice(tip20)}`; }

//         const tipButtons = document.querySelectorAll('.tip-percentages');

//         const removeSelectedClass = () =>{
//             tipButtons.forEach(button => button.classList.remove('selected-tip'));
//         }

//         tipButtons.forEach(button =>{
//             button.addEventListener('click', function (){

//                 removeSelectedClass();
//                 this.classList.add('selected-tip');

//             let tipPercentage = 0;
            
//                 if(this.querySelector('h3')){//takes the percent symbol out of the percentage and uses the number
//                     tipPercentage = parseInt(this.querySelector('h3').textContent.replace('%',''));
//                     CustomTipDisplay.style.display = 'none';
//                 } else if(this.textContent === 'Custom Tip'){
//                     let customTip = parseFloat(prompt('Enter custom tip amount:'));
//                     if(!isNaN(customTip)){
//                         updateTotalWithTip(customTip);
//                         CustomTipDisplay.textContent = `Custom Tip: ${convertPrice(customTip)}`
//                         CustomTipDisplay.style.display = 'block';

//                         localStorage.setItem('customTip', customTip);;
//                         return;
//                     } else{
//                         alert('please enter a valid number');
//                         return;
//                     }
//                 } else if(this.textContent === 'No Tip'){
//                     CustomTipDisplay.style.display = 'none';
//                     localStorage.removeItem('customTip');
//                 }
//                  const tipAmount = totalValue * (tipPercentage/100);
//                  localStorage.setItem('customTip', tipAmount.toFixed(2)); 
//                  updateTotalWithTip(tipAmount);
//             });
//         });
    
//     function updateTotalWithTip(tipAmount){
//         const newTotal = totalValue + tipAmount;
//         totalDisplay.textContent = `${convertPrice(newTotal.toFixed(2))}`;
//     }
// }
    

//     function displayDeliveryCash(){
//         const cart = JSON.parse(localStorage.getItem('cart')) || [];
//         let checkoutItems = document.createElement('div');
//         checkoutItems.classList.add(".payment");
//         const checkoutContainerDisplay = document.querySelector(".payment");
//         checkoutItems.innerHTML = `
//         <div class="checkout">
//             <h2>Items</h2>
//             <div class="checkout-items">
//                 <div class="check-items">
//                     <div class="item-cata"><h3>Quantity</h3><h3>Item</h3><h3>price</h3></div>
//                     <div class="items-of-checkout">   
//                     </div>
//                     <div class="total-container">
//                     </div>
//                     <div class="instructions-pickup-cash"><div class="words-instruction"><div><h3>Delivery Time: ${waitTime()}</h3></div></div></div>
//                 </div>
//             </div>
//         </div>
//         `;
        
//         checkoutContainerDisplay.innerHTML = '';
//         checkoutContainerDisplay.appendChild(checkoutItems);

//         if(checkoutContainerDisplay){
//             checkoutContainerDisplay.innerHTML = ``;
//             checkoutContainerDisplay.appendChild(checkoutItems);
//         }else{
//             console.error("checkoutContainer not found");
//         }

//         if(cart.length === 0){
//             checkoutContainerDisplay.innerHTML = `<p>Cart is empty</p>`;
//             return;
//         }

//         cart.forEach(item =>{
//             let itemDiv = document.createElement("div");
//             itemDiv.classList.add('items');
//             itemDiv.innerHTML = `
//                 <p>${item.quantity || 1}x</p>
//                 <p>${item.name}</p>
//                 <p>${convertPrice(item.price)}</p>
//             `;
//             checkoutItems.querySelector('.items-of-checkout').appendChild(itemDiv);
//         });

//         const totalPrice = cart.reduce((sum, item) => {
//             const quantity = item.quantity || 1;
//             const price = parseFloat(item.price);
//             if(isNaN(price)){
//                 console.error(`skipping invalid price for item: ${item.name}. Price value:`, item.price);
//                 return sum;
//             }
//             return sum + (price * quantity);
//         }, 0);

//         let totalContainer = document.querySelector(".total-container");
//         totalContainer.innerHTML = `
//         <div class="total">
//             <h3>Total:</h3>
//             <h2>${convertPrice(totalPrice.toFixed(2))}</h2>
//         </div>
//         `;
//         console.log(cart);
//     }

//     //////////////////////////////////////////////////////////////////////////////

//     function displayPickUpCashOrder(){
//         const cart = JSON.parse(localStorage.getItem('cart')) || [];
//         let checkoutItems = document.createElement('div');
//         checkoutItems.classList.add(".payment");
//         const checkoutContainerDisplay = document.querySelector(".payment");
//         checkoutItems.innerHTML = `
//         <div class="checkout">
//             <h2>Items</h2>
//             <div class="checkout-items">
//                 <div class="check-items">
//                     <div class="item-cata"><h3>Quantity</h3><h3>Item</h3><h3>price</h3></div>
//                     <div class="items-of-checkout">   
//                     </div>
//                     <div class="total-container">
                    
//                     </div>
//                      <div class="instructions-pickup-cash"><div class="words-instruction"><p>Please provide name of order at register.</p><div><h3>Pickup Time: ${waitTime()}</h3></div></div></div>
//                 </div>
//             </div>
//         </div>
//         `;
        
//         checkoutContainerDisplay.innerHTML = '';
//         checkoutContainerDisplay.appendChild(checkoutItems);

//         if(checkoutContainerDisplay){
//             checkoutContainerDisplay.innerHTML = ``;
//             checkoutContainerDisplay.appendChild(checkoutItems);
//         }else{
//             console.error("checkoutContainer not found");
//         }

//         if(cart.length === 0){
//             checkoutContainerDisplay.innerHTML = `<p>Cart is empty</p>`;
//             return;
//         }

//         cart.forEach(item =>{
//             let itemDiv = document.createElement("div");
//             itemDiv.classList.add('items');
//             itemDiv.innerHTML = `
//                 <p>${item.quantity || 1}x</p>
//                 <p>${item.name}</p>
//                 <p>${convertPrice(item.price)}</p>
//             `;
//             checkoutItems.querySelector('.items-of-checkout').appendChild(itemDiv);
//         });

//         const totalPrice = cart.reduce((sum, item) => {
//             const quantity = item.quantity || 1;
//             const price = parseFloat(item.price);
//             if(isNaN(price)){
//                 console.error(`skipping invalid price for item: ${item.name}. Price value:`, convertPrice(item.price));
//                 return sum;
//             }
//             return sum + (price * quantity);
//         }, 0);

//         let totalContainer = document.querySelector(".total-container");
//         totalContainer.innerHTML = `
//         <div class="total">
//             <h3>Total:</h3>
//             <h2>${convertPrice(totalPrice.toFixed(2))}</h2>
//         </div>
//         `;
//         console.log(cart);

//     }

//     function convertPrice(price){
//         let split = String(price).split('.');
//         let end = split[1] ? String(split[1]).padEnd(2, '0') : '00'
//         if(split[0] == 0){return '0€'}
//         return split[0] + ',' + end + '€'; 
//     }

//     function waitTime(){                                                          //<------------------------------------will be used for all the checkout diplay function delivery and pickup times
//         const startTime = new Date();
//         startTime.setMinutes(startTime.getMinutes() + 35);

//         const endTime = new Date(startTime);
//         endTime.setMinutes(endTime.getMinutes() + 5);

//         function formatTime(date){
//             let h = date.getHours();
//             var m = String(date.getMinutes()).padStart(2,'0');
//             const ampm = h >= 12 ? 'PM' : 'AM';
//             h = h % 12 || 12; // Convert 0 to 12 for 12-hour clock
//             return `${h}:${m} ${ampm}`;
//         }

//         const formattedStartTime = formatTime(startTime);
//         const formattedEndTime = formatTime(endTime);

//         return `${formattedStartTime} - ${formattedEndTime}`
//     }

// });




// added stuff based on tutor's recommendations. have to troubleshoot payment and address forms not showing, and fix css

document.addEventListener("DOMContentLoaded", () => {
    let pickUpButton = document.querySelector(".pick-up");
    let deliveryButton = document.querySelector(".delivery");
    let undoButton = document.querySelector(".undo");
    let paymentOptions = document.getElementById("payment-options");
    let pickUpForm = document.getElementById("pickup-form");
    let deliveryForm = document.getElementById("delivery-form");

    let toggleVisibility = (element, show) => {
        if (show) {
            element.classList.remove("hidden");
        } else {
            element.classList.add("hidden");
        }
    };

    pickUpButton.addEventListener("click", () => {
        pickUpButton.classList.add("selected");
        deliveryButton.classList.remove("selected");
        toggleVisibility(paymentOptions, true);
        toggleVisibility(pickUpForm, false);
        toggleVisibility(deliveryForm, false);
    });

    deliveryButton.addEventListener("click", () => {
        deliveryButton.classList.add("selected");
        pickUpButton.classList.remove("selected");
        toggleVisibility(paymentOptions, true);
        toggleVisibility(pickUpForm, false);
        toggleVisibility(deliveryForm, false);
    });

    paymentOptions.addEventListener("click", (e) => {
        if (e.target.classList.contains("cash")) {
            toggleVisibility(paymentOptions, false);
            if (pickUpButton.classList.contains("selected")) {
                toggleVisibility(pickUpForm, true);
            } else if (deliveryButton.classList.contains("selected")) {
                toggleVisibility(deliveryForm, true);
            }
        }
    });

    undoButton.addEventListener("click", () => {
        toggleVisibility(paymentOptions, false);
        toggleVisibility(pickUpForm, false);
        toggleVisibility(deliveryForm, false);
    });
});