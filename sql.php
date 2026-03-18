<?php
$offset = $_GET['offset']; // beware, no input validation!
$queryy = "SELECT id, name FROM products ORDER BY name LIMIT 20 OFFSET $offset;";
$result = pg_query($conn, $queryy);
$query = "SELECT id, name, inserted, size FROM products
WHERE size = '$offset'";
$result = odbc_exec($conn, $query);
$query = "UPDATE usertable SET pwd='$pwd' WHERE uid='$uid';";
