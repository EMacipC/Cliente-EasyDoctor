var idUsuario=readCookie("idSecretaria");
var co=null;
function optenerDatos(){
	
	generarClave();
	var nuevoR={
		nombre:document.getElementById("Nombre").value,
		direccion:document.getElementById("Direccion").value,
		telefono:document.getElementById("Telefono").value,
		encargado:document.getElementById("Encargado").value,
		email:document.getElementById("Email").value,
		claveAcceso:co
	}
	
		limpiar();
		realizarPeticion(nuevoR);

}


function limpiar(){

	document.getElementById("Nombre").value ="";
	document.getElementById("Direccion").value="";
	document.getElementById("Telefono").value="";
	document.getElementById("Encargado").value="";
	document.getElementById("Email").value="";
	
}
function realizarPeticion(nuevoR){
	var request= new XMLHttpRequest();
	var form=JSON.stringify(nuevoR);
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			
		}
	}
	request.open("POST","http://localhost:8080/secretaria/crearCons/"+idUsuario,true);
	request.setRequestHeader("Content-type", "application/json");
	request.send(form);
}
function generarClave(){
var request= new XMLHttpRequest();
	
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			co=procesarDatos(respuesta);
		}
	}
	request.open("GET","http://localhost:8080/consultorio",false);
	request.send();
	return co;
}
function procesarDatos(cons){
	var contraseña = "";
	var comprobar=false;
	do{
	var long=10;
	var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789";
	for (i=0; i<long; i++) {
		  contraseña += caracteres.charAt(Math.floor(Math.random()*caracteres.length));
	  }
	combrobar=true;
	for(let clave of cons){
		if(clave.claveAcceso==contraseña){
			combrobar=false;
		}
	}
	}while(comprobar==true)
		console.log(contraseña);
		return contraseña;
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