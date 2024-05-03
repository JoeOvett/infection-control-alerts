<?php
require __DIR__ . "/database.php";
// get the records from the acknowledged_records table
$allowedOrigins = [
    'http://localhost:5173',  // Development
    'https://infection-control-alerts.vercel.app'  // Production
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("HTTP/1.1 403 Access Forbidden");
    exit('Access forbidden');
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
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
