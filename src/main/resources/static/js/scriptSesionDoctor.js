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
	
	nombre.innerText=doctor.nombre;
	especialidad.innerText=doctor.especialidad;
	usuario.innerText=doctor.usuario;
	telefono.innerText=doctor.telefono;
	movil.innerText=doctor.movil;
	direccion.innerText=doctor.direccion;
	email.innerText=doctor.email;
	
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
			procesarDatosConsultorios(respuesta);
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

function procesarDatosConsultorios(consultorio) {
	var elementRow= document.createElement("tr");
	var elementCellId = document.createElement("td");
	var elementCellNombre = document.createElement("td");
	var elementCellDireccion = document.createElement("td");
	var elementCellTelefono = document.createElement("td");
	var elementCellEncargado = document.createElement("td");
	var elementCellEmail = document.createElement("td");
	var elementCellClave = document.createElement("td");
	var elementCellAcciones = document.createElement("td");

	elementCellId.innerText = consultorio.id;
	elementCellNombre.innerHTML = '<a href="#">' + consultorio.nombre + '</a>';
	elementCellDireccion.innerText = consultorio.direccion;
	elementCellTelefono.innerText = consultorio.telefono;
	elementCellEncargado.innerText = consultorio.encargado;
	elementCellEmail.innerText = consultorio.email;
	elementCellClave.innerText = consultorio.claveAcceso;
	elementCellAcciones.innerHTML = 
	'<a href="#" class="btn btn-circle btn-sm" onclick="verDetalleConsultorio(' + consultorio.id + ')">' + 
		'<i class="fas fa-eye"></i>' +
    '</a>' +
	'<a href="#" class="btn btn-circle btn-sm btn-primary">' + 
		'<i class="fas fa-pen"></i>' +
    '</a>' +
    '<a href="#" class="btn btn-circle btn-sm btn-danger">' +
        '<i class="fas fa-trash"></i>'
    '</a>'+ 
    '<a href="unirConsScere.html" class="btn btn-circle btn-sm btn-info" title="Inscripcion">' +
        '<i class="fab fa-font-awesome-flag"></i>' +
    '</a>';

	elementRow.appendChild(elementCellId);
	elementRow.appendChild(elementCellNombre);
	elementRow.appendChild(elementCellDireccion);
	elementRow.appendChild(elementCellTelefono);
	elementRow.appendChild(elementCellEncargado);
	elementRow.appendChild(elementCellEmail);
	elementRow.appendChild(elementCellClave);
	elementRow.appendChild(elementCellAcciones);

	ulCons.appendChild(elementRow);
}

function verDetalleConsultorio(idConsultorio) {
	document.cookie="idConsultorio="+idConsultorio;
	window.location.assign("sesionConsDoctor.html");
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