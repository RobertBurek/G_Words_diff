<?php

	$nameBase = $_POST['nameBase'];
	$isWord = $_POST['isWord'];

	// require_once "connect.php";
	
	$connection = @new mysqli($host,$db_user,$db_password,$db_name);
	if ($connection->connect_errno!=0)
	{
		echo "Error: ".$connection->connect_erno." Opis: ".$connection->connect_error;
	}
	else {
		$resultIsWord = $connection->query(sprintf( "SELECT COUNT(*) FROM `%s` WHERE `%s`.`Word` = '%s'",
						mysqli_real_escape_string($connection, $nameBase),
						mysqli_real_escape_string($connection, $nameBase),
						mysqli_real_escape_string($connection, $isWord)));

		$countIsWord = $resultIsWord->fetch_assoc();
		if ($countIsWord['COUNT(*)']>0) {
			$res = true;
		} else {
			$res = false;
		}

		echo json_encode(array("res"=>$res));
    }
    $connection->close();
?>