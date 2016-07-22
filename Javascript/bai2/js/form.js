// get info by id

function getInfo() {

	userName = document.getElementById("userName");
	passWord = document.getElementById("passWord");
	email = document.getElementById("email");
	inputCalendar = document.getElementById("inputCalendar");
	form_info = document.getElementById("form_info");

	errorUser = document.getElementById("error_user");
	errorPassword = document.getElementById("error_password");
	erroremail = document.getElementById("error_email");
}

//check validate username
	
function validateUsername() {

    getInfo();
    var illegalChars = /\W/; // allow letters, numbers, and underscores
 
    if (userName.value == "") {
        userName.style.background = 'Yellow';
        errorUser.innerHTML = "You didn't enter a username.\n";
        return false;
 
    } else if ((userName.value.length < 3) || (userName.value.length > 15)) {
        	userName.style.background = 'Yellow';
        	errorUser.innerHTML = "Username length min 8 letter.\n";
		return false;
 
    } else if (illegalChars.test(userName.value)) {
        	userName.style.background = 'Yellow';
        	errorUser.innerHTML = "The username contains illegal characters.\n";
		return false;
 
    } else {
        userName.style.background = 'White';
	    errorUser.innerHTML = "";
    }
    return true;
}
//check validate password

function validatePassword() {

    var illegalChars = /\W/; // allow letters, numbers, and underscores
 
    if (passWord.value == "") {
        passWord.style.background = 'Yellow';
        errorPassword.innerHTML = "You didn't enter password .\n";
        return false;
 
    } else if ((passWord.value.length < 7) || (passWord.value.length > 15)) {
        passWord.style.background = 'Yellow';
        errorPassword.innerHTML = "The password is the wrong length. \n";
        return false;
 
    } else if ( (passWord.value.search(/[a-zA-Z]+/)==-1) || (passWord.value.search(/[0-9]+/)==-1) ) {
        passWord.style.background = 'Yellow';
        errorPassword.innerHTML = "The password must contain at least one numeral.\n";
        return false;
 
    } else {
        passWord.style.background = 'White';
	errorPassword.innerHTML = ""
    }
   return true;
}

//check validate email

function trim(s)
{
  return s.replace(/^\s+|\s+$/, '');
} 

function validateEmail() {
    
    var temail = trim(email.value);                        // value of field with whitespace trimmed off
    var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/ ;
    var illegalChars= /[\(\)\<\>\,\;\:\\\"\[\]]/ ;
    
    if (email.value == "") {
        email.style.background = 'Yellow';
        erroremail.innerHTML = "You didn't enter an email address.\n";
	return false;
    } else if (!emailFilter.test(temail)) {              //test email for illegal characters
        email.style.background = 'Yellow';
        erroremail.innerHTML = "Please enter a valid email address.\n";
	return false;
    } else if (email.value.match(illegalChars)) {
        email.style.background = 'Yellow';
        erroremail.innerHTML = "The email address contains illegal characters.\n";
	return false;
    } else {
        email.style.background = 'White';
        erroremail.innerHTML = "";
    }
    return true;
}

function submitAjax() {
	
	var isValidUsername =validateUsername() ;
	var isValidatePassword =validatePassword() ;
	var isValidateEmail =validateEmail() ;

	 if(isValidUsername && isValidatePassword && isValidateEmail) {

		  var http = new XMLHttpRequest();
		  var url = "server.php";
		  
		  //get param save id info
			var params = "username="+userName.value+"&pass="+passWord+"&email="+email.value+"&calendar="+inputCalendar;
			http.open("POST", url, true);

			//Send the proper header information along with the request

			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
			http.setRequestHeader("Content-length", params.length);   
			http.setRequestHeader("Connection", "close");

			http.onreadystatechange = function() {				//Call a function when the state changes.
				if(http.readyState == 4 && http.status == 200) {
					console.log(http.responseText)
					var obj = JSON.parse(http.responseText);
					if(obj.status == "1"){
						errorUser.innerHTML = "Username is avaiable \n";
					}else{
						alert(" Register Successfull" );
					}
				}
			}
		 http.send(params);
	}		
}

// use switch case reset form
function clearForm(oForm) {
    
  var elements = oForm.elements; 
    
  oForm.reset();

  for(i=0; i<elements.length; i++) {
      
	field_type = elements[i].type.toLowerCase();
	
	switch(field_type) {
	
		case "text": 
		case "password": 
		case "textEmail":
	        case "hidden":	
	        case "textBirthDay":			
			elements[i].value = ""; 
			break;
		default: 
			break;
	}
    }
}
