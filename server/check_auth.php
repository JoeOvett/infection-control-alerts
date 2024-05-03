<?php
session_start();
header("Access-Control-Allow-Origin: https://infection-control-alerts.vercel.app");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
//attempt to authenticate the user. session_start() not supported in brighton.domains
//cookies are not able to be set in brighton.domains
$response = ['isAuthenticated' => isset($_SESSION["user_id"])];
echo json_encode($response);
exit;
?>
