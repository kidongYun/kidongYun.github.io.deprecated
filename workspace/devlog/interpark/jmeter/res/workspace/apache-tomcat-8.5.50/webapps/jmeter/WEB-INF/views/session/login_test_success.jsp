<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
	<title>Search Index Page</title>
	<script>
		function go_logout(){
			document.location.href='<c:url value="/session/logout" />';
		}
	</script>
	<style>
		.title {
			font-weight:bold;	
		}
		.value {
			font-weight:normal;	
		}
	</style>
</head>
<body>
<h1>
	Login Test Success
</h1>

<span class="title">UserID</span> : <span class="value">${user.id}</span><br>
<span class="title">UserName</span> : <span class="value">${user.name}</span><br>
<br>
<input type="button" value="Logout" onclick="go_logout()">

</body>
</html>
