function enableInputs () {
	newOd.removeAttribute("disabled");
	newOi.removeAttribute("disabled");
	newAdd.removeAttribute("disabled");
	newDate.removeAttribute("disabled");
	newNotes.removeAttribute("disabled");
	newDoctor.removeAttribute("disabled");
}

//	const headers = ["user_name", "id", "od", "oi", "addition", "prescription_date", "notes", "doctor"];

function getDataToModify () {
	var dataToModify = {
		od:	newOd.value,
		oi:	newOi.value,	
		addition: newAdd.value,
		prescription_date: newDate.value,
		notes: newNotes.value,
		doctor: newDoctor.value
	}

	for (field in dataToModify) {
		if (!dataToModify[field]) {
			delete dataToModify[field]
		}
	}

	return dataToModify
}

/*To Do:
	resolve with a promise the way to show user's name when the prescription data is requiered 
*/

document.addEventListener("DOMContentLoaded", function() {
	
	const prescriptionIdInput = document.getElementById("prescriptionIdInput");
	//const table = document.getElementById("modifyTable"); 

	//const headers = ["user_name", "id", "od", "oi", "addition", "prescription_date", "notes", "doctor"];

	const userColumn = document.getElementById("user-column");
	const odColumn = document.getElementById("od-column");
	const oiColumn = document.getElementById("oi-column");
	const addColumn = document.getElementById("add-column");
	const prescriptionDateColumn = document.getElementById("prescription-date-column");
	const notesColumn = document.getElementById("notes-column");
	const doctorColumn = document.getElementById("doctor-column");

	const newOd = document.getElementById("newOd");
	const newOi = document.getElementById("newOi");
	const newAdd = document.getElementById("newAdd");
	const newDate = document.getElementById("newDate");
	const newNotes = document.getElementById("newNotes");
	const newDoctor = document.getElementById("newDoctor");

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
				
					const modifyButton = document.getElementById("modifyButton");
					modifyButton.appendChild(confirmButton);
					enableInputs();
				
					confirmButton.innerHTML = "Modificar Receta nº " + prescriptionIdInput.value.toString();

					confirmButton.addEventListener('click', function(e) {

						let dataToModify = getDataToModify()

						axios.put(url, dataToModify)
					
						.then(function(res2) {
							if (res2.status == 200) {

								alert("Receta Modificada");
								location.reload();
							}
						})
						
						.catch(function(err2) {
							console.log(err2)
							alert("Faltan completar campos esenciales!")
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

				//}
		     	console.log(err);
		    })
			

		}

	});


});