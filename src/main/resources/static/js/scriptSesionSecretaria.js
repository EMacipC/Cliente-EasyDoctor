var idUsuario=decodeURIComponent(document.cookie);
var ulCons=document.getElementById("lista");
function cerrarSesion(){
	document.cookie.split(";").forEach(function(c) {
		document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
		});
	window.location.assign("iniciarSesion.html");
}
function mostrarConsultorios(){

	var request= new XMLHttpRequest();
	
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			procesarDatos(respuesta);
		}
	}
	request.open("GET",'http://localhost:8080/secretaria/'+idUsuario,false);
	request.send();
}
function procesarDatos(secretatia){
	for(let conSec of secretaria.consSecretaria){
		optenerCons(conSec);
	}
}
function optenerCons(conSec){
var request= new XMLHttpRequest();
	
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			procesarDatosC(respuesta);
		}
	}
	request.open("GET",'http://localhost:8080/consultorio/'+idUsuario,false);
	request.send();
}
function procesarDatosC(consultorio){
	
	var liCons=document.createElement("li");
	var ulDatos=document.createElement("ul");
	var liDireccion=document.createElemnt("li");
	var liTelefono=document.createElement("li");
	var liEncargado=document.createElement("li");
	var liEmail=document.createElement("li");
	var liClave=document.createElement("li");
	
	liCons.innerText=("Consultorio: "+consultorio.nombre);
	liDireccion.innerText=("Direccion: "+consultorio.direccion);
	liTelefono.innerText=("Telefono: "+consultorio.telefono);
	liEncargado.innerText=("Encargado: "+consultorio.encargado);
	liEmail.innerText=("e-mail: "+consultorio.email);
	liClave.innerText=("Clave: "+consultorio.claveAcceso);
	
	ulDatos.appendChild(liDireccion);
	ulDatos.appendChild(liTelefono);
	ulDatos.appendChild(liEncargado);
	ulDatos.appendChild(liEmail);
	ulDatos.appendChild(liClave);
	
	liCons.appendChild(ulDatos);
	
	ulCons.appendChild(liCons);
	
	
	
}
}