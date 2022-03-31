<?php
    // session_start();

    $name_file_new_data = 'wordsCategory.txt';
    $results = [];
    if (file_exists($name_file_new_data)) {
        $fp = fopen($name_file_new_data, "rb");
        while(!feof($fp)) {
            $line = str_replace("\n", "", fgets($fp));
            $line = str_replace("\r", "", $line);
            array_push($results, $line);
        };
        fclose($fp);
        unset($results[count($results)-1]);
        print_r($results);
    }
    else {
      echo 'Nie znaleziono pliku!';
    //   require_once $default_file;
    };

?>


<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Data</title>
    <!-- <link rel="stylesheet" href="style/style.css"> -->
    <!-- <script>document.write('<link rel="stylesheet" href="style/style.css?dev=' + Math.floor(Math.random() * 1000) + '"\>');</script> -->
    <!-- <script>document.write('<link rel="stylesheet" href="style/menu.css?dev=' + Math.floor(Math.random() * 1000) + '"\>');</script> -->

    <script type="text/javascript">
    let new_data = eval('<?php echo json_encode($results);?>');
    console.log(new_data);
    // console.log(words_5L[Math.floor(Math.random()*words_5L.length)]);
    </script>
</head>
<body>
    <div id="center" class="center"> </div>
    <div id="StartGame" class="overlayHidden">
        <a class="buttonStart" href="../php/createData.php"> S T A R T</a>
    </div>

    <!--     php/createData.php -->

    <!-- <script src="js/menu.js"></script> -->
    <!-- <script>document.write('<script src="js/menu.js?dev=' + Math.floor(Math.random() * 1000) + '"\><\/script>');</script> -->
    
</body>
</html>