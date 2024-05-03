<?php
// Start the session

// Delete the user session cookie by setting its expiration time to the past
setcookie("user_session", "", time() - 3600, '/');
// Redirect to the landing page after logout
header("Location: https://infection-control-alerts.vercel.app/login.html");
exit;
?>
