document.addEventListener("DOMContentLoaded", function() {

	const buttonEnviar = document.querySelector('.buttonEnviar')
	
	buttonEnviar.addEventListener('mouseover', function () {
		buttonEnviar.style.backgroundColor = "#626edc";
	});
	
	buttonEnviar.addEventListener('mouseout', function () {
		buttonEnviar.style.backgroundColor = "#323edc";
	});
});