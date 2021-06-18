 <?php
require_once "dbh.inc.php";
require_once 'functions.inc.php';

$result = sellect_all_task_to_db($conn);
echo json_encode($result);
