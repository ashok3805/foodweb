<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pizza";  // Make sure to replace this with your actual database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $email = $conn->real_escape_string($_POST['email']);
    $enteredPassword = $_POST['password'];

    // Prepare SQL query to retrieve the hashed password
    $stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    // Check if the email exists in the database
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashedPassword);
        $stmt->fetch();

        // Verify the password entered by the user
        if (password_verify($enteredPassword, $hashedPassword)) {
            // Login successful, start session and redirect to the homepage
            session_start();
            $_SESSION['email'] = $email; // Store user email in session
            header("Location: index.html"); // Redirect to index.html
            exit;
        } else {
            echo "<script>alert('Incorrect password!');</script>";
        }
    } else {
        echo "<script>alert('Email not found!');</script>";
    }

    // Close statement
    $stmt->close();
}

$conn->close();
?>
