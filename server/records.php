<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', '/path_to_error_log');

require __DIR__ . "/database.php";

// Check database connection success
if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Content-Type: application/json');

$response = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $params = [
        'user_id' => filter_var($_POST['user_id'] ?? '', FILTER_SANITIZE_NUMBER_INT),
        'LabNo' => trim(filter_var($_POST['LabNo'] ?? '', FILTER_SANITIZE_STRING)),
        'Sex' => filter_var($_POST['Sex'] ?? '', FILTER_SANITIZE_STRING),
        'Age' => filter_var($_POST['Age'] ?? '', FILTER_SANITIZE_NUMBER_INT), // Assuming age is a number
        'Collected' => filter_var($_POST['Collected'] ?? '', FILTER_SANITIZE_STRING),
        'Received' => filter_var($_POST['Received'] ?? '', FILTER_SANITIZE_STRING),
        'Source' => filter_var($_POST['Source'] ?? '', FILTER_SANITIZE_STRING),
        'Name' => filter_var($_POST['Name'] ?? '', FILTER_SANITIZE_STRING),
        'Sample' => filter_var($_POST['Sample'] ?? '', FILTER_SANITIZE_STRING),
        'Isolate' => filter_var($_POST['Isolate'] ?? '', FILTER_SANITIZE_STRING)
    ];

    for ($i = 1; $i <= 18; $i++) {
        if (isset($_POST["Antibiotic$i"])) {
            $params["Antibiotic$i"] = filter_var($_POST["Antibiotic$i"], FILTER_SANITIZE_STRING);
        }
    }
    

    $columns = implode(', ', array_keys($params));
    $placeholders = implode(', ', array_fill(0, count($params), '?'));
    $sql = "INSERT INTO acknowledged_records ($columns) VALUES ($placeholders)";

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

echo json_encode($response);
exit();
?>
