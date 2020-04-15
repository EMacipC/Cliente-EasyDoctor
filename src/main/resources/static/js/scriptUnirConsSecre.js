var idUsuario=decodeURIComponent(document.cookie);
function unirse(){
	var cons=document.getElementById("consultorio").value;
	var clave=document.getElementById("calve").value;
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
function comparar(consu){
	
	if(consu.nombre==cons&&consu.claveAcceso==calve){
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
		request.open("POST","http://localhost:8080/doctor",true);
		request.setRequestHeader("Content-type", "application/json");
		request.send(form);
	}
	
	
}







