
<?php

if (isset($_POST["task"]) and isset($_POST["task_name"])) {
  
  $task = $_POST["task"];
  $task_name = $_POST["task_name"];

  require_once "includes/dbh.inc.php";
  require_once 'includes/functions.inc.php';

  submit_task_to_db($conn, $task, $task_name);
  

} else {
	header("location: index.php");
    exit();
}

