<?php

$nameBase = $_POST['nameBase'];
$isWord = $_POST['isWord'];
$category = $_POST['category'];
$player = $_POST['player'];

function sendInfoMail($categoryInfo, $longWordInfo, $wordInfo, $playerInfo)
{
    header("content-type: application/json; charset=utf-8");
    $headers = "MIME-Version: 1.0\r\nContent-type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: 8bit";
    $message_body = " " . $playerInfo . " zagrał w Twoją gierkę: WORDLE\n";
    $message_body .= "Kategoria słowa: " . $categoryInfo . "\n";
    $message_body .= "Level: " . $longWordInfo . "\n";
    $message_body .= "Słowo: " . $wordInfo . "\n\n";
    $message_body .= "Pozdrowionka ze stronki JakieToSlowo.pl";
    mail("robertburek@wp.pl", "Jakie to słowo - " . $wordInfo, $message_body, $headers);
}

sendInfoMail($category, $nameBase, $isWord, $player);
