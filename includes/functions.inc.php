<?php

// Check for empty input signup
function emptyInputSignup($name, $email, $username, $pwd, $pwdRepeat) {
	$result;
	if (empty($name) || empty($email) || empty($username) || empty($pwd) || empty($pwdRepeat)) {
		$result = true;
	}
	else {
		$result = false;
	}
	return $result;
}

// Check invalid username
function invalidUid($username) {
	$result;
	if (!preg_match("/^[a-zA-Z0-9]*$/", $username)) {
		$result = true;
	}
	else {
		$result = false;
	}
	return $result;
}

// Check invalid email
function invalidEmail($email) {
	$result;
	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$result = true;
	}
	else {
		$result = false;
	}
	return $result;
}

// Check if passwords matches
function pwdMatch($pwd, $pwdrepeat) {
	$result;
	if ($pwd !== $pwdrepeat) {
		$result = true;
	}
	else {
		$result = false;
	}
	return $result;
}

// Check if username is in database, if so then return data
function uidExists($conn, $username) {
  $sql = "SELECT * FROM users WHERE usersUid = ? OR usersEmail = ?;";
	$stmt = mysqli_stmt_init($conn);
	if (!mysqli_stmt_prepare($stmt, $sql)) {
	 	header("location: ../signup.php?error=stmtfailed");
		exit();
	}

	mysqli_stmt_bind_param($stmt, "ss", $username, $username);
	mysqli_stmt_execute($stmt);

	// "Get result" returns the results from a prepared statement
	$resultData = mysqli_stmt_get_result($stmt);

	if ($row = mysqli_fetch_assoc($resultData)) {
		return $row;
	}
	else {
		$result = false;
		return $result;
	}

	mysqli_stmt_close($stmt);
}

// Insert new user into database
function createUser($conn, $name, $email, $username, $pwd) {
  $sql = "INSERT INTO users (usersName, usersEmail, usersUid, usersPwd) VALUES (?, ?, ?, ?);";

	$stmt = mysqli_stmt_init($conn);
	if (!mysqli_stmt_prepare($stmt, $sql)) {
	 	header("location: ../signup.php?error=stmtfailed");
		exit();
	}

	$hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

	mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $username, $hashedPwd);
	mysqli_stmt_execute($stmt);
	mysqli_stmt_close($stmt);
	mysqli_close($conn);
	header("location: ../signup.php?error=none");
	exit();
}

// Check for empty input login
function emptyInputLogin($username, $pwd) {
	$result;
	if (empty($username) || empty($pwd)) {
		$result = true;
	}
	else {
		$result = false;
	}
	return $result;
}

// Log user into website
function loginUser($conn, $username, $pwd) {
	$uidExists = uidExists($conn, $username);

	if ($uidExists === false) {
		header("location: ../login.php?error=wronglogin");
		exit();
	}

	$pwdHashed = $uidExists["usersPwd"];
	$checkPwd = password_verify($pwd, $pwdHashed);

	if ($checkPwd === false) {
		header("location: ../login.php?error=wronglogin");
		exit();
	}
	elseif ($checkPwd === true) {
		session_start();
		$_SESSION["userid"] = $uidExists["usersId"];
		$_SESSION["useruid"] = $uidExists["usersUid"];
		header("location: ../index.php?error=none");
		exit();
	}
}


function submit_task_to_db($conn,$task,$task_name)
{
    session_start();
    $sql = "INSERT INTO favourites (user_id,task,task_name) VALUES (?, ?, ?);";

	$stmt = mysqli_stmt_init($conn);
	if (!mysqli_stmt_prepare($stmt, $sql)) {
	 	header("location: ../profile.php?error=stmtfailed");
		exit();
	}
  
	mysqli_stmt_bind_param($stmt, "iss",$_SESSION["userid"] , $task, $task_name);
    
	mysqli_stmt_execute($stmt);
	mysqli_stmt_close($stmt);
	mysqli_close($conn);
	header("location: profile.php?error=none");
	exit();
}

function sellect_all_task_to_db($conn)
{
    session_start();
    $sql = "SELECT task,task_name FROM favourites where user_id = ?;";

	$stmt = mysqli_stmt_init($conn);
	if (!mysqli_stmt_prepare($stmt, $sql))
    {
        return -1;
    }

	mysqli_stmt_bind_param($stmt, "i",$_SESSION["userid"]);
	mysqli_stmt_execute($stmt);
    $tasks = mysqli_stmt_get_result($stmt);
    $result = array();
    $i = 0;
    while ($row = mysqli_fetch_array($tasks,MYSQLI_ASSOC))
     {
      $result["task_$i"] = $row["task"];
      $result["task_name_$i"] = $row["task_name"];
      $i += 1;
     }
	mysqli_stmt_close($stmt);
	mysqli_close($conn);
	return $result;
}

function delete_task($conn,$task_name)
{
    $sql = "DELETE FROM favourites where task_name = ?;";

	$stmt = mysqli_stmt_init($conn);
	if (!mysqli_stmt_prepare($stmt, $sql))
    {
        header("location: ../favourites.php?error=stmtfailed");
    }

	mysqli_stmt_bind_param($stmt, "s",$task_name);
	mysqli_stmt_execute($stmt);
	mysqli_stmt_close($stmt);
	mysqli_close($conn);

    header("Location: favourites.php?error=none");
    exit();
}

function update_task($conn,$task,$task_name)
{
    $sql = "UPDATE favourites SET task=? where task_name = ?;";
	$stmt = mysqli_stmt_init($conn);
	if (!mysqli_stmt_prepare($stmt, $sql))
    {
        header("location: ../favourites.php?error=stmtfailed");
    }

	mysqli_stmt_bind_param($stmt, "ss",$task,$task_name);
	mysqli_stmt_execute($stmt);
	mysqli_stmt_close($stmt);
	mysqli_close($conn);

    header("location: favourites.php?error=none");
    //die();
    exit();
}

function select_by_task_name($conn,$task_name)
{
    $sql = "SELECT task FROM favourites where task_name = ?;";
	$stmt = mysqli_stmt_init($conn);
	if (!mysqli_stmt_prepare($stmt, $sql))
    {
        return -1;
    }

	mysqli_stmt_bind_param($stmt, "s",$task_name);
	mysqli_stmt_execute($stmt);
    $res = mysqli_stmt_get_result($stmt);
    $row = mysqli_fetch_array($res,MYSQLI_ASSOC);
    $task = $row["task"];
    mysqli_stmt_close($stmt);

    return $task;

}

function update_task_by_poping_last_param($conn,$task_name)
{
    $old_task = select_by_task_name($conn,$task_name);
    $odl_task_json = json_decode($old_task);
    array_pop($odl_task_json->args);
    $new_task_json = json_encode($odl_task_json);
    update_task($conn,$new_task_json,$task_name);

}

