function parseDate(dateStr) {
	// sample 2020-11-23 16:26:12
	let dateSchedule = dateStr.split(" ");
	let splitedDate = dateSchedule[0].split("-");
	result = splitedDate[2] + '/' + splitedDate[1] + '/' + splitedDate[0] + ' ';
	result += dateSchedule[1]
	return result;
}

document.addEventListener("DOMContentLoaded", function() {
	
	const table = document.getElementById('usersListTable');
	const headers = ["id", "name", "last_name", "email", "date"];
	
	axios.get('http://localhost:5000/users', { responseType: 'json'})

  	.then(function(res) {
      	if(res.status==200) {
        	//console.log(res.data);

        	for (let i=0; i<res.data.length; i++) {
        		let row = document.createElement("tr");
        	
        		for (let x=0; x<headers.length; x++){
					let field = document.createElement("th");
					let value = null;
					if (x === 4) {
						let parsedDate = parseDate(res.data[i][headers[x]]);
						value = document.createTextNode(parsedDate);
					} else {
						value = document.createTextNode(res.data[i][headers[x]]);
					}
					// if x == 0 the value is ID, this will be set as align right
					// if x == 4 valus is DATE  
					if (x === 0) {
						field.style.textAlign = "right";
					}
					
				
					field.appendChild(value)
        			row.appendChild(field)

           		};
        	

           		table.appendChild(row)

        	};
      	};
      	console.log(res);
    })

    .catch(function(err) {
    	console.log(err);
    })
    // .then(function() {
    // 	console.log('none');
    // });

});
