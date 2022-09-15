<?php

$nameBase = $_POST['nameBase'];
$nameTable = $_POST['nameTable'];

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
mysqli_set_charset($connection, "utf8");

if ($connection->connect_errno != 0) {
	echo "Error: " . $connection->connect_erno . " Opis: " . $connection->connect_error;
} else {
	// $resultRandomWord = $connection->query(sprintf(
	// 	"SELECT * FROM `%s` WHERE `%s`.`Game` = 1 ORDER BY RAND() LIMIT 1",
	// 	mysqli_real_escape_string($connection, $nameBase),
	// 	mysqli_real_escape_string($connection, $nameBase)
	// ));
	$resultCountWords = $connection->query(sprintf(
		"SELECT COUNT(*) FROM `%s` WHERE `%s`.`Game` = 1",
		mysqli_real_escape_string($connection, $nameBase),
		mysqli_real_escape_string($connection, $nameBase)
	));
	if ($nameTable != "") {
		$resultRandomWord = $connection->query(sprintf(
			"SELECT * FROM `%s` WHERE `%s`.`Game` = 1 ORDER BY RAND() LIMIT 1",
			mysqli_real_escape_string($connection, $nameBase),
			mysqli_real_escape_string($connection, $nameBase)
		));
	} else {
		$resultRandomWord = $connection->query(sprintf(
			"SELECT * FROM `%s` WHERE `%s`.`Game` = 1 ORDER BY RAND() LIMIT 1",
			mysqli_real_escape_string($connection, $nameBase),
			mysqli_real_escape_string($connection, $nameBase)
		));
	}
	// SELECT * FROM `5-letters` WHERE (`5-letters`.`Game` = 1 AND `5-letters`.`Word` NOT IN (SELECT `robert20220821125115`.`Word` FROM `robert20220821125115`)) ORDER BY RAND() LIMIT 1;


	$oneWord = $resultRandomWord->fetch_assoc();
	$countGameWords = $resultCountWords->fetch_assoc();

	echo json_encode(array(
		"word" => $oneWord['Word'],
		"category" => $oneWord['Category'],
		"game" => $oneWord['Game'],
		"description" => $oneWord['Description'],
		"countWords" => $countGameWords['COUNT(*)']
	));

	$connection->close();
}
