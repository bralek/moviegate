'use strict'

$(document).ready(function(){
	$("#users-div").hide();
	$("#movie-div").hide();
	$("#user-div").hide();
	var u = JSON.parse(localStorage.getItem('user'));
	if (!u || u["role"] === "User"){
		$('#users').hide();
	}
	populateMovieTable();
});

$(".menu").on('click', 'li', function(){
	$(".menu li a").removeClass('active');
	$(this).addClass('active');
});

function activateUsers(){
	$("#movies-div").hide();
	$("#movie-div").hide();
	$("#user-div").hide();
	$("#users-div").show();
	$("#dashboard").removeClass('active');
	$("#users").addClass('active');
	populateUsersTable();
	
}

function activateDashboard(){
	$("#user-div").hide();
	$("#movie-div").hide();
	$("#users-div").hide();
	$("#movies-div").show();
	$("#dashboard").addClass('active');
	$("#users").removeClass('active');
}

function logout(){
	localStorage.removeItem('user');
	window.location = '/index.html';
}

function saveMovie(){
	var movie = {};
	var u = JSON.parse(localStorage.getItem('user'));
	movie["title"] = $('#title').val();
	movie["category"] = $('#category').val();
	movie["mainActor"] = $('#mainActor').val();
	movie["releaseDate"] = $('#releaseDate').val();
	movie["imageUrl"] = $('#imageUrl').val();
	movie["username"] = u["username"];
	$.ajax({
		type:		'POST',
		url:		'/rest/movies',
		data:		JSON.stringify(movie),
		success:	function(){
						document.getElementById('add-movie').style.display = "none";
						populateMovieTable();
					},
		error:		function (xhr, ajaxOptions, thrownError,err,textStatus) {
			if (xhr.status === 200){
				document.getElementById('add-movie').style.display = "none";
				populateMovieTable();
			} else {
				var stdout = $(document).children('.stdout'); //here stdout is jquery object
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

function populateMovieTable(){
	var movies = {}
	var u = JSON.parse(localStorage.getItem('user'));
	var username = u["username"]
	var url = '/rest/movies/' + username;
	$.ajax({
		type:		'GET',
		url:		url,
		success:	function(data){
						$("#movies-table").empty();
						var tbl = $("<table/>").attr("id","movies-table").attr("class", "table");
						$("#movies-div").append(tbl);
						var thead="<thead><tr><th>Title</th><th>Category</th><th>Main Actor</th>" +
								"<th>Release Date</th><th>Image</th><th></th><th></th></tr></thead>";
						$("#movies-table").append(thead);
						for(var i=0;i<data.length;i++)
					    {
					        var tr="<tr>";
					        var td1="<td>"+data[i]["title"]+"</td>";
					        var td2="<td>"+data[i]["category"]+"</td>";
					        var td3="<td>"+data[i]["mainActor"]+"</td>";
					        var td4="<td>"+data[i]["releaseDate"]+"</td>";
					        var td5="<td><img src=\""+data[i]["imageUrl"]+"\" alt=\"movie image\"></td>";
					        var td6="<td><a href=\"#\" onclick=deleteMovie(\""+ data[i]["id"] + "\",\"" + username + "\")><span class=\"glyphicon glyphicon-trash\"></span></a></td>";
					        var td7="<td><a href=\"#\" onclick=openMovie(\""+ data[i]["id"] + "\",\"" + username + "\")><span class=\"glyphicon glyphicon-pencil\"></span></a></td></tr>";

					       $("#movies-table").append(tr+td1+td2+td3+td4+td5+td6+td7); 

					    }
						var tdSearch1 = "<tr><td><input type=\"text\" class=\"form-control\" id=\"search-title\" placeholder=\"Title\"></td>";
						var tdSearch2 = "<td><input type=\"text\" class=\"form-control\" id=\"search-category\" placeholder=\"Category\"></td>";
						var tdSearch3 = "<td><input type=\"text\" class=\"form-control\" id=\"search-mainActor\" placeholder=\"Main Actor\"></td>";
						var tdSearch4 = "<td><input type=\"date\" class=\"form-control\" id=\"search-releaseDate\" value=\"2017-07-25\"></td>";
						var tdSearch5 = "<td></td>";
						var tdSearch6 = "<td><a href=\"#\" onclick=searchMovies(\""+ $('#search-title').val() + "\",\"" + $('#search-category').val() + "\",\"" + $('#search-mainActor').val() + "\",\"" + $('#search-releaseDate').val() + "\")><span class=\"glyphicon glyphicon-search\"></span></a></td></tr>";
						$("#movies-table").append(tdSearch1 + tdSearch2 + tdSearch3 + tdSearch4 + tdSearch5 + tdSearch6);
						$("#movies-table").show(); 
					},
		error:		function (xhr, ajaxOptions, thrownError,err,textStatus) {
            var stdout = $(document).children('.stdout'); //here stdout is jquery object
            alert (stdout);
            stdout.html("Fatal error generated!!! Please check your code"); 
       //--^---notice missing $ here
            stdout.removeClass('hidden');
            //-----------^----- here notice uppercase `C`
		},
		dataType:	'json',
		contentType:'application/json'
	});
}

function populateUsersTable(){
	$("#add-movie").show();
	var movies = {}
	var url = '/rest/users';
	$.ajax({
		type:		'GET',
		url:		url,
		success:	function(data){
						$("#users-table").empty();
						var tbl = $("<table/>").attr("id","users-table").attr("class", "table");
						$("#users-div").append(tbl);
						var thead="<thead><tr><th>Username</th><th>First Name</th>" +
								"<th>Last Name</th><th>Role</th><th>E-mail</th><th></th></tr></thead>";
						$("#users-table").append(thead);
						for(var i=0;i<data.length;i++)
					    {
					        var tr="<tr>";
					        var td1="<td>"+data[i]["username"]+"</td>";
					        var td2="<td>"+data[i]["firstname"]+"</td>";
					        var td3="<td>"+data[i]["lastname"]+"</td>";
					        var td4="<td>"+data[i]["role"]+"</td>";
					        var td5="<td>"+data[i]["email"]+"</td>";
					        var td6="<td><a href=\"#\" onclick=deleteUser(\""+ data[i]["username"] + "\")><span class=\"glyphicon glyphicon-trash\"></span></a></td>";
					        var td7="<td><a href=\"#\" onclick=openUser(\""+ data[i]["username"] + "\")><span class=\"glyphicon glyphicon-pencil\"></span></a></td></tr>";

					       $("#users-table").append(tr+td1+td2+td3+td4+td5+td6+td7); 
					       $("#users-table").show(); 

					    } 
					},
		error:		function (xhr, ajaxOptions, thrownError,err,textStatus) {
            var stdout = $(document).children('.stdout'); //here stdout is jquery object
            alert (stdout);
            stdout.html("Fatal error generated!!! Please check your code"); 
       //--^---notice missing $ here
            stdout.removeClass('hidden');
            //-----------^----- here notice uppercase `C`
		},
		dataType:	'json',
		contentType:'application/json'
	});
}

function deleteUser(username){
		var url = "/rest/users/" + username;
		$.ajax({
			type:		'DELETE',
			url:		url,
			success:	function(){
							populateUsersTable();
						},
			error:		function (xhr, ajaxOptions, thrownError,err,textStatus) {
	            var stdout = $(document).children('.stdout'); //here stdout is jquery object
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

function deleteMovie(id, username){
	var url = "/rest/movies?id=" + id + "&username=" + username;
	$.ajax({
		type:		'DELETE',
		url:		url,
		success:	function(){
						populateMovieTable();
					},
		error:		function (xhr, ajaxOptions, thrownError,err,textStatus) {
			if(xhr.status === 200){
				populateMovieTable();
			} else {
				var stdout = $(document).children('.stdout'); //here stdout is jquery object
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
function openMovie(id, username){
	$("#movies-table").hide();
	$("#movie-div").show();
	$("#add-movie").hide();
	var url ="/rest/movies?id=" + id + "&username=" + username;
	$.ajax({
		type:		'GET',
		url:		url,
		success:	function(data){
						$("#movie-title").val(data["title"]);
						$("#movie-category").val(data["category"]);
						$("#movie-mainActor").val(data["mainActor"]);
						$("#movie-releaseDate").val(data["releaseDate"]);
						$("#movie-imageUrl").val(data["imageUrl"]);
					},
		error:		function (xhr, ajaxOptions, thrownError,err,textStatus) {
			if(xhr.status === 200){
				$("#movie-title").val(data["title"]);
				$("#movie-category").val(data["category"]);
				$("#movie-mainActor").val(data["mainActor"]);
				$("#movie-releaseDate").val(data["releaseDate"]);
				$("#movie-imageUrl").val(data["imageUrl"]);
			} else {
				var stdout = $(document).children('.stdout'); //here stdout is jquery object
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

function cancelUpdateMovie(){
	$("#movie-div").hide();
	populateMovieTable();
	
}

function updateMovie(){
	var movie = {};
	var user = JSON.parse(localStorage.getItem("user"));
	movie["title"] = $('#movie-title').val();
	movie["category"] = $('#movie-category').val();
	movie["mainActor"] = $('#movie-mainActor').val();
	movie["releaseDate"] = $('#movie-releaseDate').val();
	movie["imageUrl"] = $('#movie-imageUrl').val();
	movie["username"] = user["username"];
	$.ajax({
		type:		'PATCH',
		url:		'/rest/movies',
		data:		JSON.stringify(movie),
		success:	function(){
						$("#movie-div").hide();
						populateMovieTable();
					},
		error:		function (xhr, ajaxOptions, thrownError,err,textStatus) {
			if (xhr.status === 200){
				$("#movie-div").hide();
				populateMovieTable();
			} else {
				var stdout = $(document).children('.stdout'); //here stdout is jquery object
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

function openUser(username){
	$("#users-table").hide();
	$("#user-div").show();
	var url ="/rest/users/" + username;
	$.ajax({
		type:		'GET',
		url:		url,
		success:	function(data){
						$("#user-username").val(data["username"]);
						$("#user-password").val(data["password"]);
						$("#user-firstname").val(data["firstname"]);
						$("#user-lastname").val(data["lastname"]);
						$("#user-email").val(data["email"]);
						$("#user-role select").val(data["role"]);
						
						
					},
		error:		function (xhr, ajaxOptions, thrownError,err,textStatus) {
			if(xhr.status === 200){
				$("#user-username").val(data["username"]);
				$("#user-password").val(data["password"]);
				$("#user-firstname").val(data["firstname"]);
				$("#user-lastname").val(data["lastname"]);
				$("#user-email").val(data["email"]);
				$("#user-role").val(data["role"]);
			} else {
				var stdout = $(document).children('.stdout'); //here stdout is jquery object
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
	
	var u = JSON.parse(localStorage.getItem('user'));
	if (u["role"].toLowerCase() === 'administrator'){
		var movies = {}
		var url = '/rest/movies/' + username;
		$.ajax({
			type:		'GET',
			url:		url,
			success:	function(data){
							$("#user-movies-table").empty();
							var tbl = $("<table/>").attr("id","user-movies-table").attr("class", "table");
							$("#user-div").append(tbl);
							var thead="<thead><tr><th>Username</th><th>First Name</th>" +
							"<th>Last Name</th><th>Role</th><th>E-mail</th><th></th></tr></thead>";
							$("#user-movies-table").append(thead);
							for(var i=0;i<data.length;i++)
						    {
								var tr="<tr>";
						        var td1="<td>"+data[i]["username"]+"</td>";
						        var td2="<td>"+data[i]["firstname"]+"</td>";
						        var td3="<td>"+data[i]["lastname"]+"</td>";
						        var td4="<td>"+data[i]["role"]+"</td>";
						        var td5="<td>"+data[i]["email"]+"</td>";
						        var td5="<td><a href=\"#\" onclick=deleteUser(\""+ data[i]["title"] + "\",\"" + username + "\")><span class=\"glyphicon glyphicon-trash\"></span></a></td>";
						        var td6="<td><a href=\"#\" onclick=openUser(\""+ data[i]["title"] + "\",\"" + username + "\")><span class=\"glyphicon glyphicon-pencil\"></span></a></td></tr>";

						       $("#user-movies-table").append(tr+td1+td2+td3+td4+td5+td6); 
						       $("#user-movies-table").show(); 

						    } 
						},
			error:		function (xhr, ajaxOptions, thrownError,err,textStatus) {
	            var stdout = $(document).children('.stdout'); //here stdout is jquery object
	            alert (stdout);
	            stdout.html("Fatal error generated!!! Please check your code"); 
	       //--^---notice missing $ here
	            stdout.removeClass('hidden');
	            //-----------^----- here notice uppercase `C`
			},
			dataType:	'json',
			contentType:'application/json'
		});
	}
	return false;
}

function cancelUpdateUser(){
	$("#user-div").hide();
	populateUsersTable();
	
}

function updateUser(){
	var user = {};
	user["username"] = $("#user-username").val();
	user["password"] = $("#user-password").val();
	user["firstname"] = $("#user-firstname").val();
	user["lastname"] = $("#user-lastname").val();
	user["email"] = $("#user-email").val();
	user["role"] = $("#user-role").val();
	$.ajax({
		type:		'PATCH',
		url:		'/rest/users',
		data:		JSON.stringify(user),
		success:	function(){
						$("#user-div").hide();
						populateUsersTable();
					},
		error:		function (xhr, ajaxOptions, thrownError,err,textStatus) {
			if (xhr.status === 200){
				$("#user-div").hide();
				populateUsersTable();
			} else {
				var stdout = $(document).children('.stdout'); //here stdout is jquery object
				alert (stdout);
				stdout.html("Fatal error generated!!! Please check your code"); 
				//--^---notice missing $ here
				stdout.removeClass('hidden');
				//-----------^----- here notice uppercase `C`
			}
			
		},
		contentType:'application/json'
	});
	return false;
}

function openAddMovie(){
	$("#add-movie").css('display', 'block');
}

function searchMovies(title, category, mainActor, releaseDate){
	var url = '/rest/movies/search?title=' + title + '&category=' + category + '&mainActor=' + mainActor + '&releaseDate=' + releaseDate;
	$.ajax({
		type:	'GET',
		url:	url,
		success:	function(data){
			$("#movies-table").empty();
			var tbl = $("<table/>").attr("id","movies-table").attr("class", "table");
			$("#movies-div").append(tbl);
			var thead="<thead><tr><th>Title</th><th>Category</th><th>Main Actor</th>" +
					"<th>Release Date</th><th>Image</th><th></th><th></th></tr></thead>";
			$("#movies-table").append(thead);
			for(var i=0;i<data.length;i++)
		    {
		        var tr="<tr>";
		        var td1="<td>"+data[i]["title"]+"</td>";
		        var td2="<td>"+data[i]["category"]+"</td>";
		        var td3="<td>"+data[i]["mainActor"]+"</td>";
		        var td4="<td>"+data[i]["releaseDate"]+"</td>";
		        var td5="<td><img src=\""+data[i]["imageUrl"]+"\" alt=\"movie image\"></td>";
		        var td6="<td><a href=\"#\" onclick=deleteMovie(\""+ data[i]["id"] + "\",\"" + username + "\")><span class=\"glyphicon glyphicon-trash\"></span></a></td>";
		        var td7="<td><a href=\"#\" onclick=openMovie(\""+ data[i]["id"] + "\",\"" + username + "\")><span class=\"glyphicon glyphicon-pencil\"></span></a></td></tr>";

		       $("#movies-table").append(tr+td1+td2+td3+td4+td5+td6+td7); 

		    }
			var tdSearch1 = "<tr><td><input type=\"text\" class=\"form-control\" id=\"search-title\" placeholder=\"Title\"></td>";
			var tdSearch2 = "<td><input type=\"text\" class=\"form-control\" id=\"search-category\" placeholder=\"Category\"></td>";
			var tdSearch3 = "<td><input type=\"text\" class=\"form-control\" id=\"search-mainActor\" placeholder=\"Main Actor\"></td>";
			var tdSearch4 = "<td><input type=\"date\" class=\"form-control\" id=\"search-releaseDate\" value=\"2017-07-25\"></td>";
			var tdSearch5 = "<td></td>";
			var tdSearch6 = "<td><a href=\"#\" onclick=searchMovies(\""+ $('#search-title').val() + "\",\"" + $('#search-category').val() + "\",\"" + $('#search-mainActor').val() + "\",\"" + $('#search-releaseDate').val() + "\")><span class=\"glyphicon glyphicon-search\"></span></a></td></tr>";
			$("#movies-table").append(tdSearch1 + tdSearch2 + tdSearch3 + tdSearch4 + tdSearch5 + tdSearch6);
			$("#movies-table").show(); 
		},
		error:		function (xhr, ajaxOptions, thrownError,err,textStatus) {
		var stdout = $(document).children('.stdout'); //here stdout is jquery object
		alert (stdout);
		stdout.html("Fatal error generated!!! Please check your code"); 
		//--^---notice missing $ here
		stdout.removeClass('hidden');
		//-----------^----- here notice uppercase `C`
		}
	});
	return false;
}