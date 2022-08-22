<?php

	$nick = $_POST['Nick'];
    $password = $_POST['Password'];

	require_once "connect.php";
	
	$connection = @new mysqli($host,$db_user,$db_password,$db_name);
	if ($connection->connect_errno!=0)
	{
		echo "Error: ".$connection->connect_erno." Opis: ".$connection->connect_error;
	}
	else{
		$nick = htmlentities($nick, ENT_QUOTES, "UTF-8");

		if ($result = @$connection->query(sprintf("SELECT * FROM `players` WHERE Nick='%s'",
										mysqli_real_escape_string($connection,$nick))))
			{
				$rows_login = $result->num_rows;
				if ($rows_login>0) 
				{
						$row = $result->fetch_assoc();
						// echo $nick.'   -  istnieje w bazie';

					if (password_verify($password, $row['Password']))
						{
						
						$result->free_result();
						echo json_encode(array("nick" => $row['Nick'], "date" => $row['DateStart'], "nameTable" => $row['NameTable']));

						// echo json_encode(array("nick"=>$row['Nick']));
						}
						else 
						{
							// $_SESSION['error'] = '<span style="color:red">Nieprawidłowy nick lub hasło!</span>';

							echo json_encode(array("result"=>"złe hasło"));
						}
						
				} else {
					
					// $_SESSION['error'] = '<span style="color:red">Nieprawidłowy nick lub hasło!</span>';

					echo json_encode(array("result"=>"nie ma w bazie"));
				}
				
			}
			// header('Location: ../index.php');
	$connection->close();
	// echo json_encode(array("Nick"=>"Kasia","result5"=>"2"));
	}

?>