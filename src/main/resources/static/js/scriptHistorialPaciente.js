var idUsuario=readCookie("idPciente");
console.log(document.cookie);
function cargar(){
	paciente()

}
function paciente(){
var request= new XMLHttpRequest();
	
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			procesarDatosP(respuesta);
		}
	}
	request.open("GET",'http://localhost:8080/paciente/'+idUsuario,false);
	request.send();
}
function procesarDatosP(paciente){
	let nombre=document.getElementById("nombre");
	let cumple=document.getElementById("cumple");
	let telefono=document.getElementById("telefono");
	let movil=document.getElementById("movil");
	let email=document.getElementById("email");
	let curp=document.getElementById("curp");
	let sex=document.getElementById("sex");
	let tipoS=document.getElementById("tipoSangre");
	let nacionalidad=document.getElementById("nacionalidad");
	let religion=document.getElementById("religion");
	let escolaridad=document.getElementById("escolaridad");
	let ocupacion=document.getElementById("ocupacion");
	
	nombre.innerText=("Paciente: "+paciente.nombre+" "+paciente.apellido );
	cumple.innerText=("Fecha Nacimiento: "+paciente.fechaNacimiento);
	curp.innerText=("Curp: "+paciente.curp);
	telefono.innerText=("Telefono: "+paciente.telefono);
	movil.innerText=("Movil: "+paciente.movil);
	email.innerText=("Email: "+paciente.email);
	sex.innerText=("Sexo: "+paciente.sexo);
	nacionalidad.innerText=("Nacionalidad: "+paciente.nacionalidad);
	tipoS.innerText=("Tipo Sanguinio: "+paciente.tipoSangre);
	religion.innerText=("Religion: "+paciente.religion);
	escolaridad.innerText=("Escolaridad: "+paciente.escolaridad);
	ocupacion.innerText=("Ocupacion: "+paciente.ocupacion);
	
	historialClin(paciente);
}
function historialClin(paciente){
	if(paciente.hC[0]==null){
		let histoC =document.getElementById("histoClinico");
		 let labMedico=document.createElement("label");
		 let labTrauma=document.createElement("label");
		 let labPsico=document.createElement("label");
		 let labAdiccion=document.createElement("label");
		 let labCirugias=document.createElement("label");
		 let labOtro=document.createElement("label");
		 
		 labMedico.innerText="Medico";
		 labTrauma.innerText="Traumas";
		 labPsico.innerText="Psicologico";
		 labAdiccion.innerText="Adiccion";
		 labCirugias.innerText="Cirugiasa";
		 labOtro.innerText="Otro";
		 
		 let texMedico=document.createElement("TEXTAREA");
		 let texTrauma=document.createElement("TEXTAREA");
		 let texPsico=document.createElement("TEXTAREA");
		 let texAdiccion=document.createElement("TEXTAREA");
		 let texCirugias=document.createElement("TEXTAREA");
		 let texOtro=document.createElement("TEXTAREA");
		 
		 let divMedico=document.createElement("div");
		 let divTrauma=document.createElement("div");
		 let divPsico=document.createElement("div");
		 let divAdiccion=document.createElement("div");
		 let divCirugias=document.createElement("div");
		 let divOtro=document.createElement("div");
		 
		 let boton=document.createElement("button");
		 boton.innerText="Registrar";
		 boton.onclick=function(){
			  var nuevoR={
				medico:texMedico.value,
			  	traumas:texTrauma.value,
			  	psicologico:texPsico.value,
			  	adicciones:texAdiccion.value,
			  	cirugias:texCirugias.value,
			  	otros:texOtro.value
			  }
			 mandarHistoriaC(nuevoR);
			 window.location.assign("historialPaciente.html");
		 }
		 divMedico.appendChild(labMedico);
		 divMedico.appendChild(texMedico);
		 divTrauma.appendChild(labTrauma);
		 divTrauma.appendChild(texTrauma);
		 divPsico.appendChild(labPsico);
		 divPsico.appendChild(texPsico);
		 divAdiccion.appendChild(labAdiccion);
		 divAdiccion.appendChild(texAdiccion);
		 divCirugias.appendChild(labCirugias);
		 divCirugias.appendChild(texCirugias);
		 divOtro.appendChild(labOtro);
		 divOtro.appendChild(texOtro);
		 
		 histoC.appendChild(divMedico);
		 histoC.appendChild(divTrauma);
		 histoC.appendChild(divPsico);
		 histoC.appendChild(divAdiccion);
		 histoC.appendChild(divCirugias);
		 histoC.appendChild(divOtro);
		 histoC.appendChild(boton);
	
	}else{ mostarHistoC(paciente)}
}
function mandarHistoriaC(nuevoR){
	var request= new XMLHttpRequest();
	var form=JSON.stringify(nuevoR);
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			
		}
	}
	request.open("POST","http://localhost:8080/paciente/"+idUsuario+"/histoClin",true);
	request.setRequestHeader("Content-type", "application/json");
	request.send(form);
}
function mostarHistoC(paciente){
	let histoC =document.getElementById("histoClinico");
	let ulElement=document.createElement("ul");
	let liMedico=document.createElement("li");
	let liTrauma=document.createElement("li");
	let liPsico=document.createElement("li");
	let liAdiccion=document.createElement("li");
	let liCirugia=document.createElement("li");
	let liOtro=document.createElement("li");
	
	liMedico.innerText=("Medico: "+paciente.hC[0].medico);
	liTrauma.innerText=("Traumas: "+paciente.hC[0].traumas);
	liPsico.innerText=("Psicologico: "+paciente.hC[0].psicologico);
	liAdiccion.innerText=("Adicciones: "+paciente.hC[0].adicciones);
	liCirugia.innerText=("Cirugias: "+paciente.hC[0].cirugias);
	liOtro.innerText=("Otros: "+paciente.hC[0].otors);
	
	ulElement.appendChild(liMedico);
	ulElement.appendChild(liTrauma);
	ulElement.appendChild(liPsico);
	ulElement.appendChild(liAdiccion);
	ulElement.appendChild(liCirugia);
	ulElement.appendChild(liOtro);
	
	histoC.appendChild(ulElement);
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