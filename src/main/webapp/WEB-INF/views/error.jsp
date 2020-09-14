<html xmlns:th="http://www.thymeleaf.org">
<head
	th:include="header.html :: header">
<!-- <head> -->
</head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<body>

	<div
		th:include="layout.html :: layout">
	</div>
	<div class="container">
		<div class="row">
			<div class="col-sm-5">
				<img src="/ama.pgp.view.template/images/Icon.jpg" />
			</div>
			<div class="col-sm-7">
				<h1 class="padding-top">Upps...Ocorreu um erro!!! :o </h1>
				<h2>Estamos a tentar ultrapassá-lo...</h2>
				<a href="/tuleap.plugins/ProjectPortfolio">Voltar à página inicial</a>
			</div>
		</div>
	</div>
</body>
</html>