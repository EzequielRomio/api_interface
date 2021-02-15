
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
	 	
		
	userIdInput.addEventListener('keydown', function(e) {
		if (e.keyCode === 13) {
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
		        }
		    })
		    
		    .catch(function(err) {
		    	if (err.response.status === 404) {
		    		alert("Nº de Usuario inválido");
		    	}
		     	console.log(err);
		    })
		    
		}
		
	});
		
});