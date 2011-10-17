<?php

$min = htmlspecialchars($_GET['min']);
$max = htmlspecialchars($_GET['max']);
$type = htmlspecialchars($_GET['type']);
//$bin = htmlspecialchars($_GET['bin']);

$fh = fopen("annotations.csv", "r");

//$event = array();
$scale = array();
$count = 0;

while (!feof($fh)) {
    $line = fgetcsv($fh, 1024);
    
    if ($line[0] > $max) {
        break;
    }
    
    if ($line[0] >= $min) {
    
        if ($type == "all") {
            $ids = explode("/", $line[1]);
        
            $data[] = array((int)$line[0], $ids[8], $ids[10]);
        
        } else {
            //print_r($line[1]);
            $ids = explode("/", $line[1]);
            $id = $ids[8];
            
            if (!array_key_exists("$id", $scale)) {
                $scale["$id"] = $count;
                $count++;
            }
            
            $data[] = array((int)$line[0], $scale["$id"]);
        }
    }
    //print_r($event);  
}

$event = array("data" => $data, "ticks" => $scale);

echo json_encode($event);

?>