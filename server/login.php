<?php

$is_invalid = false;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    $mysqli = require __DIR__ . "/database.php";
    
    $sql = sprintf("SELECT * FROM user
                    WHERE email = '%s'",
                   $mysqli->real_escape_string($_POST["email"]));
    
    $result = $mysqli->query($sql);
    
    $user = $result->fetch_assoc();
    
    if ($user) {
        
        if (password_verify($_POST["password"], $user["password_hash"])) {
            session_start();
            session_regenerate_id();
            $_SESSION["user_id"] = $user["id"];
        
            // Set a secure cookie with HttpOnly flag
            setcookie("user_session", session_id(), [
                'expires' => time() + 86400, // 1 day for example
                'path' => '/',
                'domain' => '.vercel.app', // Customize or remove domain depending on your setup
                'secure' => true,
                'httponly' => true,
                'samesite' => 'None' // This is important for cross-domain cookies
            ]);
        
            header("Location: https://infection-control-alerts.vercel.app/");
            exit;
        }
        
    
    $is_invalid = true;
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="style2.css">
    <link rel="icon" type="image/png" href="germs.png" />
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body class="login-body">
    <div class="wrapper">
        <form method="post" class="login-form">
            <h1>Login</h1>
            <?php if ($is_invalid): ?>
                <em class="error-message">Invalid login</em>
            <?php endif; ?>

            <div class="input-box">
                <input type="email" name="email" id="email" placeholder="Email"
                       value="<?= htmlspecialchars($_POST["email"] ?? '') ?>">
                <i class='bx bx-envelope icon'></i> <!-- Email Icon -->
            </div>
            
            <div class="input-box">
                <input type="password" name="password" id="password" placeholder="Password">
                <i class='bx bxs-lock-alt icon'></i> <!-- Padlock Icon -->
            </div>
            
            <button type="submit" class="btn">Log in</button>
            <div class="register-link">
                <p>Don't have an account? <a href="signup.html">Register</a></p>
            </div>
        </form>
    </div>
</body>
</html>









