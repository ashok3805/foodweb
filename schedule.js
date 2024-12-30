document.getElementById("scheduleForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the current time and format it
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleString(); // Formats current date and time as a readable string

    // Display the confirmation message with the current time
    const confirmationDiv = document.getElementById("confirmation");
    const scheduleDetails = document.getElementById("scheduleDetails");

    scheduleDetails.textContent = `Your order is scheduled for ${currentTime}`;
    confirmationDiv.style.display = "block"; // Show the confirmation div
});
