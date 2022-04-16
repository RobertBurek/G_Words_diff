<?php

	session_start();
		if (isset($_GET['strona']))  
		{	$nazwStr=$_GET['strona']; 
			$_SESSION['nazwapliku']=$nazwStr; 
		} else 
				{ 
					if (isset($_SESSION['nazwapliku'])) $nazwStr=$_SESSION['nazwapliku']; else $nazwStr="Index";
				}
	
	$nazwapliku="index.php?strona=".$_SESSION['nazwapliku'];
	session_unset();
//	header('Location:index.php');
	header('Location:'.$nazwapliku);
?>
