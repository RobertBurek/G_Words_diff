<?php

	$nameBase = $_POST['nameBase'];

	require_once "connect.php";
	
	$connection = @new mysqli($host,$db_user,$db_password,$db_name);
	if ($connection->connect_errno!=0)
	{
		echo "Error: ".$connection->connect_erno." Opis: ".$connection->connect_error;
	}
	else {
		// SELECT * FROM `5-letters` WHERE `5-letters`.`Game` = 1;
		// $results = $connection->query(sprintf( "SELECT * FROM '%s' WHERE '%s'.`Game` = 1",
		// 				mysqli_real_escape_string($connection,$nameBase),
		// 				mysqli_real_escape_string($connection,$nameBase)));
		$result = $connection->query(sprintf( "SELECT * FROM `%s` WHERE `%s`.`Word` = '%s'",
		// $result = $connection->query(sprintf( "SELECT * FROM '%s' WHERE '%s'.`Word` = '%s'",
						mysqli_real_escape_string($connection, $nameBase),
						mysqli_real_escape_string($connection, $nameBase),
						// '5-letters',
						// mysqli_real_escape_string($connection,$nameBase),
						mysqli_real_escape_string($connection, 'BANAN')));
		$line = $result->fetch_assoc();
		// echo json_encode($result);
		echo json_encode(array("word"=>$line['Word'], "category"=>$line['Category'], "game"=>$line['Game'], "description"=>$line['Description']));
		// echo json_encode(array("word"=>"Word1", "category"=>"Category1", "game"=>"true", "description"=>"Description1"));
		// echo "BANAN";
    }
    $connection->close();
?>