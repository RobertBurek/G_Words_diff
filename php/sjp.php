<?php

$word = $_POST['word'];
$category = $_POST['category'];
$game = $_POST['game'];

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
$startFragment = strlen($fragment);

$descriptionWordSJP = delEndText($fragment, '<hr style');
if (strpos($descriptionWordSJP, '<p style="font-weight: bold; margin: 2em 0 1em;">POWIĄZANE HASŁA:</p>')) {
	$descriptionWordSJP = delEndText($fragment, '<p style="font-weight: bold; margin: 2em 0 1em;">POWIĄZANE HASŁA:</p>');
}
if (strpos($descriptionWordSJP, '<p><i>Hasło ze słownika wyrazów obcych</i>')) {
	$descriptionWordSJP = delEndText($fragment, '<p><i>Hasło ze słownika wyrazów obcych</i>');
}
if (strpos($descriptionWordSJP, '<p style="line-height:')) {
	$descriptionWordSJP = delEndText($descriptionWordSJP, '<p style="line-height:');
	$descriptionWordSJP = strstr($descriptionWordSJP, '</span> </p></div>');
	$descriptionWordSJP = substr($descriptionWordSJP, 93,  strlen($descriptionWordSJP) - 93);
$descriptionWordSJP = substr($descriptionWordSJP, 0,  strlen($descriptionWordSJP) - 5);
} else {
	$descriptionWordSJP = strstr($descriptionWordSJP,  '<p style="margin');
	$descriptionWordSJP = substr($descriptionWordSJP, 74,  strlen($descriptionWordSJP) - 74);
	$descriptionWordSJP = substr($descriptionWordSJP, 0,  strlen($descriptionWordSJP) - 5);
}
$restFragment = strstr($fragment, '<table');
$endFragment = strlen($restFragment);
$newFragment = substr($fragment, 0, $startFragment-$endFragment);
$fragmentWordSJP = substr($newFragment, 52, 20);
$wordSJP = substr($fragmentWordSJP, 0, strRpos($fragmentWordSJP, '/a')-1);

echo json_encode(array("word"=>$wordSJP, "category"=>$category, "game"=>$game, "description"=>$descriptionWordSJP));

?>