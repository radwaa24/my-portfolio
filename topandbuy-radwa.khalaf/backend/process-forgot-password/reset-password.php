<?php

require '../config/dbconfig.php';

if (isset($_GET['token'])) {
  $token = $_GET['token'];
}
$token_hash = hash("sha256", $token);

$query = "SELECT * FROM topandbuy.users
            WHERE reset_token_hash=:reset_token_hash";
$stmt = $db->prepare($query);
$stmt->bindValue(":reset_token_hash", $token_hash, PDO::PARAM_STR);
$stmt->execute();

// Fetch the result as an associative array
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result === null) {
  die("token not found");
}

if (strtotime($result["reset_token_expires_at"]) <= time()) {
  die("token has expired");
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Reset Password</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
</head>

<body>

  <h1>Reset Password</h1>

  <form method="post" action="process-reset-password.php">

    <input type="hidden" name="token" value="<?= htmlspecialchars($token) ?>">

    <label for="password">New password</label>
    <input type="password" id="password" name="password">

    <label for="password_confirmation">Repeat password</label>
    <input type="password" id="password_confirmation" name="password_confirmation">

    <button>Send</button>
  </form>

</body>

</html>