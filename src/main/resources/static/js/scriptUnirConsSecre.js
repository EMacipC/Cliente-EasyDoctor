var idUsuario=decodeURIComponent(document.cookie);
function unirse(){
	var cons=document.getElementById("consultorio").value;
	var clave=document.getElementById("calve").value;
	document.getElementById("consultorio").value="";
	document.getElementById("clave").value="";
	optenerCon();
}
function optenerCon(){
var request= new XMLHttpRequest();
	
	request.onreadystatechange= function(){
		if(this.readyState==4 && this.status==200 ){
			var respuesta=JSON.parse(this.responseText);
			procesarDatos(respuesta);
		}
	}
	request.open("GET","http://localhost:8080/consultorio",false);
	request.send();
}
function procesarDatos(){
	
}