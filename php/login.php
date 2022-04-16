<?php

	session_start();

	require_once "connect.php";
	
	$connection = @new mysqli($host,$db_user,$db_haslo,$db_nazwa);
	if ($connection->connect_errno!=0)
	{
		echo "Error: ".$connection->connect_erno." Opis: ".$connection->connect_error;
	}
	else{
	$login = str_replace(' ', '_', $_POST['login']);
	$password=$_POST['password'];

		$login = htmlentities($login, ENT_QUOTES, "UTF-8");

	
		if ($result = @$connection->query(sprintf("SELECT * FROM uzytkownicy WHERE login='%s'",
																	mysqli_real_escape_string($connection,$login))))
			{
				$rows_login = $result->num_rows;
				if ($rows_login>0) 
				{
						$row = $result->fetch_assoc();

					if (password_verify($password, $row['password']))
						{
						
									
						$_SESSION['logged']=true;

						// $_SESSION['id'] = $wiersz['id'];
						$_SESSION['nick'] = $row['nick'];
						// $_SESSION['imie'] = $wiersz['imie'];
						if ($row['prawa']=="admin") $_SESSION['czyadmin']=true;
						
						unset($_SESSION['error']);
						$result->free_result();
					//	header('Location:index.php');
						header('Location:index.php');
						}
						else 
						{
							$_SESSION['error'] = '<span style="color:red">Nieprawidłowy login lub hasło!</span>';
							header('Location:loginForm.php');
						}
						
				} else {
					
					$_SESSION['error'] = '<span style="color:red">Nieprawidłowy login lub hasło!</span>';
					header('Location:loginForm.php');
				}
				
			}
	
	$connection->close();
	}
?>