<?php
if (!isset($_SESSION)) {
    session_start();
}

$nick = $_POST['Nick'];
$_SESSION['logged'] = false;
echo json_encode(array("nick" => $nick));
?>
