<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// match the location coordinates of results2 and location code from locations1
// Existing database connection code
$mysqli = require __DIR__ . "/database.php";

// Query to fetch joined data from the results2 and locations1 tables
$sql = "SELECT r.*, l.* 
        FROM results2 r
        JOIN locations1 l ON TRIM(UPPER(r.`Source`)) = TRIM(UPPER(l.`Source`))";

$result = $mysqli->query($sql);

// Check if the query was successful
if (!$result) {
    die(json_encode(['error' => $mysqli->error])); // Return error message in JSON format
}

// Initialize an array to store the results
$combinedResults = [];

// Fetch each row and add it to the results array
while ($row = $result->fetch_assoc()) {
    $combinedResults[] = $row;
}

// Return the combined results in JSON format
echo json_encode($combinedResults);
?>
