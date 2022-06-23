<?php

if (!isset($_SESSION)) {
    session_start();
}

$nick = $_POST['Nick'];
$password = $_POST['Password'];

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
    echo "Error: " . $connection->connect_erno . " Opis: " . $connection->connect_error;
} else {
    $nick = htmlentities($nick, ENT_QUOTES, "UTF-8");
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    $userData = date("Y-m-d H:i:s");
    $nameTable = preg_replace('/[ :-]/', '', strtolower($nick) . $userData);

    $connection->query(sprintf(
        "INSERT INTO `players` (`Nick`, `Password`, `DateStart`, `DateLast`, `ResultTotal`, `NameTable`) VALUES ('%s', '%s', '%s', '%s', '%s', '%s');",
        mysqli_real_escape_string($connection, $nick),
        mysqli_real_escape_string($connection, $passwordHash),
        mysqli_real_escape_string($connection, $userData),
        mysqli_real_escape_string($connection, $userData),
        mysqli_real_escape_string($connection, '111'),
        mysqli_real_escape_string($connection, $nameTable)
    ));

    $connection->query(sprintf(
        "CREATE TABLE `jakie_to_slowo`.`%s` (
                                    `Word` text COLLATE utf8_polish_ci NOT NULL,
                                    `Level` int(11) NOT NULL,
                                    `Attempt` int(11) NOT NULL,
                                    `IsCategory` tinyint(1) NOT NULL,
                                    `IsOnlyWord` tinyint(1) NOT NULL,
                                    `Points` int(11) NOT NULL
                                  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;",
        mysqli_real_escape_string($connection, $nameTable)
    ));

    $connection->close();
    echo json_encode(array("nick" => $nick, "date" => $userData, "nameTable" => $nameTable));
}
