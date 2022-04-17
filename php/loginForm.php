<?php

	if(!isset($_SESSION)) 
	{ 
		session_start(); 
	} else {
		// echo $_SESSION['error'];
	}
	// if ((isset($_SESSION['logged']))&&($_SESSION['logged']==true ))
	// 				{
	// 				header('Location:index.html');
	// 				exit();
	// 				}
					
	$strona='index.php';
	
?>

<!DOCTYPE html>
<html lang="pl">
<head>
	<meta charset="utf-8">
	<meta name="Keywords" content="gry, logiczne, gra, słowne, wordle, jakie to słowo"/>
	<meta http-equiv="X-Ua-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="Distribution" content="Global"/>
	<meta name="description" content="Gry słowne, wordle, jakie to słowo"/>
	<meta name="Robots" content="index,follow"/>
		<link rel="stylesheet" href="reset.css" type="text/css"/>
		<link rel="stylesheet" href="logowanie.css" type="text/css"/>
		<link href="http://pl.allfont.net/allfont.css?fonts=broadway-cyrillic" rel="stylesheet" type="text/css"/>


<title>Logowanie</title>
</head>
<body>


<div id="panel">
    <form action="login.php" method="POST">
        <label for="userlogin">Nazwa (login):</label>
        <input type="text" id="userlogin" name="login">
        <label for="passwordlogin">Hasło:</label>
        <input type="password" id="passwordlogin" name="password">
        <div id="lower">
<!--          <input type="checkbox"><label class="check" for="checkbox">Zapamietaj mnie!</label>  -->
            <input type="submit" value="Zaloguj">
					<?php
				echo '<input type="button" value="Powrót" onclick="location.href='.$strona.'">'
					?>
        </div>
	</form>

<?php
	if (isset($_SESSION['error']))   echo $_SESSION['error'];
?>	
</div>
</body>
</html>