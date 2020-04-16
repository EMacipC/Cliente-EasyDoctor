var idUsuario=readCookie("idSecretaria");
var ulCons=document.getElementById("lista");
function cargarPerfil(){
	console.log(document.cookie);
var request= new XMLHttpRequest();
	
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			procesarDatosP(respuesta);
		}
	}
	request.open("GET",'http://localhost:8080/secretaria/'+idUsuario,false);
	request.send();
}
function procesarDatosP(secretaria){
	var nombre=document.getElementById("nombre");
	var usuario=document.getElementById("usuario");
	var telefono=document.getElementById("telefono");
	var movil=document.getElementById("movil");
	var direccion=document.getElementById("direccion");
	var email=document.getElementById("email");
	
	nombre.innerText=("Nombre: "+secretaria.nombre);
	usuario.innerText=("Usuario: "+secretaria.usuario);
	telefono.innerText=("Telefono: "+secretaria.telefono);
	movil.innerText=("Movil: "+secretaria.movil);
	direccion.innerText=("Direccion: "+secretaria.direccion);
	email.innerText=("E-mail: "+secretaria.email);
	
}
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
function procesarDatos(secretaria){
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
	request.open("GET",'http://localhost:8080/consultorio/'+conSec.idConsultorio,false);
	request.send();
}
function procesarDatosC(consultorio){
	
	var liCons=document.createElement("li");
	var ulDatos=document.createElement("ul");
	var liDireccion=document.createElement("li");
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