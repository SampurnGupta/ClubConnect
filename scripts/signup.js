document.getElementById("signupForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    const signupData = {
        name,
        email,
        password,
    };

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Signup successful!");
            window.location.href = "/index";
        } else {
            alert(result.message || "Signup failed.");
        }
    } catch (error) {
        console.error("Error during signup:", error);
        alert("An error occurred. Please try again.");
    }
});
