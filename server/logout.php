<?php

session_start();
session_destroy();
setcookie("user_session", "", time() - 3600, '/', '.vercel.app'); // Clear the cookie
header("Location: https://jo435.brighton.domains/ci601/login.php"); // Redirect to login on the frontend
exit;
