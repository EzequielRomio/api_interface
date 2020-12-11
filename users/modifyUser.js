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
	},

	getFieldsToModify: function() {
		var fieldsToModify = {

				name: this.name,
				last_name: this.last_name,
				email: this.email,
				password: this.password

		}

		for (k in fieldsToModify) {
			console.log(k);
			if (!(Boolean(fieldsToModify.k))) {
				console.log(k)
				delete fieldsToModify.k;
			};
		}; 

		return fieldsToModify;

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
	        	//document.getElementById('postResult').innerHTML = 'El Usuario ha sido creado con Nº de id: ' + res.data.id;
	      		alert('El Usuario ha sido creado con Nº de id: ' + res.data.id);
	      		location.reload();
	      	}
	    })
	    
	    .catch(function(err) {
	    	if (err.response.status === 400) {
	     	alert('Faltan completar campos escenciales!');
	     	};
	     	
	    })
	    
	    .then(function() {
	    });
		
		
	});
		

	
});