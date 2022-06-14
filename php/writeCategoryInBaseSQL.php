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
		$resultUpdateCategory = $connection->query(sprintf( "UPDATE `%s` SET `Category` = '%s' WHERE `%s`.`Word` = '%s';",
						mysqli_real_escape_string($connection, $nameBase),
						mysqli_real_escape_string($connection, $category),
						mysqli_real_escape_string($connection, $nameBase),
						mysqli_real_escape_string($connection, $isWord)));

		// UPDATE `5-letters` SET `Category` = 'ds' WHERE `5-letters`.`Word` = 'ABACE';

		// $resultIsWord = true;

		// $countIsWord = $resultIsWord->fetch_assoc();
		// if ($resultUpdateCategory) {
		if (true) {
			$res = true;
		} else {
			$res = false;
		}

		echo json_encode(array("res"=>$res, "base"=>$nameBase, "result"=>$resultUpdateCategory));
    }
    $connection->close();
?>