<?php
header('Access-Control-Allow-Origin: *');  
require("connection.php");

// Start XML file, create parent node

$dom = new DOMDocument("1.0");
$node = $dom->createElement("markers");
$parnode = $dom->appendChild($node);

// Opens a connection to a MySQL server.
$connection=mysqli_connect ("$servername", $username, $password);
if (!$connection) {
  die('Not connected : ' . mysqli_error());
}

// Sets the active MySQL database.
$db_selected = mysqli_select_db($connection, $database)
or die ("no database");

// Select all the rows in the markers table

$query = "SELECT * FROM Restaurants WHERE 1";
$result = mysqli_query($connection,$query);
if (!$result) {
  die('Invalid query: ' . mysqli_error($connection));
}

header("Content-type: text/xml");

// Iterate through the rows, adding XML nodes for each

while ($row = @mysqli_fetch_assoc($result)){
  // Add to XML document node
  $node = $dom->createElement("marker");
  $newnode = $parnode->appendChild($node);
  $newnode->setAttribute("id",$row['restaurant_id']);
  $newnode->setAttribute("name",$row['restaurant_name']);
  $newnode->setAttribute("address", $row['address']);
}

echo $dom->saveXML();

?>
