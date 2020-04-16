function optenerDatos(){
	var usuario =document.getElementById("usuario").value;
	var contrasena=document.getElementById("contrasena").value;
	//window.location.assign("sesionSecretaria.html");
	 consultarDatosS(usuario,contrasena); 
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
	request.open('GET','http://localhost:8080/doctor',true);
	request.send();
}
function procesarDatos(doctores,usuario,contrasena){
	
	for(let doctor of doctores){
		comparar(doctor,usuario,contrasena);
	}
}
function comparar(doctor,usuario,contrasena){
	if(doctor.contrasena==contrasena&&doctor.usuario==usuario){
		 window.location.assign("sesionDoctor.html");
		 document.cookie="idDoctor="+doctor.id;
	}
}
function consultarDatosS(usuario,contrasena){
	
	var requestS = new XMLHttpRequest();
	requestS.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			procesarDatosS(respuesta,usuario,contrasena);
		}
	}
	requestS.open('GET','http://localhost:8080/secretaria',false);
	requestS.send();
	
}
function procesarDatosS(secretarias,usuario,contrasena){
	for(let secretaria of secretarias){
		compararS(secretaria,usuario,contrasena);
	}
}
function compararS(secretaria,usuario,contrasena){
	if(secretaria.contrasena==contrasena&&secretaria.usuario==usuario){
		window.location.assign("sesionSecretaria.html");
		document.cookie="idSecretaria="+secretaria.id;
	}
}