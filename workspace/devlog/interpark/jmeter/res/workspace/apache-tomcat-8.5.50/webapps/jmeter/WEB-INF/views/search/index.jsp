<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Search Index Page</title>
</head>
<body>
<h1>
	Search Index Page
</h1>

<form id="search_form" name="search_form" method="POST" action="search">
	Search Keyword : <input type="text" name="key"> <input type="submit" value="search">
</form>

</body>
</html>
