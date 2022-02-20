<?php
    header("content-type: application/json; charset=utf-8");
    $headers = "MIME-Version: 1.0\r\nContent-type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: 8bit";
    $message_body="Ktoś zagrał w Twoją gierkę: WORDLY\n";
    $message_body.="Był/a to: ".$nameInfo."\n";
    $message_body.="Level: ".$levelInfo."\n";
    $message_body.="Jej/jego wynik: ".$resultInfo." s \n\n";
    $message_body.="Pozdrowionka ze stronki GryJS.";
    mail("robertburek@wp.pl","Jakie to słowo" ,$message_body ,$headers );
    exit;
?>