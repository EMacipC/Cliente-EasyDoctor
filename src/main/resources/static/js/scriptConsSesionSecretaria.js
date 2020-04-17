var listaPaciente= document.getElementById("listaPaciente");
var ul =document.createElement("ul");
var idConsultorio=readCookie("idConsultorio");
console.log(document.cookie);
function cargarPacientes(){
	realizarPeticion("http://localhost:8080/paciente/cons/"+idConsultorio);
	listaPaciente.appendChild(ul);
}
function realizarPeticion( url){
	
	var request= new XMLHttpRequest();
	
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			procesarDatos(respuesta);
		}
	}
	request.open("GET",url,false);
	request.send();
}
function procesarDatos(pacientes){
	
	for(let paciente of pacientes){
		cerarPaciente(paciente);
	}
	
		
}
function  cerarPaciente(paciente){
	
	let liElement=document.createElement("li");
	let ulElement=document.createElement("ul");
	let liNacimiento =document.createElement("li");
	let liCurp =document.createElement("li");
	let liTelefono =document.createElement("li");
	let liMovil =document.createElement("li");
	let liEmail =document.createElement("li");
	let liSexo =document.createElement("li");
	let liNacionalidad =document.createElement("li");
	let liTipoS =document.createElement("li");
	let liReligion =document.createElement("li");
	let liEscolaridad =document.createElement("li");
	let liOcupacion =document.createElement("li");
	let liboton=document.createElement("li");
	let boton=document.createElement("button");
	let boton2=document.createElement("button");
	 boton.innerText="Editar";
	 boton2.innerText="Cita";
	liboton.appendChild(boton);
	liboton.appendChild(boton2);
	boton2.onclick=function(){
		document.cookie="idPciente="+paciente.id;
		window.location.assign("citaSP.html")	
	}
	boton.onclick=function(){
		document.cookie="idPciente="+paciente.id;
		window.location.assign("editarPaciente.html");
	}
	

	liElement.innerText=("Paciente: "+paciente.nombre+" "+paciente.apellido );
	liNacimiento.innerText=("Fecha Nacimiento: "+paciente.fechaNacimiento);
	liCurp.innerText=("Curp: "+paciente.curp);
	liTelefono.innerText=("Telefono: "+paciente.telefono);
	liMovil.innerText=("Movil: "+paciente.movil);
	liEmail.innerText=("Email: "+paciente.email);
	liSexo.innerText=("Sexo: "+paciente.sexo);
	liNacionalidad.innerText=("Nacionalidad: "+paciente.nacionalidad);
	liTipoS.innerText=("Tipo Sanguinio: "+paciente.tipoSangre);
	liReligion.innerText=("Religion: "+paciente.religion);
	liEscolaridad.innerText=("Escolaridad: "+paciente.escolaridad);
	liOcupacion.innerText=("Ocupacion: "+paciente.ocupacion);
	
	ulElement.appendChild(liNacimiento);
	ulElement.appendChild(liCurp);
	ulElement.appendChild(liTelefono);
	ulElement.appendChild(liMovil);
	ulElement.appendChild(liEmail);
	ulElement.appendChild(liSexo);
	ulElement.appendChild(liNacionalidad);
	ulElement.appendChild(liTipoS);
	ulElement.appendChild(liReligion);
	ulElement.appendChild(liEscolaridad);
	ulElement.appendChild(liOcupacion);
	ulElement.appendChild(liboton);
	
	liElement.appendChild(ulElement);
	
	ul.appendChild(liElement);
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