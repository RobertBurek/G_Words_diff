<?PHP

// $category = $_POST['category'];
// $game = $_POST['game'];
// $word = $_POST['word'];

    $data = $_POST['content'];
    $name_file = $_POST['level'];

    // $name_file = 'tempWordsCategory.js';


    $f=fopen($name_file, "a");
    ftruncate($f, 0);
    fputs($f, $data);
    fclose($f);

?>