document.addEventListener("DOMContentLoaded", function() {
	
	const userIdInput = document.getElementById("userIdInput")
	
	const userId = document.getElementById("userId")
	const name = document.getElementById("name")
	const lastName = document.getElementById("last_name")
	const email = document.getElementById("email")
	const date = document.getElementById("date")
	 	
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
		      		date.innerHTML = data["date"];
		    		

		      		confirmButton = document.createElement("button");
		      		confirmButton.setAttribute("type", "button");
		      		confirmButton.className = "buttonEnviar";
		      		confirmButton.innerHTML = "Eliminar Usuario nº " + userIdInput.value.toString();
		      		confirmButton.style.width = "480px";
		      		confirmButton.style.marginTop = "20px";
		      		deleteUser = document.getElementById("deleteUser");
		      		deleteUser.appendChild(confirmButton);

		      		confirmButton.addEventListener('click', function(e) {

			        	axios.delete(url, {responseType: 'json'})
		        	
		        		.then(function(res2) {
		        			if (res2.status == 200) {

		        				alert("Usuario Eliminado");
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