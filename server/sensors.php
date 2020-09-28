<?php
error_reporting(E_ALL);

function getresource($id) {
    // run system command
    $cmd = 'sudo ./sensors.py ' . $id;
    $res = shell_exec($cmd);
    return $res;
}

header('Content-Type: application/json');

if(isset($_GET['id'])) {
    // resources IDs
    $ids = array('env', 'rpy');
    // check selected ID
    $idno = array_search($_GET['id'], $ids);
    if($idno === false) {
        echo '[]';
    }
    else {
        $id = $ids[$idno];
        echo getresource($id);
    }
}
else {
    echo '[]';
}
?>
