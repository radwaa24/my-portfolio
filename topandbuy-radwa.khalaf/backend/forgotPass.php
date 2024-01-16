<?php

require 'config/request_config.php';
require 'config/dbconfig.php';

function msg($success, $status, $message, $extra = [])
{
  return array_merge([
    'success' => $success,
    'status' => $status,
    'message' => $message
  ], $extra);
}

$response = [];
$token = bin2hex(random_bytes(16));
$token_hash = hash("sha256", $token);
$expiry = date("Y-m-d H:i.S", time() + 60 * 30); //toke i svalid for 30 mins 


$contentType = $_SERVER['CONTENT_TYPE'];
if ($contentType === 'application/json') {
  $data = json_decode(file_get_contents('php://input')); //Read the POST JSON data and convert it into PHP Object
} else {
  echo 'Unsupported content type';
};

if ($_SERVER["REQUEST_METHOD"] != "POST") {
  $response = msg(0, 404, 'Page Not Found!');
} elseif (
  !isset($data) /* || empty(trim($data->email)) */
) {
  $response =  msg(0, 422, 'Please fill in all Required Fields!');
} else {
  $email = trim($data->email);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $response = msg(0, 422, 'Invalid Email Address!');
} else {
  try {
    // Check if the email exists in the database
    $sql = "SELECT id FROM users WHERE email = :email";
    $stmt1 = $db->prepare($sql);
    $stmt1->bindValue(":email", $email);
    $stmt1->execute();
    $result = $stmt1->fetch(PDO::FETCH_ASSOC);

    if ($result) {
      $query = "UPDATE users
                  SET reset_token_hash = :reset_token_hash,
                      reset_token_expires_at = :reset_token_expires_at
                WHERE email = :email";

      $stmt = $db->prepare($query);
      $stmt->bindValue(':reset_token_hash', $token_hash, PDO::PARAM_STR);
      $stmt->bindValue(':reset_token_expires_at', $expiry, PDO::PARAM_STR);
      $stmt->bindValue(':email', $email, PDO::PARAM_STR);

      if ($stmt->execute()) {
        // Send email to the user with the reset link containing the resetToken
        $row_count = $stmt->rowCount();
        if ($row_count > 0) {
          $mail =  require  "./process-forgot-password/mailer.php";
          $mail->setFrom("topnbuy@gmail.com", "Top and Buy");
          $mail->addAddress($email);
          $mail->Subject = "Top and Buy Password Reset";
          $mail->Body = <<<END
                    
            <h4>Click the link below to reset your password</h4>
            <a href='http://localhost/process-forgot-password/reset-password.php?token=$token'>Reset Password</a>
           
            END;
          try {
            if (!$mail->send());
          } catch (Exception $e) {
            echo "Message could not be sent. Mailer error: {$mail->ErrorInfo}";
          }

          $response = [
            'success' => 1,
            'message' => "Password reset link sent.",
          ];
        } else {
          $response = msg(0, 422, "Error updating reset token.");
        }
      } else {
        $response = msg(0, 422, "Error updating reset token.");
      }
    } else {
      $response = msg(0, 422, 'Email not found.');
    }
  } catch (PDOException $e) {
    $response = msg(0, 500, $e->getMessage());
  };
}
$db = null;
echo json_encode($response);
