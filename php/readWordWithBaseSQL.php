<?php

	$nameBase = $_POST['nameBase'];

	require_once "connect.php";
	
	$connection = @new mysqli($host,$db_user,$db_password,$db_name);
	if ($connection->connect_errno!=0)
	{
		echo "Error: ".$connection->connect_erno." Opis: ".$connection->connect_error;
	}
	else {
		$resultRandomWord = $connection->query(sprintf( "SELECT * FROM `%s` WHERE `%s`.`Game` = 1 ORDER BY RAND() LIMIT 1",
						mysqli_real_escape_string($connection, $nameBase),
						mysqli_real_escape_string($connection, $nameBase)));
		$resultCountWords = $connection->query(sprintf( "SELECT COUNT(*) FROM `%s` WHERE `%s`.`Game` = 1",
						mysqli_real_escape_string($connection, $nameBase),
						mysqli_real_escape_string($connection, $nameBase)));

		$oneWord = $resultRandomWord->fetch_assoc();
		$countGameWords = $resultCountWords->fetch_assoc();

		echo json_encode(array("word"=>$oneWord['Word'],
								 "category"=>$oneWord['Category'], 
								 "game"=>$oneWord['Game'], 
								 "description"=>$oneWord['Description'],
								"countWords"=>$countGameWords['COUNT(*)']));
    }
    $connection->close();
?>