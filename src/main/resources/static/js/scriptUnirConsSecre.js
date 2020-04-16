var idUsuario=readCookie("idSecretaria");
function unirse(){
	var cons=document.getElementById("consultorio").value;
	var clave=document.getElementById("clave").value;
	document.getElementById("consultorio").value="";
	document.getElementById("clave").value="";
	optenerCon(cons,clave);
}
function optenerCon(cons,clave){
var request= new XMLHttpRequest();
	
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			procesarDatos(respuesta,cons,clave);
		}
	}
	request.open("GET","http://localhost:8080/consultorio",false);
	request.send();
}
function procesarDatos(consultorios,cons,clave){
	for(let consu of consultorios){
		comparar(consu,cons,clave);
	}
	
}
function comparar(consu,cons,clave){
	
	if(consu.nombre==cons&&consu.claveAcceso==clave){
		var nuevoR={
				idConsultorio:consu.id,
				idSecretaria:idUsuario
		}
		var request= new XMLHttpRequest();
		var form=JSON.stringify(nuevoR);
		request.onreadystatechange= function(){
			if(this.readyState==4 && this.status==200 ){
				var respuesta=JSON.parse(this.responseText);
				
			}
		}
		request.open("POST","http://localhost:8080/secretaria/inscribri",true);
		request.setRequestHeader("Content-type", "application/json");
		request.send(form);
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






