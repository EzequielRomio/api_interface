document.addEventListener("DOMContentLoaded", function() {
    	
	const prescriptionIdInput = document.getElementById("prescriptionIdInput");

	const userColumn = document.getElementById("user-column");
	const odColumn = document.getElementById("od-column");
	const oiColumn = document.getElementById("oi-column");
	const addColumn = document.getElementById("add-column");
	const prescriptionDateColumn = document.getElementById("prescription-date-column");
	const notesColumn = document.getElementById("notes-column");
	const doctorColumn = document.getElementById("doctor-column");

    let userId = 0;
	let buttonEnabled = false;

	prescriptionIdInput.addEventListener("keydown", function(e) {
		if (e.keyCode === 13) {
			if (buttonEnabled) {
				confirmButton.remove()
			}

			let url = 'http://localhost:5000/prescriptions/' + prescriptionIdInput.value.toString()
						
			axios.get(url, { responseType: 'json'})
		    

		    .then(function(res) {
		      	
		      	if(res.status==200) {
					let prescription = res.data
					
					userId = res.data["user_id"]
					let usersName = ''
					
					if (userId) {
						axios.get('http://localhost:5000/users/' + userId, { responseType: 'json'})
						
						.then(function(userRes){
							usersName = userRes.data["name"] + " " + userRes.data["last_name"];

							userColumn.innerHTML = usersName
						})
						.catch(function() {
							userColumn.innerHTML = "Usuario Eliminado";
						})
					}
									
					
					odColumn.innerHTML = prescription["od"];
					oiColumn.innerHTML = prescription["oi"];
					addColumn.innerHTML = prescription["addition"];
					prescriptionDateColumn.innerHTML = prescription["prescription_date"];
					notesColumn.innerHTML = prescription["notes"];
					doctorColumn.innerHTML = prescription["doctor"];

					
					confirmButton = document.createElement("button");
					confirmButton.setAttribute("type", "button");
					confirmButton.className = "buttonEnviar";
					
					confirmButton.style.width = "480px";
					confirmButton.style.marginBottom = "60px";
				
					buttonEnabled = true;

					confirmButton.addEventListener('mouseover', function () {
						confirmButton.style.backgroundColor = "#626edc";
					});
					
					confirmButton.addEventListener('mouseout', function () {
						confirmButton.style.backgroundColor = "#323edc";
					});
				
					const deleteButton = document.getElementById("deleteButton");
					deleteButton.appendChild(confirmButton);
				
					confirmButton.innerHTML = "Eliminar Receta nº " + prescriptionIdInput.value.toString();

                    confirmButton.addEventListener('click', function(e) {

			        	axios.delete(url, {responseType: 'json'})
		        	
		        		.then(function(res2) {
		        			if (res2.status == 200) {

		        				alert("Receta Eliminada");
		        				location.reload();
		        			}
						});

                    });
                }
            })
            
            .catch(function(err) {
		    	//if (err.response.status === 404) {
				console.log(err.response.status)
					alert("Nº de Receta inválido");
					
					if (buttonEnabled) {
						confirmButton.remove()
						buttonEnabled = false;
					}

					userColumn.innerHTML = "";
					odColumn.innerHTML = "";
					oiColumn.innerHTML = "";
					addColumn.innerHTML = "";
					prescriptionDateColumn.innerHTML = "";
					notesColumn.innerHTML = "";
					doctorColumn.innerHTML = "";

		     	console.log(err);
		    });

        
        }    

    })    
});