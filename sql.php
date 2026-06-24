<?php
$offset = $_GET['offset']; // beware, no input validation!
$query = "SELECT id, name FROM products ORDER BY name LIMIT 20 OFFSET $offset;";
$result = pg_query($conn, $query);
$query = "SELECT id, name, inserted, size FROM products
WHERE size = '$offset'";
$result = odbc_exec($conn, $query);
$query_opengrep = "UPDATE accounttable SET pwd='$pwd' WHERE uid='$uid' LIMIT 20 OFFSET $offset;";
// That's it, just a comment
$result = odbc_exec($conn, $query_opengrep);

