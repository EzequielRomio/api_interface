document.addEventListener("DOMContentLoaded", function() {
	
	const table = document.getElementById('usersListTable');
	const headers = ["id", "name", "last_name", "email", "date"];
	
	axios.get('http://localhost:5000/users', { responseType: 'json'})

  	.then(function(res) {
      	if(res.status==200) {
        	console.log(res.data);

        	for (let i=0; i<res.data.length; i++) {
        		let row = document.createElement("tr");
        	
        		for (let x=0; x<headers.length; x++){
        			let field = document.createElement("th");
        			let value = document.createTextNode(res.data[i][headers[x]]);
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
    .then(function() {
    	console.log('none');
    });

});
