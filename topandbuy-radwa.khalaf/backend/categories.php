<?php

require 'config/request_config.php';
require 'config/dbconfig.php';

$categories = array();

// Fetch categories from the database
$query = "SELECT * FROM interests";
$stmt = $db->prepare($query);
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (count($result) > 0) {
  foreach ($result as $row) {
    $categories[] = $row;
  }
}

// Return JSON response
echo json_encode($categories);
exit();
