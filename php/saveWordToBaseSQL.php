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
		if ($connection->query(sprintf( "INSERT INTO `8-letters` (`Word`, `Category`, `Game`, `Description`) VALUES ('%s', '%s', '%s', '%s')",
						mysqli_real_escape_string($connection,$word),
						mysqli_real_escape_string($connection,$category),
						mysqli_real_escape_string($connection,$game),
						mysqli_real_escape_string($connection,$description)))) {
			echo "zapisano do bazy SQL";
		} else {
			$connection->query(sprintf( "INSERT INTO `errors` (`Word`, `Category`, `Game`, `Description`) VALUES ('%s', '%s', '%s', '%s')",
						mysqli_real_escape_string($connection,$word),
						mysqli_real_escape_string($connection,$category),
						mysqli_real_escape_string($connection,$game),
						mysqli_real_escape_string($connection,$description)));
			echo "błąd zapisu do bazy !!!";
		};


		// $connection->query(sprintf( "INSERT INTO `7-letters` (`Word`, `Category`, `Game`, `Description`) VALUES ('%s', '%s', '%s', '%s')",
		// 						mysqli_real_escape_string($connection,$word),
		// 						mysqli_real_escape_string($connection,$category),
		// 						mysqli_real_escape_string($connection,$game),
		// 						mysqli_real_escape_string($connection,$description)));
    }
    $connection->close();
?>