var newPrescription = {
	user_id: null,
	prescription_date: '',
	od: '',
	oi: '',
	addition: '',
	notes: '',
	doctor: '',
	setValues: function(user_id, prescription_date, od, oi, addition, notes, doctor) {
		this.user_id = user_id;
		this.prescription_date = prescription_date;
		this.od = od;
		this.oi = oi;
		this.addition = addition;
		this.notes = notes;
		this.doctor = doctor;
	},
	showValues: function(){
		console.log(this.user_id, this.od, this.oi, this.addition);
	},
	getItems: function() {
		return {
				user_id: this.user_id,
				prescription_date: this.prescription_date,
				od: this.od,
				oi: this.oi,
				addition: this.addition,
				notes: this.notes,
				doctor: this.doctor
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
	const enviarPrescription = document.getElementById('enviarPrescription');
		
	enviarPrescription.addEventListener('click', function(){
		
		newPrescription.setValues(
			document.getElementById('user_id').value, 
			document.getElementById('prescription_date').value, 
			document.getElementById('od').value, 
			document.getElementById('oi').value,
			document.getElementById('addition').value,
			document.getElementById('notes').value,
			document.getElementById('doctor').value
		);	

		newPrescription.showValues();
		console.log(newPrescription.getItems());

		postData = newPrescription.getItems();

		axios.post('http://localhost:5000/prescriptions', postData)
    

	    .then(function(res) {
	      	
	      	if(res.status==200) {
	        	//document.getElementById('postResult').innerHTML = 'El Usuario ha sido creado con Nº de id: ' + res.data.id;
	      		alert('La Receta ha sido creada con Nº de id: ' + res.data.id);
	      		location.reload();
	      	}
	    })
	    
	    .catch(function(err) {
	    	if (err.response.status === 400) {
	     		alert('Faltan completar campos escenciales!');
	     	} else if (err.response.status === 404) {
	     		alert('Número de Usuario inválido')
	     	};
	     	
	    })
	    
	    .then(function() {
	    });
		
		
	});
		

	
});