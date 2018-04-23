<?php
$servername = "mysli.oamk.fi";
$username = "t6trso00";
$password = "hikzDFBB";
$database = "opisk_t6trso00";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection error: " . mysqli_connect_errno());
}
?>
