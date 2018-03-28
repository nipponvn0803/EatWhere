<?php
$servername = "sql11.freemysqlhosting.net";
$username = "sql11225682";
$password = "wDzlHbmIW4";
$database = "sql11225682";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
