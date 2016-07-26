function checkForm() {
// Fetching values from all input fields and storing them in variables.
	var username = $("#username1").value;
	var password = $("#password1").value;
	var email = $("#email1").value;
	var birthday = $("#birthday1").value;
//Check input Fields Should not be blanks.
	if (username == '' || password == '' || email == '' || birthday == '') {
		alert("Fill All Fields");
	} else {
//Notifying error fields
	var username1 = $("#username").value;
	var password1 = $("#password").value;
	var email1 = $("#email").value;
	var birthday1 = $("#birthday").value;
//Check All Values/Informations Filled by User are Valid Or Not.If All Fields Are invalid Then Generate alert.
	if (username1.innerHTML == 'Must be 3+ letters' || password1.innerHTML == 'Password too short' || email1.innerHTML == 'Invalid email') {
		alert("Fill Valid Information");
	} else { if(username1.innerHTML == null || password1.innerHTML == null || email1.innerHTML == null){
		alert(" Please fill full information");
	}
//Submit Form When All values are valid.
		$("#myForm").submit();
		alert(" Submit Success");
	}
	}
}
// AJAX code to check input field values when onblur event triggerd.
function validate(field, query) {
	var xmlhttp;
	if (window.XMLHttpRequest) { // for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp = new XMLHttpRequest();
	} else { // for IE6, IE5
		xmlhttp = $ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState != 4 && xmlhttp.status == 200) {
			document.getElementById(field).innerHTML = "Validating..";
		} else if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById(field).innerHTML = xmlhttp.responseText;
		} else {
			document.getElementById(field).innerHTML = "Error Occurred. <a href='index.html'>Reload Or Try Again</a> the page.";
		}
	}
	xmlhttp.open("GET", "validation.php?field=" + field + "&query=" + query, false);
	xmlhttp.send();
}