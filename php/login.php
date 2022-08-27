<?php

$nick = $_POST['Nick'];
$password = $_POST['Password'];

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
	echo "Error: " . $connection->connect_erno . " Opis: " . $connection->connect_error;
} else {
	$nick = htmlentities($nick, ENT_QUOTES, "UTF-8");
	if ($result = @$connection->query(sprintf(
		"SELECT * FROM `players` WHERE Nick='%s'",
		mysqli_real_escape_string($connection, $nick)
	))) {
		$rows_login = $result->num_rows;
		if ($rows_login > 0) {
			$row = $result->fetch_assoc();
			if (password_verify($password, $row['Password'])) {
				$result->free_result();
				echo json_encode(array("nick" => $row['Nick'], "nameTable" => $row['NameTable']));
			} else {
				echo json_encode(array("error" => "Błędne dane do logowania !!!"));
			}
		} else {
			echo json_encode(array("error" => "Błędne dane do logowania !!!"));
		}
	}
	$connection->close();
}
