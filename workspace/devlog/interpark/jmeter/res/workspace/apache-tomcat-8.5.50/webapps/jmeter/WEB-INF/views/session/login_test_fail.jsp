<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% response.setStatus( 403 ); %>
<html>
<head>
	<title>Search Index Page</title>
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
	Login Test Fail - Permission Denied
</h1>

<span class="title"><a href="<c:url value='/session/login.html'/>">Go to Login Page</a></span>

</body>
</html>
