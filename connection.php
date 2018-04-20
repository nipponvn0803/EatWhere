<?php
$servername = "mysli.oamk.fi";
$username = "t6trso00";
$password = "hikzDFBB";
$database = "opisk_t6trso00";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
