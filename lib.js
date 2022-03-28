$(document).ready(function(){

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
			  url: "http://localhost:8080/Home/",
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
			$.getJSON("http://localhost:8080/User/"+idUser, function(data){

				$("#resUser").text("").append("<ul>");
				$.each(data, function(key, val){
					$("#resUser").append("<li>"+key+":"+val+"</li>");
				});
				$("#resUser").append("</ul>");
			}).fail(function(){
				alert("Registro não encontrado!");
			})
		}	
	});

	$("#btnUsers").click(function(){
		$.getJSON("http://localhost:8080/Users", function(data){
			$("#resUsers").text("").append("<ul>");
			for(let i=0;i<data.length;i++){
				$("#resUsers").append("<li>"+"Id:"+data[i][0]+"</li>");
				$("#resUsers").append("<li>"+"Nome:"+data[i][1]+"</li>");
				$("#resUsers").append("<li>"+"Sobrenome:"+data[i][2]+"</li>");
				$("#resUsers").append("<li>"+"Endereço:"+data[i][3]+"</li>");
				$("#resUsers").append("<li>"+"Cidade:"+data[i][4]+"</li>");
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
			  url: "http://localhost:8080/User/"+idUser,
			}).done(function( msg ) {
			  alert("Dados Removidos!");
			});
		}
	});

	$("#btnInserir").click(function(){
		var vnome = $("#nomeInserir").val();
		var vsobrenome = $("#sobrenomeInserir").val();
		var vendereco = $("#enderecoInserir").val();
		var vcidade = $("#cidadeInserir").val();

		$.ajax({
		  method: "POST",
		  url: "http://localhost:8080/User/",
		  contentType: "application/json",
		  data: JSON.stringify({ nome: vnome, sobrenome: vsobrenome, endereco: vendereco, cidade: vcidade })
		}).done(function( msg ) {
		  alert("Dados Incluídos!");
		});
	});

	$("#btnAtualizar").click(function(){
		var vid = $("#idAtualizar").val();
		var vnome = $("#nomeAtualizar").val();
		var vsobrenome = $("#sobrenomeAtualizar").val();
		var vendereco = $("#enderecoAtualizar").val();
		var vcidade = $("#cidadeAtualizar").val();

		$.ajax({
		  method: "PUT",
		  url: "http://localhost:8080/User/"+vid,
		  contentType: "application/json",
		  data: JSON.stringify({ nome: vnome, sobrenome: vsobrenome, endereco: vendereco, cidade: vcidade })
		}).done(function( msg ) {
		    alert("Dados Atualizados!");
		});
	});
});
