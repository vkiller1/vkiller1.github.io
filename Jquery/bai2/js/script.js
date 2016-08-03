function getInfo() {
// Fetching values from all input fields and storing them in variables.
	
	email = $("#email1").val();
	$birthday = $("#birthday1").val();
	errorUser = $("#errorUser");
	errorPassword = $("#errorPassword");
	errorEmail = $("#errorEmail");
}
//check validate username
function validateUsername() {
    getInfo();
    var illegalChars = /\W/; // allow letters, numbers, and underscores
    if ($("#username1").val() == "") {
        $("#username1").css('background-color','yellow');
        errorUser.text("You didn't enter a username.\n");
        return false;
    } else if ( $("#username1").val().length < 8 ) {
        	$("#username1").css('background-color','yellow');
        	errorUser.text("Username length min 8 letter.\n");
		return false;
    } else if (illegalChars.test($("#username1").val())) {
        	$("#username1").css('background-color','yellow');
        	errorUser.text("The username contains illegal characters.\n");
		return false;
    } else {		
        $("#username1").css('background-color','white');
	    errorUser.text("");
    }
    return true;
}
//check validate password
function validatePassword() {
    var illegalChars = /\W/; // allow letters, numbers, and underscores
    if ($("#password1").val() == "") {
		 $("#password1").css('background-color','yellow');
         errorPassword.text("You didn't enter password .\n");
        return false;
    } else if (($("#password1").val().length < 7) || ($("#password1").val().length > 15)) {
        $("#password1").css('background-color','yellow');
        errorPassword.text("The password is the wrong length. \n");
        return false;
    } else if ( ($("#password1").val().search(/[a-zA-Z]+/)==-1) || ($("#password1").val().search(/[0-9]+/)==-1) ) {
        $("#password1").css('background-color','yellow');
        errorPassword.text("The password must contain at least one numeral.\n");
        return false;
    } else {
        $("#password1").css('background-color','while');
		errorPassword.text("");
    }
   return true;
}
//check validate email
function validateEmail() {                     // value of field with whitespace trimmed off
    //var temail = $("#email1").html().replace(/^\s+|\s+$/, '');
	var temail = $("#email1").val();
    $("#email1").html(temail);
    //var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/ ;
	var emailFilter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    var illegalChars= /[\(\)\<\>\,\;\:\\\"\[\]]/ ;
    if ($("#email1").val() == "") {
        $("#email1").css('background-color','yellow');
        errorEmail.text("You didn't enter an email address.\n");
	return false;
    } else if (!emailFilter.test(temail)) {              //test email for illegal characters
        $("#email1").css('background-color','yellow');
        errorEmail.text("Please enter a valid email address.\n");
	return false;
    } else if (temail.match(illegalChars)) {
        $("#email1").css('background-color','yellow');
        errorEmail.text("The email address contains illegal characters.\n");
	return false;
    } else {
        $("#email1").css('background-color','while');
        errorEmail.text(" ");
    }
    return true;
}
function submitAjax() {
	var isValidUsername = validateUsername() ;
	var isValidatePassword = validatePassword() ;
	var isValidateEmail =validateEmail() ;
		if(isValidUsername && isValidatePassword && isValidateEmail) {
		  $.ajax({
			 url : "server.php",
			 type : "POST",
			 dataType : "json",
			 data :{
				 username : $('input[name="username"]').val(),
				 password : $('input[name="password"]').val(),
				 email : $('input[name="email"]').val(),
				 birthday : $('input[name="birthday"]').val()
			 },
			 success:function(data){
				 console.log(data);
				 if(data.status == "1"){
					errorUser.text("Username is avaiable \n");
				}else{
					alert(" Register Successfull" );
				}
			 }
		  }); 
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
