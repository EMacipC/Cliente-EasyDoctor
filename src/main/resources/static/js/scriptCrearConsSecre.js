var idUsuario=decodeURIComponent(document.cookie);
function optenerDatos(){
	var nuevoR={
		nombre:document.getElementById("Nombre").value,
		direccion:document.getElementById("Direccion").value,
		telefono:document.getElementById("Telefono").value,
		encargado:document.getElementById("Encargado").value,
		email:document.getElementById("Email").value,
	}
	if(nuevoR.contrasena==nuevoR.rContrasena){
		limpiar();
		realizarPeticion(nuevoR);
	}
}


function limpiar(){

	document.getElementById("Nombre").value ="";
	document.getElementById("Direccion").value="";
	document.getElementById("Telefono").value="";
	document.getElementById("Encargado").value="";
	document.getElementById("Email").value="";
	
}
function realizarPeticion(nuevoR){
	var request= new XMLHttpRequest();
	var form=JSON.stringify(nuevoR);
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			
		}
	}
	request.open("POST","http://localhost:8080/secretaria/crearCons/"+idUsuario,true);
	request.setRequestHeader("Content-type", "application/json");
	request.send(form);
}