//Toggle search bar
document.getElementById("searchButton").addEventListener("click", function () {
    const searchBar = document.getElementById("searchBar");

    // Toggle the search bar's visibility
    if (!searchBar.classList.contains("active")) {
        searchBar.classList.add("active");
    } else {
        searchBar.classList.remove("active");
    }
});

//Search function (FOR CAMERA)




//Fading carousel effect (FOR TESTIMONIAL)
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