<?php

//Database constants
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'topandbuy');

define('GOOGLE_CLIENT_ID', '3318564811-ul2536gvtp91h9uhb8us77cc5t34dmok.apps.googleusercontent.com');
define('GOOGLE_CLIENT_SECRET', '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');
define('GOOGLE_REDIRECT_URL', 'http://localhost:3000/');




//Database connection config

$host = '127.0.0.1';
$dbName = 'topandbuy';
$username = 'root';
$password = '';


try {
  $db = new PDO("mysql:host=$host;dbname=$dbName", $username, $password);
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  echo 'PDO connection failed: ' . $e->getMessage();
  exit;
}




/*
Since myy PHP files are not located in the default 'htdocs' directory of XAMPP. 
I need to change the 'DocumentRoot' and 'Directory' values in the 'httpd.conf' file of XAMPP.
General APproach: 
1. Locate the Apache configuration file: The configuration file for Apache in XAMPP is typically named httpd.conf and can be found in the conf directory of your XAMPP installation.

2. Open the httpd.conf file in a text editor.

3. Search for the section that starts with <Directory "path/to/htdocs">. This section defines the document root directory.

4. Inside the <Directory> section, you will find a line that specifies the path to the default document root directory, such as DocumentRoot "path/to/htdocs". Note the existing path specified here.

5. Replace the existing path with the path to your desired directory where your PHP files are located. For example, if your PHP files are in a directory named myproject, you would modify the line to DocumentRoot "path/to/myproject".

6. Save the changes to the httpd.conf file.

7. Restart the Apache server in XAMPP for the changes to take effect.

*/