<?php

if(isset($_POST["json"]))
{
	 
	$json = stripslashes($_POST["json"]);
	$json = json_decode($json);

	$jsonIterator = new RecursiveIteratorIterator(
		new RecursiveArrayIterator($json, TRUE),
		RecursiveIteratorIterator::SELF_FIRST);

	$filepath = 'none';
	foreach ($jsonIterator as $key => $val) {
		$filepath = $val;	    	
	}

	$cmd = 'ffmpeg -i "' . $filepath . '" -vcodec copy -acodec aac -strict experimental -ac 2 "' . $filepath . '.mp4"';
	echo $cmd . "<br>";
//	exec($cmd, $result);
	//foreach ($result as $line)
	echo $line . '<br>';

}
?>


 	<!-- //$cmd = 'ffmpeg -i "' . $fp . '" -vcodec copy -acodec aac -strict experimental -ac 2 ' . $fp . '.N.mkv'; -->
