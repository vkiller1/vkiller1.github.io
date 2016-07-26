<?php
$value = $_GET['query'];
$formfield = $_GET['field'];
// Check Valid or Invalid user name when user enters user name in username input field.
if ($formfield == "username") {
	if (strlen($value) < 4) {
		echo "Must be 3+ letters";
	}else {
		echo "<span>Valid</span>";
	}
}
// Check Valid or Invalid password when user enters password in password input field.
if ($formfield == "password") {
	if (strlen($value) < 6) {
		echo "Password too short";
	} else if(!preg_match("/\W/",$value)){
		echo "Invalid";
	} else echo "<span>Strong</span>";
}
// Check Valid or Invalid email when user enters email in email input field.
if ($formfield == "email") {
	if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $value)) {
		echo "The email address contains illegal characters.";
	} else {
		echo "<span>Valid</span>";
	}
}
?>