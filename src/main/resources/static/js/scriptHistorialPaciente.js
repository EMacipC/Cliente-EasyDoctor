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
	
	nombre.innerText=paciente.nombre+" "+paciente.apellido;
	cumple.innerText=paciente.fechaNacimiento;
	curp.innerText=paciente.curp;
	telefono.innerText=paciente.telefono;
	movil.innerText=paciente.movil;
	email.innerText=paciente.email;
	sex.innerText=paciente.sexo;
	nacionalidad.innerText=paciente.nacionalidad;
	tipoS.innerText=paciente.tipoSangre;
	religion.innerText=paciente.religion;
	escolaridad.innerText=paciente.escolaridad;
	ocupacion.innerText=paciente.ocupacion;
	historialFam(paciente);
	historialClin(paciente);
	historialNClin(paciente);
	historialSex(paciente);
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
			 let myVar = setInterval(recargar, 2000);
		 }

		 divMedico.classList.add('form-group');
		 divTrauma.classList.add('form-group');
		 divPsico.classList.add('form-group');
		 divAdiccion.classList.add('form-group');
		 divCirugias.classList.add('form-group');
		 divOtro.classList.add('form-group');

		 texMedico.classList.add('form-control');
		 texTrauma.classList.add('form-control');
		 texPsico.classList.add('form-control');
		 texAdiccion.classList.add('form-control');
		 texCirugias.classList.add('form-control');
		 texOtro.classList.add('form-control');

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


