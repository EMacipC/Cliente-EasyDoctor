var idUsuario=readCookie("idDoctor");
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
	request.open("GET",'http://localhost:8080/doctor/'+idUsuario,false);
	request.send();
}
function procesarDatosP(doctor){
	var nombre=document.getElementById("nombre");
	var especialidad=document.getElementById("especialidad");
	var usuario=document.getElementById("usuario");
	var telefono=document.getElementById("telefono");
	var movil=document.getElementById("movil");
	var direccion=document.getElementById("direccion");
	var email=document.getElementById("email");
	
	nombre.innerText=("Nombre: "+doctor.nombre);
	especialidad.innerText=("Especialidad: "+doctor.especialidad);
	usuario.innerText=("Usuario: "+doctor.usuario);
	telefono.innerText=("Telefono: "+doctor.telefono);
	movil.innerText=("Movil: "+doctor.movil);
	direccion.innerText=("Direccion: "+doctor.direccion);
	email.innerText=("E-mail: "+doctor.email);
	
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
	request.open("GET",'http://localhost:8080/doctor/'+idUsuario,false);
	request.send();
}
function procesarDatos(doctor){
	for(let condoc of doctor.consDoctor){
		optenerCons(condoc);
	}
}
function optenerCons(condoc){
var request= new XMLHttpRequest();
	
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			procesarDatosC(respuesta);
		}
	}
	request.open("GET",'http://localhost:8080/consultorio/'+condoc.idConsultorio,false);
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
	var liBoton=document.createElement("li");
	var boton=document.createElement("button")
	
	
	boton.innerText=("Entrar");
	liCons.innerText=("Consultorio: "+consultorio.nombre);
	liDireccion.innerText=("Direccion: "+consultorio.direccion);
	liTelefono.innerText=("Telefono: "+consultorio.telefono);
	liEncargado.innerText=("Encargado: "+consultorio.encargado);
	liEmail.innerText=("e-mail: "+consultorio.email);
	liClave.innerText=("Clave: "+consultorio.claveAcceso);
	
	liBoton.appendChild(boton);
	//liBoton.style.list-style=none;
	
	ulDatos.appendChild(liDireccion);
	ulDatos.appendChild(liTelefono);
	ulDatos.appendChild(liEncargado);
	ulDatos.appendChild(liEmail);
	ulDatos.appendChild(liClave);
	ulDatos.appendChild(liBoton);
	
	liCons.appendChild(ulDatos);
	
	ulCons.appendChild(liCons);
	boton.onclick=function(){
		document.cookie="idConsultorio="+consultorio.id;
		window.location.assign("sesionConsDoctor.html");
	}
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