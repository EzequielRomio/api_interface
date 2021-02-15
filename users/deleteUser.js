function parseDate(dateStr) {
	// sample 2020-11-23 16:26:12
	let dateSchedule = dateStr.split(" ");
	let splitedDate = dateSchedule[0].split("-");
	result = splitedDate[2] + '/' + splitedDate[1] + '/' + splitedDate[0] + ' ';
	result += dateSchedule[1]
	return result;
}

document.addEventListener("DOMContentLoaded", function() {
	
	const userIdInput = document.getElementById("userIdInput")
	
	const userId = document.getElementById("userId")
	const name = document.getElementById("name")
	const lastName = document.getElementById("last_name")
	const email = document.getElementById("email")
	const date = document.getElementById("date")
	 	
	let fieldsCompleted = false;

	userIdInput.addEventListener('keydown', function(e) {
		if (e.keyCode === 13) {
			if (fieldsCompleted) {
				userId.removeChild(userId.firstChild);
				name.removeChild(name.firstChild);
				lastName.removeChild(lastName.firstChild);
				email.removeChild(email.firstChild);
				date.removeChild(date.firstChild);
				confirmButton.remove();
			}

			let url = 'http://localhost:5000/users/' + userIdInput.value.toString()
			
			axios.get(url, { responseType: 'json'})
		    

		    .then(function(res) {
		      	
		      	if(res.status==200) {
		      		let data = res.data
		      		userId.innerHTML = data["id"];
		      		name.innerHTML = data["name"];
		      		lastName.innerHTML = data["last_name"];
		      		email.innerHTML = data["email"];
					let parsedDate = parseDate(data["date"]);  
					date.innerHTML = parsedDate;
					fieldsCompleted = true;

		      		confirmButton = document.createElement("button");
		      		confirmButton.setAttribute("type", "button");
		      		confirmButton.className = "buttonEnviar";
		      		confirmButton.innerHTML = "Eliminar Usuario nº " + userIdInput.value.toString();
		      		confirmButton.style.width = "480px";
		      		confirmButton.style.marginTop = "20px";

					confirmButton.addEventListener('mouseover', function () {
						confirmButton.style.backgroundColor = "#626edc";
					});
					
					confirmButton.addEventListener('mouseout', function () {
						confirmButton.style.backgroundColor = "#323edc";
					});
				
					deleteUser = document.getElementById("deleteButton");
		      		deleteUser.appendChild(confirmButton);

		      		confirmButton.addEventListener('click', function(e) {

			        	axios.delete(url, {responseType: 'json'})
		        	
		        		.then(function(res2) {
		        			if (res2.status == 200) {

		        				alert("Usuario Eliminado");
		        				location.reload();
		        			}
						});

		        	});
		        }
		    
				
		    })
		    
		    .catch(function(err) {
				console.log(err);
				fieldsCompleted = false;
				alert("N° de Usuario inválido") 
		    })
		    
		
		
		}		
	});
		
});