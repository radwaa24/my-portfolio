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
    $create_datetime = date("Y-m-d H:i:s");

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response = msg(0, 422, 'Invalid Email Address!');
    } elseif (!preg_match("/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/", $password)) {
        $response = msg(0, 422, 'Password should be minimum eight characters, at least one letter and one number');
    } else {
        try {
            $check_email = $query = "SELECT * FROM users WHERE email = :email";
            $check_stmt = $db->prepare($query);
            $check_stmt->bindValue(':email', $email, PDO::PARAM_STR);
            $check_stmt->execute();

            if ($check_stmt) {
                $row_count = $check_stmt->rowCount();
                if ($row_count > 0) {
                    $response = msg(0, 422, 'This email is already in use');
                } else {
                    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
                    $insert_query = "INSERT INTO users(email, hashed_password, create_datetime) VALUES (?,?,?)";
                    $insert_stmt = $db->prepare($insert_query);
                    $insert_stmt->bindValue(1, $email, PDO::PARAM_STR);
                    $insert_stmt->bindValue(2, $hashed_password, PDO::PARAM_STR);
                    $insert_stmt->bindValue(3, $create_datetime, PDO::PARAM_STR);
                    $insert_stmt->execute();

                    $response = msg(1, 201, 'You have successfully registered.');
                }
            } else {
                $response = msg(0, 500, 'Something went wrong, please try again.');
            }
        } catch (PDOException $e) {
            $response = msg(0, 500, $e->getMessage());
        }
    }
}


echo json_encode($response);
