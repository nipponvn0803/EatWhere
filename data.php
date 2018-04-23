<?php
  require("connection.php");
  $query = $_GET['query'];


  // Opens a connection to a MySQL server.
  $connection=mysqli_connect ("$servername", $username, $password, $database);
  if (!$connection) {
    die('Not connected : ' . mysqli_error());
  }

  // Sets the active MySQL database.
  $db_selected = mysqli_select_db($connection, $database)
  or die ("no database");

  // Search for restaurant name/addess/tag that match the search query
  $result = mysqli_query($connection, "SELECT restaurant_name, address, image, restaurant_id, rating
    FROM Restaurants
    WHERE restaurant_name LIKE '%{$query}%'
    OR tag LIKE '%{$query}%'
    OR address LIKE '%{$query}%'");

//     $result = mysqli_query($connection, "SELECT restaurant_name, address, image, restaurant_id
//       FROM Restaurants
//       WHERE '%{$query}%' LIKE CONCAT('%',tag,'%')
// ");

    // echo html template for each matching result
    while($row=mysqli_fetch_row($result)){
      // search for all review of that restaurant
      $small_result = mysqli_query($connection,
        "SELECT
          Reviews.review, Reviews.rating, Users.user_name
          FROM Reviews
          LEFT JOIN Users ON Reviews.user_id = Users.user_id
          WHERE Reviews.restaurant_id = '{$row[3]}'");

      echo "<ons-list-item modifier=\"longdivider\" class=\"item\">";
      echo "<div class=\"left\">";
      echo "<img class=\"list-item__thumbnail\" src=\"img/kfc.jpg\">";
      echo "</div>";

      echo "<div class=\"center\">";
      echo "<span class=\"list-item__title\">$row[0]</span>";
      echo "<span class=\"list-item__subtitle\">$row[1]</span>";
      echo "<span class=\"list-item__subtitle\">$row[4]</span>";

      //form submit restaurant id
      echo "<form action=\"restaurant-detail.html\" method=\"GET\">";
      echo "<input type=\"hidden\" value=\"$row[3]\" name=\"restaurant_id\"></input>";
      echo "<input type=\"hidden\" value=\"$row[1]\" name=\"restaurant_address\"></input>";
      echo "<input type=\"hidden\" value=\"$row[0]\" name=\"restaurant_name\"></input>";
      echo "<input type=\"submit\" value=\"Submit\">";
      echo "</form>";
      echo "</div>";
      echo "</ons-list-item>";
    }

  mysqli_close($connection);
 ?>
