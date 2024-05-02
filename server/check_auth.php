<?php
session_start();
error_log("Session ID: " . session_id());  // Log session ID to error log for debugging

$allowedOrigins = ['https://infection-control-alerts.vercel.app', 'http://localhost:5174'];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Debugging: Log session variables
error_log("Session Variables: " . print_r($_SESSION, true));

// Check if user session exists and return JSON response
$response = [
    'isAuthenticated' => isset($_SESSION["user_id"])
];

echo json_encode($response);
?>
