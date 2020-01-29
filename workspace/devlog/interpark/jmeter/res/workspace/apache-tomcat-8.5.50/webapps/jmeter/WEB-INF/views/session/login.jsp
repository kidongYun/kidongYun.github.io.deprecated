<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
	<title>Search Index Page</title>
</head>
<body>
<h1>
	Login Page
</h1>

<c:choose>
	<c:when test="${msg != null}"> ${msg} </c:when>
	<c:otherwise>
	<form id="login_form" name="login_form" method="POST" action="login">
		ID : <input type="text" name="id"> <br>
		Password : <input type="password" name="password"> <br>
		<input type="submit" value="Login">
	</form>
	</c:otherwise>
</c:choose>


</body>
</html>
