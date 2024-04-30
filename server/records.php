<?php
require __DIR__ . "/database.php";
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5175');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
file_put_contents("post_data_log.txt", print_r($_POST, true));


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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

    $sql = "INSERT INTO acknowledged_records (user_id, LabNo, Sex, Age, Collected, Received, Source, Sample, Isolate, Antibiotic1, Name) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $mysqli->prepare($sql);
    if (!$stmt) {
        echo json_encode(['error' => $mysqli->error]);
        exit;
    }

    $stmt->bind_param("issssssssss", $user_id, $labNo, $sex, $age, $collected, $received, $source, $sample, $isolate, $antibiotic1, $name);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(['success' => 'Record added successfully']);
    } else {
        echo json_encode(['error' => 'Failed to add record']);
    }

    $stmt->close();
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Invalid request method']);
}
?>
