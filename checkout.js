// CHECKOUT FUNCTION
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// DOM Elements
const orderSummary = document.getElementById("order-summary");
const orderSubtotal = document.getElementById("order-subtotal");
const orderShipping = document.getElementById("order-shipping");
const orderTotal = document.getElementById("order-total");
const discountCodeInput = document.getElementById("discount-code");
const applyDiscountButton = document.getElementById("apply-discount");
const discountMessage = document.getElementById("discount-message");
const discountRow = document.getElementById("discount-row");
const discountAmount = document.getElementById("discount-amount");

// Constants
const SHIPPING_COST = 10.0;
const DISCOUNT_CODES = {
    WELCOME10: 10, // 10% off
};

// Display cart items in the order summary
function displayCartItems() {
    orderSummary.innerHTML = "";
    cartItems.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        `;
        orderSummary.appendChild(itemElement);
    });
}

// Calculate and update totals
function calculateTotals(discountValue = 0) {
    const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const discountAmountValue = 
        discountValue > 0 && discountValue <= 100 ? (subtotal * discountValue) / 100 : 0;
    const total = subtotal + SHIPPING_COST - discountAmountValue;

    orderSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    orderShipping.textContent = `$${SHIPPING_COST.toFixed(2)}`;
    if (discountAmountValue > 0) {
        discountRow.style.display = "flex";
        discountAmount.textContent = `- $${discountAmountValue.toFixed(2)}`;
    } else {
        discountRow.style.display = "none";
    }
    orderTotal.textContent = `$${total.toFixed(2)}`;
}

// Apply discount code
function applyDiscount() {
    const discountCode = discountCodeInput.value.trim().toUpperCase();
    if (DISCOUNT_CODES.hasOwnProperty(discountCode)) {
        const discountValue = DISCOUNT_CODES[discountCode];
        calculateTotals(discountValue);
        discountMessage.textContent = `Discount "${discountCode}" applied!`;
        discountMessage.style.color = "green";
    } else {
        discountMessage.textContent = "Invalid discount code.";
        discountMessage.style.color = "red";
    }
}

// Event listeners
applyDiscountButton.addEventListener("click", applyDiscount);

// Initialize
displayCartItems();
calculateTotals();


// Fake loading function
function showLoading() {
    const payButton = document.getElementById('pay-button');
    payButton.disabled = true; // Disable the button

    payButton.textContent = "Processing...";

    setTimeout(() => {
        showThankYouScreen();
    }, 1000);
}

function showThankYouScreen() {
    document.querySelector('.checkout-wrapper').style.display = 'none';

    // Show the Thank You screen
    document.getElementById('thank-you-screen').style.display = 'block';

    // Display the order details
    displayOrderDetails();

    // Clear the cart
    localStorage.removeItem('cartItems');
    
}

// Display cart items and total in the thank-you screen
function displayOrderDetails() {
    const orderSummary = document.getElementById('thank-you-summary');
    const totalAmount = document.getElementById('thank-you-total');
    const orderCode = document.getElementById('order-code');

    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    let subtotal = 0;

    // Display cart items
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <span style="padding: 10px; justify-content: space-between;">${item.name} - </span>
            <span> $${item.price}</span>
        `;
        orderSummary.appendChild(itemElement);
    });
}

// Event listener for "Pay Now" button
document.getElementById('pay-button').addEventListener('click', function() {
    showLoading();  // Trigger the fake loading
});

// Event listener for "Back to Home" button
document.getElementById('back-to-home').addEventListener('click', function() {
    window.location.href = 'index.html';
});
