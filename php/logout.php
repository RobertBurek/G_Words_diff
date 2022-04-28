<?php

	// session_start();
	// session_unset();
//	header('Location:index.php');
	// header('Location:index.php');

$word = 'figurki';
	$ch = curl_init('https://sjp.pl/'.$word);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);
$document = curl_exec($ch);
$fragment = strstr($document, '<a class="lc"');
$fragment = strstr($fragment, 'currentColor');
// $fragment = strstr($document, 'span>"');
$pocz=strlen($fragment);
// $reszta = strstr($fragment, '<hr style');
$reszta = strstr($fragment, '<table');
// $reszta = strstr($fragment, '"</a');
$kon=strlen($reszta);
$toto = substr($fragment, 0, $pocz-$kon);
// $elementA = explode(">", $fragment);
$cd = substr($toto, 52, 20);
$cd2 = substr($cd, 0, strRpos($cd, '/a')-1);


// echo $document;
curl_close($ch);

// require 'simple_html_dom_utility.php'; 

// $html = str_get_html($document);

// $ret = $html->find('table[summary=oferta]');
// echo $ret;
// echo $fragment;
// echo $cd.'     '.strRpos($cd, '"');
// echo $cd2.'     '.strRpos($cd, '"');
echo $cd2;
// echo $elementA;
?>
