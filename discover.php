<?php
require("connection.php");

header("Content-Type: application/json; charset=UTF-8");
$id = $_GET["id"];

$db_selected = mysqli_select_db($conn, $database)
  or die ("no database");

$result = mysqli_query($conn, "SELECT restaurant_name, restaurant_id, image, description FROM Restaurants
  WHERE restaurant_id LIKE '%{$query}%'
  OR tag LIKE '%{$query}%'
  OR address LIKE '%{$query}%'");

$conn = new mysqli("myServer", "myUser", "myPassword", "Northwind");
$result = $conn->query("SELECT name FROM ".$obj->table." LIMIT ".$obj->limit);
$outp = array();
$outp = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($outp);