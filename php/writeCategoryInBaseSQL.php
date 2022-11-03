<?php

	$nameBase = $_POST['nameBase'];
	$isWord = $_POST['isWord'];
	$category = $_POST['category'];

	function sendInfoMail($categoryInfo, $longWordInfo, $wordInfo) {
		header("content-type: application/json; charset=utf-8");
		$headers = "MIME-Version: 1.0\r\nContent-type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: 8bit";
		$message_body="Ktoś zagrał w Twoją gierkę: WORDLE\n";
		$message_body.="Kategoria słowa: ".$categoryInfo."\n";
		$message_body.="Level: ".$longWordInfo."\n";
		$message_body.="Słowo: ".$wordInfo."\n\n";
		$message_body.="Pozdrowionka ze stronki JakieToSlowo.pl";
		mail("robertburek@wp.pl","Jakie to słowo - ".$wordInfo ,$message_body ,$headers );
	}
	
	sendInfoMail($category, $nameBase, $isWord);

	require_once "connect.php";
	
	$connection = @new mysqli($host,$db_user,$db_password,$db_name);
	mysqli_set_charset($connection, "utf8");

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

		echo json_encode(array("res"=>$resultUpdateCategory, "nameTable"=>$nameBase));

		$connection->close();
    }
