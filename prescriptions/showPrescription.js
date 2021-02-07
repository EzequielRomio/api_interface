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

document.addEventListener("DOMContentLoaded", function() {
	
	const userIdInput = document.getElementById("userIdInput")
	const prescriptionIdInput = document.getElementById("prescriptionIdInput")

	const prescriptionId = document.getElementById("prescription_id")
	const prescriptionDate = document.getElementById("prescription_date")
	const userId = document.getElementById("user_id") 
	const od = document.getElementById("od") 
	const oi = document.getElementById("oi") 
	const adittion = document.getElementById("addition") 
	const doctor = document.getElementById("doctor") 
	const createdDate = document.getElementById("created_date") 
	const notes = document.getElementById("notes") 
	 	
	userIdInput.addEventListener('keydown', function(e) {
		if (e.keyCode === 13) {
			let url = 'http://localhost:5000/users/' + userIdInput.value.toString() + '/prescriptions'
		
			axios.get(url, { responseType: 'json'})
		    

		    .then(function(res) {
		      	
		      	if(res.status==200) {
		      		let data = res.data[0]
		      		if (!data["id"]) {
		      			console.log(typeof data)
		      			console.log(data)
		      			alert("No hay recetas cargadas para ese Usuario")
		      		} else {
						prescriptionId.innerHTML = data["id"];
						prescriptionDate.innerHTML = data["prescription_date"];
						userId.innerHTML = data["user_id"];
						od.innerHTML = data["od"];
						oi.innerHTML = data["oi"];
						adittion.innerHTML = data["addition"];
						doctor.innerHTML = data["doctor"];
						let parsedDate = parseDate(data["created_date"]);
						createdDate.innerHTML = parsedDate;
						notes.innerHTML = data["notes"];
			      	}
			    }
		    })
		    
		    .catch(function(err) {
		    	if (err.status === 404) {
		    		alert("Nº de Usuario inválido");
		    	}
		     	console.log(err);
		    })
		    		
		}
		
	});
		

	prescriptionIdInput.addEventListener("keydown", function(e) {
		if (e.keyCode === 13) {

			let url = 'http://localhost:5000/prescriptions/' + prescriptionIdInput.value.toString()
			
			axios.get(url, { responseType: 'json'})
		    

		    .then(function(res2) {
		      	
		      	if(res2.status==200) {
					let data = res2.data
		      		

					prescriptionId.innerHTML = data["id"];
					prescriptionDate.innerHTML = data["prescription_date"];
					userId.innerHTML = data["user_id"];
					od.innerHTML = data["od"];
					oi.innerHTML = data["oi"];
					adittion.innerHTML = data["addition"];
					doctor.innerHTML = data["doctor"];
					let parsedDate = parseDate(data["created_date"]);
					createdDate.innerHTML = parsedDate;
					notes.innerHTML = data["notes"];

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