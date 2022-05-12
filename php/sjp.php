<?php

	// session_start();
	// session_unset();
//	header('Location:index.php');
	// header('Location:index.php');

$word = $_POST['word'];
$category = $_POST['category'];
$game = $_POST['game'];
// $description = '';

$contentSJP = curl_init('https://sjp.pl/'.$word);
curl_setopt($contentSJP, CURLOPT_HEADER, 0);
curl_setopt($contentSJP, CURLOPT_CONNECTTIMEOUT, 30);
curl_setopt($contentSJP, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($contentSJP, CURLOPT_HEADER, 0);
$contentPage = curl_exec($contentSJP);
curl_close($contentSJP);

function delEndText($text, $selector) {
	$tempText = strstr($text, $selector);
	return substr($text, 0, strlen($text) - strlen($tempText));
}

$fragment = strstr($contentPage, '<a class="lc"');
$fragment = strstr($fragment, 'currentColor');
// $fragment = strstr($contentPage, 'span>"');
$startFragment=strlen($fragment);

				// $opisKoniec = strstr($fragment, '<hr style');

				// $opisKon=strlen($opisKoniec);
				// $descriptionWordSJP = substr($fragment, 0, $startFragment-$opisKon);

				$descriptionWordSJP = delEndText($fragment, '<hr style');
				// $descriptionWordSJP = strstr($descriptionWordSJP,  '<p style="margin: .5em 0; font: medium/1.4 sans-serif; max-width: 34em; ">');
				// echo $descriptionWordSJP;
				// $descriptionWordSJP = strstr($descriptionWordSJP,  '<p style="margin');

				if (strpos($descriptionWordSJP, '<p style="font-weight: bold; margin: 2em 0 1em;">POWIĄZANE HASŁA:</p>')) {
					$descriptionWordSJP = delEndText($fragment, '<p style="font-weight: bold; margin: 2em 0 1em;">POWIĄZANE HASŁA:</p>');
				}
				if (strpos($descriptionWordSJP, '<p><i>Hasło ze słownika wyrazów obcych</i>')) {
					$descriptionWordSJP = delEndText($fragment, '<p><i>Hasło ze słownika wyrazów obcych</i>');
				}

				if (strpos($descriptionWordSJP, '<p style="line-height:')) {
					$descriptionWordSJP = delEndText($descriptionWordSJP, '<p style="line-height:');
				// $endFragmentdescriptionWordSJP = strstr($descriptionWordSJP,  'style="line-height:');
				// $descriptionWordSJP = substr($descriptionWordSJP, 0, strlen($descriptionWordSJP) - strlen($endFragmentdescriptionWordSJP));
				$descriptionWordSJP = strstr($descriptionWordSJP, '</span> </p></div>');
				$descriptionWordSJP = substr($descriptionWordSJP, 93,  strlen($descriptionWordSJP) - 93);
				$descriptionWordSJP = substr($descriptionWordSJP, 0,  strlen($descriptionWordSJP) - 5);
				} else {
				$descriptionWordSJP = strstr($descriptionWordSJP,  '<p style="margin');
				$descriptionWordSJP = substr($descriptionWordSJP, 74,  strlen($descriptionWordSJP) - 74);
				$descriptionWordSJP = substr($descriptionWordSJP, 0,  strlen($descriptionWordSJP) - 5);
				}
$restFragment = strstr($fragment, '<table');
// $restFragment = strstr($fragment, '"</a');
$endFragment=strlen($restFragment);
$newFragment = substr($fragment, 0, $startFragment-$endFragment);
// $elementA = explode(">", $fragment);
$fragmentWordSJP = substr($newFragment, 52, 20);
$wordSJP = substr($fragmentWordSJP, 0, strRpos($fragmentWordSJP, '/a')-1);


// curl_close($contentSJP);

// require 'simple_html_dom_utility.php'; 

// $html = str_get_html($contentPage);

// $ret = $html->find('table[summary=oferta]');
// echo $ret;
// echo $fragment;
// echo $wordSJP.' ---> '.$descriptionWordSJP;
// $description = $descriptionWordSJP;
// echo $descriptionWordSJP;
// echo $fragmentWordSJP.'     '.strRpos($fragmentWordSJP, '"');
// echo $fragmentWordSJP2.'     '.strRpos($fragmentWordSJP, '"');
// echo $wordSJP;

echo json_encode(array("word"=>$wordSJP, "category"=>$category, "game"=>$game, "description"=>$descriptionWordSJP));
?>
