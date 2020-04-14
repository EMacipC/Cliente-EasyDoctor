function optenerDatos(){
	var ususario =document.getElementById("usuario").value;
	var contrasena=document.getElementById("contrasena").value;
	 consultarDatos(usuario,contrasena);
}
function consultarDatos(ususario,contrasena){
	
	var request = new XMLHttpRequest();
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			procesarDatos(respuesta,ususario,contrasena);
		}
	}
	request.open('GET','http://localhost:8080/doctor',false);
	request.send();
}
function procesarDatos(doctores,usuario,contrasena){
	
	for(let doctor of doctores){
		comparar(doctor,ususario,contrasena);
	}
	consultarDatosS(ususario,contrasena);
}
function comparar(doctor,ususario,contrasena){
	if(doctor.contraseña==contrasena&&doctor.usuario==usuario){
		 window.location.assign("sesionDoctor.html");
		 document.cookie="idDoctor="+doctor.id;
	}
}
function consultarDatosS(usuario,contrasena){
	var request = new XMLHttpRequest();
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			procesarDatosS(respuesta,ususario,contrasena);
		}
	}
	request.open('GET','http://localhost:8080/secretaria',false);
	request.send();
	
}
function procesarDatosS(secretarias,usuario,contrasena){
	for(let secretaria of secretarias){
		compararS(secretaria,usuario,contrasena);
	}
}
function compararS(secretaria,usuario,contrasena){
	window.location.assign("sesionSecretaria.html");
	 document.cookie="idSecretaria="+secretaria.id;
}