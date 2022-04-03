<?PHP

    $dataCategory = $_POST['content'];

    $name_file = 'tempWordsCategory.js';


    $f=fopen($name_file, "a");
    ftruncate($f, 0);
    fputs($f, $dataCategory);
    fclose($f);

?>