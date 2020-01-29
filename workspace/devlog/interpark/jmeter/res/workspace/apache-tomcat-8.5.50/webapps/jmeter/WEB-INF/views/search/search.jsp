<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<%@ page session="false" %>
<html>
<head>
	<title>Search Result Page</title>
	<style>
		* {
			margin:0;
			padding:0;
		}
		
		.title {
			font-size:18px;
			font-weight:bold;
			padding:5px;
			padding-top:10px;
			width:700px;
			text-align:left;
		}
		.contents {
			font-size:12px;
			font-weight:normal;
			padding:5px;
			margin-left:20px;
			border-left:2px solid lightgray;
			width:700px;
			text-align:left;
		}
		.url {
			font-size:12px;
		}
		.keyword {
			font-size:12px;
			padding:10px;			
		}
	
	</style>
</head>
<body>
<h1>
	Search Result Page
</h1>
<c:set var="counter" value="1"/>
<div class="keyword">
	<b>Search Keyword</b> : "${keyword}", <b>Result Count</b> : ${count}
</div>
<c:forEach items="${datas}" var="data">  
	<div class="title">
		${counter} - ${data.name} <span class="url">( <a href="${data.url}" target="_blank">${data.url}</a> )</span>
	</div>
	<div class="contents">
		${data.note}
	</div>
	<c:set var="counter" value="${counter + 1}"/>
</c:forEach>  
</body>
</html>
