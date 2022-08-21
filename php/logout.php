<?php
if (!isset($_SESSION)) {
    session_start();
}

$nick = $_SESSION['nick'];
$_SESSION['logged'] = false;
echo json_encode(array("nick" => $nick));
?>
