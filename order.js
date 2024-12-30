document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cartItems");
    const totalCostElement = document.getElementById("totalCost");
    const cart = {};

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        Object.keys(cart).forEach(name => {
            const item = cart[name];
            total += item.price * item.quantity;

            const listItem = document.createElement("li");
            listItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                <button class="remove-btn" data-name="${item.name}">❌</button>
            `;
            cartItemsContainer.appendChild(listItem);
        });

        totalCostElement.textContent = total.toFixed(2);
    }

    function addItemToCart(name, price, increment = 1) {
        if (!cart[name]) {
            cart[name] = { name, price, quantity: 0 };
        }
        cart[name].quantity += increment;
        if (cart[name].quantity <= 0) {
            delete cart[name];
        }

        document.getElementById(`quantity-${name}`).textContent = cart[name]?.quantity || 0;
        updateCart();
    }

    document.querySelectorAll(".quantity-btn").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseFloat(document.querySelector(`.pizza-item[data-name="${name}"]`).getAttribute("data-price"));

            if (this.classList.contains("increase")) {
                addItemToCart(name, price, 1);
            } else {
                addItemToCart(name, price, -1);
            }
        });
    });

    cartItemsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-btn")) {
            const name = e.target.getAttribute("data-name");
            delete cart[name];
            document.getElementById(`quantity-${name}`).textContent = 0;
            updateCart();
        }
    });

    document.getElementById("checkoutButton").addEventListener("click", function () {
        if (Object.keys(cart).length > 0) {
            alert("Proceeding to checkout!");
        } else {
            alert("Your cart is empty!");
        }
    });
});

document.getElementById("checkoutButton").addEventListener("click", function () {
    // Create and display the scheduling confirmation modal
    const scheduleMessage = document.createElement("div");
    scheduleMessage.id = "scheduleMessage";
    scheduleMessage.innerHTML = `
        <div class="modal">
            <div class="modal-content">
                <h2>🕒 Schedule Your Order</h2>
                <p>Do you want to schedule your food delivery?</p>
                <div class="modal-buttons">
                    <button class="btn" id="scheduleYes">Yes</button>
                    <button class="btn btn-secondary" id="scheduleNo">No</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(scheduleMessage);

    // Handle "Yes" button click for scheduling
    document.getElementById("scheduleYes").addEventListener("click", function () {
        // Redirect to the schedule page
        window.location.href = "schedule.html";
    });

    // Handle "No" button click for immediate order
    document.getElementById("scheduleNo").addEventListener("click", function () {
        showSuccessMessage("Your order has been placed successfully!");
        document.body.removeChild(scheduleMessage);
    });
});

// Function to display the success message
function showSuccessMessage(message) {
    const successMessage = document.createElement("div");
    successMessage.id = "successMessage";
    successMessage.innerHTML = `
        <div class="modal">
            <div class="modal-content">
                <h2>🎉 Order Successful!</h2>
                <p>${message}</p>
                <button class="btn" id="closeModal">OK</button>
            </div>
        </div>
    `;
    document.body.appendChild(successMessage);

    // Close the success modal
    document.getElementById("closeModal").addEventListener("click", function () {
        document.body.removeChild(successMessage);
    });
}
