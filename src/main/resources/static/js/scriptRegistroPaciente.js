var idConsultorio=readCookie("idConsultorio");
function optenerDatos(){
	var nuevoR={
		nombre:document.getElementById("Nombre").value,
		apellido:document.getElementById("Apellido").value,
		fechaNacimiento:document.getElementById("FN").value,
		curp :document.getElementById("Curp").value,
		telefono:document.getElementById("Telefono").value,
		movil:document.getElementById("Movil").value,
		email:document.getElementById("Email").value,
		sexo :document.getElementById("Sexo").value,
		nacionalidad :document.getElementById("Nacionalidad").value,
		tipoSangre :document.getElementById("TS").value,
		religion :document.getElementById("Religion").value,
		escolaridad :document.getElementById("Escolaridad").value,
		ocupacion :document.getElementById("Ocupacion").value
	}
	
	limpiar();
	realizarPeticion(nuevoR);
	
}


function limpiar(){

	document.getElementById("Nombre").value ="";
	document.getElementById("Apellido").value="";
	document.getElementById("FN").value="";
	document.getElementById("Curp").value=" ";
	document.getElementById("Telefono").value="";
	document.getElementById("Movil").value="";
	document.getElementById("Email").value="";
	document.getElementById("Nacionalidad").value="";
	document.getElementById("Religion").value="";
	document.getElementById("Escolaridad").value="";
	document.getElementById("Ocupacion").value="";
	
}

function realizarPeticion(nuevoR){
	var request= new XMLHttpRequest();
	var form=JSON.stringify(nuevoR);
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			
		}
	}
	request.open("POST","http://localhost:8080/paciente/"+idConsultorio,true);
	request.setRequestHeader("Content-type", "application/json");
	request.send(form);
	
}

function readCookie(name) {

	  var nameEQ = name + "="; 
	  var ca = document.cookie.split(';');
	  for(var i=0;i < ca.length;i++) {
	    var c = ca[i];
	    while (c.charAt(0)==' ') c = c.substring(1,c.length);
	    if (c.indexOf(nameEQ) == 0) {
	      return decodeURIComponent( c.substring(nameEQ.length,c.length) );
	    }
	  }
	}