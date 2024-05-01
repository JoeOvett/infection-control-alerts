<?php
require __DIR__ . "/database.php"; // Your existing database connection

// Add these headers to handle CORS
header('Access-Control-Allow-Origin: http://localhost:5173');  // Allow only this origin or use '*' to allow all
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');  // Adjust as necessary
header('Content-Type: application/json');

$sql = "SELECT * FROM acknowledged_records";
$result = $mysqli->query($sql);

$records = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $records[] = $row;
    }
    echo json_encode($records);
} else {
    echo json_encode(['error' => $mysqli->error]);
}
?>
