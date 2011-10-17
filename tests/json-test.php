<?php

$min = htmlspecialchars($_GET['min']);
$max = htmlspecialchars($_GET['max']);
$bin = htmlspecialchars($_GET['bin']);

sinx($min, $max, $bin);

function sinx($min, $max, $bin) {
	for ($i = (float) $min; $i <= $max; $i += $bin) {				
      $data['response'][] = array($i, sin($i));			
	}
	
	echo json_encode($data);
}

?>