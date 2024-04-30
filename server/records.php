<?php
// Configuration to handle PHP errors correctly
ini_set('display_errors', 0);  // Turn off displaying errors on the output
error_reporting(E_ALL);        // Report all errors
ini_set('log_errors', 1);      // Enable error logging
ini_set('error_log', '/error_log');  // Set the path where errors should be logged

require __DIR__ . "/database.php";

// Setting up headers for HTTP CORS and content type
header('Access-Control-Allow-Origin: http://localhost:5175');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$response = [];  // Response array to hold the data or errors

// Check for the correct HTTP request method
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitization and setting variables from POST request
    $user_id = isset($_POST['user_id']) ? filter_var($_POST['user_id'], FILTER_SANITIZE_STRING) : null;
    $labNo = isset($_POST['LabNo']) ? filter_var($_POST['LabNo'], FILTER_SANITIZE_STRING) : null;
    $sex = isset($_POST['Sex']) ? filter_var($_POST['Sex'], FILTER_SANITIZE_STRING) : null;
    $age = isset($_POST['Age']) ? filter_var($_POST['Age'], FILTER_SANITIZE_STRING) : null;
    $collected = isset($_POST['Collected']) ? filter_var($_POST['Collected'], FILTER_SANITIZE_STRING) : null;
    $received = isset($_POST['Received']) ? filter_var($_POST['Received'], FILTER_SANITIZE_STRING) : null;
    $source = isset($_POST['Source']) ? filter_var($_POST['Source'], FILTER_SANITIZE_STRING) : null;
    $name = isset($_POST['Name']) ? filter_var($_POST['Name'], FILTER_SANITIZE_STRING) : null;
    $sample = isset($_POST['Sample']) ? filter_var($_POST['Sample'], FILTER_SANITIZE_STRING) : null;
    $isolate = isset($_POST['Isolate']) ? filter_var($_POST['Isolate'], FILTER_SANITIZE_STRING) : null;
    $antibiotic1 = isset($_POST['Antibiotic1']) ? filter_var($_POST['Antibiotic1'], FILTER_SANITIZE_STRING) : null;

    // Prepare the SQL statement for insertion
    $sql = "INSERT INTO acknowledged_records (user_id, LabNo, Sex, Age, Collected, Received, Source, Sample, Isolate, Antibiotic1, Name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $mysqli->prepare($sql);
    if (!$stmt) {
        $response['error'] = 'SQL error: ' . $mysqli->error;
        echo json_encode($response);
        exit;
    }

    // Bind parameters and execute the statement
    $stmt->bind_param("issssssssss", $user_id, $labNo, $sex, $age, $collected, $received, $source, $sample, $isolate, $antibiotic1, $name);
    if (!$stmt->execute()) {
        $response['error'] = 'Execute error: ' . $stmt->error;
        echo json_encode($response);
        exit;
    }

    // If the insert was successful, attempt to delete from results2
    if ($stmt->affected_rows > 0) {
        $deleteStmt = $mysqli->prepare("DELETE FROM results2 WHERE LabNo = ?");
        $deleteStmt->bind_param("s", $labNo);
        $deleteStmt->execute();

        if ($deleteStmt->affected_rows > 0) {
            $response['success'] = 'Record acknowledged and deleted from results2 successfully';
        } else {
            $response['error'] = 'Acknowledgement added but no record deleted from results2';
        }
        $deleteStmt->close();
    } else {
        $response['error'] = 'Failed to add record to acknowledged_records';
    }

    $stmt->close();
} else {
    // Respond with 405 Method Not Allowed if the request is not POST
    http_response_code(405);
    $response['error'] = 'Invalid request method';
}

echo json_encode($response);
exit();
?>

