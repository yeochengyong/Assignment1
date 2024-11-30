// TOGGLE SEARCH BAR
document.getElementById("searchButton").addEventListener("click", function () {
    const searchBar = document.getElementById("searchBar");

    // Toggle the search bar's visibility
    if (!searchBar.classList.contains("active")) {
        searchBar.classList.add("active");
    } else {
        searchBar.classList.remove("active");
    }
});



// POP UP (index.html)
function showPopup() {
    const popup = document.getElementById('promo-popup');
  
    // Check if the popup has already been shown in this session
    if (!sessionStorage.getItem('popupDisplayed')) {
      popup.style.display = 'flex'; // Make the popup visible
  
      // smooth fade-in
      setTimeout(() => {
        popup.classList.add('show');
      }, 10);
  
      // Mark the popup as displayed in sessionStorage
      sessionStorage.setItem('popupDisplayed', 'true');
  
      // Close the popup when clicking outside the content
      popup.addEventListener('click', function (e) {
        if (e.target === popup) {
          closePopup();
        }
      });
    }
}
  
  // Function to close the popup
  function closePopup() {
    const popup = document.getElementById('promo-popup');
  
    popup.classList.remove('show');
  
    setTimeout(() => {
      popup.style.display = 'none';
    }, 150);
}
  
// 3 second delay
setTimeout(showPopup, 2500);



// FADING CAROUSEL EFFECT (FOR TESTIMONIAL)
document.addEventListener("DOMContentLoaded", () => {
    const testimonials = document.querySelectorAll(".testimonial");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;

    // Function to show the current testimonial
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.classList.add("active");
                testimonial.classList.remove("exit");
            } else {
                testimonial.classList.remove("active");
                testimonial.classList.add("exit");
            }
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    // automatic carousel transition
    function showNextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    // manual navigation using dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            showTestimonial(currentIndex);
        });
    });

    // rotate every 3 seconds a new testimonial
    setInterval(showNextTestimonial, 3000);
});



// SEARCH FUNCTION







// CART FUNCTION
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Load cart items from localStorage

// Open/close cart
function toggleCart() {
    const cart = document.getElementById("cart-sidebar");
    const overlay = document.getElementById("cart-overlay");

    if (cart.classList.contains("open")) {
        cart.classList.remove("open");
        overlay.style.display = "none";
    } else {
        cart.classList.add("open");
        overlay.style.display = "block";
    }
}

// Close cart when clicking outside
function closeCart(event) {
    const cart = document.getElementById("cart-sidebar"); 
    if (!cart.contains(event.target)) {
        toggleCart();
    }
}

// Update cart
function updateCart() {
    const cartCount = document.getElementById("cart-count");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (cartItems.length > 0) {
        cartCount.style.display = "flex";
        cartCount.textContent = cartItems.length;
    } else {
        cartCount.style.display = "none";
    }

    cartItemsContainer.innerHTML = cartItems.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <button onclick="removeFromCart(${index})">-</button>
        </div>
    `).join("");

    const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2);
    cartTotal.textContent = `Total: $${total}`;

    // Save the updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Add item to cart
function addToCart(name, price) {
    cartItems.push({ name, price });
    updateCart();
}

// Remove item from cart
function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
}

// Checkout redirection
function goToCheckout() {
    if (cartItems.length === 0) {
        // custom modal
        const modal = document.getElementById('empty-cart-modal');
        
        // Display the modal and apply fade-in
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.style.opacity = 1;
            modal.style.visibility = 'visible';
        }, 10); // Slight delay

        // Hide the modal after a short time
        setTimeout(() => {
            modal.style.opacity = 0;
            modal.style.visibility = 'hidden';
        }, 1000); // Fade out after 1.5 seconds

        return;
    }
    window.location.href = "checkout.html";
}

// Attach click listeners to product buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const product = button.closest(".cam-access-item");
        const name = product.getAttribute("data-name");
        const price = parseFloat(product.getAttribute("data-price"));
        addToCart(name, price);
    });
});

// Ensure the cart is loaded correctly on page load
updateCart();