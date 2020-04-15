function optenerDatos(){
	var nuevoR={
		nombre:document.getElementById("Nombre").value,
		apellido:document.getElementById("Apellido").value,
		direccion:document.getElementById("Direccion").value,
		telefono:document.getElementById("Telefono").value,
		movil:document.getElementById("Movil").value,
		email:document.getElementById("Email").value,
		usuario:document.getElementById("Usuario").value,
		contrasena :document.getElementById("Contrasena").value,
		rContrasena:document.getElementById("RContrasena").value,
	}
	if(nuevoR.contrasena==nuevoR.rContrasena){
		limpiar();
		realizarPeticion(nuevoR);
	}
}


function limpiar(){

	document.getElementById("Nombre").value ="";
	document.getElementById("Apellido").value="";
	document.getElementById("Direccion").value="";
	document.getElementById("Telefono").value="";
	document.getElementById("Movil").value="";
	document.getElementById("Email").value="";
	document.getElementById("Usuario").value="";
	document.getElementById("Contrasena").value="";
	document.getElementById("RContrasena").value="";
	
}
function realizarPeticion(nuevoR){
	var request= new XMLHttpRequest();
	var form=JSON.stringify(nuevoR);
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			
		}
	}
	request.open("POST","http://localhost:8080/secretaria",true);
	request.setRequestHeader("Content-type", "application/json");
	request.send(form);
	console.log("fin")
}