<?php
require("connection.php");

header("Content-Type: application/json; charset=UTF-8");
$id = $_GET["id"] + 1;

$db_selected = mysqli_select_db($conn, $database)
  or die ("no database");

// fetch the next restaurant suggestion
$name = "";
$imageUrl = null;
$description = "";
$result = mysqli_query($conn, "SELECT restaurant_id, restaurant_name, image, 
    description FROM Restaurants WHERE restaurant_id = {$id}");
if ($result !== false) {
    $row = $result->fetch_assoc();
    $id = $row["restaurant_id"];
    $name = $row["restaurant_name"];
    $imageUrl = $row["image"];
    $description = $row["description"];
    $result->free();
} else {
    $id = null;
}

// get the average rating of reviews, get user ID and review of last row
$result = mysqli_query($conn, "SELECT user_id, review, rating FROM Reviews 
    WHERE restaurant_id = {$id}");
$ratingSum = 0;
$numOfReviews = 0;
$userId = null;
$review = "";
if ($result !== false) {
    while ($row = $result->fetch_assoc()) {
        $ratingSum += $row["rating"];
        $numOfReviews++;
        $userId = $row["user_id"];
        $review = $row["review"];
    }
    if ($numOfReviews != 0) {
        $rating = $ratingSum / $numOfReviews;
    } else {
        $rating = 0;
    }
    $result->free();
}

// Fetch username
$userName = "";
if ($userId !== null) {
    $result = mysqli_query($conn, "SELECT user_name FROM Users 
        WHERE user_id = {$userId}");
    $row = $result->fetch_assoc();
    $userName = $row["user_name"];
    $result->free();
}

$output = array(
    "id"          => $id,
    "name"        => $name,
    "imageUrl"    => $imageUrl,
    "description" => $description,
    "rating"      => $rating,
    "userName"    => $userName,
    "review"      => $review,
);
echo "handleSuggestion(".json_encode($output).")";