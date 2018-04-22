<?php

// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Require files
require("connection.php");
require("restaurant.php");

$restaurant = new Restaurant($conn);

// Handle requests
if (isset($_GET['action'])) {

    $action = $_GET['action'];

    if (isset($_GET['restaurant_id']) && $_GET['restaurant_id'] != null) {

        $restaurant_id = $_GET['restaurant_id'];

        if ($action === "details") {
            $restaurant->getRestaurantDetail($restaurant_id);
        } elseif ($action === "review") {
            $restaurant->getReview($restaurant_id);
        } else {
            echo "Please provide correct action";
        }

    } else {
        echo "Please provide restaurant ID";
    }

} else {
    echo "Please provide correct action";
}
