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

		echo json_encode(array("res"=>$resultUpdateCategory, "base"=>$nameBase));
    }
    $connection->close();
?>