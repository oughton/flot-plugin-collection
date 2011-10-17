<?php

$min = htmlspecialchars($_GET['min']);
$max = htmlspecialchars($_GET['max']);
//$bin = htmlspecialchars($_GET['bin']);

$fh = fopen("traffic.csv", "r");

//$event = array();

while (!feof($fh)) {
    $line = fgetcsv($fh, 256);
    
    if ($line[0] > $max) {
        break;
    }
    
    if ($line[0] >= $min) {
        $mbits[] = array((int)$line[0], (float)$line[1]);
        $packetcount[] = array((int)$line[0], (float)$line[2]);
    }
    //print_r($event);  
}

$series[] = array("data" => $mbits, "label" => "mbits/min");
$series[] = array("data" => $packetcount, "label" => "packetcount/min");

echo json_encode($series);
?>