function getHistorialClinicoComponent() {
	return '<div>' +
				'<div class="form-row">' +
					'<div class="form-group">' +
						'<label>Medico</label>'+
						'<textarea>'
					'</div>' +
					'<div class="form-group">' +
						'<label>Medico</label>'+
						'<textarea >'
					'</div>' +
				'</div>' +
			'</div>';
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
function historialNClin(paciente){
	if(paciente.hNC[0]==null){
		let histoC =document.getElementById("histoNoClinico");
		 let labAcF=document.createElement("label");
		 let labVacunas=document.createElement("label");
		 let labNutr=document.createElement("label");
		 let labSueño=document.createElement("label");
		 
		 labAcF.innerText="Actividad Fisica";
		 labVacunas.innerText="Vacunas";
		 labNutr.innerText="Nutricion";
		 labSueño.innerText="Habitos Sueño";
		 
		 let texAcF=document.createElement("TEXTAREA");
		 let texVacunas=document.createElement("TEXTAREA");
		 let texNutr=document.createElement("TEXTAREA");
		 let texSueño=document.createElement("TEXTAREA");
		 
		 let divAcF=document.createElement("div");
		 let divVacunas=document.createElement("div");
		 let divNutr=document.createElement("div");
		 let divSueño=document.createElement("div");
		 
		 let boton=document.createElement("button");
		 boton.innerText="Registrar";
		 boton.onclick=function(){
			  var nuevoR={
				actividadfisica:texAcF.value,
			  	vacunas:texVacunas.value,
			  	habitosAlimenticios:texNutr.value,
			  	habitosSueño:texSueño.value
			  }
			 mandarHistoriaNC(nuevoR);
			 let myVar = setInterval(recargar, 2000);
		 }
		 divAcF.appendChild(labAcF);
		 divAcF.appendChild(texAcF);
		 divVacunas.appendChild(labVacunas);
		 divVacunas.appendChild(texVacunas);
		 divNutr.appendChild(labNutr);
		 divNutr.appendChild(texNutr);
		 divSueño.appendChild(labSueño);
		 divSueño.appendChild(texSueño);
		 
		 histoC.appendChild(divAcF);
		 histoC.appendChild(divVacunas);
		 histoC.appendChild(divNutr);
		 histoC.appendChild(divSueño);
		 histoC.appendChild(boton);
	
	}else{ mostarHistoNC(paciente)}
}
function mandarHistoriaNC(nuevoR){
	var request= new XMLHttpRequest();
	var form=JSON.stringify(nuevoR);
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			
		}
	}
	request.open("POST","http://localhost:8080/paciente/"+idUsuario+"/histoNoClin",true);
	request.setRequestHeader("Content-type", "application/json");
	request.send(form);
}
function mostarHistoNC(paciente){
	let histoC =document.getElementById("histoNoClinico");
	let ulElement=document.createElement("ul");
	let liAcF=document.createElement("li");
	let liVacunas=document.createElement("li");
	let liNutr=document.createElement("li");
	let liSueño=document.createElement("li");
	
	liAcF.innerText=("Medico: "+paciente.hNC[0].actividadfisica);
	liVacunas.innerText=("Traumas: "+paciente.hNC[0].vacunas);
	liNutr.innerText=("Psicologico: "+paciente.hNC[0].habitosAlimenticios);
	liSueño.innerText=("Adicciones: "+paciente.hNC[0].habitosSueño);
	
	ulElement.appendChild(liAcF);
	ulElement.appendChild(liVacunas);
	ulElement.appendChild(liNutr);
	ulElement.appendChild(liSueño);
	
	histoC.appendChild(ulElement);
}
function historialFam(paciente){
	if(paciente.hF[0]==null){
		let histoC =document.getElementById("histoFam");
		 let labPapa=document.createElement("label");
		 let labMama=document.createElement("label");
		 let labAbueloP=document.createElement("label");
		 let labAbueloM=document.createElement("label");
		 
		 labPapa.innerText="Papa";
		 labMama.innerText="Mama";
		 labAbueloP.innerText="Abuelos Paternos";
		 labAbueloM.innerText="Abuelos Maternos";
		 
		 let texPapa=document.createElement("TEXTAREA");
		 let texMama=document.createElement("TEXTAREA");
		 let texAbueloP=document.createElement("TEXTAREA");
		 let texAbueloM=document.createElement("TEXTAREA");
		 
		 let divPapa=document.createElement("div");
		 let divMama=document.createElement("div");
		 let divAbueloP=document.createElement("div");
		 let divAbueloM=document.createElement("div");
		 
		 let boton=document.createElement("button");
		 boton.innerText="Registrar";
		 boton.onclick=function(){
			  var nuevoR={
				papa:texPapa.value,
			  	mama:texMama.value,
			  	abuelosP:texAbueloP.value,
			  	abuelosM:texAbueloM.value
			  }
			 mandarHistoriaFam(nuevoR);
			 let myVar = setInterval(recargar, 2000);
		 }
		 divPapa.appendChild(labPapa);
		 divPapa.appendChild(texPapa);
		 divMama.appendChild(labMama);
		 divMama.appendChild(texMama);
		 divAbueloP.appendChild(labAbueloP);
		 divAbueloP.appendChild(texAbueloP);
		 divAbueloM.appendChild(labAbueloM);
		 divAbueloM.appendChild(texAbueloM);
		 
		 histoC.appendChild(divPapa);
		 histoC.appendChild(divMama);
		 histoC.appendChild(divAbueloP);
		 histoC.appendChild(divAbueloM);
		 histoC.appendChild(boton);
	
	}else{ mostarHistoFam(paciente)}
}
function mandarHistoriaFam(nuevoR){
	var request= new XMLHttpRequest();
	var form=JSON.stringify(nuevoR);
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			
		}
	}
	request.open("POST","http://localhost:8080/paciente/"+idUsuario+"/histoFam",true);
	request.setRequestHeader("Content-type", "application/json");
	request.send(form);
}
function mostarHistoFam(paciente){
	let histoC =document.getElementById("histoFam");
	let ulElement=document.createElement("ul");
	let liPapa=document.createElement("li");
	let liMama=document.createElement("li");
	let liAbueloP=document.createElement("li");
	let liAbueloM=document.createElement("li");
	
	liPapa.innerText=("Papa: "+paciente.hF[0].papa);
	liMama.innerText=("Mama: "+paciente.hF[0].mama);
	liAbueloP.innerText=("Abuelos Paternos: "+paciente.hF[0].abuelosP);
	liAbueloM.innerText=("Abuelos Maternos: "+paciente.hF[0].abuelosM);
	
	ulElement.appendChild(liPapa);
	ulElement.appendChild(liMama);
	ulElement.appendChild(liAbueloP);
	ulElement.appendChild(liAbueloM);
	
	histoC.appendChild(ulElement);
}
function historialSex(paciente){
	if(paciente.hS[0]==null){
		let histoC =document.getElementById("histoSex");
		 let labM=document.createElement("label");
		 let labPRS=document.createElement("label");
		 let labS=document.createElement("label");
		 let labA=document.createElement("label");
		 let labC=document.createElement("label");
		 
		 labM.innerText="Menarca";
		 labPRS.innerText="PrimeraRelacion";
		 labS.innerText="Sexualidas";
		 labA.innerText="Abortos";
		 labC.innerText="Cesarias";
		 
		 let texM=document.createElement("TEXTAREA");
		 let texPRS=document.createElement("TEXTAREA");
		 let texS=document.createElement("TEXTAREA");
		 let texA=document.createElement("TEXTAREA");
		 let texC=document.createElement("TEXTAREA");
		 
		 let divM=document.createElement("div");
		 let divPRS=document.createElement("div");
		 let divS=document.createElement("div");
		 let divA=document.createElement("div");
		 let divC=document.createElement("div");
		 
		 let boton=document.createElement("button");
		 boton.innerText="Registrar";
		 boton.onclick=function(){
			  var nuevoR={
				menarca:texM.value,
			  	primeraRelacionSexual:texPRS.value,
			  	sexualidad:texS.value,
			  	abortos:texA.value,
			  	cesarias:texC.value
			  }
			 mandarHistoriaSex(nuevoR);
			 let myVar = setInterval(recargar, 2000);
		 }
		 divM.appendChild(labM);
		 divM.appendChild(texM);
		 divPRS.appendChild(labPRS);
		 divPRS.appendChild(texPRS);
		 divS.appendChild(labS);
		 divS.appendChild(texS);
		 divA.appendChild(labA);
		 divA.appendChild(texA);
		 divC.appendChild(labC);
		 divC.appendChild(texC);
		 
		 histoC.appendChild(divM);
		 histoC.appendChild(divPRS);
		 histoC.appendChild(divS);
		 histoC.appendChild(divA);
		 histoC.appendChild(divC);
		 histoC.appendChild(boton);
	
	}else{ mostarHistoSex(paciente)}
}
function mandarHistoriaSex(nuevoR){
	var request= new XMLHttpRequest();
	var form=JSON.stringify(nuevoR);
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			
		}
	}
	request.open("POST","http://localhost:8080/paciente/"+idUsuario+"/histoSex",true);
	request.setRequestHeader("Content-type", "application/json");
	request.send(form);
}
function mostarHistoSex(paciente){
	let histoC =document.getElementById("histoSex");
	let ulElement=document.createElement("ul");
	let liM=document.createElement("li");
	let liPRS=document.createElement("li");
	let liS=document.createElement("li");
	let liA=document.createElement("li");
	let liC=document.createElement("li");
	
	liM.innerText=("Menarca: "+paciente.hS[0].menarca);
	liPRS.innerText=("Primera Relacion: "+paciente.hS[0].primeraRelacionSexual);
	liS.innerText=("Sexualidad: "+paciente.hS[0].sexualidad);
	liA.innerText=("Abortos: "+paciente.hS[0].abortos);
	liC.innerText=("Cesarias: "+paciente.hS[0].cesarias);
	ulElement.appendChild(liM);
	ulElement.appendChild(liPRS);
	ulElement.appendChild(liS);
	ulElement.appendChild(liA);
	ulElement.appendChild(liC);
	
	histoC.appendChild(ulElement);
}
function recargar(){
	 window.location.assign("historialPaciente.html");
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