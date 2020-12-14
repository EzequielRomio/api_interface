function enableInputs () {
	newName.removeAttribute("disabled");
	newLastName.removeAttribute("disabled");
	newEmail.removeAttribute("disabled");
	newPassword.removeAttribute("disabled");
}

function getDataToModify () {
	var userToModify = {
		name: newName.value,
		last_name: newLastName.value,
		email: newEmail.value,
		password: newPassword.value
	}


	for (field in userToModify) {
		if (!userToModify[field]) {
			delete userToModify[field]
		}
	}

	return userToModify
}

document.addEventListener("DOMContentLoaded", function() {
	
	const userIdInput = document.getElementById("userIdInput")
	
	const userId = document.getElementById("userId")
	const name = document.getElementById("name")
	const lastName = document.getElementById("last_name")
	const email = document.getElementById("email")
	const password = document.getElementById("password")
	
	const newName = document.getElementById("newName")
	const newLastName = document.getElementById("newLastName")
	const newEmail = document.getElementById("newEmail")
	const newPassword = document.getElementById("newPassword")


	let buttonPressed = false;

	userIdInput.addEventListener('keydown', function(e) {
		if (e.keyCode === 13 && !buttonPressed) {
			let url = 'http://localhost:5000/users/' + userIdInput.value.toString()
			buttonPressed = true;
			axios.get(url, { responseType: 'json'})
		    

		    .then(function(res) {
		      	
		      	if(res.status==200) {
		      		let data = res.data
		      		userId.innerHTML = data["id"];
		      		name.innerHTML = data["name"];
		      		lastName.innerHTML = data["last_name"];
		      		email.innerHTML = data["email"];
		      		password.innerHTML = "* * * * * * * *";
		    		

		      		confirmButton = document.createElement("button");
		      		confirmButton.setAttribute("type", "button");
		      		confirmButton.className = "buttonEnviar";
		      		confirmButton.innerHTML = "Modificar Usuario nº " + userIdInput.value.toString();
		      		confirmButton.style.width = "480px";
		      		confirmButton.style.marginBottom = "60px";
		      		deleteUser = document.getElementById("modifyUser");
		      		deleteUser.appendChild(confirmButton);

		      		enableInputs();

		      		confirmButton.addEventListener('click', function(e) {

		      			let dataToModify = getDataToModify()

			        	axios.put(url, dataToModify)
		        	
		        		.then(function(res2) {
		        			if (res2.status == 200) {

		        				alert("Usuario Modificado");
		        				location.reload();
		        			}
		        		})

		        	})
		        }
		    
				
		    })
		    
		    .catch(function(err) {
		     	console.log(err);
		    })
		    
		
		
		} else if (buttonPressed) { 

			location.reload()

		}
		
		
	});
		
});