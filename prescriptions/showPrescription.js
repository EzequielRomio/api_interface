function parseDate(dateStr) {
	// sample 2020-11-23 16:26:12
	let dateSchedule = dateStr.split(" ");
	let splitedDate = dateSchedule[0].split("-");
	result = splitedDate[2] + '/' + splitedDate[1] + '/' + splitedDate[0] + ' ';
	result += dateSchedule[1]
	return result;
}

function showPrescription (data) {
	prescriptionId.innerHTML = data["id"];
	prescriptionDate.innerHTML = data["prescription_date"];
	userId.innerHTML = data["user_id"];
	od.innerHTML = data["od"];
	oi.innerHTML = data["oi"];
	adittion.innerHTML = data["addition"];
	doctor.innerHTML = data["doctor"];
	let parsedDate = parseDate(data["created_date"]);
	createdDate = parsedDate;
	notes.innerHTML = data["notes"];
}


/*To Do:
	resolve with a promise the way to show user's name when the prescription data is requiered 
*/

document.addEventListener("DOMContentLoaded", function() {
	
	const userIdInput = document.getElementById("userIdInput");
	const prescriptionIdInput = document.getElementById("prescriptionIdInput");
	const table = document.getElementById("deleteTable"); 

	const headers = ["user_name", "created_date", "id", "od", "oi", "addition", "prescription_date", "notes", "doctor"];

	let thCounter = 0;
	let userId = 0;
	let tableHaschild = false;

	userIdInput.addEventListener('keydown', function(e) {
		if (e.keyCode === 13) {
			userId = userIdInput.value.toString() 
			
			let usersName = ''

			axios.get('http://localhost:5000/users/' + userId, { responseType: 'json'})
			
			.then(function(userRes){
				usersName = userRes.data["name"] + " " + userRes.data["last_name"]
			})

			let url = 'http://localhost:5000/users/' + userId + '/prescriptions'
		
			axios.get(url, { responseType: 'json'})
			
		    .then(function(res) {
				console.log(res)
		      	if(res.status==200) {
					let tablechilds = []
					if (res.data.length === 0) {
		      			alert("No hay recetas cargadas para ese Usuario")
		      		} else {	
						for (const prescription of res.data) {
							let row = document.createElement("tr");
							
							for (const header of headers) {
								let value = null;
								let field = document.createElement("th");
								if (header === "user_name") {
									value = document.createTextNode(usersName);	
								} else if (header === "created_date"){
									let parsedDate = parseDate(prescription[header]);
									value = document.createTextNode(parsedDate);
								} else if (header === "id") {
									field.style.textAlign = "right";
									value = document.createTextNode(prescription[header]);
								} else {
									value = document.createTextNode(prescription[header]);
								}
								field.appendChild(value)
								row.appendChild(field)
								
							}
							if (!tableHaschild) {
								tablechilds.unshift(row)
							} else {
								tablechilds.push(row)
							}
						}
						if (!tableHaschild) {
							for (child of tablechilds) {
							table.appendChild(child)
							}
							tableHaschild = true;
						} else {
							for (child of tablechilds) {
							table.insertBefore(child, table.childNodes[2])
							}
						}

						// for (let ix=tablechilds.length - 1; ix >= 0; ix--) {
						// 	table.appendChild(tablechilds[ix])
						// }
					}
			    }
		    })
		    
		    .catch(function(err) {
				if ("response" in err) {
					if (err.response.status === 404) {
						alert("Nº de Usuario inválido");
					}
					console.log(err.response.status);
					console.log(err.response.data);
				}
		    	
		    })
	
		}
		
	});
		

	prescriptionIdInput.addEventListener("keydown", function(e) {
		if (e.keyCode === 13) {
			let url = 'http://localhost:5000/prescriptions/' + prescriptionIdInput.value.toString()
						
			axios.get(url, { responseType: 'json'})
		    

		    .then(function(res2) {
		      	
		      	if(res2.status==200) {
					let prescription = res2.data
					let row = document.createElement("tr");
					userId = res2.data["user_id"]
					let usersName = ''
					
					if (userId) {
						axios.get('http://localhost:5000/users/' + userId, { responseType: 'json'})
						
						.then(function(userRes){
							usersName = userRes.data["name"] + " " + userRes.data["last_name"];

							let nameAux = document.getElementById("users-name" + (thCounter - 1).toString())
							let txt = document.createTextNode(usersName) 
							nameAux.appendChild(txt);
						})
						.catch(function(userError) {
							let nameAux = document.getElementById("users-name" + (thCounter - 1).toString())
							let txt = document.createTextNode("Usuario Eliminado") 
							nameAux.appendChild(txt);

						})
					}
									
					for (const header of headers) {
						let field = document.createElement("th");
						let value = null;
						console.log(usersName)
						if (header === "user_name") {
							value = document.createTextNode("");
							field.setAttribute('id', 'users-name' + thCounter.toString());
							thCounter += 1;
							console.log(field)	
						} else if (header === "date"){
							let parsedDate = parseDate(prescription[header])
							value = document.createTextNode(parsedDate)
						} else if (header === "id") {
							field.style.textAlign = "right";
							value = document.createTextNode(prescription[header]);
						} else {
							value = document.createTextNode(prescription[header])
						}
						field.appendChild(value)
						row.appendChild(field)
						//row.insertBefore(field, row.firstChild)
					}
					if (!tableHaschild) {
						table.appendChild(row)
						tableHaschild = true;
					} else {
						table.insertBefore(row, table.childNodes[2]);
					}
					//table.insertBefore(row, table.firstChild)
		        }

				
		    })
		    
		    .catch(function(err2) {
		    	if (err2.status === 404) {
		    		alert("Nº de Receta inválido");
		    	}
		     	console.log(err2);
		    })
			

		}

	});


});