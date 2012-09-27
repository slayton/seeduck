<?php

	if(isset($_POST["json"])){
	 
    $json = stripslashes($_POST["json"]);
    $json = json_decode($json);

	$jsonIterator = new RecursiveIteratorIterator(
    	new RecursiveArrayIterator($json, TRUE),
    	RecursiveIteratorIterator::SELF_FIRST);

	$filepath = 'none';
    foreach ($jsonIterator as $key => $val) {
    	$filepath = $val;	    	
    }
   
    $cmd = 'mediainfo "' . $filepath . '"';
    echo $cmd . "<br>";
    exec($cmd, $result);
    foreach ($result as $line)
    	echo $line . '<br>';

	}

 	// $filepath = $output[0]->filepath;

    // Now you can access your php object like so
    // $output[0]->variable-name
 	// $result = array('text' => $filepath);
	// $result = array('text' => $json);
	// echo json_encode($result);
	// echo $result;
	// print_r($result);
?>