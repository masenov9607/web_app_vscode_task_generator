
<?php

if (isset($_POST["task_name"])) {
  $task_name = $_POST["task_name"];

  require_once "includes/dbh.inc.php";
  require_once 'includes/functions.inc.php';

  delete_task($conn, $task_name);


} else {
	header("location: favourites.php");
    exit();
}

