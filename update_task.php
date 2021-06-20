
<?php
if (isset($_POST["task_name"])) {
  $task_name = $_POST["task_name"];
  $task = $_POST["task"];
  require_once "includes/dbh.inc.php";
  require_once 'includes/functions.inc.php';
  update_task($conn, $task,$task_name);


} else {
	header("location: favourites.php");
    exit();
}

