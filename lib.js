$(document).ready(function(){ 

	var $endpoint = "34.202.236.42";


	var page = location.pathname.split('/').slice(-1)[0];
	if (page!="" && page!="index.html"){
		var logado = $.session.get('logado');
		if (logado == null || logado != "sim"){
			window.location.href = "index.html";
		}
	}

	$("#btnLogout").click(function(){
		$.session.remove('logado');
		window.location.href = "index.html";
	});

	$("#userbtnEntrar").click(function(){
		$("#msgfail").text("");

		var user = $("#userlogin").val();
		var pass = $("#usersenha").val();

		if (user == ""){
			$("#msgfail").text("Informe o usuário!");
		}else if (pass == ""){
			$("#msgfail").text("Informe a senha!");
		}else{
			$.ajax({
			  method: "POST",
			  url: "http://"+$endpoint+":8080/Home/",
			  contentType: "application/json",
		  	  data: JSON.stringify({ login: user, senha: pass})
			}).done(function( msg ) {
			  $.session.set('logado', 'sim')
			  window.location.href = "menu.html";
			}).fail(function(msg){
			  alert("Login falhou!"); 	
			});
		}
	});

	$("#btnUser").click(function(){
		var idUser = $("#idUser").val();
		if (idUser == ""){
			alert("Informe o ID");
		}else if (isNaN(idUser)){
			alert("Informe um valor Numérico");
		}
		else{
			$.getJSON("http://"+$endpoint+":8080/User/"+idUser, function(data){

				$("#resUser").text("").append("<ul>");
				$.each(data, function(key, val){
					if (key != "senha")
						$("#resUser").append("<li><b>"+key+"</b> :"+val+"</li>");
				});
				$("#resUser").append("</ul>");

			}).fail(function(){
				alert("Registro não encontrado!");
			})
		}	
	});

    //Buscar Todos
	$("#btnUsers").click(function(){
		$.getJSON("http://"+$endpoint+":8080/Users", function(data){
			$("#resUsers").text("").append("<ul>");
			for(let i=0;i<data.length;i++){
				$("#resUsers").append("<li>"+"<b>Id:</b> "+data[i][0]+"</li>");
				$("#resUsers").append("<li>"+"<b>Nome:</b> "+data[i][4]+"</li>");
				$("#resUsers").append("<li>"+"<b>Sobrenome:</b> "+data[i][6]+"</li>");
				$("#resUsers").append("<li>"+"<b>Login:</b> "+data[i][3]+"</li>");
				$("#resUsers").append("<li>"+"<b>Endereço:</b> "+data[i][2]+"</li>");
				$("#resUsers").append("<li>"+"<b>Cidade:</b> "+data[i][1]+"</li>");
			}
			$("#resUser").append("</ul>");
		})	
	});

	$("#btnRemove").click(function(){
		var idUser = $("#idUserRemove").val();
		if (idUser == ""){
			alert("Informe o ID");
		}else if (isNaN(idUser)){
			alert("Informe um valor Numérico");
		}else{
			$.ajax({
			  method: "DELETE",
			  url: "http://"+$endpoint+":8080/User/"+idUser,
			}).done(function( msg ) {
			  alert("Dados Removidos!");
			});
		}
	});

	//Incluir registro
	$("#btnInserir").click(function(){
		var vnome = $("#nomeInserir");
		var vsobrenome = $("#sobrenomeInserir");
		var vendereco = $("#enderecoInserir");
		var vcidade = $("#cidadeInserir");
		var vlogin = $("#loginInserir");
		var vsenha = $("#senhaInserir");

		if (vnome.val() == ""){
			alert("Informe o nome!")
		}else if (vsobrenome.val() == ""){
			alert("Informe o sobrenome!")
		}else if (vendereco.val() == ""){
			alert("Informe o endereço!")
		}else if (vcidade.val() == ""){
			alert("Informe a cidade!")
		}else if (vlogin.val() == ""){
			alert("Informe o login!")
		}else if (vsenha.val() == ""){
			alert("Informe a senha!")
		}else{
			$.ajax({
			  method: "POST",
			  url: "http://"+$endpoint+":8080/User/",
			  contentType: "application/json",
			  data: JSON.stringify(
			  	{ 
			      nome: vnome.val(), 
			      sobrenome: vsobrenome.val(), 
			  	  endereco: vendereco.val(), 
			  	  cidade: vcidade.val(), 
			  	  login: vlogin.val(), 
			  	  senha: vsenha.val()
			  	}
			  )
			}).done(function( msg ) {
				vnome.val(""), 
			    vsobrenome.val(""), 
			  	vendereco.val(""), 
			  	vcidade.val(""), 
			  	vlogin.val(""), 
			  	vsenha.val("")
			  	alert("Dados Incluídos!");
			});
		}
	});

	//Alterar Registro
	$("#btnAtualizar").click(function(){
		var vid = $("#idAtualizar");
		var vnome = $("#nomeAtualizar");
		var vsobrenome = $("#sobrenomeAtualizar");
		var vendereco = $("#enderecoAtualizar");
		var vcidade = $("#cidadeAtualizar");
		var vlogin = $("#loginAtualizar");
		var vsenha = $("#senhaAtualizar");

		if (vid.val() == ""){
			alert("Informe o ID");
		}else if (vnome.val() == ""){
			alert("Informe o Nome");
		}else if (vnome.val() == ""){
			alert("Informe o Sobrenome");
		}else if (vnome.val() == ""){
			alert("Informe o Endereço");
		}else if (vnome.val() == ""){
			alert("Informe a Cidade");
		}else if (vnome.val() == ""){
			alert("Informe o Login");
		}else if (vnome.val() == ""){
			alert("Informe a Senha");
		}else{

			$.ajax({
			  method: "PUT",
			  url: "http://"+$endpoint+":8080/User/"+vid,
			  contentType: "application/json",
			  data: JSON.stringify(
			  	{ 
			  		nome: vnome.val(), 
			  	  	sobrenome: vsobrenome.val(), 
			  	  	endereco: vendereco.val(), 
			  	  	cidade: vcidade.val(), 
			  	    login: vlogin.val(), 
			  	    senha: vsenha.val() 
			  	}
			  )
			}).done(function( msg ) {
				vnome.val(""), 
			  	vsobrenome.val(""), 
			  	vendereco.val(""), 
			  	vcidade.val(""), 
			  	vlogin.val(""), 
			  	vsenha.val("") 
			    alert("Dados Atualizados!");
			});
		}
	});
});
