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
	
		if ($result = @$connection->query(sprintf("SELECT * FROM users WHERE Nick='%s'",
																	mysqli_real_escape_string($connection,$nick))))
			{
				$rows_login = $result->num_rows;
				if ($rows_login>0) 
				{
						$row = $result->fetch_assoc();
						// echo $row['Result9'];
						// foreach ($row as $value) {
						// 	echo "$value <br>";
						//   }

						// echo $nick.'   -  istnieje w bazie';

					if (password_verify($password, $row['Password']))
						{
						
									
						$_SESSION['logged']=true;

						// $_SESSION['id'] = $wiersz['id'];
						$_SESSION['nick'] = $row['Nick'];
						// $_SESSION['imie'] = $wiersz['imie'];
						// if ($row['prawa']=="admin") $_SESSION['czyadmin']=true;
						
						unset($_SESSION['error']);
						$result->free_result();
						// header('Location:loginForm.php');
						// echo '<br> jest OK <br>';
						echo json_encode(array("result"=>$row['ResultTotal']));
						}
						else 
						{
							$_SESSION['error'] = '<span style="color:red">Nieprawidłowy nick lub hasło!</span>';
							// header('Location: loginForm.php');
							// echo '<br>złe hasło';
							echo json_encode(array("result"=>"złe hasło"));
						}
						
				} else {
					
					$_SESSION['error'] = '<span style="color:red">Nieprawidłowy nick lub hasło!</span>';
					// header('Location: loginForm.php');
					// echo $nick.'  -  nie ma w bazie!!!';
					echo json_encode(array("result"=>"nie ma w bazie"));
				}
				
			}
	$connection->close();
	// echo json_encode(array("Nick"=>"Kasia","result5"=>"2"));
	}

?>