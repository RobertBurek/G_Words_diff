<?php

$nameTable = $_POST['nameTable'];
// $word = $_POST['word'];
// $level = $_POST['level'];
// $attempt = $_POST['attempt'];
// $isCategory = ($_POST['isCategory'] == "true") ? '1': '0';
// $isOnlyWord = ($_POST['isOnlyWord'] == "true") ? '1': '0';
// $points = $_POST['points'];

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
    echo "Error: " . $connection->connect_erno . " Opis: " . $connection->connect_error;
} else {
    $results = array();
    for($i = 5; $i < 10; $i++) {
        $resultLevel = $connection->query(sprintf(
            "SELECT COUNT(*) FROM `%s` WHERE `%s`.`Level` = '%s';",
            mysqli_real_escape_string($connection, $nameTable),
            mysqli_real_escape_string($connection, $nameTable),
            mysqli_real_escape_string($connection, $i)
        ));
        $countLevel = $resultLevel->fetch_assoc();
        $results[$i]($countLevel['COUNT(*)']);
    };
    echo json_encode(array(
        "result5" => $results[5],
        "result6" => $results[6],
        "result7" => $results[7],
        "result8" => $results[8],
        "result9" => $results[9],
         "error" => 'Wyniki gracza !!!'));

    $connection->close();
}