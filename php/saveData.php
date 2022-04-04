<?PHP

$category = $_POST['category'];
$game = $_POST['game'];
$word = $_POST['word'];

    $name_file = 'tempNewDataGame.js';
    $results = [];

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
            $newRecord = "{word: '".$word."', category: '".$category."', game: ".$game."},";
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





















    // $dataCategory = $_POST['content'];
    // $name_file = $_POST['level'];

    // $name_file = 'tempWordsCategory.js';


    // $f=fopen($name_file, "a");
    // ftruncate($f, 0);
    // fputs($f, $dataCategory);
    // fclose($f);

?>