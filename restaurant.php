<?php
class Restaurant {

    // database connection and table name
    private $conn;
    private $dishes_table_name = "Dishes";
    private $restaurant_table_name = "Restaurants";

    // constructor with $db as database connection
    public function __construct($db) {
        $this->conn = $db;
    }

    public function getMenu($res_id) {
        // Defined query
        $query = "SELECT * FROM ".$this->dishes_table_name.;
        //  $query = "SELECT * FROM Dishes Where restaurantid = 1";
        // Perform queries
        $result = mysqli_query($this->conn, $query);

        if (!$result) {
            var_dump($result);
        }

        // Processing and return results in JSON
        $restaurant_menu = array();
        while($row = mysqli_fetch_assoc($result)) {
            $restaurant_menu[] = $row;
        }
        echo json_encode($restaurant_menu);

        // Close the db connection
        mysqli_close($this->conn);
    }

    public function getAddress($res_id) {
        return "Hello nha hang ".$res_id."\n";
    }
}
