<?php

	$word = $_POST['word'];
	$category = $_POST['category'];
	$game = $_POST['game'];
	$description = $_POST['description'];

	require_once "connect.php";
	
	$connection = @new mysqli($host,$db_user,$db_password,$db_name);
	if ($connection->connect_errno!=0)
	{
		echo "Error: ".$connection->connect_erno." Opis: ".$connection->connect_error;
	}
	else {
		$connection->query(sprintf( "INSERT INTO `nouns` (`Word`, `Category`, `Game`, `Description`) VALUES ('%s', '%s', '%s', '%s')",
								mysqli_real_escape_string($connection,$word),
								mysqli_real_escape_string($connection,$category),
								mysqli_real_escape_string($connection,$game),
								mysqli_real_escape_string($connection,$description)));
    }
    $connection->close();
?>