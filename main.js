var newUser = {
	name: '',
	last_name: '',
	email: '',
	password: '',
	setValues: function(name, last_name, email, password) {
		this.name = name;
		this.last_name = last_name;
		this.email = email;
		this.password = password;
	},
	showValues: function(){
		console.log(this.name, this.last_name, this.email);
	},
	getItems: function() {
		return {
				
				name: this.name,
				last_name: this.last_name,
				email: this.email,
				password: this.password
		}
	}
};


document.addEventListener("DOMContentLoaded", function() {
	
	const buttonEnviar = document.querySelector('.buttonEnviar')
	
	buttonEnviar.addEventListener('mouseover', function () {
		buttonEnviar.style.backgroundColor = "#626edc";
	});
	
	buttonEnviar.addEventListener('mouseout', function () {
		buttonEnviar.style.backgroundColor = "#323edc";
	});

	//const userData = document.getElementById('createUserForm');
	const enviarUser = document.getElementById('enviarUser');
		
	enviarUser.addEventListener('click', function(){
		
		newUser.setValues(
			document.getElementById('name').value, 
			document.getElementById('last_name').value, 
			document.getElementById('email').value, 
			document.getElementById('password').value
			);	
		newUser.showValues();
		console.log(newUser.getItems());

		postData = newUser.getItems();

		axios.post('http://localhost:5000/users', postData)
    

	    .then(function(res) {
	      	
	      	if(res.status==200) {
	        	document.getElementById('postResult').innerHTML = 'El nuevo Post ha sido almacenado con id: ' + res.data.id;
	      	}
	    })
	    
	    .catch(function(err) {
	     	console.log(err);
	    })
	    
	    .then(function() {
	     	console.log('none');
	    });
		
		/*
		var postData = JSON.stringify(newUser.getItems());
		console.log(typeof postData)
		var serverUrl = "http://localhost:5000/users";
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			    var queryResult = JSON.parse(this.responseText);
				console.log(queryResult)   
			    document.getElementById("demo").innerHTML = queryResult.values;
			};
		};	

		xmlhttp.open("POST", serverUrl, true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(postData);
		*/
		
	});
		

	/*
	const userIdInput = document.getElementById('userIdInput');
	userIdInput.addEventListener('keydown', function(e) {
		if (e.keyCode === 13) {
			console.log(userIdInput.value)
			var serverUrl = "http://localhost:5000/users/" + userIdInput.value.toString();
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				    var queryResult = JSON.parse(this.responseText);
					console.log(queryResult)   
				    document.getElementById("demo").innerHTML = queryResult.keys;
				};
  			};	

			xmlhttp.open("GET", serverUrl, true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send();

		};
	});
	*/

});