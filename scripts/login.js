// JavaScript for auto-slideshow
const images = document.querySelectorAll('.image-slider img');
let currentIndex = 0;

function changeImage() {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
}

// Change image every 3 seconds
setInterval(changeImage, 3000);

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const loginData = {
        email,
        password,
    };

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Login successful!");
            window.location.href = "/index";
        } else {
            alert(result.message || "Login failed.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again.");
    }
});
