<?php
session_start(); //START THE SESSION

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

$contentType = $_SERVER['CONTENT_TYPE'];
if ($contentType === 'application/json') {
  $data = json_decode(file_get_contents('php://input')); //Read the POST JSON data and convert it into PHP Object
} else {
  echo 'Unsupported content type';
};

if ($_SERVER["REQUEST_METHOD"] != "POST") {
  $response = msg(0, 404, 'Page Not Found!');
} elseif (
  !isset($data->email)
  || !isset($data->password)
  || empty(trim($data->email))
  || empty(trim($data->password))
) {
  $fields = ['fields' => ['email', 'password']];
  $response =  msg(0, 422, 'Please Fill in all Required Fields!', $fields);
} else {
  $email = trim($data->email);
  $password = trim($data->password);

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response = msg(0, 422, 'Invalid Email Address! Please try again.');
  } else {
    try {
      $query = "SELECT * FROM users WHERE email = :email";
      $stmt = $db->prepare($query);
      $stmt->bindValue(':email', $email, PDO::PARAM_STR);
      $stmt->execute();

      if ($stmt) {
        $row_count = $stmt->rowCount();
        if ($row_count > 0) {
          $user = $stmt->fetch(PDO::FETCH_ASSOC);

          if (password_verify($password, $user['hashed_password'])) {



            $_SESSION['logged_in'] = true;
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['login_time'] = time();

            // Generate and store a unique session token
            $session_token = bin2hex(random_bytes(32));
            $_SESSION['session_token'] = $session_token;

            // Return the session token to the client
            // echo json_encode(['session_token' => $session_token]);

            $response = [
              'success' => 1,
              'message' => 'You have successfully logged in.',
              'user_id' => $user['id'],
              'email' => $user['email'],
              'session_token' => $session_token,
            ];
          } else {
            $response = msg(0, 422, 'Incorrect Password! Please try again.');
          }
        } else {
          $response = msg(0, 422, 'User not found! Please try again.');
        }
      } else {
        $response = msg(0, 422, 'User not found! Please try again.');
      }
    } catch (PDOException $e) {
      $response = msg(0, 500, $e->getMessage());
    }
  }
}
echo json_encode($response);
