var idUsuario=decodeURIComponent(document.cookie);
console.log(idUsuario);
function cerrarSesion(){
	document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
	window.location.assign("iniciarSesion.html");
}