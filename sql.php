<?php
$offset = $_GET['offset']; // beware, no input validation!
$query = "SELECT id, name, inserted, size FROM products
WHERE size = '$offset'";
$result = odbc_exec($conn, $query);
$query = "UPDATE usertable SET pwd='$pwd' WHERE uid='$uid';";
