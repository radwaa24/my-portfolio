<?php
require '../config/dbconfig.php';


$token = $_POST["token"];
$token_hash = hash("sha256", $token);

$query = "SELECT * FROM users
            WHERE reset_token_hash=:reset_token_hash";
$stmt = $db->prepare($query);
$stmt->bindValue(":reset_token_hash", $token_hash, PDO::PARAM_STR);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user === null) {
  die("token not found");
}

if (strtotime($user["reset_token_expires_at"]) <= time()) {
  die("token has expired");
}

if (strlen($_POST["password"]) < 8) {
  die("Password must be at least 8 characters");
}
if (!preg_match("/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/", $_POST["password"])) {
  die("Password should be minimum eight characters, at least one letter and one numberr");
}

if ($_POST["password"] !== $_POST["password_confirmation"]) {
  die("Passwords must match");
}

$password = $_POST["password"];
$hashed_password = password_hash($password, PASSWORD_BCRYPT);

try {
  $sql = "UPDATE users
          SET hashed_password = :password,
              reset_token_hash = NULL,
              reset_token_expires_at = NULL
          WHERE id = :id";

  $stmt1 = $db->prepare($sql);
  $stmt1->bindValue(':password', $hashed_password, PDO::PARAM_STR);
  $stmt1->bindValue(':id', $user["id"], PDO::PARAM_INT);
  $stmt1->execute();
  $successMessage = "Password updated. You can now login.";
  $db = null;
} catch (PDOException $e) {
  $errorMessage = "An error occurred: " . $e->getMessage();
}

?>

<!DOCTYPE html>
<html>

<head>
  <title>Password Reset</title>
</head>

<body>
  <?php if (isset($successMessage)) { ?>
    <p><?php echo $successMessage; ?></p>
    <a href="http://localhost:3000">Go to Login</a>
  <?php } elseif (isset($errorMessage)) { ?>
    <p><?php echo $errorMessage; ?></p>
  <?php } ?>
</body>

</html>