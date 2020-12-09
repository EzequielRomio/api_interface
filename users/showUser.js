document.addEventListener("DOMContentLoaded", function() {
	
	const userId = document.getElementById('userIdInput');
  const userData = document.getElementById('userData');
  const headers = ["id", "name", "last_name", "email", "date"];
  const headers_es = ["Nº de Usuario", "Nombre", "Apellido", "Correo Electrónico", "Fecha de Ingreso"];

  userId.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      let url = 'http://localhost:5000/users/' + userId.value.toString()
    
    	axios.get(url, { responseType: 'json'})

    	.then(function(res) {
        	if(res.status==200) {
          	console.log(res.data);
            const data = res.data;
            
            let table = document.createElement("table");

            let row = document.createElement("tr");
            row.style.backgroundColor = "#727efc"
            for (let i=0; i<headers.length; i++) {
              let field = document.createElement("th");
              let header = document.createTextNode(headers_es[i]);
              field.appendChild(header);
              row.appendChild(field);
            }
          	
            table.appendChild(row);

            row = document.createElement("tr");
            for (let i=0; i<headers.length; i++) {
              let field = document.createElement("th");
              let value = document.createTextNode(data[headers[i]]);
              field.appendChild(value);
              row.appendChild(field)
            }

            table.appendChild(row);

            userData.appendChild(table);            
        	};
        	console.log(res);
      })

        .catch(function(err) {
        	console.log(err);
        })
        .then(function() {
        	console.log('none');
        });
    }
  })

});


// TO DO: 
//  - If a 2nd request is trigger, delete the first result