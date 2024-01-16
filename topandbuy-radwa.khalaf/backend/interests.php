<?php


require 'config/request_config.php';
require 'config/dbconfig.php';


$interests = array();

// Fetch categories from the database
$query = "SELECT * FROM interests";
$stmt = $db->prepare($query);
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (count($result) > 0) {
  foreach ($result as $row) {
    $interests[] = $row;
  }
}

// Return JSON response
shuffle($interests); // Shuffle the array to get random interests
echo json_encode($interests);
exit();
