'use strict'

function register(){
	var user = {};
	user["username"] = $('#reg-username').val();
	user["password"] = $('#reg-password').val();
	user["firstname"] = $('#firstname').val();
	user["lastname"] = $('#lastname').val();
	user["email"] = $('#email').val();
	user["role"] = "User";
	$.ajax({
		type:		'POST',
		url:		'/rest/users',
		data:		JSON.stringify(user),
		success:	function(){
						document.getElementById('register').style.display = 'none';
					},
		error:		function (xhr, ajaxOptions, thrownError,err,textStatus) {
			if (xhr.status === 200){
				document.getElementById('register').style.display = 'none';
			} else {
				
				var stdout = $(form).children('.stdout'); //here stdout is jquery object
				alert (stdout);
				stdout.html("Fatal error generated!!! Please check your code"); 
				//--^---notice missing $ here
				stdout.removeClass('hidden');
				//-----------^----- here notice uppercase `C`
			}
		},
		dataType:	'json',
		contentType:'application/json'
	});
	return false;

}

function login(){
	var user = {};
	user["username"] = $('#username').val();
	user["password"] = $('#password').val();
	$.ajax({
		type:		'POST',
		url:		'/rest/users/signin',
		data:		JSON.stringify(user),
		success:	function(data){
						if (data){
							console.log(data);
							localStorage.setItem('user', JSON.stringify(data));
							window.location='/Dashboard.html';
						} else {
							alert("Wrong username or password");
						}
						
					},
		error:		function (xhr, ajaxOptions, thrownError,err,textStatus) {
            var stdout = $(form).children('.stdout'); //here stdout is jquery object
            alert (stdout);
            stdout.html("Fatal error generated!!! Please check your code"); 
       //--^---notice missing $ here
            stdout.removeClass('hidden');
            //-----------^----- here notice uppercase `C`
		},
		dataType:	'json',
		contentType:'application/json'
	});
	return false;
	
}