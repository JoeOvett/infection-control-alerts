<?php
// SQL query to create the acknowledged_records table
// for each map marker acknowledge the record and delete it from the results2 table
// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Log errors to a file for further investigation
ini_set('log_errors', 1);
ini_set('error_log', '/path_to_error_log');

// Include the database.php connection file
require __DIR__ . "/database.php";

// Define allowed origins for CORS
$allowedOrigins = [
    'http://localhost:5173',  // Development. Change the port number to match your environment
    'https://infection-control-alerts.vercel.app'  // Production
];

// Check if the request origin is allowed for CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 3600'); // Cache preflight requests for 1 hour
}

// Handle OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(); // End the script for OPTIONS requests
}

// Set the content type to JSON
header('Content-Type: application/json');

// Initialize the response array
$response = [];
// the sql query to insert the data into the acknowledged_records table
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $params = [
        'user_id' => filter_var($_POST['user_id'] ?? '', FILTER_SANITIZE_NUMBER_INT),
        'LabNo' => trim(filter_var($_POST['LabNo'] ?? '', FILTER_SANITIZE_STRING)),
        'Sex' => filter_var($_POST['Sex'] ?? '', FILTER_SANITIZE_STRING),
        'Age' => filter_var($_POST['Age'] ?? '', FILTER_SANITIZE_NUMBER_INT), 
        'Collected' => filter_var($_POST['Collected'] ?? '', FILTER_SANITIZE_STRING),
        'Received' => filter_var($_POST['Received'] ?? '', FILTER_SANITIZE_STRING),
        'Source' => filter_var($_POST['Source'] ?? '', FILTER_SANITIZE_STRING),
        'Name' => filter_var($_POST['Name'] ?? '', FILTER_SANITIZE_STRING),
        'Sample' => filter_var($_POST['Sample'] ?? '', FILTER_SANITIZE_STRING),
        'Isolate' => filter_var($_POST['Isolate'] ?? '', FILTER_SANITIZE_STRING)
    ];
// loop through the antibiotics and add them to the params array
    for ($i = 1; $i <= 18; $i++) {
        if (isset($_POST["Antibiotic$i"])) {
            $params["Antibiotic$i"] = filter_var($_POST["Antibiotic$i"], FILTER_SANITIZE_STRING);
        }
    }
    
    // Prepare the insert SQL query
    $columns = implode(', ', array_keys($params));
    $placeholders = implode(', ', array_fill(0, count($params), '?'));
    $sql = "INSERT INTO acknowledged_records ($columns) VALUES ($placeholders)";
    // Prepare the SQL statement
    if ($stmt = $mysqli->prepare($sql)) {
        $types = str_repeat('s', count($params));
        $stmt->bind_param($types, ...array_values($params));
        if ($stmt->execute()) {
            $deleteStmt = $mysqli->prepare("DELETE FROM results2 WHERE TRIM(LabNo) = TRIM(?)");
            if ($deleteStmt) {
                $deleteStmt->bind_param("s", $params['LabNo']);
                $deleteStmt->execute();
                if ($deleteStmt->affected_rows > 0) {
                    $response['success'] = 'Record acknowledged and deleted from results2 successfully';
                } else {
                    $response['error'] = 'No record deleted from results2';
                }
                $deleteStmt->close();
            } else {
                $response['error'] = 'Error preparing delete statement: ' . $mysqli->error;
            }
        } else {
            $response['error'] = 'Execute error: ' . $stmt->error;
        }
        $stmt->close();
    } else {
        $response['error'] = 'SQL error: ' . $mysqli->error;
    }
} else {
    http_response_code(405);
    $response['error'] = 'Invalid request method';
}
// Return the response in JSON format
echo json_encode($response);
exit();
?>
