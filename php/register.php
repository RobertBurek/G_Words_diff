<?php

	if(!isset($_SESSION)) 
	{ 
		session_start(); 
	}

	$nick = $_POST['Nick'];
    $password = $_POST['Password'];

	require_once "connect.php";
	
	$connection = @new mysqli($host,$db_user,$db_password,$db_name);
	if ($connection->connect_errno!=0)
	{
		echo "Error: ".$connection->connect_erno." Opis: ".$connection->connect_error;
	}
	else{
	// $nick = str_replace(' ', '_', $nick);
	// echo $login.' - ';
	// $password=$_POST['password'];
	// echo $password."<br>";

		$nick = htmlentities($nick, ENT_QUOTES, "UTF-8");
		// echo $login;

		$password_hash = password_hash($password,PASSWORD_DEFAULT);
		$userdata = date("Y-m-d H:i:s");

		$connection->query(sprintf( "INSERT INTO `players` (`Nick`, `Password`, `DateStart`, `DateLast`, `ResultTotal`, `NameTable`) VALUES ('%s', '%s', '%s', '%s', '%s', '%s')",
								mysqli_real_escape_string($connection,$nick),
								mysqli_real_escape_string($connection,$password_hash),
								mysqli_real_escape_string($connection,$userdata),
								mysqli_real_escape_string($connection,$userdata),
								mysqli_real_escape_string($connection,'111'),
								mysqli_real_escape_string($connection,$nick.$userdata)));

	
	$connection->close();
	echo json_encode(array("Nick"=>$nick,"date"=>$userdata));
	}
