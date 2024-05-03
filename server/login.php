<?php
//heavily modified login.php file. README.md has more information on original source
header("Access-Control-Allow-Origin: https://infection-control-alerts.vercel.app");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Check if the actual request method is allowed
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) &&
        in_array($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'], ['POST'])) {
        // Send headers for preflight
        header('Access-Control-Allow-Origin: https://infection-control-alerts.vercel.app');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
    }
    // End preflight and return only headers
    header("HTTP/1.1 204 No Content");
    exit();
}

// POST request: Process login
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $mysqli = require __DIR__ . "/database.php";
    $data = json_decode(file_get_contents("php://input"), true);
    
    $sql = sprintf("SELECT * FROM user WHERE email = '%s'", 
                   $mysqli->real_escape_string($data["email"]));
    $result = $mysqli->query($sql);
    
    if ($result) {
        $user = $result->fetch_assoc();
        if ($user && password_verify($data["password"], $user["password_hash"])) {
            session_start();
            session_regenerate_id();
            $_SESSION["user_id"] = $user["id"];

            setcookie("user_session", session_id(), [
                'expires' => time() + 86400, // 1 day
                'path' => '/',
                'domain' => '.vercel.app', // Ensure this is configured correctly for frontend domain
                'secure' => true,
                'httponly' => true,
                'samesite' => 'None'
            ]);

            echo json_encode(["success" => true]);
            exit;
        }
    }
    
    // Handle invalid login
    echo json_encode(["success" => false, "message" => "Invalid login credentials"]);
    exit;
}

?>
