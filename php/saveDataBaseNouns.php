<?php

	// if(!isset($_SESSION)) 
	// { 
	// 	session_start(); 
	// }

	// $nick = $_POST['Nick'];
    // $password = $_POST['Password'];

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
	// $nick = str_replace(' ', '_', $nick);
	// echo $login.' - ';
	// $password=$_POST['password'];
	// echo $password."<br>";

		$nick = htmlentities($nick, ENT_QUOTES, "UTF-8");
		// echo $login;

// -------------------------DODAWANIE GRACZA--------------------------------------------------------------
		// $password_hash = password_hash($password,PASSWORD_DEFAULT);
		// $userdata = date("Y-m-d H:i:s");

		// $connection->query(sprintf( "INSERT INTO `users` (`Nick`, `Password`, `DateStart`, `DateLast`, `Result5`, `Result6`, `Result7`, `Result8`, `Result9`) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
		// 						mysqli_real_escape_string($connection,$nick),
		// 						mysqli_real_escape_string($connection,$password_hash),
		// 						mysqli_real_escape_string($connection,$userdata),
		// 						mysqli_real_escape_string($connection,$userdata),
		// 						mysqli_real_escape_string($connection,'1'),
		// 						mysqli_real_escape_string($connection,'2'),
		// 						mysqli_real_escape_string($connection,'3'),
		// 						mysqli_real_escape_string($connection,'4'),
		// 						mysqli_real_escape_string($connection,'5')));

// ---------------------------------------------------------------------------------------
    }
    $connection->close();
?>