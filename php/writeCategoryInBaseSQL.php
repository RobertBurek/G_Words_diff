<?php

	$nameBase = $_POST['nameBase'];
	$isWord = $_POST['isWord'];
	$category = $_POST['category'];

	require_once "connect.php";
	
	$connection = @new mysqli($host,$db_user,$db_password,$db_name);
	if ($connection->connect_errno!=0)
	{
		echo "Error: ".$connection->connect_erno." Opis: ".$connection->connect_error;
	}
	else {
		// $resultIsWord = $coni_realnection->query(sprintf( "SELECT COUNT(*) FROM `%s` WHERE `%s`.`Word` = '%s'",
		// 				mysqli_real_escape_string($connection, $nameBase),
		// 				mysqli_real_escape_string($connection, $nameBase),
		// 				mysql_escape_string($connection, $isWord)));

		$resultIsWord = true;

		// $countIsWord = $resultIsWord->fetch_assoc();
		if ($resultIsWord) {
			$res = true;
		} else {
			$res = false;
		}

		echo json_encode(array("res"=>$res, "base"=>$nameBase));
    }
    $connection->close();
?>