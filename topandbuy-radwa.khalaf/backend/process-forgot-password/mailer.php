<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

require '../vendor/autoload.php';

//for email configuration
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;




try {
  $mail = new PHPMailer(true); //enabile exceptions
  $mail->SMTPDebug = SMTP::DEBUG_SERVER;
  $mail->isSMTP();
  $mail->SMTPAuth = true;

  //configure SMTP server
  $mail->Host = "smtp.gmail.com";
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port = "587";

  $mail->Username = "noreply.topnbuy@gmail.com"; // Enter your email here
  $mail->Password = "ypwdiqsrgwtioatc"; //Enter your password here
  //Email Settings
  $mail->isHTML(true);

  return $mail;
} catch (Exception $e) {
  echo "Message could not be sent. Mailer error: {$e->getMessage()}";
}
