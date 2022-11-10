<?PHP

            // $f=fopen("wordsCategory.txt", "a");
            // ftruncate($f, 0);
            // fputs($f, "5{word:'BANAN',category:'Roślina',game:true},");
            // fclose($f);


// echo "gsgsgsgrsrgsrdhshsrhsrhdg";

$category = $_POST['category'];
$longWord = $_POST['longWord'];
$word = $_POST['word'];

// $category = $_REQUEST["category"];
// $longWord = $_REQUEST["longWord"];
// $word = $_REQUEST["word"];


function sendInfoMail($categoryInfo, $longWordInfo, $wordInfo) {
    header("content-type: application/json; charset=utf-8");
    $headers = "MIME-Version: 1.0\r\nContent-type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: 8bit";
    $message_body= "Ktoś zagrał w Twoją gierkę: WORDLE\n";
    $message_body.="Kategoria słowa: ".$categoryInfo."\n";
    $message_body.="Level: ".$longWordInfo."\n";
    $message_body.="Słowo: ".$wordInfo."\n\n";
    $message_body.="Pozdrowionka ze stronki GryJS.\n";
    $message_body.="!!! Błąd zapisu KATEGORII w bazie SQL, zapis do pliku !!!";
    mail("robertburek@wp.pl","Jakie to słowo - ".$wordInfo ,$message_body ,$headers );
}

sendInfoMail($category, $longWord, $word);

// print_r($category.' Wysłano !!!'); 
// $message = "wrong answer";
// echo "gsgsgsgrsrgsrdhshsrhsrhdg";


    $name_file = 'wordsCategory.js';
    $results = [];
    // $thisLevel = false;
    // $changePlayer = false;


        if (file_exists($name_file)) {
            $fp = fopen($name_file, "rb");
            while(!feof($fp)) {
            $line = str_replace("\n", "", fgets($fp));
            $line = str_replace("\r", "", $line);
            if ($line <> "") array_push($results, $line);
            }
            fclose($fp);
            unset($results[count($results)-1]);
            echo $results;
            $newRecord = "{word:'".$word."',category:'".$category."',game:true},";
            array_push($results, $newRecord);
            array_push($results, "]");
            foreach ($results as $result) {
                 $tresc = $tresc.$result."\n";
            }
                //  $tresc = $tresc.$result;
            $f=fopen($name_file, "a");
            ftruncate($f, 0);
            fputs($f, $tresc);
            fclose($f);
            // };
        } ;


// if (isset($_POST["choice"])) {
//     switch ($_POST["choice"]) {
//         case "index":
//             // header("Location: http://robertburek.pl/GryJS/MemoryPHP/index.php");
//             header('Location: index.php');
//             break;
//         case "memoryPlay":
//             // header("Location: http://robertburek.pl/GryJS/MemoryPHP/memoryPlay.php");
//             header('Location: memoryPlay.php');
//             break;
//     }
// }


?>