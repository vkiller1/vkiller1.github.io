<?php 
	$arr = array("lephananhkhoa","lephananhkhoa@gmail.com");
	if(in_array($_POST['username'], $arr)){
		echo json_encode(array('status'=>"1"));
	}else{
		echo json_encode(array('status'=>"0"));
	}
?>