<?PHP


$category = $_POST['selected-category'];
$longWord = '5-literowe';
$wordInfo = '?????';


function sendInfoMail($category, $longWord, $wordInfo) {
    header("content-type: application/json; charset=utf-8");
    $headers = "MIME-Version: 1.0\r\nContent-type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: 8bit";
    $message_body="Ktoś zagrał w Twoją gierkę: WORDLE\n";
    $message_body.="Wybrana kategoria: ".$category."\n";
    $message_body.="Level: ".$longWord."\n";
    $message_body.="Słowo: ".$wordInfo." s \n\n";
    $message_body.="Pozdrowionka ze stronki GryJS.";
    mail("robertburek@wp.pl","Jakie to słowo - ".$wordInfo ,$message_body ,$headers );
}

// sendInfoMail($category, $longWord, $wordInfo);

print_r($category.' Wysłano !!!'); 

?>