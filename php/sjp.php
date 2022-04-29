<?php

	// session_start();
	// session_unset();
//	header('Location:index.php');
	// header('Location:index.php');

$word = $_POST['word'];
$category = $_POST['category'];
$game = $_POST['game'];
$description = '';

$ch = curl_init('https://sjp.pl/'.$word);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);
$document = curl_exec($ch);
curl_close($ch);

function delEndText($text, $selector) {
	$tempText = strstr($text, $selector);
	return substr($text, 0, strlen($text) - strlen($tempText));
}

$fragment = strstr($document, '<a class="lc"');
$fragment = strstr($fragment, 'currentColor');
// $fragment = strstr($document, 'span>"');
$pocz=strlen($fragment);

				// $opisKoniec = strstr($fragment, '<hr style');

				// $opisKon=strlen($opisKoniec);
				// $opisWordSJP = substr($fragment, 0, $pocz-$opisKon);

				$opisWordSJP = delEndText($fragment, '<hr style');
				// $opisWordSJP = strstr($opisWordSJP,  '<p style="margin: .5em 0; font: medium/1.4 sans-serif; max-width: 34em; ">');
				// echo $opisWordSJP;
				// $opisWordSJP = strstr($opisWordSJP,  '<p style="margin');

				if (strpos($opisWordSJP, '<p style="font-weight: bold; margin: 2em 0 1em;">POWIĄZANE HASŁA:</p>')) {
					$opisWordSJP = delEndText($fragment, '<p style="font-weight: bold; margin: 2em 0 1em;">POWIĄZANE HASŁA:</p>');
				}
				if (strpos($opisWordSJP, '<p><i>Hasło ze słownika wyrazów obcych</i>')) {
					$opisWordSJP = delEndText($fragment, '<p><i>Hasło ze słownika wyrazów obcych</i>');
				}

				if (strpos($opisWordSJP, '<p style="line-height:')) {
					$opisWordSJP = delEndText($opisWordSJP, '<p style="line-height:');
				// $konOpisWordSJP = strstr($opisWordSJP,  'style="line-height:');
				// $opisWordSJP = substr($opisWordSJP, 0, strlen($opisWordSJP) - strlen($konOpisWordSJP));
				$opisWordSJP = strstr($opisWordSJP, '</span> </p></div>');
				$opisWordSJP = substr($opisWordSJP, 93,  strlen($opisWordSJP) - 93);
				$opisWordSJP = substr($opisWordSJP, 0,  strlen($opisWordSJP) - 5);
				} else {
				$opisWordSJP = strstr($opisWordSJP,  '<p style="margin');
				$opisWordSJP = substr($opisWordSJP, 74,  strlen($opisWordSJP) - 74);
				$opisWordSJP = substr($opisWordSJP, 0,  strlen($opisWordSJP) - 5);
				}
$reszta = strstr($fragment, '<table');
// $reszta = strstr($fragment, '"</a');
$kon=strlen($reszta);
$toto = substr($fragment, 0, $pocz-$kon);
// $elementA = explode(">", $fragment);
$cd = substr($toto, 52, 20);
$wordSJP = substr($cd, 0, strRpos($cd, '/a')-1);


// curl_close($ch);

// require 'simple_html_dom_utility.php'; 

// $html = str_get_html($document);

// $ret = $html->find('table[summary=oferta]');
// echo $ret;
// echo $fragment;
// echo $wordSJP.' ---> '.$opisWordSJP;
$description = $opisWordSJP;
// echo $opisWordSJP;
// echo $cd.'     '.strRpos($cd, '"');
// echo $cd2.'     '.strRpos($cd, '"');
// echo $wordSJP;

echo json_encode(array("word"=>$wordSJP, "category"=>$category, "game"=>$game, "description"=>$description));
?>
