var idPaciente=readCookie("idPciente");
var idConsultorio=readCookie("idConsultorio");
var citasP=document.getElementById("citasP");
var citaF=document.getElementById("citaF");
var listaD=document.getElementById("doctor");
console.log(document.cookie)
var tipoS=readCookie("tipoS");
var regresar=document.getElementById("regersar")

function onLoad() {
	mostarCitasP();
	doctores();
}

function docSec(){
		regresar.setAttribute("href","sesionCons"+tipoS+".html");
}
function mostarCitasP(){
	var request= new XMLHttpRequest();
	
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			console.log(respuesta)
			procesarDatos(respuesta);
		}
	}
	request.open("GET","http://localhost:8080/cita/paciente/"+idPaciente,false);
	request.send();
}
function procesarDatos(citas){
	let nC=0;
	for(let cita of citas){
		nC++;
		mostarC(cita,nC);
	}
}
function mostarC(cita,nC){
var request= new XMLHttpRequest();
	
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			procesarDatosP(respuesta,cita,nC);
		}
	}
	request.open("GET","http://localhost:8080/paciente/"+idPaciente,false);
	request.send();
}
function procesarDatosP(paciente,cita,nC){
var request= new XMLHttpRequest();

request.onreadystatechange= function(){
	if(this.readyState==4 && this.status==200 ){
		var respuesta=JSON.parse(this.responseText);
		procesarDatosCita(respuesta,paciente,cita,nC);
	}
}
request.open("GET","http://localhost:8080/doctor/"+cita.idDoctor,false);
request.send();
}
function procesarDatosD(doctor,paciente,cita,nC){
	let liElement=document.createElement("li");
	let ulElement=document.createElement("ul");
	
	liElement.innerText=("Cita "+nC);
	let liNP=document.createElement("li");
	let liND=document.createElement("li");
	let liSala=document.createElement("li");
	let lifecha=document.createElement("li");
	let liEstado=document.createElement("li");
	
	liNP.innerText=("Paciente: "+paciente.nombre);
	liND.innerText=("Doctor: "+doctor.nombre);
	liSala.innerText=("Sala: "+cita.salaConsulta);
	lifecha.innerText=("Fecha: "+cita.fechaAgendada);
	liEstado.innerText=("Estado Cita: "+cita.estadoCita);
	
	ulElement.appendChild(liNP);
	ulElement.appendChild(liND);
	ulElement.appendChild(liSala);
	ulElement.appendChild(lifecha);
	ulElement.appendChild(liEstado);
	
	liElement.appendChild(ulElement);
	
	citasP.appendChild(liElement);
	
}

function procesarDatosCita(doctor,paciente,cita,nC){
	let elementRowCita = document.createElement("tr");
	let elementCellNumero = document.createElement("td");
	let elementCellPaciente = document.createElement("td");
	let elementCellDoctor = document.createElement("td");
	let elementCellSala = document.createElement("td");
	let elementCellFecha = document.createElement("td");
	let elementCellEstado = document.createElement("td");

	
	elementCellNumero.innerText=nC;
	elementCellPaciente.innerText=paciente.nombre;
	elementCellDoctor.innerText=doctor.nombre;
	elementCellSala.innerText=cita.salaConsulta;
	elementCellFecha.innerText=cita.fechaAgendada;
	elementCellEstado.innerText=cita.estadoCita;
	
	elementRowCita.appendChild(elementCellNumero);
	elementRowCita.appendChild(elementCellPaciente);
	elementRowCita.appendChild(elementCellDoctor);
	elementRowCita.appendChild(elementCellSala);
	elementRowCita.appendChild(elementCellFecha);
	elementRowCita.appendChild(elementCellEstado);
	
	citasP.appendChild(elementRowCita);
}
// generar option Doctores
function doctores(){
	docSec();
	var request= new XMLHttpRequest();
		
		request.onreadystatechange= function(){
			if(this.readyState==4 && this.status==200 ){
				var respuesta=JSON.parse(this.responseText);
				console.log(respuesta);
				procesarDatosCon(respuesta.consDoctor);
			}
		}
		request.open("GET","http://localhost:8080/consultorio/"+idConsultorio,false);
		request.send();
}	
function procesarDatosCon(consDoctores){
	console.log(consDoctores);
	for(let consDoctor of consDoctores){
		optenerDocotres(consDoctor);
	}
	
}
function optenerDocotres(consDoctor){
	var request= new XMLHttpRequest();
	
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			procesarDatosDoctor(respuesta);
		}
	}
	request.open("GET","http://localhost:8080/doctor/"+consDoctor.idDoctor,false);
	request.send();
}
function procesarDatosDoctor(doctor){
	let opcion=document.createElement("option");
	var t = document.createTextNode(doctor.nombre+" "+doctor.apelliod);
	opcion.appendChild(t)
	 opcion.value=(doctor.id);
	 listaD.appendChild(opcion);
}
//registro de Cita
function registrarCita(){
	 var nuevoR={
		 salaConsulta:document.getElementById("sala").value,
		 estadoCita:document.getElementById("estado").value,
		 fechaAgendada:document.getElementById("fecha").value
	 }
	mandarCita(nuevoR);
}
function mandarCita(nuevoR){
	var request= new XMLHttpRequest();
	var form=JSON.stringify(nuevoR);
	console.log(form)
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			
		}
	}
	var idDoctor=document.getElementById("doctor").value;
	request.open("POST","http://localhost:8080/cita/"+idPaciente+"/"+idDoctor,true);
	request.setRequestHeader("Content-type", "application/json");
	request.send(form);
	
}
//buscar cita por fecha
function buscarCita(){
	var fecha=document.getElementById("ofecha").value;
	document.getElementById("ofecha").value="";
var request= new XMLHttpRequest();
	
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			procesarDatosF(respuesta);
		}
	}
	
	request.open("GET","http://localhost:8080/cita/paciente/"+fecha+"/"+idPaciente,false);
	request.send();
	
}
function procesarDatosF(cita){
var request= new XMLHttpRequest();
	
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			procesarDatosPF(respuesta,cita);
		}
	}
	request.open("GET","http://localhost:8080/paciente/"+idPaciente,false);
	request.send();
}
function procesarDatosPF(paciente,cita){
var request= new XMLHttpRequest();

request.onreadystatechange= function(){
	if(this.readyState==4 && this.status==200 ){
		var respuesta=JSON.parse(this.responseText);
		console.log(cita.id)
		procesarDatosCita(respuesta,paciente,(cita[0]) || {});
		
	}
}
request.open("GET","http://localhost:8080/doctor/"+cita[0].idDoctor,false);
request.send();
}
function procesarDatosDF(doctor,paciente,cita){
	let liElement=document.createElement("li");
	let ulElement=document.createElement("ul");
	
	liElement.innerText=("Cita ");
	let liNP=document.createElement("li");
	let liND=document.createElement("li");
	let liSala=document.createElement("li");
	let lifecha=document.createElement("li");
	let liEstado=document.createElement("li");
	
	liNP.innerText=("Paciente: "+paciente.nombre);
	liND.innerText=("Doctor: "+doctor.nombre);
	liSala.innerText=("Sala: "+cita[0].salaConsulta);
	lifecha.innerText=("Fecha: "+cita[0].fechaAgendada);
	liEstado.innerText=("Estado Cita: "+cita[0].estadoCita);
	
	ulElement.appendChild(liNP);
	ulElement.appendChild(liND);
	ulElement.appendChild(liSala);
	ulElement.appendChild(lifecha);
	ulElement.appendChild(liEstado);
	
	liElement.appendChild(ulElement);
	
	citaF.appendChild(liElement);
	
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