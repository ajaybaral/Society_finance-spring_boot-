<?php
// Establish database connection (replace with your credentials)
$servername = "sql206.infinityfree.com";
$username = "if0_36253564";
$password = "Anita1234Ajay";
$dbname = "if0_36253564_society";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>