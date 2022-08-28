<?php

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

    if ($connection->query(sprintf(
        "INSERT INTO `players` (`Nick`, `Password`, `DateStart`, `DateLast`, `ResultTotal`, `NameTable`) VALUES ('%s', '%s', '%s', '%s', '%s', '%s');",
        mysqli_real_escape_string($connection, $nick),
        mysqli_real_escape_string($connection, $passwordHash),
        mysqli_real_escape_string($connection, $userData),
        mysqli_real_escape_string($connection, $userData),
        mysqli_real_escape_string($connection, '0'),
        mysqli_real_escape_string($connection, $nameTable)
    ))) {
        $connection->query(sprintf(
            "CREATE TABLE `%s`.`%s` (
                                    `Word` text COLLATE utf8_polish_ci NOT NULL,
                                    `Level` int(11) NOT NULL,
                                    `Attempt` int(11) NOT NULL,
                                    `IsCategory` tinyint(1) NOT NULL,
                                    `IsOnlyWord` tinyint(1) NOT NULL,
                                    `Points` int(11) NOT NULL
                                  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;",
            mysqli_real_escape_string($connection, $db_name),
            mysqli_real_escape_string($connection, $nameTable)
        ));
        echo json_encode(array("nick" => $nick, "nameTable" => $nameTable));
    } else {
        echo json_encode(array("nick" => $nick, "error" => 'Istnieje już taki LOGIN !!!'));
    }
    $connection->close();
}
